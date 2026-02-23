// components/events/UpcomingEvents.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";
import { ensureHttps } from "@/lib/imageUtils";

type Event = {
  id: number;
  slug: string;
  title: string;
  date: string;
  mode: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  formatted_date: string;
};

type APIEvent = {
  id: number;
  language_id: number;
  title: string;
  slug: string;
  banner_title: string;
  banner_subtitle: string;
  certificate_series: string;
  download_certificate: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  start_day: string;
  start_month_year: string;
  formatted_date: string;
  explore?: {
    image_url: string;
  };
};

type APIResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  timestamp: string;
  data: {
    data: APIEvent[];
    pagination: any;
    summary: any;
    filters: any;
  };
};

// Helper function to generate slugs (if not provided)
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
};

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
export default function EventsSection() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLefts, setTimeLefts] = useState<{ [key: number]: any }>({});
  const [headerData, setHeaderData] = useState({
    title: "Explore Events",
    subtitle: "Upcoming Events"
  });

  // Default event images (cycling through available images)
  const defaultImages = ["/event/1.png", "/event/2.png", "/event/3.png"];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Fetch header data
        try {
          const frontResponse = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
          const frontResult = await frontResponse.json();
          if (frontResult.success && frontResult.data?.bs) {
            setHeaderData({
              title: frontResult.data.bs.event_section_title || "Explore Events",
              subtitle: frontResult.data.bs.event_section_subtitle || "Upcoming Events"
            });
          }
        } catch (err) {
          console.error("Error fetching header data:", err);
        }

        const response = await fetch(
          `${API_BASE_URL}/EventManagement/Website/events?type=upcoming&_t=${Date.now()}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            },
            cache: 'no-store',
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result: APIResponse = await response.json();

        if (result.success && result.data?.data && result.data.data.length > 0) {
          // Transform API data to match our Event type
          const transformedEvents: Event[] = result.data.data.slice(0, 4).map((apiEvent, index) => ({
            id: apiEvent.id,
            slug: apiEvent.slug,
            title: apiEvent.title,
            date: apiEvent.formatted_date,
            mode: "Online Zoom", // Default mode
            description: `${apiEvent.banner_title} ${apiEvent.banner_subtitle}`,
            image: ensureHttps(apiEvent.explore?.image_url) || defaultImages[index % defaultImages.length],
            start_date: apiEvent.start_date,
            end_date: apiEvent.end_date,
            formatted_date: apiEvent.formatted_date,
          }));

          setEvents(transformedEvents);
          setError(null);
        } else {
          // No events available - this is not an error, just empty state
          setEvents([]);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


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

  const handleExploreClick = () => {
    router.push("/events");
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header Skeleton */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-8 w-48 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex h-full p-3 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                {/* Image Skeleton */}
                <div className="relative h-44 w-full bg-gray-200 rounded-lg animate-pulse mb-4"></div>

                {/* Content Skeleton */}
                <div className="flex flex-1 flex-col pb-5">
                  {/* Date and Mode */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Title */}
                  <div className="mb-2 space-y-2">
                    <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                  </div>

                  {/* Description */}
                  <div className="mb-4 space-y-2">
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  <hr className="mb-3 border-gray-100" />

                  {/* Timer + Link */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-12 w-12 bg-gray-200 rounded-md animate-pulse"
                        ></div>
                      ))}
                    </div>
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-500">Error: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="bg-gradient-to-r from-white via-white to-violet-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="mb-8">

            <h2 className="mt-1 text-2xl font-semibold text-black">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {headerData.title}
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
            <p className="text-sm text-gray-500 md:text-base">{headerData.subtitle}</p>
          </div>

          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Coming Soon</h3>
            </div>
          </div>
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

            <h2 className="mt-1 text-2xl font-semibold text-black">
              <span className="relative inline-block">
                <span className="relative z-10">
                  {headerData.title}
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
            <p className="text-sm text-gray-500 md:text-base mt-2">{headerData.subtitle}</p>
          </motion.div>

          <Link href="/events">
            <motion.button
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
              variants={headerItemVariants}
              onClick={handleExploreClick}
            >
              Explore →
            </motion.button>
          </Link>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={gridVariants}
        >
          {events.map((event) => {
            const slug = event.slug || generateSlug(event.title);

            // Get timer values for this event
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
                <Link href={`/events/${slug}`} className="flex flex-col flex-1">
                  {/* Image */}
                  <motion.div className="relative h-44 w-full" variants={subItemVariants}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div className="flex flex-1 flex-col pb-5 pt-4" variants={cardContentVariants}>
                    <motion.div className="mb-3 flex items-center justify-between text-[11px] text-gray-500" variants={subItemVariants}>
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image src="/calendar-mark.png" alt="Calendar" fill className="object-contain" />
                        </div>
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image src="/video-camera.png" alt="Mode" fill className="object-contain" />
                        </div>
                        <span>{event.mode}</span>
                      </div>
                    </motion.div>

                    <motion.h3 className="mb-2 line-clamp-2 text-base font-normal text-gray-900 hover:text-[#3A58EE] transition-colors" variants={subItemVariants}>
                      {event.title}
                    </motion.h3>

                    <motion.p className="mb-4 line-clamp-3 text-xs text-[#6B7385]" variants={subItemVariants}>
                      {event.description}
                    </motion.p>

                    <hr className="mb-3 border-gray-100" />

                    {/* Timer + Link */}
                    <motion.div className="mt-auto flex items-center justify-between" variants={subItemVariants}>
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