"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, BookOpen, User, Phone, Mail, MapPin, Globe, CreditCard, ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/fetchUtils";
import { RegistrationFormResponse, RegistrationProcessResponse } from "@/types/book";

export default function BookRegistrationPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState<RegistrationFormResponse["data"] | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        post_code: "",
        country: "",
        term: "on",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchJSON<RegistrationFormResponse>(
                    `${API_BASE_URL}/EducationAndInternship/Website/book/register-for-book/${slug}`
                );
                if (res.success) {
                    setData(res.data);
                    setFormData(prev => ({
                        ...prev,
                        country: res.data.indiaLocation.country || "India"
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch registration form:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data?.book) return;

        setSubmitting(true);
        try {
            const payload = {
                book_id: data.book.id,
                name: formData.name,
                email: formData.email,
                phone_number: formData.phone_number,
                address: formData.address,
                city: formData.city,
                post_code: formData.post_code,
                country: formData.country,
                currency_code: "INR", // Default to INR as per example
                amount: parseFloat(data.book.price) || 0,
            };

            const res = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/book-payment/book-registrations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (result.success && result.data?.registration?.id) {
                // Redirect to the new book payment page
                router.push(`/book-payment?registration_id=${result.data.registration.id}`);
            } else {
                alert(result.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to process registration.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data?.book) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Book not found</h2>
                <button onClick={() => router.back()} className="text-blue-600 flex items-center gap-2">
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    const { book, countries } = data;

    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 pb-32">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
                >
                    <div className="p-2 bg-white rounded-full group-hover:bg-slate-100 shadow-sm transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="font-medium">Return to Details</span>
                </button>

                <div className="grid lg:grid-cols-5 gap-10">

                    {/* Form Side */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
                            <div className="bg-slate-900 px-8 py-10 text-white">
                                <h1 className="text-3xl font-bold mb-2">Book Order</h1>
                                <p className="text-slate-400">Complete your details to proceed to secure payment.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">

                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <User size={14} className="text-blue-500" /> Personal Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Full Name</label>
                                            <input
                                                required
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Phone Number</label>
                                            <div className="relative">
                                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    required
                                                    name="phone_number"
                                                    value={formData.phone_number}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                                    placeholder="Enter mobile number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                                placeholder="Enter email address"
                                            />
                                        </div>
                                    </div>


                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 ml-1">Street Address</label>
                                        <textarea
                                            required
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                            placeholder="Flat/House No., Colony/Street"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 ml-1">City</label>
                                            <input
                                                required
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                                placeholder="Enter city name"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-700 ml-1">Post Code</label>
                                            <input
                                                required
                                                name="post_code"
                                                value={formData.post_code}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
                                                placeholder="Enter pincode"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-700 ml-1">Country</label>
                                        <div className="relative">
                                            <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <select
                                                required
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer text-black"
                                            >
                                                {countries?.map((c) => (
                                                    <option key={c.id} value={c.name}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        disabled={submitting}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-100 disabled:opacity-70"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={18} />
                                                Proceed to Payment (₹{book.price})
                                            </>
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Book Summary Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-600" /> Order Summary
                            </h3>

                            <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                                <div className="relative w-20 h-28 flex-shrink-0">
                                    <Image
                                        src={book.image_url}
                                        alt={book.title}
                                        fill
                                        className="object-contain rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-snug mb-1 line-clamp-2">{book.title}</h4>
                                    <p className="text-xs text-gray-400 mb-2">By {book.author}</p>
                                    <div className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">
                                        {book.book_code}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-gray-900 font-semibold">₹{book.price}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-black pt-4 border-t border-dashed border-gray-200">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-blue-700">₹{book.price}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
