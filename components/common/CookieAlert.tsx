'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';

interface CookieAlertProps {
    status: any;
    text: string;
    buttonText: string;
}

const CookieAlert = ({ status, text, buttonText }: CookieAlertProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const numericStatus = Number(status);
        if (numericStatus === 1) {
            const isAccepted = localStorage.getItem('cookieConsent');

            // If not accepted, show it
            if (isAccepted !== 'true') {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [status]);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (Number(status) !== 1) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 z-[99999] md:left-auto md:right-8 md:max-w-md"
                >
                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl dark:bg-black/95">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600">
                                    <Cookie className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cookie Notification</h3>
                                    <div
                                        className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300 [&>p]:mb-2 last:[&>p]:mb-0"
                                        dangerouslySetInnerHTML={{ __html: text || "Your experience on this site will be improved by allowing cookies." }}
                                    />
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
                                <button
                                    onClick={handleAccept}
                                    className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-indigo-700 active:scale-95"
                                >
                                    {buttonText || 'Allow Cookies'}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieAlert;
