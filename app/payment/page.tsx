"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ShieldCheck, CreditCard, Loader2, CheckCircle2 } from "lucide-react";

export default function PaymentPage() {
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
    const registrationNo = searchParams.get("registration_no");
    const type = searchParams.get("type"); // 'training' or 'course' (default)

    const [loading, setLoading] = useState(true);
    const [initialData, setInitialData] = useState<any>(null);
    const [error, setError] = useState("");
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

    useEffect(() => {
        if (!registrationNo) {
            setError("Registration number is missing.");
            setLoading(false);
            return;
        }

        const fetchPaymentData = async () => {
            try {
                let url = "";
                if (type === "training") {
                    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training-payment?registration_no=${registrationNo}`;
                } else {
                    url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/payment?registration_no=${registrationNo}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch payment details");
                }
                const result = await response.json();
                console.log("Payment API Response:", result); // Debug log

                if (result.success && result.data) {
                    console.log("Payment Data:", result.data); // Debug log
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
    }, [registrationNo, type]);

    // Auto-open Razorpay when data is loaded
    useEffect(() => {
        if (!loading && !error && initialData && (window as any).Razorpay) {
            // Small delay to ensure everything is ready
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

        console.log("=== Payment Handler Started ===");
        console.log("Type:", type);
        console.log("Initial Data:", initialData);

        // Determine data structure based on type
        // For Course: initialData = { registration, course, payment_gateway }
        // For Training: We assume similar or simply flat data based on recent Step 3 payload
        // Let's handle both robustly by checking what's available

        let amount: any, currency: any, name: any, email: any, contact: any, description: any, key_id: any, applicantName: any;
        let successUrl = "";
        let successPayloadBuilder: (response: any) => any;

        if (type === "training") {
            // Training API returns: { registration_no, training_registration, training, payment_amount, currency_code }
            console.log("Training Registration Data:", initialData);
            console.log("Registration Fields:", JSON.stringify(initialData, null, 2));

            // Validate required fields at root level
            if (!initialData || !initialData.payment_amount || !initialData.currency_code) {
                console.error("Missing required payment data:", {
                    initialData,
                    payment_amount: initialData?.payment_amount,
                    currency_code: initialData?.currency_code,
                    allFields: Object.keys(initialData || {})
                });
                alert("Payment data is incomplete. Please contact support.");
                return;
            }

            const reg = initialData.training_registration || {};
            const trainingInfo = initialData.training || {};

            amount = initialData.payment_amount;
            currency = initialData.currency_code;
            name = trainingInfo.title || "Training";
            applicantName = reg.name || "";
            email = reg.email || "";
            contact = reg.phone_number || "";
            description = "Training Registration Fee";

            // Get Razorpay key from API response or environment variable
            console.log("Payment Gateway Data:", initialData.payment_gateway);

            if (initialData.payment_gateway && initialData.payment_gateway.key_id) {
                key_id = initialData.payment_gateway.key_id;
                console.log("Using Razorpay key from API:", key_id);
            } else if (process.env.NEXT_PUBLIC_RAZORPAY_KEY) {
                key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
                console.log("Using Razorpay key from environment variable");
            } else {
                // Use the key from the API response you showed me
                key_id = "rzp_live_2pUNRgXFtwfD7O";
                console.warn("Using hardcoded Razorpay key. Please add NEXT_PUBLIC_RAZORPAY_KEY to .env or ensure API returns payment_gateway.key_id");
            }

            successUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/training-payment/training-pay-success`;

            successPayloadBuilder = (response) => ({
                razorpay_payment_id: response.razorpay_payment_id,
                product_id: reg.training_id?.toString() || trainingInfo.id?.toString(),
                totalAmount: amount.toString(),
                registration_no: initialData.registration_no || registrationNo,
                registration_id: reg.id?.toString(),
                training_id: reg.training_id?.toString() || trainingInfo.id?.toString(),
                currency_code: currency
            });

        } else {
            // Existing Course Logic
            const { registration, course, payment_gateway } = initialData;
            amount = registration.amount;
            currency = registration.currency_code;
            name = course.title;
            applicantName = registration.name || "";
            email = registration.email;
            contact = registration.phone_number;
            description = "Course Registration Fee";
            key_id = payment_gateway.key_id;

            successUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/EducationAndInternship/Website/payment/pay-success`;

            successPayloadBuilder = (response) => ({
                razorpay_payment_id: response.razorpay_payment_id,
                product_id: registration.course_id,
                totalAmount: registration.amount,
                registration_number: registrationNo
            });
        }

        const options = {
            key: key_id,
            amount: amount * 100, // Amount in paise
            currency: currency,
            name: name,
            description: description,
            image: "https://sifs.in/images/sifs-logo.png", // Updated logo placeholder
            handler: async function (response: any) {
                console.log("Razorpay Payment Response:", response);

                try {
                    const payload = successPayloadBuilder(response);
                    console.log("Payment Success Payload:", payload);

                    const apiResponse = await fetch(successUrl, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });

                    const result = await apiResponse.json();
                    console.log("Payment Verification API Response:", result);

                    if (apiResponse.ok && result.success) {
                        console.log("Payment Verification Success:", result);
                        setIsPaymentSuccess(true);

                        // Redirect based on type
                        if (type === 'training') {
                            const trainingSlug = initialData.training?.slug;
                            if (trainingSlug) {
                                router.push(`/training-details/${trainingSlug}`);
                            } else {
                                // Fallback if slug is missing
                                router.push('/');
                            }
                        } else {
                            // Default to course
                            const courseSlug = initialData.course?.slug || initialData.course_slug;
                            if (courseSlug) {
                                router.push(`/course-details/${courseSlug}`);
                            } else {
                                // Fallback if slug is missing
                                router.push('/');
                            }
                        }
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
                        Redirecting to {type === 'training' ? 'Training' : 'Course'} details...
                    </p>
                </div>
            </div>
        );
    }

    // Safely extract data based on type - handle multiple possible structures
    let registration, courseOrTraining, displayTitle, displayRegNo;

    console.log("Initial Data Structure:", initialData); // Debug log

    if (type === 'training') {
        // For training: { registration_no, training_registration, training, payment_amount, currency_code }
        registration = initialData.training_registration || {};
        courseOrTraining = initialData.training || {};

        // Add amount and currency to registration for display
        registration.amount = initialData.payment_amount;
        registration.currency_code = initialData.currency_code;
        registration.registration_number = initialData.registration_no;
    } else {
        // For course
        registration = initialData.registration || initialData;
        courseOrTraining = initialData.course || { title: "Course" };
    }

    displayTitle = courseOrTraining?.title || "Training/Course";
    displayRegNo = registration?.registration_number || registrationNo || "N/A";

    console.log("Extracted Data:", {
        registration,
        courseOrTraining,
        displayTitle,
        displayRegNo,
        amount: registration?.amount,
        currency: registration?.currency_code
    }); // Debug log

    return (
        <div className="min-h-screen bg-[#F8F9FB] py-20 px-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gray-900 p-8 text-white text-center">
                        <h1 className="text-2xl font-bold mb-2">Complete Your Payment</h1>
                        <p className="text-gray-400">Registration # {displayRegNo}</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    {type === 'training' ? 'Training' : 'Course'}
                                </p>
                                <p className="font-bold text-gray-900 text-lg">{displayTitle}</p>
                            </div>

                            {registration?.level && (
                                <div className="flex justify-between items-center py-4 border-t border-gray-100">
                                    <span className="text-gray-600">Level</span>
                                    <span className="font-medium text-gray-900">{registration.level}</span>
                                </div>
                            )}

                            {registration?.name && (
                                <div className="flex justify-between items-center py-4 border-t border-gray-100">
                                    <span className="text-gray-600">Applicant</span>
                                    <span className="font-medium text-gray-900">{registration.name}</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                            <div className="flex justify-between items-end">
                                <span className="text-indigo-900 font-semibold">Total Amount</span>
                                <span className="text-3xl font-bold text-indigo-700">
                                    {(() => {
                                        console.log("Amount Display:", {
                                            amount: registration?.amount,
                                            currency: registration?.currency_code,
                                            registration
                                        });

                                        if (registration?.amount && registration?.currency_code) {
                                            return new Intl.NumberFormat('en-IN', {
                                                style: 'currency',
                                                currency: registration.currency_code
                                            }).format(registration.amount);
                                        }
                                        return 'N/A';
                                    })()}
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
