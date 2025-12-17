"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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

export default function AboutHero() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-4xl font-semibold text-gray-900"
        >
          Hi, Sherlock Institute of{" "}
          Forensic <br /> Science India
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-sm text-gray-500 mt-3"
        >
          is registered under the Government of India and ISO 9001:2015 certified
          <br />
          forensic science institute in India.
        </motion.p>

        {/* Content Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center text-left">
          
          {/* LEFT – Image */}
          <motion.div variants={fadeLeft} className="relative">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/about-us/about.png"
                alt="Students"
                width={520}
                height={380}
                className="object-cover"
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
              <p className="text-3xl md:text-4xl text-white font-normal">
                19+
              </p>
              <p className="text-xs text-white border-l pl-4 leading-tight">
                Years of <br /> Experience
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT – Text */}
          <motion.div variants={container}>
            <motion.span
              variants={fadeUp}
              className="inline-block px-8 py-2 rounded-full border border-[#067CB6] text-sm font-semibold text-black bg-[#E7ECEF]"
            >
              About Us
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-2xl font-semibold mb-4 mt-4 text-black"
            >
              <span className="relative inline-block">
                <span className="relative z-10">Learn Any</span>
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={140}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>{" "}
              where, Any Time
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-sm leading-relaxed mb-4"
            >
              Since 2006, the institute has conducted the best offline and online
              diploma and certificate courses in forensic science and has gained
              immense popularity globally for revolutionizing the field of
              forensic education.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-sm leading-relaxed"
            >
              The learner-friendly educational platform was established to
              fulfill the demand and supply difference between skilled forensic
              professionals and serve law enforcement agencies.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-sm leading-relaxed mb-4"
            >
              We offer several short- and long-term certificate, diploma,
              postgraduate diploma, foundational, and professional courses.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 text-sm leading-relaxed"
            >
              Our hands-on approach and real-life case studies help students
              understand complex cases and apply their learnings effectively.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
