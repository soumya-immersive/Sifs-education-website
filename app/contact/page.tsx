"use client";

import React, { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { Edit, Save, Loader2, Plus, Trash2, Search, X } from "lucide-react";
import PageBanner from "../../components/common/PageBanner";
import { useContactPageData } from "../../hooks/useContactPageData";
import EditableText from "../../components/editable/EditableText";
import EditableImage from "../../components/editable/EditableImage";
import { ContactDepartment, ContactLocation } from "../../types/contact-page";
import ConfirmationDialog from "../../components/common/ConfirmationDialog";

export default function ContactPage(props: { params: Promise<any>; searchParams: Promise<any> }) {
    const params = React.use(props.params);
    const searchParams = React.use(props.searchParams);

    const {
        data,
        updateSection,
        editMode,
        setEditMode,
        saveData,
        isLoaded
    } = useContactPageData();

    const [form, setForm] = useState({
        first: "",
        email: "",
        mobile: "",
        subject: "",
        address: "",
        message: "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActive, setFilterActive] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditClick = () => {
        setIsEditLoading(true);
        setEditMode(true);
        setIsEditLoading(false);
    };

    const handleSaveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSave = async () => {
        setIsSaving(true);
        const success = await saveData();
        setTimeout(() => {
            if (success) {
                setEditMode(false);
                toast.success("✅ Contact page updated successfully");
            } else {
                toast.error("❌ Failed to save changes");
            }
            setIsSaving(false);
            setShowConfirmation(false);
        }, 800);
    };

    // Department management
    const addDepartment = () => {
        const newDept: ContactDepartment = {
            id: `dept-${Date.now()}`,
            icon: "/contact/2.png",
            title: "New Department",
            phones: ["+91-XXX-XXX-XXXX"],
            email: "new@sifs.in"
        };
        updateSection("infoSection", {
            ...data.infoSection,
            departments: [...data.infoSection.departments, newDept]
        });
        toast.success("✨ New department added");
    };

    const removeDepartment = (id: string) => {
        if (confirm("Remove this department?")) {
            updateSection("infoSection", {
                ...data.infoSection,
                departments: data.infoSection.departments.filter(d => d.id !== id)
            });
            toast.success("🗑️ Department removed");
        }
    };

    const updateDepartment = (id: string, updates: Partial<ContactDepartment>) => {
        updateSection("infoSection", {
            ...data.infoSection,
            departments: data.infoSection.departments.map(d =>
                d.id === id ? { ...d, ...updates } : d
            )
        });
    };

    const addPhone = (deptId: string) => {
        const dept = data.infoSection.departments.find(d => d.id === deptId);
        if (dept) {
            updateDepartment(deptId, { phones: [...dept.phones, "+91-XXX-XXX-XXXX"] });
        }
    };

    const updatePhone = (deptId: string, phoneIndex: number, value: string) => {
        const dept = data.infoSection.departments.find(d => d.id === deptId);
        if (dept) {
            const newPhones = [...dept.phones];
            newPhones[phoneIndex] = value;
            updateDepartment(deptId, { phones: newPhones });
        }
    };

    const removePhone = (deptId: string, phoneIndex: number) => {
        const dept = data.infoSection.departments.find(d => d.id === deptId);
        if (dept && dept.phones.length > 1) {
            updateDepartment(deptId, { phones: dept.phones.filter((_, i) => i !== phoneIndex) });
        }
    };

    // Location management
    const addLocation = (type: 'international' | 'national') => {
        const newLocation: ContactLocation = {
            id: `loc-${Date.now()}`,
            name: "New Location"
        };

        if (type === 'international') {
            updateSection("internationalAssociates", {
                ...data.internationalAssociates,
                locations: [...data.internationalAssociates.locations, newLocation]
            });
        } else {
            updateSection("nationalPresence", {
                ...data.nationalPresence,
                cities: [...data.nationalPresence.cities, newLocation]
            });
        }
        toast.success("✨ Location added");
    };

    const removeLocation = (type: 'international' | 'national', id: string) => {
        if (type === 'international') {
            updateSection("internationalAssociates", {
                ...data.internationalAssociates,
                locations: data.internationalAssociates.locations.filter(l => l.id !== id)
            });
        } else {
            updateSection("nationalPresence", {
                ...data.nationalPresence,
                cities: data.nationalPresence.cities.filter(c => c.id !== id)
            });
        }
        toast.success("🗑️ Location removed");
    };

    const updateLocation = (type: 'international' | 'national', id: string, name: string) => {
        if (type === 'international') {
            updateSection("internationalAssociates", {
                ...data.internationalAssociates,
                locations: data.internationalAssociates.locations.map(l =>
                    l.id === id ? { ...l, name } : l
                )
            });
        } else {
            updateSection("nationalPresence", {
                ...data.nationalPresence,
                cities: data.nationalPresence.cities.map(c =>
                    c.id === id ? { ...c, name } : c
                )
            });
        }
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

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={handleConfirmSave}
                title="Save Changes"
                message="Are you sure you want to save all the changes made to this page? This action will update the content permanently."
                confirmText="Save Changes"
                cancelText="Cancel"
                type="success"
                isLoading={isSaving}
                requirePassword={true}
                username="admin@sifs.com"
                expectedPassword="admin123"
            />

            {/* Admin Controls */}
            <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
                {!editMode ? (
                    <button
                        onClick={handleEditClick}
                        disabled={isEditLoading}
                        className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isEditLoading ? <Loader2 size={18} className="animate-spin" /> : <Edit size={18} />}
                        {isEditLoading ? 'Loading...' : 'Edit Page'}
                    </button>
                ) : (
                    <button
                        onClick={handleSaveClick}
                        disabled={isSaving}
                        className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {/* TOP BANNER */}
            <motion.div variants={fadeUp}>
                <PageBanner
                    title={data.banner.title}
                    subtitle={data.banner.subtitle}
                    bgImage={data.banner.bgImage}
                    editMode={editMode}
                    onUpdate={(updated) => updateSection("banner", { ...data.banner, ...updated })}
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
                            <EditableText
                                html={data.formSection.title}
                                editMode={editMode}
                                onChange={(val) => updateSection("formSection", { ...data.formSection, title: val })}
                            />
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 py-3">
                            {data.formSection.fields.slice(0, 4).map((field, index) => (
                                <input
                                    key={index}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={editMode ? `Edit: ${field.placeholder}` : field.placeholder}
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
                                    placeholder={editMode ? `Edit: ${field.placeholder}` : field.placeholder}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange}
                                    rows={field.rows || 3}
                                    className="w-full border rounded-lg p-3 text-sm mt-4 text-gray-800 placeholder-gray-400"
                                />
                            ))}

                            <button className="mt-6 mb-6 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-6 py-3 rounded-lg text-sm flex items-center gap-2">
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={data.formSection.buttonText}
                                        onChange={(e) => updateSection("formSection", { ...data.formSection, buttonText: e.target.value })}
                                        className="bg-transparent border-b border-white/50 outline-none"
                                    />
                                ) : (
                                    data.formSection.buttonText
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* RIGHT INFO CARD */}
                    <motion.div className="bg-white rounded-2xl border" variants={fadeUp}>
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-300 px-8 py-3">
                            <EditableText
                                html={data.infoSection.title}
                                editMode={editMode}
                                onChange={(val) => updateSection("infoSection", { ...data.infoSection, title: val })}
                            />
                        </h2>

                        <div className="px-8 py-3">
                            <div className="font-semibold text-gray-900">
                                <EditableText
                                    html={data.infoSection.officeTitle}
                                    editMode={editMode}
                                    onChange={(val) => updateSection("infoSection", { ...data.infoSection, officeTitle: val })}
                                    className="inline"
                                />
                            </div>

                            <div className="text-sm text-gray-700 mt-2 flex items-start gap-2 leading-relaxed">
                                <EditableImage
                                    src={data.infoSection.officeAddress.icon}
                                    alt="Location"
                                    editMode={editMode}
                                    onChange={(val) => updateSection("infoSection", {
                                        ...data.infoSection,
                                        officeAddress: { ...data.infoSection.officeAddress, icon: val }
                                    })}
                                    className="w-5 h-5 mt-1"
                                />
                                {data.infoSection.officeAddress.lines.map((line, i) => (
                                    <span key={i}>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={line}
                                                onChange={(e) => {
                                                    const newLines = [...data.infoSection.officeAddress.lines];
                                                    newLines[i] = e.target.value;
                                                    updateSection("infoSection", {
                                                        ...data.infoSection,
                                                        officeAddress: { ...data.infoSection.officeAddress, lines: newLines }
                                                    });
                                                }}
                                                className="w-full px-2 py-1 border border-gray-300 rounded mb-1"
                                            />
                                        ) : (
                                            <>
                                                {line}
                                                {i < data.infoSection.officeAddress.lines.length - 1 && <br />}
                                            </>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {/* CONTACT DEPARTMENTS */}
                            <div className="mt-6 space-y-4 text-sm">
                                {data.infoSection.departments.map((dept) => (
                                    <div key={dept.id} className="flex gap-3 relative group">
                                        <EditableImage
                                            src={dept.icon}
                                            alt={dept.title}
                                            editMode={editMode}
                                            onChange={(val) => updateDepartment(dept.id, { icon: val })}
                                            className="w-10 h-10"
                                        />
                                        <div className="text-gray-800 flex-1">
                                            <p className="font-medium">
                                                {editMode ? (
                                                    <input
                                                        type="text"
                                                        value={dept.title}
                                                        onChange={(e) => updateDepartment(dept.id, { title: e.target.value })}
                                                        className="px-2 py-1 border border-gray-300 rounded w-full"
                                                    />
                                                ) : (
                                                    dept.title
                                                )}
                                            </p>
                                            {dept.phones.map((phone, phoneIdx) => (
                                                <div key={phoneIdx} className="flex items-center gap-2">
                                                    {editMode ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={phone}
                                                                onChange={(e) => updatePhone(dept.id, phoneIdx, e.target.value)}
                                                                className="px-2 py-1 border border-gray-300 rounded flex-1 text-xs"
                                                            />
                                                            {dept.phones.length > 1 && (
                                                                <button
                                                                    onClick={() => removePhone(dept.id, phoneIdx)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p>{phone}{phoneIdx < dept.phones.length - 1 && ','}</p>
                                                    )}
                                                </div>
                                            ))}
                                            {editMode && (
                                                <button
                                                    onClick={() => addPhone(dept.id)}
                                                    className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                                                >
                                                    + Add Phone
                                                </button>
                                            )}
                                            <p className="text-gray-600">
                                                {editMode ? (
                                                    <input
                                                        type="email"
                                                        value={dept.email}
                                                        onChange={(e) => updateDepartment(dept.id, { email: e.target.value })}
                                                        className="px-2 py-1 border border-gray-300 rounded w-full text-xs"
                                                    />
                                                ) : (
                                                    dept.email
                                                )}
                                            </p>
                                        </div>
                                        {editMode && (
                                            <button
                                                onClick={() => removeDepartment(dept.id)}
                                                className="absolute -right-2 -top-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {editMode && (
                                    <button
                                        onClick={addDepartment}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <Plus size={16} /> Add Department
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* SEARCH BAR (when not in edit mode) */}
                {!editMode && (searchTerm || filterActive) && (
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

                {editMode && (
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Tip:</strong> Use the search bar (visible to users) to filter locations. Add/remove locations using the buttons below.
                        </p>
                    </div>
                )}

                {/* INTERNATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-12">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                            <EditableText
                                html={data.internationalAssociates.title}
                                editMode={editMode}
                                onChange={(val) => updateSection("internationalAssociates", { ...data.internationalAssociates, title: val })}
                                className="inline"
                            />
                        </h3>
                        {editMode && (
                            <button
                                onClick={() => addLocation('international')}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Location
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {(editMode ? data.internationalAssociates.locations : filteredInternational).map((loc) => (
                            <span
                                key={loc.id}
                                className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800 relative group"
                            >
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={loc.name}
                                        onChange={(e) => updateLocation('international', loc.id, e.target.value)}
                                        className="bg-transparent border-b border-blue-300 outline-none min-w-[100px]"
                                    />
                                ) : (
                                    loc.name
                                )}
                                {editMode && (
                                    <button
                                        onClick={() => removeLocation('international', loc.id)}
                                        className="absolute -right-1 -top-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* NATIONAL SECTION */}
                <motion.div variants={fadeUp} className="mt-10">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">
                            <EditableText
                                html={data.nationalPresence.title}
                                editMode={editMode}
                                onChange={(val) => updateSection("nationalPresence", { ...data.nationalPresence, title: val })}
                                className="inline"
                            />
                        </h3>
                        {editMode && (
                            <button
                                onClick={() => addLocation('national')}
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                <Plus size={16} /> Add City
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(editMode ? data.nationalPresence.cities : filteredCities).map((city) => (
                            <span
                                key={city.id}
                                className="px-4 py-2 bg-[#e6f0ff] border rounded-sm text-sm text-gray-800 relative group"
                            >
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={city.name}
                                        onChange={(e) => updateLocation('national', city.id, e.target.value)}
                                        className="bg-transparent border-b border-blue-300 outline-none min-w-[100px]"
                                    />
                                ) : (
                                    city.name
                                )}
                                {editMode && (
                                    <button
                                        onClick={() => removeLocation('national', city.id)}
                                        className="absolute -right-1 -top-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>
                    {!editMode && searchTerm && filteredCities.length === 0 && (
                        <p className="text-sm text-gray-500 mt-4">No cities found matching "{searchTerm}"</p>
                    )}
                </motion.div>

            </div>
        </motion.div>
    );
}
