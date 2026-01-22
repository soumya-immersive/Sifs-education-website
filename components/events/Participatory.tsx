// components/events/Participatory.tsx
"use client";

import Image from "next/image";
import { motion, spring, easeOut } from "framer-motion";

interface Partner {
  id: number;
  image: string;
  image_url?: string;
  url: string;
}

interface Testimonial {
  id: number;
  name: string;
  heading: string;
  comment: string;
}

interface ParticipatoryProps {
  partners: Partner[];
  testimonials: Testimonial[];
}

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

export default function Participatory({ partners, testimonials }: ParticipatoryProps) {
  // Use partners if available, otherwise show default
  const displayPartners = partners && partners.length > 0 ? partners.slice(0, 6) : [];

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
                Participatory
              </motion.h2>

              <motion.p
                className="mt-2 text-sm text-gray-500 md:text-base"
                variants={textItemVariants}
              >
                Supporters from different organizations who participated in remarkable program.
              </motion.p>
            </div>

            {/* Logos */}
            {displayPartners.length > 0 ? (
              <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-4">
                {displayPartners.map((partner) => {
                  // Ensure valid image source
                  const imageSrc = (partner.image_url && partner.image_url.trim() !== '')
                    ? partner.image_url
                    : (partner.image && partner.image.trim() !== '')
                      ? partner.image
                      : "/placeholder-partner.png";

                  return (
                    <motion.div
                      key={partner.id}
                      className="flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                      variants={logoItemVariants}
                    >
                      <a href={partner.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={imageSrc}
                          alt="Partner"
                          width={150}
                          height={100}
                          className="max-h-full max-w-full object-contain hover:scale-110 transition-transform"
                          unoptimized={imageSrc.startsWith('http')}
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="mt-10 text-center text-gray-500">
                <p>No partners available at the moment.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
