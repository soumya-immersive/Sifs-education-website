"use client";

import { motion } from "framer-motion";
// import { Event } from "../../data/events"; 

interface Props {
  event: any;
}

export default function EventContent({ event }: Props) {
  // Handle HTML content safely
  const descriptionHtml = event.description || "";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {event.title}
      </h2>

      <div className="max-w-none prose prose-indigo text-gray-500 leading-relaxed text-md font-normal">
        {/* Render HTML content safely if description contains HTML tags (API usually returns HTML) */}
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
      </div>
    </motion.section>
  );
}