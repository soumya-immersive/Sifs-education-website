"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Clock, Timer, ShieldAlert, Mail, PhoneCall } from 'lucide-react';

interface MaintenanceViewProps {
    text: string;
    image: string;
}

const MaintenanceView: React.FC<MaintenanceViewProps> = ({ text, image }) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fbff] px-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl w-full text-center"
            >
                {image ? (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-10 relative mx-auto max-w-lg"
                    >
                        <div className="absolute -inset-10 bg-blue-500/5 blur-3xl rounded-full"></div>
                        <img
                            src={image}
                            alt="Maintenance"
                            className="w-full h-auto relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.05, 1] }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 flex justify-center"
                    >
                        <div className="p-10 rounded-[2.5rem] bg-white shadow-[0_20px_50px_rgba(59,130,246,0.1)] text-blue-600 relative border border-blue-50/50">
                            <div className="absolute inset-0 bg-blue-500/5 blur-2xl animate-pulse rounded-full"></div>
                            <Hammer size={72} className="relative z-10" />
                        </div>
                    </motion.div>
                )}

                <div className="space-y-8">
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold tracking-wider uppercase border border-blue-100/50 shadow-sm"
                    >
                        <Timer size={16} className="animate-[spin_4s_linear_infinite]" />
                        System Maintenance
                    </motion.div> */}

                    <div className="space-y-4">
                        {/* <h1 className="text-4xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight leading-tight">
                            We're <span className="text-blue-600 bg-clip-text">Redefining</span> <br className="hidden md:block" /> Your Experience
                        </h1> */}

                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                            {text || "We are currently updating our website to serve you better. We'll be back shortly with exciting new features and improvements!"}
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default MaintenanceView;
