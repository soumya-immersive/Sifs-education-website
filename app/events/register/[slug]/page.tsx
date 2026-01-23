"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";

interface EventData {
    id: number;
    title: string;
    slug: string;
    date: string;
    location: string;
    price: string;
    image: string;
    mode: string;
}

export default function EventRegistrationPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const [slug, setSlug] = useState<string>("");
    const [event, setEvent] = useState<EventData | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        organization: "",
        email: "",
        mobile: "",
        country: "India",
        address: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        params.then((p) => setSlug(p.slug));
    }, [params]);

    useEffect(() => {
        if (slug) {
            fetchEventDetails();
        }
    }, [slug]);

    const fetchEventDetails = async () => {
        try {
            // Try new conference API first
            try {
                const newResponse = await fetch(
                    `${API_BASE_URL}/EducationAndInternship/Website/event/event-details/${slug}`,
                    { cache: "no-store" }
                );

                if (newResponse.ok) {
                    const newResult = await newResponse.json();
                    if (newResult.success && newResult.data?.event) {
                        const item = newResult.data.event;

                        // Extract price
                        let priceValue = "1,180.00";
                        if (item.int_price_level_1 && item.int_price_level_1 !== "00") {
                            priceValue = item.int_price_level_1.toString().replace(/[₹\s]/g, '');
                        } else if (item.price_level_1 && item.price_level_1 !== "00") {
                            priceValue = item.price_level_1.toString().replace(/[₹\s]/g, '');
                        }

                        setEvent({
                            id: item.id,
                            title: item.title.replace(/^"|"$/g, ''),
                            slug: item.slug,
                            date: item.formatted_date || "Date TBA",
                            location: item.mode_of_study || "Online",
                            price: priceValue,
                            image: item.image_url || "",
                            mode: item.mode_of_study || "Online",
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (newApiError) {
                console.log("New API failed, trying old API...");
            }

            // Fallback to old EventManagement API
            const response = await fetch(
                `${API_BASE_URL}/EventManagement/Website/events/${slug}`,
                { cache: "no-store" }
            );
            const result = await response.json();

            if (result.success && result.data?.event) {
                const item = result.data.event;
                const baseUrl = API_BASE_URL.replace("/api", "");
                let imageUrl = item.image || item.banner_image || "";
                if (imageUrl && !imageUrl.startsWith("http")) {
                    imageUrl = `${baseUrl}/uploads/events/${imageUrl}`;
                }

                // Extract price - check multiple possible fields
                let priceValue = "1,180.00";
                if (item.int_price_level_1) {
                    priceValue = item.int_price_level_1.toString().replace(/[₹\s]/g, '');
                } else if (item.price) {
                    priceValue = item.price.toString().replace(/[₹\s]/g, '');
                } else if (item.registration_fee) {
                    priceValue = item.registration_fee.toString().replace(/[₹\s]/g, '');
                }

                setEvent({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    date: item.formatted_start_date || "Date TBA",
                    location: item.location || "Online",
                    price: priceValue,
                    image: imageUrl,
                    mode: item.mode_of_study || "Online",
                });
            }
        } catch (error) {
            console.error("Error fetching event:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Add your API call here for event registration
            console.log("Registration Data:", { ...formData, eventId: event?.id });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Registration Successful!");
            router.push(`/events/${slug}`);
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
                    <button
                        onClick={() => router.push("/events")}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Go back to events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                            REGISTRATION FORM
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-red-300">HOME</span>
                            <span>/</span>
                            <span>REGISTER</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                            {/* Event Image */}
                            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                                {event.image && (
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                )}
                            </div>

                            {/* Event Info */}
                            <div className="p-6 space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">
                                    {event.title}
                                </h2>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Event Date</p>
                                            <p className="text-gray-600">{event.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Location</p>
                                            <p className="text-gray-600">{event.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-gray-700">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Registration Fee</p>
                                            <p className="text-gray-600">₹ {event.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                        Registration Closes
                                    </p>
                                    <p className="text-lg font-bold text-red-600">
                                        {event.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Registration Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Form Header */}
                            <div className="bg-white/10 backdrop-blur-sm px-8 py-6 border-b border-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-2xl">📧</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            Applicant Details
                                        </h2>
                                        <p className="text-blue-100 text-sm">
                                            Fill in your information to register
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                {/* Name as Printed on Certificate */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Name as Printed on Certificate
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-400"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Organization/Institution Name */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Organization/Institution Name
                                    </label>
                                    <input
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-400"
                                        placeholder="Enter organization name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Enter Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-400"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-400"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>

                                {/* Country Dropdown */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Country
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
                                    >
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Full Postal Address */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Full Postal Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg bg-white/95 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-400 resize-none"
                                        placeholder="Enter your complete address"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </span>
                                        ) : (
                                            "REGISTER NOW"
                                        )}
                                    </button>
                                </div>

                                {/* Info Text */}
                                <p className="text-center text-white/80 text-sm pt-2">
                                    By registering, you agree to our terms and conditions
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
