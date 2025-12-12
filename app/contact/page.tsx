"use client";

import { useState } from "react";
import PageBanner from "../../components/common/PageBanner";

export default function ContactPage() {
    const [form, setForm] = useState({
        first: "",
        email: "",
        mobile: "",
        subject: "",
        address: "",
        message: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full">
            <PageBanner
                title="Get in Touch"
                subtitle="Reference giving information on its origins, as well as a random Lipsum generator."
                bgImage="/contact-gradient-bg.png"
            />

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white rounded-2xl border">
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

                            {/* Button */}
                            <button className="mt-6 mb-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2">
                            Send Message →
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CONTACT DETAILS CARD */}
                    <div className="bg-white rounded-2xl border">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 px-8 py-3">
                            We are here to help you
                        </h2>
            
                        <div className="px-8 py-3">
                            <p className="font-semibold text-gray-900">CORP OFFICE</p>

                            {/* Address */}
                            <p className="text-sm text-gray-700 mt-2 flex items-start gap-2 leading-relaxed">
                            <img
                                src="/contact/1.png"
                                alt="Location"
                                className="w-5 h-5 mt-1"
                            />
                            A-14, Mahendru Enclave, Model Town Metro Station,<br />
                            Delhi-110033, India.
                            </p>

                            {/* Contact Rows */}
                            <div className="mt-6 space-y-4 text-sm">

                                {/* Education */}
                                <div className="flex gap-3">
                                    <img src="/contact/2.png" alt="Education" className="w-10 h-10" />
                                    <div className="text-gray-800">
                                        <p className="font-medium">Education</p>
                                        <p>+91-730-391-3002, +91-11-470-74263</p>
                                        <p className="text-gray-600">education@sifs.in</p>
                                    </div>
                                </div>

                                {/* Training */}
                                <div className="flex gap-3">
                                    <img src="/contact/3.png" alt="Training" className="w-10 h-10" />
                                    <div className="text-gray-800">
                                        <p className="font-medium">Training</p>
                                        <p>+91-730-391-3003, +91-11-470-74263</p>
                                        <p className="text-gray-600">training@sifs.in</p>
                                    </div>
                                </div>

                                {/* Internship */}
                                <div className="flex gap-3">
                                    <img src="/contact/4.png" alt="Internship" className="w-10 h-10" />
                                    <div className="text-gray-800">
                                        <p className="font-medium">Internship</p>
                                        <p>+91-858-887-7002, +91-11-470-74263</p>
                                        <p className="text-gray-600">info@sifs.in</p>
                                    </div>
                                </div>

                                {/* Workshop */}
                                <div className="flex gap-3">
                                    <img src="/contact/5.png" alt="Workshop" className="w-10 h-10" />
                                    <div className="text-gray-800">
                                        <p className="font-medium">Workshop</p>
                                        <p>+91-730-391-3002, +91-11-470-74263</p>
                                        <p className="text-gray-600">info@sifs.in</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="font-semibold text-gray-900 mt-12 mb-3">International Associates</h3>

                <div className="flex gap-2 flex-wrap">
                    <span className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800">
                        Lucknow
                    </span>
                </div>

                <h3 className="font-semibold text-gray-900 mt-10 mb-3">National Presence</h3>

                <div className="flex flex-wrap gap-2">
                    {[
                        "Ahmedabad", "Amritsar", "Bangalore", "Chandigarh", "Chennai",
                        "Dehradun", "Hyderabad", "Indore", "Jalandhar", "Kolkata",
                        "Kottayam", "Mumbai", "Pune City", "Pune Central", "Sahdol", "Udaipur"
                    ].map((city, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800"
                        >
                        {city}
                        </span>
                    ))}
                </div>
            </div>

            
        </div>
    
  );
}
