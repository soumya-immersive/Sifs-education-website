"use client";

import { Linkedin, Twitter } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Internship } from "../../data/internships";

interface Props {
  internship: Internship;
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

const includeItems = [
  {
    label: "Mode",
    value: "Online/Offline",
    icon: "/course/icon1.png", // Keep same icons for consistency
    highlight: true,
  },
  {
    label: "Certificate",
    value: "Yes",
    icon: "/course/icon5.png",
  },
  {
    label: "Duration",
    value: "4-6 Weeks",
    icon: "/course/icon4.png",
  },
  {
    label: "Access",
    value: "Lifetime",
    icon: "/course/icon3.png",
  },
  {
    label: "Stipend",
    value: "Performance Based",
    icon: "/course/icon2.png",
  },
];

export default function InternshipSidebar({ internship }: Props) {
  return (
    <motion.div
      className="sticky top-28 space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* INTERNSHIP INCLUDE */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <img
          src="/course/sidebar.png"
          alt="Internship"
          className="w-full h-48 object-cover"
        />

        <div className="border-t border-gray-200" />

        <div className="p-5">
          <h3 className="text-md font-medium text-black mb-4">
            Internship Includes
          </h3>

          <ul className="space-y-4 text-sm">
            {includeItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  <span className="text-gray-600">{item.label}</span>
                </div>

                <span
                  className={
                    item.highlight
                      ? "font-semibold text-indigo-600"
                      : "text-gray-800"
                  }
                >
                  {item.value}
                </span>
              </li>
            ))}

            {/* Eligibility */}
            <li className="flex items-start justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img src="/course/icon6.png" className="w-5 h-5" />
                <span className="text-gray-600">Eligibility</span>
              </div>

              <div className="flex flex-col gap-1 items-end text-right">
                <span className="text-xs text-gray-500 italic">Open for:</span>
                <span className="text-sm text-gray-800 font-medium">UG/PG Students</span>
              </div>
            </li>

            {/* Program Type */}
            <li className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img src="/course/icon7.png" className="w-5 h-5" />
                <span className="text-gray-600">Program</span>
              </div>
              <span className="text-gray-600 capitalize">
                {internship.programSlug.replace("-", " ")}
              </span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* MENTORS */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200"
      >
        <h3 className="text-md font-medium text-black p-5">Mentors & Guides</h3>
        <div className="border-t border-gray-200" />

        <div className="space-y-4 p-5">
          {[
            {
              name: "Dr. Rajneek K Singh",
              role: "Honorary Director",
              img: "/course/ins1.png",
            },
            {
              name: "Dr. Renu Devi",
              role: "HOD & Assistant Professor",
              img: "/course/ins2.png",
            },
            {
              name: "Jyoti Verma",
              role: "Forensic Instructor",
              img: "/course/ins3.png",
            },
          ].map((inst) => (
            <div key={inst.name}>
              <div className="flex items-center gap-3">
                <img
                  src={inst.img}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <div className="pb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {inst.name}
                    </p>
                    <p className="text-xs text-gray-500">{inst.role}</p>
                  </div>

                  <hr />

                  <div className="flex items-center gap-2 text-gray-400 pt-1">
                    <Linkedin className="w-3 h-3 hover:text-indigo-600 cursor-pointer" />
                    <Twitter className="w-3 h-3 hover:text-indigo-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* INTERNSHIP QUERY */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-gray-200"
      >
        <h3 className="text-md font-medium text-black p-5">
          Internship Query
        </h3>
        <div className="border-t border-gray-200" />

        <form className="space-y-3 p-5">
          <input
            className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none"
            placeholder="Full Name"
          />
          <input
            className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none"
            placeholder="Mobile Number"
          />
          <input
            className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none"
            placeholder="Email Address"
          />
          <textarea
            rows={3}
            className="w-full border border-[#D9D9D9] text-black rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none"
            placeholder="I am interested in..."
          />
          <button className="cursor-pointer w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Apply / Inquire Now →
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}