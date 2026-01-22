"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  slug: string;
  title: string;
  start_day?: string;
  start_month_year?: string;
  formatted_date?: string;
  start_date?: string;
  end_date?: string;
};

interface UpcomingEventsProps {
  events: Event[];
}

// Helper to calculate time remaining
const calculateTimeLeft = (targetDate: string) => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const timerTitles = ["Days", "Hours", "Min", "Sec"];

const timerStyles = [
  { container: "bg-sky-500 border border-sky-500", number: "text-white", title: "text-sky-100" },
  { container: "bg-white border border-dashed border-sky-400", number: "text-sky-500", title: "text-sky-500" },
  { container: "bg-white border border-dashed border-sky-400", number: "text-sky-500", title: "text-sky-500" },
  { container: "bg-white border border-dashed border-amber-400", number: "text-amber-500", title: "text-amber-500" },
];

// ------------------ Motion Variants ------------------
const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

const cardContentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const subItemVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ------------------ Component ------------------
export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const [timeLefts, setTimeLefts] = useState<{ [key: number]: any }>({});

  // Initialize timers on mount
  useEffect(() => {
    if (events && events.length > 0) {
      const initialTimers: any = {};
      events.forEach((ev) => {
        const targetDate = ev.start_date || ev.end_date;
        if (targetDate) {
          const tl = calculateTimeLeft(targetDate);
          if (tl) initialTimers[ev.id] = tl;
        }
      });
      setTimeLefts(initialTimers);
    }
  }, [events]);

  // Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      if (events && events.length > 0) {
        const updates: any = {};
        let changed = false;
        events.forEach((ev) => {
          const targetDate = ev.start_date || ev.end_date;
          if (targetDate) {
            const tl = calculateTimeLeft(targetDate);
            if (tl) {
              updates[ev.id] = tl;
              changed = true;
            }
          }
        });
        if (changed) setTimeLefts((prev) => ({ ...prev, ...updates }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  // If no events, show empty state
  if (!events || events.length === 0) {
    return (
      <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-gray-500">No upcoming events at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
      <motion.div
        className="mx-auto max-w-7xl px-4"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <motion.div variants={headerItemVariants}>
            <p className="text-sm font-normal text-[#3A58EE]">Upcoming Events</p>
            <h2 className="mt-1 text-2xl font-semibold text-black">
              <span className="relative inline-block">
                <span className="relative z-10">
                  Explore Events
                </span>
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={200}
                  height={14}
                  className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
                />
              </span>
            </h2>
          </motion.div>

          <Link href="/events">
            <motion.button
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
              variants={headerItemVariants}
            >
              More About →
            </motion.button>
          </Link>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={gridVariants}
        >
          {events.map((event) => {
            const timerVal = timeLefts[event.id];
            // Convert timer to array format matched with labels
            const timerValues = timerVal
              ? [
                String(timerVal.days).padStart(2, "0"),
                String(timerVal.hours).padStart(2, "0"),
                String(timerVal.minutes).padStart(2, "0"),
                String(timerVal.seconds).padStart(2, "0"),
              ]
              : ["00", "00", "00", "00"];

            return (
              <motion.article
                key={event.id}
                className="flex h-full p-3 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-shadow duration-300"
                variants={cardVariants}
              >
                {/* Make the whole card clickable as a Link */}
                <Link href={`/events/${event.slug}`} className="flex flex-col flex-1">
                  {/* Image - Using placeholder for now */}
                  <motion.div
                    className="relative h-44 w-full bg-gray-100 rounded-lg"
                    variants={subItemVariants}
                  >
                    <Image
                      src="/events/1.png"
                      alt={event.title}
                      fill
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex flex-1 flex-col pb-5 pt-4"
                    variants={cardContentVariants}
                  >
                    <motion.div
                      className="mb-3 flex items-center justify-between text-[11px] text-gray-500"
                      variants={subItemVariants}
                    >
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/calendar-mark.png"
                            alt="Calendar"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{event.formatted_date || "TBA"}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            src="/video-camera.png"
                            alt="Mode"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>Online</span>
                      </div>
                    </motion.div>

                    <motion.h3
                      className="mb-2 line-clamp-2 text-base font-normal text-gray-900 hover:text-[#3A58EE] transition-colors"
                      variants={subItemVariants}
                    >
                      {event.title}
                    </motion.h3>

                    <motion.p
                      className="mb-4 line-clamp-3 text-xs text-[#6B7385]"
                      variants={subItemVariants}
                    >
                      Join us for this exciting event in forensic science and criminal investigation.
                    </motion.p>

                    <hr className="mb-3 border-gray-100" />

                    {/* Timer + Link */}
                    <motion.div
                      className="mt-auto flex items-center justify-between"
                      variants={subItemVariants}
                    >
                      <div className="flex gap-1 text-[10px] font-semibold">
                        {timerTitles.map((title, i) => {
                          const style = timerStyles[i];
                          return (
                            <div key={title} className={`rounded-md px-2 py-1 ${style.container}`}>
                              <div className={`text-sm font-bold ${style.number}`}>
                                {timerValues[i]}
                              </div>
                              <div className={`text-[9px] ${style.title}`}>{title}</div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="text-[11px] text-gray-500 hover:text-[#3A58EE] font-medium transition-colors group">
                        Read More →
                        <span className="block h-0.5 w-0 bg-[#3A58EE] transition-all duration-300 group-hover:w-full"></span>
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}