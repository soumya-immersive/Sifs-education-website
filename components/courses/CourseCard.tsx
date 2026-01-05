"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Course } from "../../types/courses-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

/* ---------------- Animations ---------------- */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface CourseCardProps {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
  onDelete?: () => void;
  realm?: "courses" | "internships" | "training";
}

export default function CourseCard({
  course,
  editMode,
  onUpdate,
  onDelete,
  realm = "courses"
}: CourseCardProps) {
  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!editMode ? { y: -6 } : {}}
      className={`
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition p-4 flex flex-col h-full relative group
        ${editMode ? 'border-dashed border-blue-300' : ''}
      `}
    >
      {editMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }}
          className="absolute -top-2 -right-2 z-30 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete Course"
        >
          <Trash2 size={14} />
        </button>
      )}
      {/* IMAGE */}
      <div className="relative h-44 rounded-t-xl overflow-hidden mb-4">
        <EditableImage
          src={course.image || "/courses/course1.png"}
          alt={stripHtml(course.title)}
          editMode={!!editMode}
          onChange={(val: string) => onUpdate?.({ image: val })}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-[#D08522] font-medium mb-1 uppercase tracking-tight">
          <EditableText
            html={course.courseCode}
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ courseCode: val })}
          />
        </div>

        <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg min-h-[3rem]">
          <EditableText
            html={course.title}
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ title: val })}
          />
        </h3>

        <div className="text-sm text-[#6B7385] mb-6 line-clamp-3 flex-grow">
          <EditableText
            html={course.overview}
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ overview: val })}
          />
        </div>

        {editMode && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Skill Level:</span>
              <select
                value={course.skillLevel || "level1"}
                onChange={(e) => onUpdate?.({ skillLevel: e.target.value as any })}
                className="text-xs font-bold text-indigo-600 bg-transparent outline-none cursor-pointer"
              >
                <option value="level1">Level 1</option>
                <option value="level2">Level 2</option>
                <option value="level3">Level 3</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration (Hrs):</span>
              <input
                type="number"
                value={course.durationHours || 0}
                onChange={(e) => onUpdate?.({ durationHours: parseInt(e.target.value) || 0 })}
                className="text-xs font-bold text-indigo-600 bg-transparent outline-none w-12 text-right"
              />
            </div>
            <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Course Slug:</span>
              <input
                type="text"
                value={course.slug}
                onChange={(e) => onUpdate?.({ slug: e.target.value })}
                className="text-xs font-medium text-gray-600 bg-transparent outline-none border-b border-gray-200 focus:border-indigo-400"
                placeholder="course-slug-name"
              />
            </div>
          </div>
        )}

        <motion.div variants={buttonVariants} whileHover="hover" className="mt-auto">
          {editMode ? (
            <div className="w-full bg-gray-100 text-gray-400 px-6 py-3 rounded-lg text-sm font-medium text-center border-2 border-dashed border-gray-200 cursor-default">
              Navigation Disabled
            </div>
          ) : (
            <Link
              href={`/${realm}/${course.programSlug}/${course.slug}`}
              className="
                flex items-center justify-center w-full bg-gradient-to-r
                from-purple-500 to-indigo-600
                text-white px-8 py-3 rounded-lg
                text-sm font-medium transition-all hover:shadow-lg
              "
            >
              {realm === "courses" ? "Enroll Now →" : "Apply Now →"}
            </Link>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
