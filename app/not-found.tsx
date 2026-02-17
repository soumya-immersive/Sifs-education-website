"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, MoveLeft, Ghost } from 'lucide-react';

export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-4 text-center bg-transparent">
            <div className="relative mb-6">
                <h1 className="text-[9rem] leading-none font-black text-gray-200 tracking-tighter select-none animate-pulse">
                    404
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Ghost className="w-24 h-24 text-blue-100 opacity-80" />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 mt-4">
                Something's missing.
            </h2>

            <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
                Sorry, we can't find that page. You'll find lots to explore on the home page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">


                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 w-full sm:w-auto group"
                >
                    <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}
