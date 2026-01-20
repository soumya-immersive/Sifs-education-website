"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Download, Home, Loader2 } from "lucide-react";

export default function ThankYouPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paymentId = searchParams.get("payment_id");
    const registrationNo = searchParams.get("registration_no");
    const type = searchParams.get("type");

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!paymentId || !registrationNo) {
            setError("Missing payment information.");
            setLoading(false);
            return;
        }

        const fetchThankYouData = async () => {
            try {
                let url = "";
                if (type === "training") {
                    url = `http://localhost:3000/api/EducationAndInternship/Website/training-payment/training-thank-you?payment_id=${paymentId}&registration_no=${registrationNo}`;
                } else {
                    url = `http://localhost:3000/api/EducationAndInternship/Website/payment/thank-you?payment_id=${paymentId}&registration_no=${registrationNo}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch receipt details");
                }
                const result = await response.json();
                console.log("Thank You Data:", result);
                setData(result.data || result);
            } catch (err: any) {
                console.error(err);
                // Even if fetch fails, we show success page but maybe with less info
                // But user asked to implement the API, so we try to use it.
                setError("Could not load receipt details. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchThankYouData();
    }, [paymentId, registrationNo, type]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Verifying payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 text-center max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button onClick={() => router.push('/')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700">Return Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-green-600 p-10 text-center text-white relative overflow-hidden">
                    <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm relative z-10">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 relative z-10">Payment Successful!</h1>
                    <p className="text-green-100 text-lg relative z-10">Thank you for your enrollment.</p>

                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 text-sm">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-gray-500 mb-1">Transaction ID</p>
                            <p className="font-mono font-bold text-gray-900 break-all">{paymentId}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <p className="text-gray-500 mb-1">Registration Number</p>
                            <p className="font-mono font-bold text-gray-900 break-all">{registrationNo}</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
                        <h3 className="font-bold text-blue-900 mb-2 text-lg">What happens next?</h3>
                        <p className="text-blue-800 leading-relaxed">
                            A confirmation email with the receipt and course details has been sent to your registered email address.
                            Our team will verify your documents and contact you shortly.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-black transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </button>
                        {/* 
                        <button 
                            className="flex items-center justify-center gap-2 border-2 border-indigo-100 text-indigo-600 bg-indigo-50 px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-100 transition-all hover:-translate-y-0.5"
                        >
                            <Download className="w-5 h-5" />
                            Download Receipt
                        </button>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
}
