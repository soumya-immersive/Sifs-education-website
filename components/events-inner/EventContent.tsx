"use client";

import { motion } from "framer-motion";
<<<<<<< HEAD
import { Event } from "../../types/events-page";
import EditableText from "../editable/EditableText";
=======
// import { Event } from "../../data/events"; 
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

interface Props {
  event: any;
}

<<<<<<< HEAD
const EventContent = ({ event, editMode, onUpdate }: { event: Event, editMode: boolean, onUpdate: (updates: Partial<Event>) => void }) => {
=======
export default function EventContent({ event }: Props) {
  // Handle HTML content safely
  const descriptionHtml = event.description || "";

>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm"
    >
<<<<<<< HEAD
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        <EditableText
          html={event.title}
          editMode={editMode}
          onChange={(val) => onUpdate({ title: val })}
        />
      </h2>

      <div className="max-w-none">
        <div className="text-gray-500 leading-relaxed text-md font-normal">
          <EditableText
            html={event.description}
            editMode={editMode}
            onChange={(val) => onUpdate({ description: val })}
          />
        </div>
=======
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        {event.title}
      </h2>

      <div className="max-w-none prose prose-indigo text-gray-500 leading-relaxed text-md font-normal">
        {/* Render HTML content safely if description contains HTML tags (API usually returns HTML) */}
        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
      </div>
    </motion.section>
  );
}

export default EventContent;