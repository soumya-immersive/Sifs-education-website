"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { JourneyStatsData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import { Edit } from "lucide-react";

<<<<<<< HEAD
interface JourneyStatsProps {
  data: JourneyStatsData;
  editMode: boolean;
  onUpdate: (data: Partial<JourneyStatsData>) => void;
}

export default function JourneyStats({ data, editMode, onUpdate }: JourneyStatsProps) {
=======
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Counter states - dynamic based on statistics
  const [counters, setCounters] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (!isInView || !statistics || statistics.length === 0) return;

<<<<<<< HEAD
    animateCounter(setEvents, data.counts.events);
    // Parse participants string to number for animation if possible, or just animate to a fixed number
    // simpler to just animate to a refined number if regex matches, else skip
    const partNum = parseInt(data.counts.participants.replace(/[^0-9]/g, "")) || 350;
    animateCounter(setParticipants, partNum);
    animateCounter(setCountries, data.counts.countries);
    animateCounter(setSpeakers, data.counts.speakers);
  }, [isInView, data.counts]);

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ bgImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
=======
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
  };

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

      {editMode && (
        <div className="absolute top-4 right-4 z-50">
          <label className="cursor-pointer bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center border border-blue-100">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBgChange}
            />
            <Edit size={20} />
          </label>
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold"
        >
          <EditableText
            html={data.title}
            editMode={editMode}
            onChange={(val) => onUpdate({ title: val })}
            className="text-white bg-transparent"
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-sm font-normal"
        >
          <EditableText
            html={data.description}
            editMode={editMode}
            onChange={(val) => onUpdate({ description: val })}
            className="text-white bg-transparent"
          />
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
<<<<<<< HEAD
          <Stat
            value={editMode ? data.counts.events : events}
            label="Events Completed"
            editMode={editMode}
            onChange={(val) => onUpdate({ counts: { ...data.counts, events: Number(val) } })}
          />
          <Stat
            value={editMode ? data.counts.participants : `${participants}K+`}
            label="Happy Participants"
            editMode={editMode}
            isStringValue
            onChange={(val) => onUpdate({ counts: { ...data.counts, participants: val as string } })}
          />
          <Stat
            value={editMode ? data.counts.countries : countries}
            label="Countries Reach"
            editMode={editMode}
            onChange={(val) => onUpdate({ counts: { ...data.counts, countries: Number(val) } })}
          />
          <Stat
            value={editMode ? data.counts.speakers : speakers}
            label="Eminent Speakers"
            editMode={editMode}
            onChange={(val) => onUpdate({ counts: { ...data.counts, speakers: Number(val) } })}
          />
=======
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stat UI ---------------- */

function Stat({
  value,
  label,
  editMode,
  onChange,
  isStringValue = false
}: {
  value: string | number;
  label: string;
  editMode?: boolean;
  onChange?: (val: string | number) => void;
  isStringValue?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl font-bold">
        {editMode ? (
          <input
            value={value}
            onChange={(e) => onChange?.(isStringValue ? e.target.value : Number(e.target.value))}
            className="bg-transparent border border-white/20 rounded px-2 w-full text-center text-white"
          />
        ) : (
          value
        )}
      </div>
      <p className="text-sm opacity-90">{label}</p>
    </motion.div>
  );
}
