"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ensureHttps } from "@/lib/imageUtils";

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

export default function EventsHero({ sliders }: EventsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (!sliders || sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [sliders]);

  // Use the current slider or fallback
  const slider = sliders && sliders.length > 0 ? sliders[currentIndex] : null;

  // Ensure we have a valid image source
  const imageSrc = (slider?.image_url && slider.image_url.trim() !== '')
    ? ensureHttps(slider.image_url)
    : "/events/1.png";

  if (!slider) {
    return null; // Or return a loading skeleton/fallback
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative h-[420px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slider.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={imageSrc}
                alt={slider.title || "Forensic Training"}
                fill={true}
                className="rounded-xl object-contain md:object-cover"
                unoptimized={imageSrc.startsWith('http')}
                priority
              />
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold z-10"
          >
            🎓 9,394+ Enrolled Learners
          </motion.div>
        </div>

        {/* Right Content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]"
              >
                {slider.title}
              </span>

              <h1 className="text-4xl font-bold text-black mb-4 mt-4 min-h-[80px]">
                {slider.text}
              </h1>



              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 font-normal text-black">
                  <Check className="text-green-500" size={18} />
                  {slider.event_date}
                </li>

                <li className="flex items-center gap-2 font-normal text-black">
                  <Check className="text-green-500" size={18} />
                  {slider.location}
                </li>
              </ul>
            </motion.div>
          </AnimatePresence>

          <hr className="my-6" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >


            <AnimatePresence mode="wait">
              {slider.button_url ? (
                <Link href={slider.button_url} key={`link-${slider.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    {slider.button_text} →
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  key={`btn-${slider.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Download Certificate →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
