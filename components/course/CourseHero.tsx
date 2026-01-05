"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import { Course } from "../../types/courses-page";
import EditableText from "../editable/EditableText";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface CourseHeroProps {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
}

export default function CourseHero({ course, editMode, onUpdate }: CourseHeroProps) {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${course.bannerImage || "/course/hero-bg.png"
          })`,
      }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />

      <motion.div
        className="relative max-w-7xl mx-auto px-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Course Code */}
        <motion.div
          variants={fadeUp}
          className="mb-4"
        >
          <span className="inline-block bg-[#FFE9CC] text-[#D97706] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <EditableText
              html={course.courseCode}
              editMode={false}
              onChange={(val) => onUpdate?.({ courseCode: val })}
            />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 max-w-4xl leading-tight"
        >
          <EditableText
            html={course.title}
            editMode={false}
            onChange={(val) => onUpdate?.({ title: val })}
          />
        </motion.h1>

        {/* Rating */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 mb-4"
        >
          <div className="flex text-yellow-500 scale-125 origin-left">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < Math.round(course.rating || 4.5) ? "currentColor" : "none"}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-gray-700 font-medium">
            <span className="text-lg">
              <EditableText
                html={String(course.rating || "4.5")}
                editMode={!!editMode}
                onChange={(val) => onUpdate?.({ rating: Number(val) || 4.5 })}
              />
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-sm">
              <EditableText
                html={String(course.reviewsCount || "1000")}
                editMode={!!editMode}
                onChange={(val) => onUpdate?.({ reviewsCount: Number(val) || 1000 })}
              />
              + Ratings
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
