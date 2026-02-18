'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface AnnouncementPopupProps {
    status: any;
    image: string;
    delay: string;
    baseUrl: string;
}

const AnnouncementPopup = ({ status, image, delay, baseUrl }: AnnouncementPopupProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const numericStatus = Number(status);
        if (numericStatus === 1 && image) {
            const delayMs = (parseFloat(delay) || 2) * 1000;
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, delayMs);
            return () => clearTimeout(timer);
        }
    }, [status, image, delay]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (Number(status) !== 1 || !image) return null;

    const fullImageUrl = `${baseUrl}/uploads/Education-And-Internship-Admin-Announcement/${image}`;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:scale-110 active:scale-95"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Image Content */}
                        <div className="relative aspect-auto w-full max-h-[80vh] overflow-hidden">
                            <Image
                                src={fullImageUrl}
                                alt="Announcement"
                                width={800}
                                height={1000}
                                className="h-auto w-full object-contain"
                                priority
                                unoptimized={true} // Since it's from a dynamic external path
                            />
                        </div>

                        {/* Interactive Overlay for accessibility/UX */}
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementPopup;
