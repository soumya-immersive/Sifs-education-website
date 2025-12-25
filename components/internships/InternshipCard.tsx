"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Internship } from "@/data/internships";

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

interface Props {
  internship: Internship;
}

export default function InternshipCard({ internship }: Props) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition p-4
      "
    >
      {/* IMAGE */}
      <div className="relative h-44 rounded-t-xl overflow-hidden">
        <Image
          src={internship.heroImage}
          alt={internship.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="py-4">
        {/* Using internshipCode instead of courseCode */}
        <p className="text-xs text-[#D08522] font-medium mb-1">
          {internship.internshipCode}
        </p>

        <h3 className="font-medium text-black mb-2 leading-snug text-lg min-h-[3rem]">
          {internship.title}
        </h3>

        {/* Using overview from your internship data */}
        <p className="text-sm text-[#6B7385] mb-4 line-clamp-2">
          {internship.overview}
        </p>

        <motion.div variants={buttonVariants} whileHover="hover">
          <Link
            href={`/internships/${internship.programSlug}/${internship.slug}`}
            className="
              inline-block bg-gradient-to-r
              from-purple-500 to-indigo-600
              text-white px-8 py-3 rounded-lg
              text-sm font-medium
            "
          >
            Apply Now →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}