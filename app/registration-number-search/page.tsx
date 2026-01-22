"use client";

import { Search, FileCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Add navigation

export default function RegistrationSearchPage() {
    const [regNumber, setRegNumber] = useState("");
    const router = useRouter();

    const handleVerify = () => {
        if (regNumber.trim()) {
            // Logic to handle verification or navigation
            // For now, let's assume it might navigate to a dynamic route or just log
            console.log("Verifying registration number:", regNumber);

            // Since user mentioned dynamic routing, maybe they want to go to /upload-documents/[regNumber]?
            // But for now, keeping it simple as per the "set it up" request.
            // We can add navigation logic if confirmed. 
            // For example: router.push(`/admission/upload-documents/${encodeURIComponent(regNumber)}`);
        } else {
            alert("Please enter a registration number");
        }
    };

    return (
        <section className="relative bg-white pt-16 pb-24 px-4 overflow-hidden min-h-screen">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-indigo-50 rounded-full blur-3xl opacity-50" />

            <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0056B3] px-4 py-2 rounded-full mb-6">
                    <FileCheck className="w-4 h-4" />
                    <span className="text-sm font-semibold uppercase tracking-wider">Admission Portal 2025</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                    Document <span className="text-[#0056B3]">Verification</span>
                </h1>

                {/* Description */}
                <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
                    Please enter your unique registration number provided during your application to securely upload your educational and identity documents.
                </p>

                {/* Registration Search Bar */}
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-gray-100">
                        <div className="flex-1 relative flex items-center">
                            <Search className="absolute left-5 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Enter Registration Number (e.g. SIFS/2025/001)"
                                value={regNumber}
                                onChange={(e) => setRegNumber(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                className="w-full pl-14 pr-6 py-4 rounded-full border-none focus:ring-0 outline-none text-gray-700 text-lg placeholder:text-gray-300"
                            />
                        </div>
                        <button
                            onClick={handleVerify}
                            className="bg-[#0056B3] hover:bg-[#004494] text-white px-10 py-4 rounded-xl md:rounded-full font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 shrink-0"
                        >
                            VERIFY & PROCEED
                        </button>
                    </div>

                    {/* Quick Help */}
                    <p className="mt-4 text-sm text-gray-400">
                        Having trouble? <button className="text-[#0056B3] font-semibold underline underline-offset-4">Contact Support</button>
                    </p>
                </div>
            </div>
        </section>
    );
}
