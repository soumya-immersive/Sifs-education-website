"use client";

import { Linkedin, Twitter } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Course } from "../../types/courses-page";

interface Props {
  course: Course;
}

/* ---------------- Animations ---------------- */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function CourseSidebar({ course }: Props) {
  const sidebar = course.sidebarData || {
    image: "/course/sidebar.png",
    includes: [],
    instructors: []
  };

  return (
    <motion.div
      className="sticky top-28 space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* COURSE INCLUDE */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden group"
      >
        <div className="relative h-56 overflow-hidden">
          <div className="w-full h-full relative">
            <Image
              src={sidebar.image || "/course/sidebar.png"}
              alt="Course Sidebar"
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
              Courses Include
            </div>
          </h3>

          <ul className="space-y-5">
            {(sidebar.includes || []).map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-indigo-50 transition-colors">
                    <div className="w-5 h-5 flex-shrink-0 relative">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-gray-600 font-medium">
                    <div dangerouslySetInnerHTML={{ __html: item.label }} />
                  </div>
                </div>

                <div
                  className={
                    item.highlight
                      ? "font-bold text-indigo-600 text-lg transition-transform group-hover/item:scale-110"
                      : "text-gray-900 font-semibold"
                  }
                >
                  <div dangerouslySetInnerHTML={{ __html: item.value }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* INSTRUCTORS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
      >
        <div className="p-6 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full" />
            Instructors
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {(sidebar.instructors || []).map((inst, index) => (
            <div key={index} className="relative group/inst">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <div className="w-full h-full relative">
                    <Image
                      src={inst.image}
                      alt={inst.name}
                      fill
                      className="w-full h-full rounded-2xl object-cover ring-2 ring-transparent group-hover/inst:ring-indigo-200 transition-all"
                    />
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="mb-2">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      <div dangerouslySetInnerHTML={{ __html: inst.name }} />
                    </p>
                    <p className="text-xs text-gray-500 font-medium truncate">
                      <div dangerouslySetInnerHTML={{ __html: inst.role }} />
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-1.5 min-w-[100px]">
                      <Linkedin className={`w-3.5 h-3.5 transition-colors ${inst.linkedin ? 'text-indigo-600' : ''}`} />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[100px]">
                      <Twitter className={`w-3.5 h-3.5 transition-colors ${inst.twitter ? 'text-sky-500' : ''}`} />
                    </div>
                  </div>
                </div>
              </div>
              {index < sidebar.instructors.length - 1 && (
                <div className="mt-6 border-t border-gray-100" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ASK QUERY */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
      >
        <div className="p-6 bg-indigo-600 text-white">
          <h3 className="text-lg font-bold">Ask Your Query</h3>
          <p className="text-xs text-white/80 mt-1">Get in touch with our experts</p>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <input
              className="w-full border border-gray-200 bg-gray-50 text-black rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="Full Name"
            />
            <input
              className="w-full border border-gray-200 bg-gray-50 text-black rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="Mobile Number"
            />
            <input
              className="w-full border border-gray-200 bg-gray-50 text-black rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
              placeholder="Email Address"
            />
            <textarea
              rows={4}
              className="w-full border border-gray-200 bg-gray-50 text-black rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 resize-none"
              placeholder="Your Message..."
            />
          </div>
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all cursor-pointer">
            Send Message →
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
