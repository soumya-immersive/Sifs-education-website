"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

/* ---------------- Types ---------------- */
interface Slider {
  id: number;
  title: string;
  text: string;
  event_date: string;
  location: string;
  button_text: string;
  button_url: string;
  image: string;
  image_url: string;
}

interface EventsHeroProps {
  sliders: Slider[];
}

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

export default function EventsHero({ sliders }: EventsHeroProps) {
  // Use the first slider or fallback to default data
  const slider = sliders && sliders.length > 0 ? sliders[0] : null;

  // Ensure we have a valid image source
  const imageSrc = (slider?.image_url && slider.image_url.trim() !== '')
    ? slider.image_url
    : "/events/1.png";

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
        <motion.div variants={fadeUp} className="relative">
          <Image
            src={imageSrc}
            alt={slider?.title || "Forensic Training"}
            width={520}
            height={420}
            className="rounded-xl object-cover"
            unoptimized={imageSrc.startsWith('http')}
          />

          <motion.div
            variants={scaleFade}
            className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold"
          >
            🎓 9,394+ Enrolled Learners
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div variants={container}>
          <motion.span
            variants={fadeUp}
            className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]"
          >
            {slider?.title || "Online Training in"}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-black mb-4 mt-4"
          >
            {slider?.text || "Forensic Science"}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
            The Forensic Science & Criminal Investigation Online Internship
            program by SIFS India aims to equip you with an understanding of the
            theories, methods, and applications of forensic science within the
            legal framework for criminal investigations.
          </motion.p>

          <motion.ul variants={container} className="space-y-2 mb-6">
            <motion.li
              variants={fadeUp}
              className="flex items-center gap-2 font-normal text-black"
            >
              <Check className="text-green-500" size={18} />
              {slider?.event_date || "Training without border"}
            </motion.li>

            <motion.li
              variants={fadeUp}
              className="flex items-center gap-2 font-normal text-black"
            >
              <Check className="text-green-500" size={18} />
              {slider?.location || "Online"}
            </motion.li>
          </motion.ul>

          <motion.hr variants={fadeUp} />

          <motion.h2
            variants={fadeUp}
            className="text-lg font-semibold text-black mb-2 mt-4"
          >
            Download your certificate
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
            Hey you've done great job! here you can download your <br />
            certificate of achievement.
          </motion.p>

          {slider?.button_url ? (
            <Link href={slider.button_url}>
              <motion.button
                variants={scaleFade}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
              >
                {slider.button_text || "Explore"} →
              </motion.button>
            </Link>
          ) : (
            <motion.button
              variants={scaleFade}
              className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
            >
              Download Certificate →
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
