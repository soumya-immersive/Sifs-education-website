"use client";

import { Shield, FileCheck, AlertCircle, Loader2, Download, X } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";

interface CertificateData {
    name: string;
    certificate_number: string;
    certificate_image: string;
    orientation: "vertical" | "horizontal";
    event_id?: number;
    download_link?: string;
}

export default function CertificateDownloadPage() {
    const [verifyInput, setVerifyInput] = useState("");
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [verifyError, setVerifyError] = useState("");
    const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
    const [downloadLoading, setDownloadLoading] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!verifyInput.trim()) {
            setVerifyError("Please enter your certificate number");
            return;
        }

        setVerifyLoading(true);
        setVerifyError("");
        setCertificateData(null);

        try {
            // API call for certificate verification
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/EventManagement/Website/verify-certificate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        certificate_number: verifyInput.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (result.success && result.data) {
                // Store certificate data from API response
                const certificateInfo = result.data.certificate;
                const downloadUrl = result.data.download_url;

                setCertificateData({
                    name: certificateInfo.name || "",
                    certificate_number: certificateInfo.certificate_number || verifyInput.trim(),
                    // Use a local template image since API doesn't provide a displayable image
                    certificate_image: "/certificate-bg.png",
                    orientation: "horizontal", // Default orientation
                    event_id: certificateInfo.event_id,
                    download_link: downloadUrl // Store specific download link
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

    const handleDownloadCertificate = async () => {
        // If API provided a direct download link, use it
        if (certificateData?.download_link) {
            window.open(certificateData.download_link, "_blank");
            return;
        }

        if (!certificateRef.current) return;

        setDownloadLoading(true);

        try {
            // Dynamically import html2canvas
            const html2canvas = (await import("html2canvas")).default;

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff",
            } as any);

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `certificate_${certificateData?.certificate_number || "download"}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
                setDownloadLoading(false);
            }, "image/png");
        } catch (error) {
            console.error("Error downloading certificate:", error);
            alert("Failed to download certificate. Please try again.");
            setDownloadLoading(false);
        }
    };

    const handleCloseCertificate = () => {
        setCertificateData(null);
    };

    return (
        <section className="relative bg-white min-h-screen">
            {/* Header Section - Only show when NOT viewing certificate to keep view clean, or keep it if preferred. Keeping it for navigation context but adjusting styles if needed. */}
            {!certificateData && (
                <div className="relative bg-gradient-to-r from-blue-700 to-blue-800 py-6 px-4 shadow-lg">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-md">
                                <Image
                                    src="/logo.png"
                                    alt="SIFS Logo"
                                    width={60}
                                    height={60}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                DOWNLOAD CERTIFICATE
                            </h1>
                            <div className="flex items-center justify-center gap-2 mt-1 text-sm text-blue-100">
                                <span>HOME</span>
                                <span>/</span>
                                <span className="text-yellow-400 font-semibold">DOWNLOAD CERTIFICATE</span>
                            </div>
                        </div>

                        {/* Right Side Illustration */}
                        <div className="hidden lg:block w-32 h-32">
                            <div className="relative w-full h-full">
                                <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                                    <FileCheck className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={certificateData ? "w-full" : "max-w-4xl mx-auto px-4 py-16"}>
                {/* Verify Certificate Section */}
                {!certificateData && (
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full mb-4 shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Verify Certificate
                            </h2>
                            <p className="text-gray-700 font-medium text-lg">
                                Do you have a valid certificate?
                            </p>
                        </div>

                        {/* Verify Form */}
                        <form onSubmit={handleVerify} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={verifyInput}
                                    onChange={(e) => {
                                        setVerifyInput(e.target.value);
                                        setVerifyError("");
                                    }}
                                    placeholder="Enter your certificate number"
                                    className="w-full px-6 py-4 pr-32 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg"
                                    disabled={verifyLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={verifyLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {verifyLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="w-4 h-4" />
                                            <span>VALIDATE</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Verify Error */}
                            {verifyError && (
                                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700">{verifyError}</p>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Certificate Preview Section */}
                {certificateData && (
                    <div className="bg-white w-full">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full mb-4 shadow-lg">
                                <FileCheck className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                Congratulations! Your certificate is ready
                            </h2>
                            <p className="text-gray-700 font-medium text-lg">
                                Certificate verified successfully
                            </p>
                        </div>

                        {/* Certificate Display */}
                        <div className="mb-8 overflow-x-auto text-center relative z-10">
                            <div className="inline-block relative shadow-2xl bg-white">
                                <div
                                    ref={certificateRef}
                                    className="relative bg-white"
                                    style={{
                                        width: certificateData.orientation === "vertical" ? "794px" : "1123px", // A4 sizes in px (approx)
                                        height: certificateData.orientation === "vertical" ? "1123px" : "794px",
                                        maxWidth: "100%",
                                        margin: "0 auto"
                                    }}
                                >
                                    {/* Certificate Image */}
                                    {certificateData.certificate_image ? (
                                        <div className="relative w-full h-full">
                                            <img
                                                src={certificateData.certificate_image}
                                                alt="Certificate"
                                                className="w-full h-full object-cover block"
                                                crossOrigin="anonymous"
                                            />

                                            {/* Overlays based on PHP styles */}
                                            {certificateData.orientation === "vertical" ? (
                                                <>
                                                    {/* Vertical Name */}
                                                    <div className="absolute w-full text-center" style={{ top: "520px", left: 0, padding: "0 20px" }}>
                                                        <h2 className="text-4xl font-bold text-[#1f2937] font-serif tracking-wide">{certificateData.name}</h2>
                                                    </div>
                                                    {/* Vertical Number */}
                                                    <div className="absolute w-full text-left" style={{ top: "670px", paddingLeft: "485px" }}>
                                                        <p className="text-sm font-bold text-[#374151]">{certificateData.certificate_number}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    {/* Horizontal Name */}
                                                    <div className="absolute w-full text-center" style={{ top: "260px", left: 0 }}>
                                                        <h2
                                                            className="text-5xl font-bold text-[#1e1e2f] font-sans tracking-wide inline-block px-4 py-1"
                                                            style={{
                                                                textShadow: "0px 1px 1px rgba(0,0,0,0.1)",
                                                                fontFamily: "'Times New Roman', Times, serif"
                                                            }}
                                                        >
                                                            {certificateData.name}
                                                        </h2>
                                                    </div>
                                                    {/* Horizontal Number */}
                                                    <div className="absolute w-full text-left" style={{ top: "710px", paddingLeft: "470px" }}>
                                                        <p className="text-xl font-bold text-[#d14d56] tracking-wider" style={{ fontFamily: "Arial, sans-serif" }}>{certificateData.certificate_number}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <div className="text-center p-8">
                                                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                                <p className="text-gray-500 font-medium">Certificate template not available</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleDownloadCertificate}
                                disabled={downloadLoading}
                                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase"
                            >
                                {downloadLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Downloading...</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5" />
                                        <span>Download Now</span>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleCloseCertificate}
                                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-bold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2 uppercase"
                            >
                                <X className="w-5 h-5" />
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-20" />
        </section>
    );
}
