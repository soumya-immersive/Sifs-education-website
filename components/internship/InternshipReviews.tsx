"use client";

import { motion, Variants } from "framer-motion";
import { Star, User } from "lucide-react";
import { Internship } from "../../data/internships";

interface Props {
    internship: Internship;
}

/* ---------------- Animations ---------------- */

const container: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function InternshipReviews({ internship }: Props) {
    const reviews = internship.reviews || [];

    if (reviews.length === 0) return null;

    return (
        <motion.div
            className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mt-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">
                    Student Reviews ({reviews.length})
                </h3>
                <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-900">{internship.rating?.toFixed(1) || "4.8"}</span>
                    <span className="text-gray-500 text-sm">/ 5.0</span>
                </div>
            </div>

            <div className="space-y-8">
                {reviews.map((review: any) => (
                    <motion.div
                        key={review.id}
                        variants={fadeUp}
                        className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar Placeholder */}
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 text-indigo-600 font-bold">
                                {review.student_name ? review.student_name.charAt(0).toUpperCase() : <User size={20} />}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900">
                                        {review.student_name}
                                    </h4>
                                    {review.created_at && (
                                        <span className="text-xs text-gray-400">
                                            {new Date(review.created_at).toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    )}
                                </div>

                                <div className="flex text-yellow-400 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < (review.star || 0) ? "currentColor" : "none"}
                                            className={i < (review.star || 0) ? "" : "text-gray-300"}
                                        />
                                    ))}
                                </div>

                                <div
                                    className="prose prose-sm max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: review.review }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
