"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DownloadCertificate() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-bold text-[#0B1221] sm:text-3xl tracking-wide uppercase">
                        DOWNLOAD YOUR CERTIFICATE
                    </h2>

                    <div className="mx-auto mt-4 flex justify-center gap-1">
                        <div className="h-1 w-2 bg-[#FF3B5C] rounded-full"></div>
                        <div className="h-1 w-12 bg-[#FF3B5C] rounded-full"></div>
                    </div>

                    <p className="mx-auto mt-6 max-w-2xl text-gray-500">
                        Hey you've done great job! Here you can download your certificate of achievement.
                    </p>

                    <div className="mt-8">
                        <Link href="/certificate-download" className="inline-block rounded-full bg-[#FF3B5C] px-8 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl uppercase tracking-wider">
                            DOWNLOAD CERTIFICATE
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
