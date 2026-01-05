"use client";

import { Linkedin, Twitter, Plus, Trash2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Course, SidebarIncludeItem, Instructor } from "../../types/courses-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

interface Props {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
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

export default function CourseSidebar({ course, editMode, onUpdate }: Props) {
  const sidebar = course.sidebarData || {
    image: "/course/sidebar.png",
    includes: [],
    instructors: []
  };

  const updateSidebar = (updatedSidebar: any) => {
    onUpdate?.({ sidebarData: { ...sidebar, ...updatedSidebar } });
  };

  const handleIncludeChange = (index: number, updatedItem: Partial<SidebarIncludeItem>) => {
    const updatedIncludes = [...(sidebar.includes || [])];
    updatedIncludes[index] = { ...updatedIncludes[index], ...updatedItem };
    updateSidebar({ includes: updatedIncludes });
  };

  const handleInstructorChange = (index: number, updatedInst: Partial<Instructor>) => {
    const updatedInstructors = [...(sidebar.instructors || [])];
    updatedInstructors[index] = { ...updatedInstructors[index], ...updatedInst };
    updateSidebar({ instructors: updatedInstructors });
  };

  const addInstructor = () => {
    const newInst: Instructor = {
      name: "New Instructor",
      role: "Role",
      image: "/course/ins1.png"
    };
    updateSidebar({ instructors: [...(sidebar.instructors || []), newInst] });
  };

  const removeInstructor = (index: number) => {
    const updatedInstructors = (sidebar.instructors || []).filter((_, i) => i !== index);
    updateSidebar({ instructors: updatedInstructors });
  };

  const addInclude = () => {
    const newItem: SidebarIncludeItem = {
      label: "New Feature",
      value: "Details",
      icon: "/course/icon1.png"
    };
    updateSidebar({ includes: [...(sidebar.includes || []), newItem] });
  };

  const removeInclude = (index: number) => {
    const updatedIncludes = (sidebar.includes || []).filter((_, i) => i !== index);
    updateSidebar({ includes: updatedIncludes });
  };

  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <motion.div
      className="sticky top-28 space-y-8"
      variants={containerVariants}
      initial={editMode ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {/* COURSE INCLUDE */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden group"
      >
        <div className="relative h-56 overflow-hidden">
          <EditableImage
            src={sidebar.image || "/course/sidebar.png"}
            alt="Course Sidebar"
            editMode={!!editMode}
            onChange={(val) => updateSidebar({ image: val })}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-indigo-600 rounded-full" />
              Courses Include
            </div>
            {editMode && (
              <button
                onClick={addInclude}
                className="p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                title="Add Option"
              >
                <Plus size={16} />
              </button>
            )}
          </h3>

          <ul className="space-y-5">
            {(sidebar.includes || []).map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between group/item"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-indigo-50 transition-colors">
                    <EditableImage
                      src={item.icon}
                      alt={item.label}
                      editMode={!!editMode}
                      onChange={(val) => handleIncludeChange(index, { icon: val })}
                      className="w-5 h-5 flex-shrink-0"
                    />
                  </div>
                  <div className="text-gray-600 font-medium">
                    <EditableText
                      html={item.label}
                      editMode={!!editMode}
                      onChange={(val) => handleIncludeChange(index, { label: val })}
                    />
                  </div>
                </div>

                <div
                  className={
                    item.highlight
                      ? "font-bold text-indigo-600 text-lg transition-transform group-hover/item:scale-110"
                      : "text-gray-900 font-semibold"
                  }
                >
                  <EditableText
                    html={item.value}
                    editMode={!!editMode}
                    onChange={(val) => handleIncludeChange(index, { value: val })}
                  />
                </div>

                {editMode && (
                  <button
                    onClick={() => removeInclude(index)}
                    className="p-1 text-red-400 hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity ml-2"
                    title="Remove Option"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
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
          {editMode && (
            <button
              onClick={addInstructor}
              className="p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              title="Add Instructor"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {(sidebar.instructors || []).map((inst, index) => (
            <div key={index} className="relative group/inst">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <EditableImage
                    src={inst.image}
                    editMode={!!editMode}
                    onChange={(val) => handleInstructorChange(index, { image: val })}
                    className="w-full h-full rounded-2xl object-cover ring-2 ring-transparent group-hover/inst:ring-indigo-200 transition-all"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="mb-2">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      <EditableText
                        html={inst.name}
                        editMode={!!editMode}
                        onChange={(val) => handleInstructorChange(index, { name: val })}
                      />
                    </p>
                    <p className="text-xs text-gray-500 font-medium truncate">
                      <EditableText
                        html={inst.role}
                        editMode={!!editMode}
                        onChange={(val) => handleInstructorChange(index, { role: val })}
                      />
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-gray-400">
                    <div className="flex items-center gap-1.5 min-w-[100px]">
                      <Linkedin className={`w-3.5 h-3.5 transition-colors ${inst.linkedin ? 'text-indigo-600' : ''}`} />
                      {editMode && (
                        <input
                          type="text"
                          value={inst.linkedin || ""}
                          placeholder="LinkedIn URL"
                          onChange={(e) => handleInstructorChange(index, { linkedin: e.target.value })}
                          className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1 w-20 outline-none focus:border-indigo-400"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 min-w-[100px]">
                      <Twitter className={`w-3.5 h-3.5 transition-colors ${inst.twitter ? 'text-sky-500' : ''}`} />
                      {editMode && (
                        <input
                          type="text"
                          value={inst.twitter || ""}
                          placeholder="Twitter URL"
                          onChange={(e) => handleInstructorChange(index, { twitter: e.target.value })}
                          className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1 w-20 outline-none focus:border-indigo-400"
                        />
                      )}
                    </div>

                    {editMode && (
                      <div className="flex flex-col gap-2 mt-2 w-full pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase w-14">Facebook:</span>
                          <input
                            type="text"
                            value={inst.facebook || ""}
                            placeholder="Facebook URL"
                            onChange={(e) => handleInstructorChange(index, { facebook: e.target.value })}
                            className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1 flex-grow outline-none focus:border-indigo-400"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase w-14">Instagram:</span>
                          <input
                            type="text"
                            value={inst.instagram || ""}
                            placeholder="Instagram URL"
                            onChange={(e) => handleInstructorChange(index, { instagram: e.target.value })}
                            className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1 flex-grow outline-none focus:border-indigo-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {editMode && (
                  <button
                    onClick={() => removeInstructor(index)}
                    className="absolute -right-2 -top-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover/inst:opacity-100 transition-opacity hover:bg-red-200 shadow-sm"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
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
          <button className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all ${editMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            Send Message →
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
