"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
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

interface Program {
  label: string;
  slug: string;
  image?: string;
}

interface Training {
  title: string;
  slug: string;
  heroImage?: string;
}

export default function TrainingHero({
  program,
  training,
}: {
  program?: Program;
  training?: Training;
}) {
  const title = training?.title || program?.label;
  const subtitle = training
    ? "Training Overview"
    : `Explore our ${program?.label} programs`;

  const image =
    training?.heroImage ||
    program?.image ||
    "/training/hero.png";

  return (
    <section
      className="relative py-16 bg-[url('/training/hero-bg.png')]
      bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row
        items-center justify-between gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* LEFT */}
        <motion.div variants={container}>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-gray-900"
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-600 mt-2"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={scaleFade}
          className="w-full md:w-[400px] h-[200px]
          rounded-xl overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
