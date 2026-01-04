"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Event } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// Helper function to generate slugs
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
};

// Reuse existing variants
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
    transition: { duration: 0.5, ease: "easeOut" }
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
    transition: { duration: 0.6, ease: "easeOut" }
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

interface UpcomingEventsProps {
  events: Event[];
  editMode: boolean;
  onUpdateEvent: (id: number, updates: Partial<Event>) => void;
  onAddEvent: (event: Event) => void;
  onDeleteEvent: (id: number) => void;
  showAllButtonLabel?: string;
  onUpdateButtonLabel?: (label: string) => void;
}

export default function UpcomingEvents({
  events,
  editMode,
  onUpdateEvent,
  onAddEvent,
  onDeleteEvent,
  showAllButtonLabel = "Show All →",
  onUpdateButtonLabel
}: UpcomingEventsProps) {

  const [showAll, setShowAll] = useState(false);

  // Show all cards when showAll is true OR when in edit mode
  // In edit mode, the button is still functional to allow toggling
  const displayEvents = (editMode || showAll) ? events : events.slice(0, 4);

  const handleAddNew = () => {
    const newId = Math.max(...events.map(e => e.id), 0) + 1;
    const newEvent: Event = {
      id: newId,
      slug: `new-event-${newId}`,
      title: "New Forensic Event",
      category: "General",
      date: "01 Jan, 2026",
      duration: "1 Day",
      location: "Online",
      mode: "online",
      price: 0,
      discountedPrice: 0,
      currency: "USD",
      heroImage: "/events/1.png",
      coverImage: "/events/1.png",
      description: "Description of the new event.",
      objectives: [],
      schedule: [],
      faqs: [],
      seats: { total: 100, available: 100 },
      instructors: []
    };
    onAddEvent(newEvent);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateEvent(id, { heroImage: reader.result as string, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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

          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            variants={headerItemVariants}
          >
            {editMode && onUpdateButtonLabel ? (
              <EditableText
                html={showAll ? 'Show Less' : showAllButtonLabel}
                editMode={editMode}
                onChange={onUpdateButtonLabel}
                as="span"
              />
            ) : (
              showAll ? 'Show Less' : showAllButtonLabel
            )}
          </motion.button>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={gridVariants}
        >
          {displayEvents.map((event) => {
            const slug = event.slug || generateSlug(event.title);

            return (
              <motion.article
                key={event.id}
                initial="visible"
                animate="visible"
                className="flex h-full p-3 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] transition-shadow duration-300 relative group"
                variants={cardVariants}
              >
                {/* Delete Button */}
                {editMode && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (confirm("Are you sure you want to delete this event?")) {
                        onDeleteEvent(event.id);
                      }
                    }}
                    className="absolute top-2 right-2 z-50 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="flex flex-col flex-1">
                  {/* Image */}
                  <motion.div className="relative h-44 w-full" variants={subItemVariants}>
                    {editMode && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-lg">
                        <label className="cursor-pointer bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(e, event.id)}
                          />
                          <Edit size={20} />
                        </label>
                      </div>
                    )}
                    <Image
                      src={event.coverImage || event.heroImage || "/events/1.png"}
                      alt={event.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </motion.div>

                  {/* Content */}
                  <motion.div className="flex flex-1 flex-col pb-5 pt-4" variants={cardContentVariants}>
                    <motion.div className="mb-3 flex items-center justify-between text-[11px] text-gray-500" variants={subItemVariants}>
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image src="/calendar-mark.png" alt="Calendar" fill className="object-contain" />
                        </div>
                        <EditableText
                          as="span"
                          html={event.date}
                          editMode={editMode}
                          onChange={(val) => onUpdateEvent(event.id, { date: val })}
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image src="/video-camera.png" alt="Mode" fill className="object-contain" />
                        </div>
                        <EditableText
                          as="span"
                          html={event.mode.toString()} // Ensure string
                          editMode={editMode}
                          onChange={(val) => onUpdateEvent(event.id, { mode: val as any })}
                        />
                      </div>
                    </motion.div>

                    <motion.h3 className="mb-2 line-clamp-2 text-base font-normal text-gray-900 hover:text-[#3A58EE] transition-colors" variants={subItemVariants}>
                      {editMode ? (
                        <EditableText
                          html={event.title}
                          editMode={editMode}
                          onChange={(val) => onUpdateEvent(event.id, { title: val })}
                        />
                      ) : (
                        <Link href={`/events/${slug}`} onClick={(e) => editMode && e.preventDefault()}>
                          {event.title}
                        </Link>
                      )}
                    </motion.h3>

                    <motion.div className="mb-4 text-xs text-[#6B7385]" variants={subItemVariants}>
                      <EditableText
                        html={event.description}
                        editMode={editMode}
                        onChange={(val) => onUpdateEvent(event.id, { description: val })}
                        className="line-clamp-3"
                      />
                    </motion.div>

                    <hr className="mb-3 border-gray-100" />

                    <motion.div className="mt-auto flex items-center justify-between" variants={subItemVariants}>
                      <div className="flex gap-1 text-[10px] font-semibold">
                      </div>

                      <Link
                        href={`/events/${slug}`}
                        onClick={(e) => editMode && e.preventDefault()}
                        className={`text-[11px] text-gray-500 hover:text-[#3A58EE] font-medium transition-colors group ml-auto ${editMode ? 'cursor-default pointer-events-none' : ''}`}
                      >
                        Read More →
                        <span className="block h-0.5 w-0 bg-[#3A58EE] transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}

          {/* Add New Event Card */}
          {editMode && (
            <motion.div
              variants={cardVariants}
              initial="visible"
              animate="visible"
              onClick={handleAddNew}
              className="flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100 hover:border-blue-400 transition-all group"
            >
              <div className="mb-4 rounded-full bg-white p-4 shadow-sm group-hover:shadow-md transition-all">
                <Plus size={32} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Add New Event</h3>
              <p className="mt-2 text-sm text-gray-500">Create a new event card</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}