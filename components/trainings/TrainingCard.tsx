"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Training } from "../../data/trainings";

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

/* ---------------- Props ---------------- */

interface Props {
  training: Training;
}

/* ---------------- Component ---------------- */

export default function TrainingCard({ training }: Props) {
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
          src={training.heroImage}
          alt={training.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="py-4">
        {/* Training Code */}
        <p className="text-xs text-[#D08522] font-medium mb-1">
          {training.trainingCode}
        </p>

        <h3 className="font-medium text-black mb-2 leading-snug text-lg min-h-[3rem]">
          {training.title}
        </h3>

        {/* Overview */}
        <p className="text-sm text-[#6B7385] mb-4 line-clamp-2">
          {training.overview}
        </p>

        <motion.div variants={buttonVariants} whileHover="hover">
          <Link
            href={`/training/${training.programSlug}/${training.slug}`}
            className="
              inline-block bg-gradient-to-r
              from-purple-500 to-indigo-600
              text-white px-8 py-3 rounded-lg
              text-sm font-medium
            "
          >
            View Details →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
