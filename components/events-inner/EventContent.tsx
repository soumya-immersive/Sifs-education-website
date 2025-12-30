"use client";

import { motion } from "framer-motion";
import { Event } from "../../data/events"; 

interface Props {
  event: Event;
}

export default function EventContent({ event }: Props) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {event.title}
      </h2>
      
      <div className="max-w-none">
        <p className="text-gray-500 leading-relaxed text-md font-normal">
          {event.description}
        </p>
      </div>
    </motion.section>
  );
}