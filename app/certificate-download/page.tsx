"use client";

import { Shield, FileCheck, AlertCircle, Loader2, Download, X } from "lucide-react";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import Image from "next/image";

interface CertificateTemplate {
    name: string;
    image_url: string;
    orientation: "vertical" | "horizontal";
}

interface CertificateInfo {
    name: string;
    certificate_number: string;
    event_title: string;
    formatted_event_date: string;
    [key: string]: any;
}

interface CertificateData {
    certificate: CertificateInfo;
    template: CertificateTemplate;
    download_url?: string;
    view_url?: string;
}

function CertificateDownloadContent() {
    const searchParams = useSearchParams();
    const [verifyInput, setVerifyInput] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState("");
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const [scale, setScale] = useState(1);
    const certificateRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic scaling for responsiveness
    useEffect(() => {
        if (!certificateData) return;

        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const targetWidth = certificateData.template.orientation === "vertical" ? 794 : 1123;
                const newScale = Math.min(1, containerWidth / targetWidth);
                setScale(newScale);
            }
        };

        const timeoutId = setTimeout(updateScale, 100);
        window.addEventListener("resize", updateScale);
        return () => {
            window.removeEventListener("resize", updateScale);
            clearTimeout(timeoutId);
        };
    }, [certificateData]);

    // Auto-verify if cert_no is in URL
    useEffect(() => {
        const certNo = searchParams.get("cert_no");
        if (certNo) {
            verifyCertificate(certNo);
        }
    }, [searchParams]);

    const verifyCertificate = async (certificateNumber: string) => {
        setVerifyLoading(true);
        setVerifyError("");
        setCertificateData(null);
        setImageError(false);
        setImageLoading(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}/EventManagement/Website/verify-certificate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        certificate_number: certificateNumber.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (result.success && result.data) {
                const certificateType = result.data.verification?.certificate_type;
                let template = result.data.certificate_template;

                // Provide a default template for quiz certificates if missing
                if (!template && certificateType === "quiz_certificate") {
                    template = {
                        name: "Quiz Certificate",
                        image_url: "/",
                        orientation: "horizontal"
                    };
                }

                if (!template) {
                    setVerifyError("Certificate template information is missing.");
                    return;
                }

                const orientation = template.orientation?.toString().toLowerCase() === "vertical" ? "vertical" : "horizontal";

                // Use proxy to avoid CORS issues with html2canvas capture
                const proxiedImageUrl = template.image_url.startsWith('http')
                    ? `/api/image-proxy?url=${encodeURIComponent(template.image_url)}`
                    : template.image_url;

                setCertificateData({
                    certificate: {
                        ...result.data.certificate,
                        certificate_type: certificateType
                    },
                    template: {
                        ...template,
                        image_url: proxiedImageUrl,
                        orientation: orientation as "vertical" | "horizontal"
                    },
                    download_url: result.data.download_url,
                    view_url: result.data.view_url
                });
                setVerifyInput("");
            } else {
                setVerifyError(result.message || "Certificate not found or invalid.");
            }
        } catch (error) {
            console.error("Error verifying certificate:", error);
            setVerifyError("Failed to verify certificate. Please try again.");
        } finally {
            setVerifyLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!verifyInput.trim()) {
            setVerifyError("Please enter your certificate number");
            return;
        }

        await verifyCertificate(verifyInput);
    };

    const handleDownloadCertificate = async () => {
        if (!certificateRef.current || !certificateData) return;

        setDownloadLoading(true);

        try {
            const html2canvas = (await import("html2canvas")).default;

            // Create a temporary clone for cleaning and rendering
            const originalElement = certificateRef.current;
            const clone = originalElement.cloneNode(true) as HTMLElement;

            // Helper to strip unsupported color functions
            const cleanStyles = (el: HTMLElement) => {
                const unsupported = ["lab(", "oklch(", "lch(", "oklab("];
                const styles = window.getComputedStyle(el);

                // properties to check
                const props = ["color", "backgroundColor", "borderColor", "boxShadow", "borderTopColor", "borderBottomColor", "borderLeftColor", "borderRightColor"];

                props.forEach(prop => {
                    const val = (el.style as any)[prop] || styles.getPropertyValue(prop.replace(/[A-Z]/g, m => "-" + m.toLowerCase()));
                    if (val && unsupported.some(u => val.includes(u))) {
                        // Fallback to safe colors
                        if (prop.includes("Color")) el.style.setProperty(prop, "transparent", "important");
                        else if (prop === "color") el.style.setProperty("color", "#000000", "important");
                        else if (prop === "backgroundColor") el.style.setProperty("background-color", "#ffffff", "important");
                        else el.style.setProperty(prop, "none", "important");
                    }
                });

                Array.from(el.children).forEach(child => cleanStyles(child as HTMLElement));
            };

            // Set fixed dimensions and positioning for the clone
            const width = certificateData.template.orientation === "vertical" ? 794 : 1123;
            const height = certificateData.template.orientation === "vertical" ? 1123 : 794;

            clone.style.width = `${width}px`;
            clone.style.height = `${height}px`;
            clone.style.position = "fixed";
            clone.style.left = "-9999px";
            clone.style.top = "0";
            clone.style.transform = "none";
            clone.style.opacity = "1";

            document.body.appendChild(clone);
            cleanStyles(clone);

            // Wait a moment for images and styles to stabilize
            await new Promise(resolve => setTimeout(resolve, 100));

            const canvas = await html2canvas(clone, {
                scale: 3,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
                width: width,
                height: height,
                onclone: (clonedDoc: Document) => {
                    // Final pass in the cloned document context
                    const all = clonedDoc.getElementsByTagName("*");
                    for (let i = 0; i < all.length; i++) {
                        const el = all[i] as HTMLElement;
                        const s = window.getComputedStyle(el);
                        if (s.color.includes("lab(") || s.backgroundColor.includes("lab(")) {
                            el.style.setProperty("color", "#000000", "important");
                            el.style.setProperty("background-color", "#ffffff", "important");
                        }
                    }
                }
            } as any);

            document.body.removeChild(clone);

            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `SIFS_Certificate_${certificateData.certificate.certificate_number}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
                setDownloadLoading(false);
            }, "image/png");
        } catch (error) {
            console.error("Error downloading certificate:", error);
            alert("Failed to download certificate. Modern color functions (lab/oklch) detected in your browser theme may be causing issues. Try again or use a different browser.");
            setDownloadLoading(false);
        }
    };

    const handleCloseCertificate = () => {
        setCertificateData(null);
        setImageError(false);
        setImageLoading(true);
    };

    return (
        <section className="relative bg-gray-50 min-h-screen">
            {/* Header Section */}
            {!certificateData && (
                <div className="relative bg-[#1a237e] py-12 px-4 shadow-xl overflow-hidde">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="flex items-center gap-6">
                            <div className="text-left">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                                    Certificate Verification
                                </h1>
                                <div className="flex items-center justify-center gap-2 text-sm text-blue-100/80">
                                    <span>HOME</span>
                                    <span className="w-1 h-1 bg-blue-100/50 rounded-full" />
                                    <span className="text-yellow-400 font-bold uppercase tracking-wider">Download Certificate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`relative z-10 ${certificateData ? "w-full" : "max-w-4xl mx-auto px-4 py-20 pt-40"}`}>
                {/* Verify Certificate Section */}
                {!certificateData && (
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-16 border border-gray-100 transform -translate-y-8 ">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl mb-6 shadow-xl transform rotate-3">
                                <Shield className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                                Verify Your Credential
                            </h2>
                            {/* <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                                Enter your certificate number below to validate its authenticity and download your digital copy.
                            </p> */}
                        </div>

                        {/* Verify Form */}
                        <form onSubmit={handleVerify} className="max-w-2xl mx-auto">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={verifyInput}
                                    onChange={(e) => {
                                        setVerifyInput(e.target.value);
                                        setVerifyError("");
                                    }}
                                    placeholder="Enter Certificate Number"
                                    className="w-full px-8 py-6 pr-36 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-xl font-medium"
                                    disabled={verifyLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={verifyLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-[#1a237e] text-white font-bold rounded-xl hover:bg-[#283593] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 active:scale-95"
                                >
                                    {verifyLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>VERIFYING</span>
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="w-5 h-5" />
                                            <span>VALIDATE</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Verify Error */}
                            {verifyError && (
                                <div className="mt-8 bg-black/[0.02] border-l-4 border-red-500 rounded-r-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="p-2 bg-red-100 rounded-full">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-red-900 font-bold block">Verification Error</p>
                                        <p className="text-red-700/80 font-medium">{verifyError}</p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Certificate Preview Section */}
                {certificateData && (
                    <div className="animate-in fade-in zoom-in-95 duration-500">
                        <div className="max-w-7xl mx-auto px-4 pt-12 text-center mb-12">
                            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                                <FileCheck className="w-8 h-8 text-green-600" />
                            </div> */}
                            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">
                                Certificate Verified Successfully
                            </h2>
                            {/* <p className="text-gray-500 text-lg font-medium">
                                Credential issued to <span className="text-indigo-600 font-bold">{certificateData.certificate.name}</span>
                            </p> */}
                        </div>

                        {/* Certificate Display Container */}
                        <div className="max-w-[1200px] mx-auto px-4 mb-16 overflow-hidden">
                            <div className="relative group">
                                {/* Loading Overlay */}
                                {imageLoading && (
                                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 min-h-[500px]">
                                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                                        <p className="text-gray-500 font-bold animate-pulse">GENERATING PREVIEW...</p>
                                    </div>
                                )}

                                {/* Error State */}
                                {imageError && (
                                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-red-50 rounded-2xl border-2 border-red-100 min-h-[500px]">
                                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                                        <p className="text-red-900 font-bold">Failed to load certificate template</p>
                                        <button
                                            onClick={() => { setImageError(false); setImageLoading(true); }}
                                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                <div className="bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
                                    <div ref={containerRef} className="w-full flex justify-center p-4">
                                        <div
                                            className="relative transition-all duration-300"
                                            style={{
                                                width: `${(certificateData.template.orientation === "vertical" ? 794 : 1123) * scale}px`,
                                                height: `${(certificateData.template.orientation === "vertical" ? 1123 : 794) * scale}px`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    transform: `scale(${scale})`,
                                                    transformOrigin: "top left",
                                                    width: certificateData.template.orientation === "vertical" ? "794px" : "1123px",
                                                    height: certificateData.template.orientation === "vertical" ? "1123px" : "794px",
                                                }}
                                            >
                                                <div
                                                    ref={certificateRef}
                                                    className="relative w-full h-full bg-white transition-opacity duration-700 shadow-2xl"
                                                    style={{ opacity: imageLoading ? 0 : 1 }}
                                                >
                                                    {/* Certificate Base Image */}
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={certificateData.template.image_url}
                                                        alt="Certificate Template"
                                                        className="w-full h-full object-contain block"
                                                        crossOrigin="anonymous"
                                                        onLoad={() => setImageLoading(false)}
                                                        onError={() => {
                                                            setImageError(true);
                                                            setImageLoading(false);
                                                        }}
                                                    />

                                                    {/* Dynamic Text Overlays */}
                                                    {!imageError && (
                                                        <div className="absolute inset-0 pointer-events-none select-none">
                                                            {certificateData.template.orientation === "vertical" ? (
                                                                <>
                                                                    {/* Vertical Orientation Layout - Centered with specific proportions */}
                                                                    <div className="absolute top-[45%] left-0 w-full text-center px-12">
                                                                        <h2 className="text-[32px] font-semibold text-black uppercase tracking-wide leading-tight">
                                                                            {certificateData.certificate.name}
                                                                        </h2>
                                                                    </div>
                                                                    <div className="absolute bottom-[7%] left-[65%] w-full">
                                                                        <p className="text-[16px] font-bold text-gray-800 tracking-wider">
                                                                            {certificateData.certificate.certificate_number}
                                                                        </p>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {/* Horizontal Orientation Layout - Balanced centering */}
                                                                    <div className={`absolute ${certificateData.certificate.certificate_type === 'quiz_certificate' ? 'top-[44%]' : 'top-[24%]'} left-0 w-full text-center`}>
                                                                        <h2 className={`text-3xl md:text-5xl font-bold tracking-wide inline-block ${certificateData.certificate.certificate_type === 'quiz_certificate'
                                                                            ? 'text-gray-900 border-b-2 border-gray-900 pb-2'
                                                                            : 'text-[#ffffff] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                                                                            }`}>
                                                                            {certificateData.certificate.name}
                                                                        </h2>
                                                                    </div>
                                                                    <div className={`absolute ${certificateData.certificate.certificate_type === 'quiz_certificate'
                                                                        ? 'bottom-[12%] right-[10%] text-right'
                                                                        : 'bottom-[11%] left-0 w-full text-center'
                                                                        }`}>
                                                                        <p className={`text-[18px] tracking-wider inline-block font-bold ${certificateData.certificate.certificate_type === 'quiz_certificate'
                                                                            ? 'text-gray-800'
                                                                            : 'text-black'
                                                                            } tracking-widest font-Arial`}>
                                                                            {certificateData.certificate.certificate_number}
                                                                        </p>
                                                                    </div>
                                                                    {certificateData.certificate.certificate_type === 'quiz_certificate' && (
                                                                        <div className="absolute bottom-[12%] left-[10%] text-left">
                                                                            <p className="text-[18px] font-bold text-gray-800">
                                                                                {certificateData.certificate.formatted_issue_date || certificateData.certificate.formatted_event_date}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pb-32 max-w-2xl mx-auto px-4">
                            <button
                                onClick={handleDownloadCertificate}
                                disabled={downloadLoading || imageLoading || imageError}
                                className="flex-1 px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-2xl font-black hover:from-indigo-700 hover:to-indigo-900 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg uppercase tracking-tighter active:scale-95"
                            >
                                {downloadLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>PREPARING...</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-6 h-6" />
                                        <span>Download Certificate</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleCloseCertificate}
                                className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black hover:bg-gray-50 transition-all shadow-lg flex items-center justify-center gap-3 text-lg uppercase tracking-tighter active:scale-95"
                            >
                                <X className="w-6 h-6" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[120px] opacity-50" />
            </div>
        </section>
    );
}

export default function CertificateDownloadPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FBFCFF]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading verification gate...</p>
                </div>
            </div>
        }>
            <CertificateDownloadContent />
        </Suspense>
    );
}
