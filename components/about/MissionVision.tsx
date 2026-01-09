"use client";

import { motion, Variants } from "framer-motion";
import { MissionData } from "@/types/about-page";

/* ---------------- Animations (Scroll Only) ---------------- */

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

interface MissionVisionProps {
  data: MissionData;
}

export default function MissionVision({ data }: MissionVisionProps) {

  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* MAIN IMAGE */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl overflow-hidden shadow-lg mb-14"
        >
          <img
            src={data.mainImage || "/placeholder.png"}
            alt="Mission Main"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* INFO CARDS */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={container}
        >
          {data.cards.map((card, index) => (
            <motion.div
              key={index}
              variants={scaleFade}
              initial="hidden"
              whileInView="visible"
              className="bg-white p-6 relative group border border-transparent hover:border-gray-100 rounded-xl transition-all"
            >

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <img
                    src={card.icon || "/placeholder.png"}
                    alt={card.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <div className="font-semibold text-black text-lg">
                  <div
                    dangerouslySetInnerHTML={{ __html: card.title }}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
