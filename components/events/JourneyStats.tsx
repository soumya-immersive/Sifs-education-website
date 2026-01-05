"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { JourneyStatsData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import { Edit } from "lucide-react";

interface JourneyStatsProps {
  data: JourneyStatsData;
  editMode: boolean;
  onUpdate: (data: Partial<JourneyStatsData>) => void;
}

export default function JourneyStats({ data, editMode, onUpdate }: JourneyStatsProps) {
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

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ bgImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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
