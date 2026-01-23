"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Phone,
    Video,
    ArrowLeft,
    ArrowRight,
    Play,
} from "lucide-react";

interface EventData {
    id: number;
    title: string;
    sub_title: string;
    slug: string;
    mode_of_study: string;
    video_url: string;
    video_id: string;
    image_url: string;
    price_level_1: string;
    int_price_level_1: string;
    call_for_assistance: string;
    duration: string;
    level: string | null;
    event_outline: string;
    case_studies: string;
    event_date: string;
    formatted_date: string;
    event_category_id: number;
}

interface Props {
    event: EventData;
}

export default function EventDetailClient({ event }: Props) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false);

    const getCategoryInfo = (categoryId: number) => {
        const categories: Record<number, { color: string; bg: string; label: string }> = {
            2: { color: "text-orange-600", bg: "bg-orange-100", label: "Workshop" },
            3: { color: "text-purple-600", bg: "bg-purple-100", label: "Webinar" },
            4: { color: "text-blue-600", bg: "bg-blue-100", label: "Conference" },
        };
        return categories[categoryId] || { color: "text-gray-600", bg: "bg-gray-100", label: "Event" };
    };

    const categoryInfo = getCategoryInfo(event.event_category_id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Events</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left: Event Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className={`inline-block ${categoryInfo.bg} ${categoryInfo.color} px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                                {categoryInfo.label}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                                {event.title.replace(/^"|"$/g, "")}
                            </h1>
                            <p className="text-xl text-blue-100 mb-6">{event.sub_title}</p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.formatted_date}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.mode_of_study}</span>
                                </div>
                                {event.duration && event.duration !== "00" && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.duration}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Right: Event Image/Video */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                                {showVideo && event.video_id ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${event.video_id}?autoplay=1`}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <>
                                        {/* Use YouTube thumbnail if video exists, otherwise use event image */}
                                        <Image
                                            src={
                                                event.video_id
                                                    ? `https://img.youtube.com/vi/${event.video_id}/maxresdefault.jpg`
                                                    : event.image_url
                                            }
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                        {event.video_id && (
                                            <button
                                                onClick={() => setShowVideo(true)}
                                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Play className="w-10 h-10 text-blue-600 ml-1" />
                                                </div>
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Outline */}
                        {event.event_outline && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                                    Event Overview
                                </h2>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: event.event_outline }}
                                />
                            </motion.div>
                        )}

                        {/* Case Studies / Organizing Committee */}
                        {event.case_studies && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-1 h-8 bg-purple-600 rounded-full"></div>
                                    Event Details
                                </h2>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: event.case_studies }}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Registration Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">Registration Details</h3>
                                    <p className="text-blue-100 text-sm">Join this amazing event</p>
                                </div>

                                <div className="p-6 space-y-4">
                                    {/* Price */}
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                        <div>
                                            <p className="text-sm text-gray-600">Registration Fee</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {event.int_price_level_1 && event.int_price_level_1 !== "00"
                                                    ? event.int_price_level_1
                                                    : event.price_level_1 && event.price_level_1 !== "00"
                                                        ? `₹${event.price_level_1}`
                                                        : "Free Registration"}
                                            </p>
                                        </div>
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>

                                    {/* Contact */}
                                    {event.call_for_assistance && (
                                        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-xs text-gray-600">Need Help?</p>
                                                <p className="font-semibold text-gray-900">{event.call_for_assistance}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Register Button */}
                                    <button
                                        onClick={() => router.push(`/events/register/${event.slug}`)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Register Now
                                        <ArrowRight className="w-5 h-5" />
                                    </button>

                                    {/* Info */}
                                    <p className="text-xs text-gray-500 text-center">
                                        Secure your spot for this exclusive event
                                    </p>
                                </div>
                            </motion.div>

                            {/* Quick Info Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-gray-600">Date</p>
                                            <p className="font-semibold text-gray-900">{event.formatted_date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-gray-600">Mode</p>
                                            <p className="font-semibold text-gray-900">{event.mode_of_study}</p>
                                        </div>
                                    </div>
                                    {event.duration && event.duration !== "00" && (
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600">Duration</p>
                                                <p className="font-semibold text-gray-900">{event.duration}</p>
                                            </div>
                                        </div>
                                    )}
                                    {event.level && (
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-gray-400" />
                                            <div>
                                                <p className="text-gray-600">Level</p>
                                                <p className="font-semibold text-gray-900">{event.level}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
