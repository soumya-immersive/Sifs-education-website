"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Course } from "../../data/courses";

interface Props {
    course: Course;
    selectedLevel: 1 | 2 | 3;
    price: string;
    onClose: () => void;
}

export default function CourseRegistrationForm({ course, selectedLevel, price, onClose }: Props) {
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        email: "",
        dob: "",
        address: "",
        city: "",
        postalCode: "",
        country: "India",
        qualification: "",
        institution: "",
        gender: "",
        agreeToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic here (API call)
        console.log("Submitting Registration:", { ...formData, courseId: course.id, level: selectedLevel, price });
        alert("Registration Submitted Successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="bg-slate-50 relative w-full max-w-4xl rounded-xl shadow-2xl my-8 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-[#0056D2] text-white p-6 rounded-t-xl flex justify-between items-center shrink-0">
                    <h2 className="text-2xl font-bold">Course Registration Form</h2>
                    <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                        <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Register for Course</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Course Title :</label>
                                <div className="text-gray-900 font-semibold">{course.title}</div>
                            </div>

                            {/* Empty grid cell for spacing or other info if needed */}
                            <div></div>

                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Course Level :</label>
                                <div className="text-gray-900 font-semibold">Level-{selectedLevel === 1 ? "I" : selectedLevel === 2 ? "II" : "III"}</div>
                            </div>

                            <div>
                                <label className="block text-gray-600 font-medium mb-1">Course Price :</label>
                                <div className="text-gray-900 font-semibold">{price}</div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Full name as on certificate"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Contact Number</label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    required
                                    placeholder="Number with country code"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email for notification"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Full Postal Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Address for courier"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">City Name</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="City/District"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Postal Code */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    required
                                    placeholder="ZIP/PIN Code"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    placeholder="Country"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Qualification */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Qualification</label>
                                <input
                                    type="text"
                                    name="qualification"
                                    placeholder="Last Qualification"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Institution Name</label>
                                <input
                                    type="text"
                                    name="institution"
                                    placeholder="Present/Last Institution Name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.institution}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Gender */}
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" value="Male" onChange={handleChange} className="w-4 h-4 text-indigo-600" />
                                <span className="text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" value="Female" onChange={handleChange} className="w-4 h-4 text-indigo-600" />
                                <span className="text-gray-700">Female</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="gender" value="Others" onChange={handleChange} className="w-4 h-4 text-indigo-600" />
                                <span className="text-gray-700">Others</span>
                            </label>
                        </div>

                        {/* Terms */}
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    required
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="mt-1 w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                />
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p>I confirm that the details above are correct to my knowledge. Hereby, I agree to follow the guidelines of SIFS INDIA...</p>
                                    <p className="font-semibold text-gray-800">Terms and Conditions:</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Payment to be made in favor of "SIFS INDIA PVT LTD".</li>
                                        <li>Fee is not refundable once the course starts.</li>
                                    </ul>
                                </div>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                className="bg-[#0056D2] hover:bg-[#0044a6] text-white px-12 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                Register &gt;
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
