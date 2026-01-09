"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { EventsHeroData } from "../../types/events-page";

/* ---------------- Animations ---------------- */
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface EventsHeroProps {
  data: EventsHeroData;
}

export default function EventsHero({ data }: EventsHeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Image */}
        <motion.div variants={fadeUp} className="relative group">
          <Image
            src={data.image}
            alt="Forensic Training"
            width={520}
            height={420}
            className="rounded-xl object-cover"
          />

          <motion.div
            variants={scaleFade}
            className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold z-20"
          >
            <div dangerouslySetInnerHTML={{ __html: data.enrolledCount }} />
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div variants={container}>
          <motion.span
            variants={fadeUp}
            className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]"
          >
            <div dangerouslySetInnerHTML={{ __html: data.subtitle }} />
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-black mb-4 mt-4"
          >
            <div dangerouslySetInnerHTML={{ __html: data.title }} />
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </motion.div>

          {/* Features List */}
          <ul className="space-y-2 mb-6">
            {data.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 font-normal text-black relative group"
              >
                <Check className="text-green-500 shrink-0" size={18} />
                <div className="flex-1">
                  <div dangerouslySetInnerHTML={{ __html: feature }} />
                </div>
              </li>
            ))}
          </ul>

          <motion.hr variants={fadeUp} />

          <motion.h2
            variants={fadeUp}
            className="text-lg font-semibold text-black mb-2 mt-4"
          >
            <div dangerouslySetInnerHTML={{ __html: data.certificateTitle }} />
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
            <div dangerouslySetInnerHTML={{ __html: data.certificateDescription }} />
          </motion.div>

          <motion.div
            variants={scaleFade}
            className="inline-block cursor-pointer"
          >
            <button
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all"
            >
              {data.buttonLabel || "Download Certificate"} →
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
