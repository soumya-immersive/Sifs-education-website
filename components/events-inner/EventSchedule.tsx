"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { Event } from "../../data/events";

interface Props {
  event: Event;
}

export default function EventSchedule({ event }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to calculate consecutive dates based on event start date
  const getFormattedDate = (baseDateStr: string, dayOffset: number) => {
    const date = new Date(baseDateStr);
    date.setDate(date.getDate() + dayOffset);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const dayLabels = ["First Day", "Second Day", "Third Day", "Fourth Day", "Fifth Day"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Program Schedule</h2>
        <p className="text-gray-500">Here you can go through the detailed schedule of the program</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Vertical Tabs */}
        <div className="lg:w-1/3 flex flex-col gap-3">
          {event.schedule.map((day, index) => (
            <button
              key={day.day}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-start p-4 rounded-2xl transition-all text-left border ${
                activeTab === index
                  ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white border-transparent shadow-lg"
                  : "bg-[#f8f9fa] text-gray-600 border-transparent hover:bg-gray-100"
              }`}
            >
              <span className="font-bold text-lg">{dayLabels[index] || `Day ${day.day}`}</span>
              <span className={`text-xs ${activeTab === index ? "text-white/80" : "text-gray-400"}`}>
                {getFormattedDate(event.date, index)}
              </span>
            </button>
          ))}
        </div>

        {/* Right Side: Tab Content */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {event.schedule[activeTab].title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {event.schedule[activeTab].description}
              </p>

              <div className="inline-flex items-center gap-2 bg-[#c27803] text-white px-4 py-2 rounded-lg font-bold text-sm mb-8">
                <Clock className="w-4 h-4" />
                06:00 PM - 07:00 PM
              </div>

              <div className="rounded-3xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                  alt="Session illustration"
                  className="w-full h-64 object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}