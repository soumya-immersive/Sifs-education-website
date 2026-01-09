"use client";

import { motion } from "framer-motion";
import { Event } from "../../types/events-page";

interface Props {
  event: Event;
}

const EventContent = ({ event }: Props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        <div dangerouslySetInnerHTML={{ __html: event.title }} />
      </h2>

      <div className="max-w-none">
        <div className="text-gray-500 leading-relaxed text-md font-normal">
          <div dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>
      </div>
    </motion.section>
  );
}

export default EventContent;