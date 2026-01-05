// components/home/Participatory.tsx
"use client";

import Image from "next/image";
import { motion, spring, easeOut } from "framer-motion";

// Partner logos
const partners = [
  { name: "Aster Heal Group", logo: "/events/participatory1.png" },
  { name: "ACPM Medical College", logo: "/events/participatory2.png" },
  { name: "Birla Sun Life", logo: "/events/participatory3.png" },
  { name: "University Partner", logo: "/events/participatory4.png" },
  { name: "Accenture", logo: "/events/participatory5.png" },
  { name: "Sri Paramakalyani College", logo: "/events/participatory6.png" },
];

// --------------------
//     VARIANTS FIXED
// --------------------

// Main container (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

// Logo animation
const logoItemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: spring,       // FIXED
      stiffness: 100,
      damping: 14,
    },
  },
};

// Text fade-up
const textItemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: easeOut,      // FIXED
      duration: 0.5,
    },
  },
};

interface ParticipatoryProps {
  data?: {
    title: string;
    description: string;
    partners: { name: string; logo: string; }[];
  }
}

export default function Participatory({ data }: ParticipatoryProps) {
  const partners = data?.partners || [
    { name: "Aster Heal Group", logo: "/events/participatory1.png" },
    { name: "ACPM Medical College", logo: "/events/participatory2.png" },
    { name: "Birla Sun Life", logo: "/events/participatory3.png" },
    { name: "University Partner", logo: "/events/participatory4.png" },
    { name: "Accenture", logo: "/events/participatory5.png" },
    { name: "Sri Paramakalyani College", logo: "/events/participatory6.png" },
  ]; // Fallback if data not passed

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Bottom layers */}
          <div className="absolute inset-x-4 -bottom-5 h-5 rounded-2xl bg-white/80 shadow-md" />
          <div className="absolute inset-x-8 -bottom-10 h-5 rounded-2xl bg-white/60 shadow-sm" />

          {/* Main card */}
          <div className="relative rounded-3xl bg-white px-6 py-10 shadow-xl md:px-10">
            <div className="text-center">
              <motion.h2
                className="text-2xl font-extrabold text-gray-900 md:text-3xl"
                variants={textItemVariants}
              >
                {data?.title || "Participatory"}
              </motion.h2>

              <motion.p
                className="mt-2 text-sm text-gray-500 md:text-base"
                variants={textItemVariants}
              >
                {data?.description || "Supporters from different organizations who participated in remarkable program."}
              </motion.p>
            </div>

            {/* Logos */}
            <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-4">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  className="flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                  variants={logoItemVariants}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={100}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
