"use client";

import { motion, Variants } from "framer-motion";
import { Course } from "../../types/courses-page";
import { Info, Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function CourseInfo({ course, editMode, onUpdate }: Props) {
  const handlePartChange = (index: number, val: string) => {
    const updatedParts = [...(course.descriptionParts || [])];
    updatedParts[index] = val;
    onUpdate?.({ descriptionParts: updatedParts });
  };

  const addPart = () => {
    const updatedParts = [...(course.descriptionParts || []), "New paragraph content here..."];
    onUpdate?.({ descriptionParts: updatedParts });
  };

  const removePart = (index: number) => {
    const updatedParts = (course.descriptionParts || []).filter((_, i) => i !== index);
    onUpdate?.({ descriptionParts: updatedParts });
  };

  return (
    <motion.div
      className="bg-white relative mt-12"
      variants={container}
      initial={editMode ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-100">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              <EditableText
                html={course.aboutTitle || "About this Course"}
                editMode={!!editMode}
                onChange={(val) => onUpdate?.({ aboutTitle: val })}
              />
            </h2>
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest mt-1">
              <EditableText
                html={course.aboutSubtitle || "Information & Overview"}
                editMode={!!editMode}
                onChange={(val) => onUpdate?.({ aboutSubtitle: val })}
              />
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="block font-bold text-sm text-blue-600 uppercase tracking-tighter">
            <EditableText
              html={course.editionLabel || "2025 Edition"}
              editMode={!!editMode}
              onChange={(val) => onUpdate?.({ editionLabel: val })}
            />
          </span>
          <span className="text-[10px] font-black text-gray-400 block uppercase tracking-widest">
            <EditableText
              html={course.programLabel || "Professional Program"}
              editMode={!!editMode}
              onChange={(val) => onUpdate?.({ programLabel: val })}
            />
          </span>
        </div>
      </motion.div>

      {/* Description / Overview */}
      <motion.div
        className="space-y-6"
        variants={container}
      >
        <motion.div variants={fadeUp} className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-6 py-1 bg-blue-50/30 rounded-r-xl">
          <EditableText
            html={course.overview}
            editMode={!!editMode}
            onChange={(val) => onUpdate?.({ overview: val })}
          />
        </motion.div>

        <div className="space-y-6">
          {(course.descriptionParts || []).map((part, index) => (
            <motion.div key={index} variants={fadeUp} className="relative group pr-8">
              <div className="text-base text-gray-600 leading-relaxed text-justify">
                <EditableText
                  html={part}
                  editMode={!!editMode}
                  onChange={(val) => handlePartChange(index, val)}
                />
              </div>
              {editMode && (
                <button
                  onClick={() => removePart(index)}
                  className="absolute right-0 top-0 p-1 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Paragraph"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </motion.div>
          ))}

          {editMode && (
            <motion.button
              variants={fadeUp}
              onClick={addPart}
              className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700 transition px-4 py-2 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"
            >
              <Plus size={16} />
              Add Paragraph
            </motion.button>
          )}
        </div>

        <motion.div
          variants={fadeUp}
          className="p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 italic text-gray-500 text-sm mt-10 relative"
        >
          <span className="absolute -top-3 left-6 px-3 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest">Note</span>
          * This program is part of the SIFS India standard training series and matches
          the requirements for professional certification in forensic sciences.
        </motion.div>
      </motion.div>
    </motion.div>
  );
}