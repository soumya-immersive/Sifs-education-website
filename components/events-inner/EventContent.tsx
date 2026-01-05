"use client";

import { motion } from "framer-motion";
import { Event } from "../../types/events-page";
import EditableText from "../editable/EditableText";

interface Props {
  event: Event;
}

const EventContent = ({ event, editMode, onUpdate }: { event: Event, editMode: boolean, onUpdate: (updates: Partial<Event>) => void }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl border border-gray-100 p-10 shadow-sm"
    >
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
      </div>
    </motion.section>
  );
}

export default EventContent;