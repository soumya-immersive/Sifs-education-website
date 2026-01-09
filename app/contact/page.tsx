"use client";

import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { Search, X } from "lucide-react";
import PageBanner from "../../components/common/PageBanner";
import { CONTACT_PAGE_INITIAL_DATA } from "../../lib/data/contact-page-data";

export default function ContactPage(props: { params: Promise<any>; searchParams: Promise<any> }) {
    const params = React.use(props.params);
    const searchParams = React.use(props.searchParams);

    const data = CONTACT_PAGE_INITIAL_DATA;

    const [form, setForm] = useState({
        first: "",
        email: "",
        mobile: "",
        subject: "",
        address: "",
        message: "",
    });

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Filter cities based on search
    const filteredCities = data.nationalPresence.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredInternational = data.internationalAssociates.locations.filter(loc =>
        loc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Animations
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    const staggerContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
    };

    return (
        <motion.div
            className="w-full mb-12"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
        >
            <Toaster position="top-right" />

            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title={data.banner.title}
                    subtitle={data.banner.subtitle}
                    bgImage={data.banner.bgImage}
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
                            <div dangerouslySetInnerHTML={{ __html: data.formSection.title }} />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-3">
                            {data.formSection.fields.slice(0, 4).map((field, index) => (
                                <input
                                    key={index}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange}
                                    className="border rounded-lg p-3 text-sm text-gray-800 placeholder-gray-400"
                                />
                            ))}
                        </div>

                        <div className="px-8 py-3">
                            {data.formSection.fields.slice(4).map((field, index) => (
                                <textarea
                                    key={index}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange}
                                    rows={field.rows || 3}
                                    className="w-full border rounded-lg p-3 text-sm mt-4 text-gray-800 placeholder-gray-400"
                                />
                            ))}

                            <button className="mt-6 mb-6 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2">
                                {data.formSection.buttonText}
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT INFO CARD */}
                    <motion.div className="bg-white rounded-2xl border" variants={fadeUp}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 px-8 py-3">
                            <div dangerouslySetInnerHTML={{ __html: data.infoSection.title }} />
                        </h2>

                        <div className="px-8 py-3">
                            <div className="font-semibold text-gray-900">
                                <div dangerouslySetInnerHTML={{ __html: data.infoSection.officeTitle }} className="inline" />
                            </div>

                            <div className="text-sm text-gray-700 mt-2 flex items-start gap-2 leading-relaxed">
                                <img
                                    src={data.infoSection.officeAddress.icon}
                                    alt="Location"
                                    className="w-5 h-5 mt-1"
                                />
                                <div>
                                    {data.infoSection.officeAddress.lines.map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            {i < data.infoSection.officeAddress.lines.length - 1 && <br />}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CONTACT DEPARTMENTS */}
                            <div className="mt-6 space-y-4 text-sm">
                                {data.infoSection.departments.map((dept) => (
                                    <div key={dept.id} className="flex gap-3 relative group">
                                        <img
                                            src={dept.icon}
                                            alt={dept.title}
                                            className="w-10 h-10"
                                        />
                                        <div className="text-gray-800 flex-1">
                                            <p className="font-medium">
                                                {dept.title}
                                            </p>
                                            {dept.phones.map((phone, phoneIdx) => (
                                                <div key={phoneIdx} className="flex items-center gap-2">
                                                    <p>{phone}{phoneIdx < dept.phones.length - 1 && ','}</p>
                                                </div>
                                            ))}
                                            <p className="text-gray-600">
                                                {dept.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* SEARCH BAR */}
                {(searchTerm || filteredInternational.length > 0 || filteredCities.length > 0) && (
                    <motion.div variants={fadeUp} className="mt-8">
                        <div className="flex items-center gap-3 max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search locations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* INTERNATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-12">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                            <div dangerouslySetInnerHTML={{ __html: data.internationalAssociates.title }} className="inline" />
                        </h3>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {filteredInternational.map((loc) => (
                            <span
                                key={loc.id}
                                className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800 relative group"
                            >
                                {loc.name}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* NATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-10">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                            <div dangerouslySetInnerHTML={{ __html: data.nationalPresence.title }} className="inline" />
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filteredCities.map((city) => (
                            <span
                                key={city.id}
                                className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800 relative group"
                            >
                                {city.name}
                            </span>
                        ))}
                    </div>
                    {searchTerm && filteredCities.length === 0 && (
                        <p className="text-sm text-gray-500 mt-4">No cities found matching "{searchTerm}"</p>
                    )}
                </motion.div>

            </div>
        </motion.div>
    );
}
