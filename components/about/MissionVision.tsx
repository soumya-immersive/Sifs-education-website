"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

export default function MissionVision() {
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
          <Image
            src="/about-us/mission-bg.png"
            alt="Students learning together"
            width={1200}
            height={520}
            className="w-full h-[360px] md:h-[420px] object-cover"
            priority
          />
        </motion.div>

        {/* INFO CARDS */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={container}
        >
          {/* CARD 1 */}
          <motion.div variants={scaleFade} className="bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/about-us/mission.png"
                alt="Mission"
                width={40}
                height={40}
              />
              <h3 className="font-semibold text-black text-lg">
                Our Mission
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Our mission is to empower individuals with the essential forensic
              expertise to promote justice on a global scale.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div variants={scaleFade} className="bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/about-us/vision.png"
                alt="Vision"
                width={40}
                height={40}
              />
              <h3 className="font-semibold text-black text-lg">
                Our Vision
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              We visualize a society where forensic science plays a fundamental
              role in promoting justice, truth, security, and the well-being of
              communities.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div variants={scaleFade} className="bg-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/about-us/purpose.png"
                alt="Purpose"
                width={40}
                height={40}
              />
              <h3 className="font-semibold text-black text-lg">
                Our Purpose
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Our purpose is to excel in promoting knowledge, revealing the
              truth, and training forensic professionals across borders.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
