"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Course } from "../../types/courses-page";
import EditableText from "../editable/EditableText";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
}

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function CourseHighlights({ course, editMode, onUpdate }: Props) {
  const handleHighlightChange = (index: number, val: string) => {
    const updatedHighlights = [...(course.highlights || [])];
    updatedHighlights[index] = val;
    onUpdate?.({ highlights: updatedHighlights });
  };

  const addHighlight = () => {
    const updatedHighlights = [...(course.highlights || []), "New Course Highlight..."];
    onUpdate?.({ highlights: updatedHighlights });
  };

  const removeHighlight = (index: number) => {
    const updatedHighlights = (course.highlights || []).filter((_, i) => i !== index);
    onUpdate?.({ highlights: updatedHighlights });
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
      variants={container}
      initial={editMode ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* Title */}
      <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-yellow-500 rounded-full" />
          Course Highlights
        </h3>
        {editMode && (
          <button
            onClick={addHighlight}
            className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:text-indigo-700 transition px-3 py-1.5 bg-indigo-50 rounded-lg"
          >
            <Plus size={14} />
            Add Highlight
          </button>
        )}
      </motion.div>

      {/* List */}
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
      >
        {(course.highlights || []).map((item, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            className="flex items-start gap-3 bg-gray-50/50 p-3 rounded-xl border border-transparent hover:border-gray-200 transition-colors relative group"
          >
            <div className="mt-1 shrink-0">
              <Image
                src="/course/check-circle.png"
                alt=""
                width={18}
                height={18}
                className="opacity-80"
              />
            </div>
            <div className="text-sm text-gray-700 leading-snug flex-grow">
              <EditableText
                html={item}
                editMode={!!editMode}
                onChange={(val) => handleHighlightChange(index, val)}
              />
            </div>
            {editMode && (
              <button
                onClick={() => removeHighlight(index)}
                className="p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Highlight"
              >
                <Trash2 size={14} />
              </button>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
