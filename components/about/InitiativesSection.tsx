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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function InitiativesSection() {
  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-us/initiatives-bg.png')",
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* OUTER LIGHT GRAY CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-[#F5F6FA] rounded-2xl p-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT GRAY PANEL */}
            <motion.div
              variants={fadeLeft}
              className="bg-[#F5F6FA] rounded-2xl p-4"
            >
              <Image
                src="/about-us/initiatives.png"
                alt="Student"
                width={420}
                height={520}
                className="rounded-xl object-cover"
              />
            </motion.div>

            {/* RIGHT GRAY PANEL */}
            <motion.div
              variants={fadeUp}
              className="bg-[#F5F6FA] rounded-2xl p-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl font-semibold text-black mb-4"
              >
                SIFS India’s{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Educational</span>

                  {/* Yellow underline */}
                  <Image
                    src="/yellow-underline.png"
                    alt=""
                    width={160}
                    height={14}
                    className="absolute left-0 -bottom-1 z-0"
                  />
                </span>{" "}
                Initiatives
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-sm text-gray-600 leading-relaxed mb-8"
              >
                We also conduct several awareness programs, webinars, workshops,
                and conferences round the year covering various famous forensic
                cases and insights on the latest developments in forensics,
                giving you the opportunity to learn new findings and also
                present your research work to the world.
              </motion.p>

              {/* LISTS */}
              <motion.div
                variants={container}
                className="grid sm:grid-cols-2 gap-8 text-sm"
              >

                {/* LEFT COLUMN */}
                <motion.div variants={fadeUp}>
                  <p className="font-semibold mb-3 text-black">
                    Offline and Online Forensic Courses:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Short-term and Long-term
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Foundational
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Professional
                    </li>
                  </ul>

                  <p className="font-semibold mt-6 mb-3 text-black">
                    Online Training and Internships for:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Students
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Professionals
                    </li>
                  </ul>
                </motion.div>

                {/* RIGHT COLUMN */}
                <motion.div variants={fadeUp}>
                  <p className="font-semibold mb-3 text-black">
                    Hands-on Forensic Training for:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Corporates
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Police Personnel
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-500">✔</span>
                      Students and Professionals
                    </li>
                  </ul>
                </motion.div>

              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
