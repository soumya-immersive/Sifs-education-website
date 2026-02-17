"use client";

import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import { API_BASE_URL, BASE_URL } from "@/lib/config";
import { Loader2, ChevronDown } from "lucide-react";
import { motion, easeOut, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import ContactPageSkeleton from "@/components/skeletons/ContactPageSkeleton";

const LocationItem = ({
    item,
    isOpen,
    onToggle
}: {
    item: any;
    isOpen: boolean;
    onToggle: () => void;
}) => {
    return (
        <div className="relative group/location">
            <button
                onClick={onToggle}
                className={`w-full px-5 py-4 bg-white border ${isOpen ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/20 translate-y-[-4px]' : 'border-gray-200'} rounded-xl text-left transition-all duration-300 hover:border-blue-400 group shadow-sm flex items-center justify-between gap-3`}
            >
                <span className={`text-[14px] font-bold ${isOpen ? 'text-blue-600' : 'text-gray-700'} transition-colors uppercase tracking-wide`}>
                    {item.title}
                </span>
                <div className={`p-1.5 rounded-lg ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'} group-hover:bg-blue-600 group-hover:text-white transition-all duration-300`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-20 left-0 right-0 mt-3 p-6 bg-white border border-blue-100 rounded-2xl shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/50 before:to-transparent before:pointer-events-none"
                    >
                        <style jsx global>{`
                            .location-details-container ul {
                                list-style: none !important;
                                padding: 0 !important;
                                margin: 0 !important;
                            }
                            .location-details-container li {
                                display: flex !important;
                                flex-direction: column !important;
                                gap: 12px !important;
                            }
                            .location-details-container p {
                                margin: 0 !important;
                                display: flex !important;
                                align-items: start !important;
                                gap: 15px !important;
                                font-size: 13.5px !important;
                                color: #374151 !important;
                                line-height: 1.6 !important;
                                padding: 6px 0 !important;
                            }
                            .location-details-container span.fa, 
                            .location-details-container span.far {
                                color: #2563eb !important;
                                font-size: 16px !important;
                                width: 22px !important;
                                height: 22px !important;
                                display: inline-flex !important;
                                align-items: center !important;
                                justify-content: center !important;
                                background: #eff6ff !important;
                                border-radius: 6px !important;
                                flex-shrink: 0 !important;
                                margin-top: 2px !important;
                            }
                        `}</style>
                        <div
                            className="location-details-container relative z-10"
                            dangerouslySetInnerHTML={{ __html: item.details }}
                        />
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center relative z-10">
                            <button
                                onClick={onToggle}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                            >
                                Close <span className="text-lg leading-none">×</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ContactPage() {
    const [form, setForm] = useState({
        first: "",
        email: "",
        mobile: "",
        subject: "",
        address: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState<string>("");
    const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });
    const [locations, setLocations] = useState<{ local: any[], international: any[] }>({ local: [], international: [] });
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [pageLoading, setPageLoading] = useState(true);
    const [activeLocationId, setActiveLocationId] = useState<number | null>(null);
    const [isPageEnabled, setIsPageEnabled] = useState(true);
    const [disabledMessage, setDisabledMessage] = useState("");

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/contact`);
                const result = await response.json();
                if (!result.success && result.message === "Contact section is disabled") {
                    setIsPageEnabled(false);
                    setDisabledMessage(result.message);
                }
            } catch (error) {
                console.error("Error fetching contact page data:", error);
            }
        };

        const fetchBanner = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
                const result = await response.json();
                if (result.success && result.data?.bs?.breadcrumb) {
                    setBreadcrumb(result.data.bs.breadcrumb);
                }
            } catch (error) {
                console.error("Error fetching banner:", error);
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/contact-locations`);
                const result = await response.json();
                if (result.success) {
                    setLocations(result.data);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            } finally {
                setLoadingLocations(false);
            }
        };

        const fetchData = async () => {
            await Promise.all([
                fetchPageData(),
                fetchBanner(),
                fetchLocations()
            ]);
            setPageLoading(false);
        };

        fetchData();
    }, []);

    if (pageLoading) {
        return <ContactPageSkeleton />;
    }

    const toggleLocation = (id: number) => {
        setActiveLocationId(activeLocationId === id ? null : id);
    };

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        // Basic validation
        if (!form.first || !form.email || !form.mobile || !form.message) {
            setStatus({ type: 'error', message: 'Please fill in all required fields.' });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front/sendmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.first,
                    email: form.email,
                    mobile: form.mobile,
                    address: form.address,
                    details: form.message, // Mapping message to details as per requirement
                    // Subject is not in the example payload, but might be useful if API supports it, 
                    // otherwise just sending standard fields.
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({ type: 'success', message: result.message || 'Contact query sent successfully!' });
                setForm({
                    first: "",
                    email: "",
                    mobile: "",
                    subject: "",
                    address: "",
                    message: "",
                });
            } else {
                setStatus({ type: 'error', message: result.message || 'Failed to send message.' });
            }
        } catch (error) {
            console.error(error);
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fade + Slide-up animation (TypeScript safe)
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut, // <-- FIXED
            },
        },
    };

    // ✅ Stagger container
    const staggerContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <motion.div
            className="w-full mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title="Get in Touch"
                    subtitle="Have questions? Our team is here to help you. Reach out to us for any inquiries regarding education, training, internships, or workshops."
                    bgImage="/contact-gradient-bg.png"
                />
            </motion.div>

            {/* MAIN BODY */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                {!isPageEnabled ? (
                    <motion.div
                        variants={fadeUp}
                        className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-12 md:p-20 text-center max-w-3xl mx-auto"
                    >
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{disabledMessage || "Section Disabled"}</h2>
                    </motion.div>
                ) : (
                    <>
                        {/* FORM + CONTACT INFO GRID */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-10"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* LEFT FORM CARD */}
                            <motion.div className="bg-white rounded-2xl border shadow-sm overflow-hidden" variants={fadeUp}>
                                <h2 className="text-xl font-semibold text-gray-900 px-8 py-5 border-b border-gray-100 bg-gray-50/50">
                                    Send us a Message
                                </h2>

                                <div className="p-8 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="first"
                                            placeholder="First name"
                                            value={form.first}
                                            onChange={handleChange}
                                            className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />

                                        <input
                                            type="text"
                                            name="mobile"
                                            placeholder="Mobile number"
                                            value={form.mobile}
                                            onChange={handleChange}
                                            className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />

                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>

                                    <textarea
                                        name="address"
                                        placeholder="Full Address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 text-sm h-20 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />

                                    <textarea
                                        name="message"
                                        placeholder="Write your message here..."
                                        value={form.message}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg p-3 text-sm h-28 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />

                                    {status.message && (
                                        <p className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                            {status.message}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-full md:w-auto bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:shadow-lg hover:shadow-blue-500/20 text-white px-8 py-3.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {loading ? 'Sending...' : 'Send Message'}
                                        {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                                    </button>
                                </div>
                            </motion.div>

                            {/* RIGHT INFO CARD */}
                            <motion.div className="bg-white rounded-2xl border shadow-sm overflow-hidden" variants={fadeUp}>
                                <h2 className="text-xl font-semibold text-gray-900 px-8 py-5 border-b border-gray-100 bg-gray-50/50">
                                    We are here to help you
                                </h2>

                                <div className="p-8 pt-6">
                                    <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-blue-100">
                                            <img src="/contact/1.png" alt="Location" className="w-6 h-6" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-bold text-gray-900 uppercase tracking-wider text-[11px] mb-1">CORP OFFICE</p>
                                            <p className="text-gray-700 leading-relaxed font-medium">
                                                A-14, Mahendru Enclave, Model Town Metro Station,<br />
                                                Delhi-110033, India.
                                            </p>
                                        </div>
                                    </div>

                                    {/* CONTACT ROWS */}
                                    <div className="space-y-5">
                                        {[
                                            { img: "/contact/2.png", title: "Education", phone: "+91-730-391-3002, +91-11-470-74263", email: "education@sifs.in" },
                                            { img: "/contact/3.png", title: "Training", phone: "+91-730-391-3003, +91-11-470-74263", email: "training@sifs.in" },
                                            { img: "/contact/4.png", title: "Internship", phone: "+91-858-887-7002, +91-11-470-74263", email: "info@sifs.in" },
                                            { img: "/contact/5.png", title: "Workshop", phone: "+91-730-391-3002, +91-11-470-74263", email: "info@sifs.in" },
                                        ].map((item, index) => (
                                            <div key={index} className="flex gap-4 items-start group">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors border border-gray-100 group-hover:border-blue-100 shadow-sm">
                                                    <img src={item.img} alt={item.title} className="w-7 h-7 object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900 text-base">{item.title}</p>
                                                    <div className="text-[13px] text-gray-600 mt-1 flex flex-wrap items-center gap-x-2">
                                                        {item.phone.split(',').map((p, i) => (
                                                            <span key={i} className="flex items-center gap-2">
                                                                <Link
                                                                    href={`tel:${p.trim().replace(/[-\s]/g, '')}`}
                                                                    className="hover:text-blue-600 transition-colors font-medium"
                                                                >
                                                                    {p.trim()}
                                                                </Link>
                                                                {i < item.phone.split(',').length - 1 && <span className="w-1 h-1 rounded-full bg-gray-300"></span>}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <Link
                                                        href={`mailto:${item.email}`}
                                                        className="text-[13px] text-gray-500 hover:text-blue-600 transition-colors block mt-0.5"
                                                    >
                                                        {item.email}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* INTERNATIONAL SECTION */}
                        <>
                            {(locations.international && locations.international.length > 0) && (
                                <motion.div variants={fadeUp} className="mt-16">
                                    <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-blue-600"></span>
                                        International Associates
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {locations.international.map((item) => (
                                            <LocationItem
                                                key={item.id}
                                                item={item}
                                                isOpen={activeLocationId === item.id}
                                                onToggle={() => toggleLocation(item.id)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* NATIONAL SECTION */}
                            {(locations.local && locations.local.length > 0) && (
                                <motion.div variants={fadeUp} className="mt-12">
                                    <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-3">
                                        <span className="w-8 h-[2px] bg-blue-600"></span>
                                        National Presence
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                        {locations.local.map((item) => (
                                            <LocationItem
                                                key={item.id}
                                                item={item}
                                                isOpen={activeLocationId === item.id}
                                                onToggle={() => toggleLocation(item.id)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </>
                    </>
                )}
            </div>

        </motion.div>
    );
}
