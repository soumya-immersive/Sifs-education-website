"use client";

import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";
import { motion, easeOut } from "framer-motion";
import { API_BASE_URL } from "@/lib/config";
import { Loader2 } from "lucide-react";

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
    const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });

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
                    subtitle="Reference giving information on its origins, as well as a random Lipsum generator."
                    bgImage="/contact-gradient-bg.png"
                />
            </motion.div>

            {/* MAIN BODY */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                {/* FORM + CONTACT INFO GRID */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* LEFT FORM CARD */}
                    <motion.div className="bg-white rounded-2xl border" variants={fadeUp}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 px-8 py-3">
                            Get in touch
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-3">
                            <input
                                type="text"
                                name="first"
                                placeholder="First name"
                                value={form.first}
                                onChange={handleChange}
                                className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400"
                            />

                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile number"
                                value={form.mobile}
                                onChange={handleChange}
                                className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400"
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        <div className="px-8 py-3">
                            <textarea
                                name="address"
                                placeholder="Full Address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 text-sm mt-4 h-20 text-gray-800 placeholder-gray-400"
                            />

                            <textarea
                                name="message"
                                placeholder="Message"
                                value={form.message}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 text-sm mt-4 h-28 text-gray-800 placeholder-gray-400"
                            />

                            {status.message && (
                                <p className={`mt-4 text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                    {status.message}
                                </p>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="mt-6 mb-6 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'Sending...' : 'Send Message →'}
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT INFO CARD */}
                    <motion.div className="bg-white rounded-2xl border" variants={fadeUp}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 px-8 py-3">
                            We are here to help you
                        </h2>

                        <div className="px-8 py-3">
                            <p className="font-semibold text-gray-900">CORP OFFICE</p>

                            <p className="text-sm text-gray-700 mt-2 flex items-start gap-2 leading-relaxed">
                                <img src="/contact/1.png" alt="Location" className="w-5 h-5 mt-1" />
                                A-14, Mahendru Enclave, Model Town Metro Station,<br />
                                Delhi-110033, India.
                            </p>

                            {/* CONTACT ROWS */}
                            <div className="mt-6 space-y-4 text-sm">
                                {[
                                    { img: "/contact/2.png", title: "Education", phone: "+91-730-391-3002, +91-11-470-74263", email: "education@sifs.in" },
                                    { img: "/contact/3.png", title: "Training", phone: "+91-730-391-3003, +91-11-470-74263", email: "training@sifs.in" },
                                    { img: "/contact/4.png", title: "Internship", phone: "+91-858-887-7002, +91-11-470-74263", email: "info@sifs.in" },
                                    { img: "/contact/5.png", title: "Workshop", phone: "+91-730-391-3002, +91-11-470-74263", email: "info@sifs.in" },
                                ].map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <img src={item.img} alt={item.title} className="w-10 h-10" />
                                        <div className="text-gray-800">
                                            <p className="font-medium">{item.title}</p>
                                            <p>{item.phone}</p>
                                            <p className="text-gray-600">{item.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* INTERNATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-12">
                    <h3 className="font-semibold text-gray-900 mb-3">International Associates</h3>
                    <div className="flex gap-2 flex-wrap">
                        <span className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800">
                            Lucknow
                        </span>
                    </div>
                </motion.div>

                {/* NATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-10">
                    <h3 className="font-semibold text-gray-900 mb-3">National Presence</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Ahmedabad", "Amritsar", "Bangalore", "Chandigarh", "Chennai",
                            "Dehradun", "Hyderabad", "Indore", "Jalandhar", "Kolkata",
                            "Kottayam", "Mumbai", "Pune City", "Pune Central", "Sahdol", "Udaipur"
                        ].map((city, i) => (
                            <span key={i} className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800">
                                {city}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}
