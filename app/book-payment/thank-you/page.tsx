"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Home, Loader2, BookOpen, User, CreditCard } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

export default function BookThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading receipt...</p>
                </div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}

function ThankYouContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paymentId = searchParams.get("payment_id");
    const registrationId = searchParams.get("registration_id");

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!paymentId && !registrationId) {
            setError("Missing payment information.");
            setLoading(false);
            return;
        }

        const fetchThankYouData = async () => {
            try {
                let url = `${API_BASE_URL}/EducationAndInternship/Website/book-payment/book-thank-you?`;
                if (paymentId) {
                    url += `payment_id=${paymentId}`;
                } else {
                    url += `registration_id=${registrationId}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch receipt details");
                }
                const result = await response.json();
                console.log("Book Thank You Data:", result);

                if (result.success) {
                    setData(result.data.data); // Based on the response structure provided
                } else {
                    throw new Error(result.message || "Failed to load receipt");
                }
            } catch (err: any) {
                console.error(err);
                setError("Could not load receipt details. " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchThankYouData();
    }, [paymentId, registrationId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Verifying purchase...</p>
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

    const { registration, book } = data || {};
    const displayAmount = registration?.formatted_amount || `₹${registration?.amount || '0.00'}`;

    return (
        <div className="min-h-screen bg-[#F8F9FB] py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 p-10 text-center text-white relative overflow-hidden">
                    <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm relative z-10">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 relative z-10">Purchase Successful!</h1>
                    <p className="text-indigo-100 text-lg relative z-10">Thank you for your order.</p>

                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                </div>

                <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 text-sm">
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-gray-500 mb-2 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-indigo-500" /> Payment ID
                            </p>
                            <p className="font-mono font-bold text-gray-900 break-all">{paymentId || registration?.razorpay_payment_id || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-gray-500 mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-indigo-500" /> Reference Number
                            </p>
                            <p className="font-mono font-bold text-gray-900 break-all">{registrationId || registration?.id}</p>
                        </div>
                    </div>

                    <div className="border border-gray-100 rounded-3xl p-8 mb-8 space-y-6">
                        <h3 className="font-bold text-gray-900 text-xl border-b border-gray-50 pb-4">Order Details</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500 font-medium">Book Title</span>
                                <span className="font-bold text-gray-900 text-right max-w-[200px]">{registration?.book_title || "Forensic Book"}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Applicant Name</span>
                                <span className="font-semibold text-gray-900">{registration?.name}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium">Email</span>
                                <span className="font-semibold text-gray-900">{registration?.email}</span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className="text-gray-900 font-bold text-lg">Total Paid</span>
                                <span className="text-indigo-600 font-black text-2xl">{displayAmount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-8">
                        <h3 className="font-bold text-blue-900 mb-2 text-lg">Next Steps</h3>
                        <p className="text-blue-800 leading-relaxed">
                            Your order has been confirmed. You will receive a confirmation email with your digital receipt and shipping details (for physical books) shortly.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/books')}
                            className="flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all hover:-translate-y-0.5 shadow-lg"
                        >
                            <BookOpen className="w-5 h-5" />
                            Browse More Books
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all hover:-translate-y-0.5"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
