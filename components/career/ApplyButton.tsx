"use client";

import React from "react";
import { Mail } from "lucide-react";

interface ApplyButtonProps {
    email: string;
    title: string;
    isExpired: boolean;
}

export default function ApplyButton({ email, title, isExpired }: ApplyButtonProps) {
    if (isExpired) {
        return (
            <button
                disabled
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg bg-gray-400 cursor-not-allowed"
            >
                <Mail size={18} />
                Application Closed
            </button>
        );
    }

    return (
        <a
            href={`mailto:${email}?subject=Application for ${title}`}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:brightness-110 active:scale-95 bg-gradient-to-r from-[#4F65F1] to-[#9B66E4]"
        >
            <Mail size={18} />
            Apply Now By Email
        </a>
    );
}
