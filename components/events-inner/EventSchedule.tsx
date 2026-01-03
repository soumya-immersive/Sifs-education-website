"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Plus, Trash2 } from "lucide-react";
import { Event } from "../../types/events-page";
import EditableText from "../editable/EditableText";

interface Props {
  event: Event;
  editMode: boolean;
  onUpdate: (updates: Partial<Event>) => void;
}

export default function EventSchedule({ event, editMode, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  // Helper to calculate consecutive dates based on event start date
  const getFormattedDate = (baseDateStr: string, dayOffset: number) => {
    // Simple parsing, assuming baseDateStr is somewhat standard or just using the string if parsing fails
    // Ideally this date logic should be robust.
    try {
      const date = new Date(baseDateStr);
      if (isNaN(date.getTime())) return baseDateStr; // Fallback
      date.setDate(date.getDate() + dayOffset);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return baseDateStr;
    }
  };

  const dayLabels = ["First Day", "Second Day", "Third Day", "Fourth Day", "Fifth Day"];

  const handleUpdateSchedule = (index: number, updates: any) => {
    const newSchedule = [...event.schedule];
    newSchedule[index] = { ...newSchedule[index], ...updates };
    onUpdate({ schedule: newSchedule });
  };

  const handleAddDay = () => {
    const newDay = {
      day: event.schedule.length + 1,
      title: "New Session Title",
      description: "Description of the session..."
    };
    onUpdate({ schedule: [...event.schedule, newDay] });
    setActiveTab(event.schedule.length); // Switch to new tab
  };

  const handleDeleteDay = (index: number) => {
    const newSchedule = event.schedule.filter((_, i) => i !== index);
    // Re-index days maybe? Or just keep as is.
    // Let's re-index day numbers just in case logic depends on it
    const reindexed = newSchedule.map((item, i) => ({ ...item, day: i + 1 }));
    onUpdate({ schedule: reindexed });
    if (activeTab >= reindexed.length) setActiveTab(Math.max(0, reindexed.length - 1));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Program Schedule</h2>
          <p className="text-gray-500">Here you can go through the detailed schedule of the program</p>
        </div>
        {editMode && (
          <button
            onClick={handleAddDay}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={16} /> Add Day
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Vertical Tabs */}
        <div className="lg:w-1/3 flex flex-col gap-3">
          {event.schedule.map((day, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setActiveTab(index)}
                className={`w-full flex flex-col items-start p-4 rounded-2xl transition-all text-left border ${activeTab === index
                    ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white border-transparent shadow-lg"
                    : "bg-[#f8f9fa] text-gray-600 border-transparent hover:bg-gray-100"
                  }`}
              >
                <span className="font-bold text-lg">{dayLabels[index] || `Day ${day.day}`}</span>
                <span className={`text-xs ${activeTab === index ? "text-white/80" : "text-gray-400"}`}>
                  {getFormattedDate(event.date, index)}
                </span>
              </button>
              {editMode && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteDay(index); }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Day"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Right Side: Tab Content */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            {event.schedule[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  <EditableText
                    html={event.schedule[activeTab].title}
                    editMode={editMode}
                    onChange={(val) => handleUpdateSchedule(activeTab, { title: val })}
                  />
                </h3>

                <div className="text-gray-600 leading-relaxed mb-6">
                  <EditableText
                    html={event.schedule[activeTab].description}
                    editMode={editMode}
                    onChange={(val) => handleUpdateSchedule(activeTab, { description: val })}
                  />
                </div>

                <div className="inline-flex items-center gap-2 bg-[#c27803] text-white px-4 py-2 rounded-lg font-bold text-sm mb-8">
                  <Clock className="w-4 h-4" />
                  06:00 PM - 07:00 PM
                </div>

                {/* Image could be editable too if added to schedule item structure. For now static or same for all? 
                    The original code had a static image. I'll leave it static or make it editable if I add an image field to schedule item.
                    The interface has no image for schedule item. I'll omit or leave static. */}
                <div className="rounded-3xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                    alt="Session illustration"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}