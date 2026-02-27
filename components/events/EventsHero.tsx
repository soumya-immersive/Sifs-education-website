"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ensureHttps } from "@/lib/imageUtils";
/* ---------------- Types ---------------- */
interface HeroEvent {
  id: number;
  title: string;
  text: string;
  banner_subtitle: string;
  banner_title?: string;
  event_date: string;
  end_date?: string;
  location: string;
  button_text: string;
  button_url: string;
  image: string;
  image_url: string;
  explore?: {
    image_url: string;
  };
}

interface EventsHeroProps {
  event: HeroEvent | null;
}

export default function EventsHero({ event }: EventsHeroProps) {
  if (!event) {
    return null; // Or return a loading skeleton/fallback
  }

  // Ensure we have a valid image source
  const rawImage = event.explore?.image_url || event.image_url || "";

  const imageSrc = (rawImage && rawImage.trim() !== "")
    ? ensureHttps(rawImage)
    : "/events/1.png";

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative h-[420px] w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={imageSrc}
              alt={event.title}
              fill={true}
              className="rounded-xl object-contain md:object-cover shadow-2xl"
              unoptimized={imageSrc.startsWith("http")}
              priority
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >



            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 leading-tight break-words">
              {event.title || event.title}
            </h1>
            <h1 className="text-2xl md:text-2xl font-bold text-black mb-6 leading-tight break-words">
              {event.banner_title || event.text}
              <div className="flex flex-col gap-2 mt-2">
                {event.banner_subtitle && (
                  <p className="text-[#067CB6] font-bold uppercase tracking-[0.2em] text-xs">
                    {event.banner_subtitle}
                  </p>
                )}
              </div>
            </h1>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 font-medium text-gray-700">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                  <Check size={14} />
                </div>
                <span>
                  Date: <span className="text-black font-semibold">
                    {event.event_date}
                    {event.end_date && ` - ${event.end_date}`}
                  </span>
                </span>
              </li>

              <li className="flex items-center gap-3 font-medium text-gray-700">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                  <Check size={14} />
                </div>
                <span>Location: <span className="text-black font-semibold">{event.location}</span></span>
              </li>
            </ul>
          </motion.div>

          <hr className="my-8 border-gray-100" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {event.button_url ? (
              <Link href={event.button_url}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  {event.button_text} <span>→</span>
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2"
              >
                Download Certificate <span>→</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
