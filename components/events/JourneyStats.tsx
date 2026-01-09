"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { JourneyStatsData } from "../../types/events-page";

interface JourneyStatsProps {
  data: JourneyStatsData;
}

export default function JourneyStats({ data }: JourneyStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Counter states
  const [events, setEvents] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [countries, setCountries] = useState(0);
  const [speakers, setSpeakers] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    animateCounter(setEvents, data.counts.events);
    // Parse participants string to number for animation if possible, or just animate to a fixed number
    // simpler to just animate to a refined number if regex matches, else skip
    const partNum = parseInt(data.counts.participants.replace(/[^0-9]/g, "")) || 350;
    animateCounter(setParticipants, partNum);
    animateCounter(setCountries, data.counts.countries);
    animateCounter(setSpeakers, data.counts.speakers);
  }, [isInView, data.counts]);

  return (
    <section
      ref={ref}
      className="relative py-16 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${data.bgImage})` }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold"
        >
          <div dangerouslySetInnerHTML={{ __html: data.title }} className="text-white bg-transparent" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-sm font-normal"
        >
          <div dangerouslySetInnerHTML={{ __html: data.description }} className="text-white bg-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          <Stat
            value={events}
            label="Events Completed"
          />
          <Stat
            value={`${participants}K+`}
            label="Happy Participants"
          />
          <Stat
            value={countries}
            label="Countries Reach"
          />
          <Stat
            value={speakers}
            label="Eminent Speakers"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Counter Animation ---------------- */

function animateCounter(
  setter: React.Dispatch<React.SetStateAction<number>>,
  target: number
) {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);

  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      setter(target);
      clearInterval(interval);
    } else {
      setter(Math.floor(current));
    }
  }, 16);
}

/* ---------------- Stat UI ---------------- */

function Stat({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl font-bold">
        {value}
      </div>
      <p className="text-sm opacity-90">{label}</p>
    </motion.div>
  );
}
