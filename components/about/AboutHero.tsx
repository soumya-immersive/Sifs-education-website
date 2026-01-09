"use client";

import { motion, Variants } from "framer-motion";
import { AboutHeroData } from "@/types/about-page";

/* ---------------- Animations (TS Safe) ---------------- */

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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface AboutHeroProps {
  data: AboutHeroData;
}

export default function AboutHero({ data }: AboutHeroProps) {
  const content = data;

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.div variants={fadeUp} className="text-3xl md:text-4xl font-semibold text-gray-900">
          <div
            dangerouslySetInnerHTML={{ __html: content.heading }}
            className="mx-auto max-w-3xl text-center text-gray-900"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="text-sm text-gray-500 mt-3">
          <div
            dangerouslySetInnerHTML={{ __html: content.subtitle }}
            className="mx-auto max-w-2xl text-center text-gray-500"
          />
        </motion.div>

        {/* Content Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center text-left">
          {/* LEFT – Image */}
          <motion.div variants={fadeLeft} className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={content.image || "/placeholder.png"}
                alt="About Hero"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Experience Badge */}
            <motion.div
              variants={scaleFade}
              className="
                absolute
                bottom-2
                left-1/2 -translate-x-1/2
                lg:left-68 lg:right-20 lg:translate-x-0
                bg-[#3f3e3e]
                rounded-xl shadow-lg
                px-6 py-4 md:px-8 md:py-6
                flex items-center gap-4
              "
            >
              <div className="text-3xl md:text-4xl text-white font-normal">
                <div
                  dangerouslySetInnerHTML={{ __html: content.badgeNumber }}
                  className="text-white"
                />
              </div>
              <div className="text-xs text-white border-l pl-4 leading-tight">
                <div
                  dangerouslySetInnerHTML={{ __html: content.badgeText }}
                  className="text-white"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT – Text */}
          <motion.div variants={container}>
            <motion.span variants={fadeUp} className="inline-block px-8 py-2 rounded-full border border-[#067CB6] text-sm font-semibold text-black bg-[#E7ECEF]">
              <div
                dangerouslySetInnerHTML={{ __html: content.tag }}
                className="inline-block"
              />
            </motion.span>

            <motion.div variants={fadeUp} className="text-2xl font-semibold mb-4 mt-4 text-black">
              <div
                dangerouslySetInnerHTML={{ __html: content.h2 }}
                className="text-black"
              />
            </motion.div>

            {content.paragraphs.map((p: string, idx: number) => (
              <motion.div variants={fadeUp} className="text-gray-600 text-sm leading-relaxed mb-4 group relative" key={idx}>
                <div className="flex-1">
                  <div
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                </div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
