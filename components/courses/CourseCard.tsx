"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Course } from "../../types/courses-page";

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
  realm?: "courses" | "internships" | "training";
}

export default function CourseCard({
  course,
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
      whileHover={{ y: -6 }}
      className={`
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition p-4 flex flex-col h-full relative group
      `}
    >
      {/* IMAGE */}
      <div className="relative h-44 rounded-t-xl overflow-hidden mb-4">
        <div className="w-full h-full relative">
          <Image
            src={course.image || "/courses/course1.png"}
            alt={stripHtml(course.title)}
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-[#D08522] font-medium mb-1 uppercase tracking-tight">
          <div dangerouslySetInnerHTML={{ __html: course.courseCode }} />
        </div>

        <h3 className="font-bold text-gray-900 mb-2 leading-snug text-lg min-h-[3rem]">
          <div dangerouslySetInnerHTML={{ __html: course.title }} />
        </h3>

        <div className="text-sm text-[#6B7385] mb-6 line-clamp-3 flex-grow">
          <div dangerouslySetInnerHTML={{ __html: course.overview }} />
        </div>

        <motion.div variants={buttonVariants} whileHover="hover" className="mt-auto">
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
        </motion.div>
      </div>
    </motion.div>
  );
}
