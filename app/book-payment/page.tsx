"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ShieldCheck, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

export default function BookPaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading payment...</p>
                </div>
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
}

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const registrationId = searchParams.get("registration_id");

    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<any>(null);
    const [error, setError] = useState("");
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    useEffect(() => {
        if (!registrationId) {
            setError("Registration ID is missing.");
            setLoading(false);
            return;
        }

        const fetchPaymentData = async () => {
            try {
                const url = `${API_BASE_URL}/EducationAndInternship/Website/book-payment?registration_id=${registrationId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch payment details");
                }
                const result = await response.json();
                console.log("Book Payment API Response:", result);

                if (result.success && result.data) {
                    setInitialData(result.data);
                } else {
                    throw new Error(result.message || "Invalid response from server");
                }
            } catch (err: any) {
                console.error("Payment fetch error:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentData();
    }, [registrationId]);

    // Auto-open Razorpay when data is loaded
    useEffect(() => {
        if (!loading && !error && initialData && (window as any).Razorpay) {
            const timer = setTimeout(() => {
                handlePayment();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading, error, initialData]);

    const handlePayment = () => {
        if (!initialData || !(window as any).Razorpay) {
            alert("Payment system not loaded completely. Please refresh.");
            return;
        }

        const { book_registration, book, payment_gateway } = initialData;
        const amount = book_registration.amount;
        const currency = book_registration.currency_code || "INR";
        const name = book.title;
        const applicantName = book_registration.name || "";
        const email = book_registration.email;
        const contact = book_registration.phone_number;
        const description = "Book Purchase Fee";
        const key_id = payment_gateway?.key_id || initialData.razorpay_key || "rzp_test_RgtKcut7UcgWm5";

        const successUrl = `${API_BASE_URL}/EducationAndInternship/Website/book-payment/book-pay-success`;

        const options = {
            key: key_id,
            amount: amount * 100, // Amount in paise
            currency: currency,
            name: "SIFS Forensic Institute",
            description: description,
            image: "https://sifs.in/images/sifs-logo.png",
            handler: async function (response: any) {
                console.log("Razorpay Payment Response:", response);

                try {
                    const payload = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id || "",
                        razorpay_signature: response.razorpay_signature || "",
                        registration_id: parseInt(registrationId as string),
                        amount: amount,
                        currency: currency
                    };

                    console.log("Payment Success Payload:", payload);

                    const apiResponse = await fetch(successUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });

                    const result = await apiResponse.json();
                    console.log("Payment Verification API Response:", result);

                    if (apiResponse.ok && result.success) {
                        setIsPaymentSuccess(true);
                        router.push(`/book-payment/thank-you?registration_id=${registrationId}&payment_id=${response.razorpay_payment_id}`);
                    } else {
                        throw new Error(result.message || "Payment verification failed on server.");
                    }

                } catch (e: any) {
                    console.error("Payment verification failed", e);
                    alert(`Payment successful but verification failed: ${e.message}. Please contact support with payment ID: ${response.razorpay_payment_id}`);
                }
            },
            prefill: {
                name: applicantName,
                email: email,
                contact: contact,
            },
            theme: {
                color: "#4F46E5",
            },
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', function (response: any) {
            alert("Payment Failed: " + response.error.description);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-100 max-w-md w-full text-center">
                    <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Payment</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button onClick={() => router.back()} className="text-indigo-600 font-medium hover:underline">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (isPaymentSuccess) {
        return (
            <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-4">
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center max-w-lg w-full text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Payment Successful!</h2>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Redirecting to thank you page...
                    </p>
                </div>
            </div>
        );
    }

    const { book_registration, book } = initialData;

    return (
        <div className="min-h-screen bg-[#F8F9FB] py-20 px-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-900 p-8 text-white text-center">
                        <h1 className="text-2xl font-bold mb-2">Complete Your Purchase</h1>
                        <p className="text-gray-400">Order Reference # {registrationId}</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Book Purchase
                                </p>
                                <p className="font-bold text-gray-900 text-lg">{book.title}</p>
                            </div>

                            {book_registration.name && (
                                <div className="flex justify-between items-center py-4 border-t border-gray-100">
                                    <span className="text-gray-600">Purchaser</span>
                                    <span className="font-medium text-gray-900">{book_registration.name}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center py-4 border-t border-gray-100">
                                <span className="text-gray-600">Author</span>
                                <span className="font-medium text-gray-900">{book.author}</span>
                            </div>
                        </div>

                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                            <div className="flex justify-between items-end">
                                <span className="text-indigo-900 font-semibold">Total Amount</span>
                                <span className="text-3xl font-bold text-indigo-700">
                                    {new Intl.NumberFormat('en-IN', {
                                        style: 'currency',
                                        currency: book_registration.currency_code || 'INR'
                                    }).format(book_registration.amount)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            <CreditCard className="w-5 h-5" />
                            Pay Now
                        </button>

                        <div className="flex items-center justify-center gap-2 text-xs text-center text-gray-400">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Secured by Razorpay</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
