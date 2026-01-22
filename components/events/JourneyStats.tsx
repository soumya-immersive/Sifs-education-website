"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Statistic {
  id: number;
  title: string;
  quantity: string;
  icon: string;
}

interface JourneyStatsProps {
  statistics: Statistic[];
}

export default function JourneyStats({ statistics }: JourneyStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Counter states - dynamic based on statistics
  const [counters, setCounters] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (!isInView || !statistics || statistics.length === 0) return;

    // Initialize counters for each statistic
    statistics.forEach((stat) => {
      // Extract numeric value from quantity (e.g., "355000" from "355000" or "100" from "100")
      const numericValue = parseInt(stat.quantity.replace(/[^0-9]/g, '')) || 0;
      animateCounter(stat.id, numericValue);
    });
  }, [isInView, statistics]);

  const animateCounter = (statId: number, target: number) => {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCounters((prev) => ({ ...prev, [statId]: target }));
        clearInterval(interval);
      } else {
        setCounters((prev) => ({ ...prev, [statId]: Math.floor(current) }));
      }
    }, 16);
  };

  // Format the display value (add K+ suffix if needed)
  const formatValue = (stat: Statistic) => {
    const counterValue = counters[stat.id] || 0;
    // If original quantity has K+, add it back
    if (stat.quantity.includes('K+')) {
      return `${counterValue}K+`;
    }
    return counterValue.toString();
  };

  return (
    <section
      ref={ref}
      className="relative py-16 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/events/journey.png')]
                   bg-cover bg-center bg-no-repeat"
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold"
        >
          Journey At A Glance
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-sm font-normal"
        >
          Enthusiasts dedicated to building remarkable program!
        </motion.p>

        <div className="grid md:grid-cols-4 gap-8">
          {statistics && statistics.length > 0 ? (
            statistics.map((stat) => (
              <Stat key={stat.id} value={formatValue(stat)} label={stat.title} />
            ))
          ) : (
            <>
              <Stat value="120" label="Events Completed" />
              <Stat value="350K+" label="Happy Participants" />
              <Stat value="13" label="Countries Reach" />
              <Stat value="15" label="Eminent Speakers" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stat UI ---------------- */

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm opacity-90">{label}</p>
    </motion.div>
  );
}
