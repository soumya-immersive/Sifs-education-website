"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { ForensicInsightsData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { CopyPlus, Edit, Plus, Trash2 } from "lucide-react";

// --- 1. TYPE DEFINITION ---
interface ForensicInsightsProps {
  data: ForensicInsightsData;
  editMode: boolean;
  onUpdate: (data: Partial<ForensicInsightsData>) => void;
}

// --- FIXED EASING (VALID FOR FRAMER MOTION v10+) ---
const easeOutCubic: any = [0.33, 1, 0.68, 1];

// --- Framer Motion Variants ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

const cardsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutCubic },
  },
};

// --- 2. MAIN COMPONENT ---
const ForensicInsights: React.FC<ForensicInsightsProps> = ({ data, editMode, onUpdate }) => {
  const [showAll, setShowAll] = React.useState(false);

  const handleUpdateCard = (index: number, updates: any) => {
    const newCards = [...data.cards];
    newCards[index] = { ...newCards[index], ...updates };
    onUpdate({ cards: newCards });
  };

  const handleAddCard = () => {
    const newCard = {
      title: "New Insight",
      description: "Description of the insight...",
      date: "1 JAN, 2026",
      author: "Author Name",
      imageSrc: "/forensic-insights1.png"
    };
    onUpdate({ cards: [...(data.cards || []), newCard] });
  };

  const handleDeleteCard = (index: number) => {
    const newCards = data.cards.filter((_, i) => i !== index);
    onUpdate({ cards: newCards });
  };

  // Show all cards when in edit mode OR when showAll is true
  // This ensures newly added cards are immediately visible in edit mode
  const displayingCards = (editMode || showAll) ? (data.cards || []) : (data.cards || []).slice(0, 3);

  // Card component
  const Card = ({
    card,
    index
  }: { card: ForensicInsightsData['cards'][0], index: number }) => (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-[6B7385] transition-transform duration-300 hover:scale-[1.02] relative group h-full flex flex-col"
      variants={cardVariants}
      animate="visible"
    >
      {editMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Delete this insight?")) handleDeleteCard(index);
          }}
          className="absolute top-2 right-2 z-50 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* Image */}
      <div className="relative h-56 w-full shrink-0">
        <EditableImage
          src={card.imageSrc}
          alt={card.title}
          editMode={editMode}
          onChange={(src) => handleUpdateCard(index, { imageSrc: src })}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        <span className="bg-[#EAF8FF] border border-[#00467A] text-black text-xs font-normal px-3 py-1.5 rounded-xs shadow-md w-fit">
          Tutorial
        </span>

        <h3 className="text-gray-900 text-xl font-bold mb-3 mt-3 leading-snug">
          <EditableText
            html={card.title}
            editMode={editMode}
            onChange={(val) => handleUpdateCard(index, { title: val })}
          />
        </h3>

        <div className="text-gray-500 text-sm mb-3">
          <EditableText
            html={card.description}
            editMode={editMode}
            onChange={(val) => handleUpdateCard(index, { description: val })}
            className="line-clamp-2"
          />
        </div>

        <hr className="mt-auto" />

        {/* Footer info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <EditableText
              as="span"
              html={card.date}
              editMode={editMode}
              onChange={(val) => handleUpdateCard(index, { date: val })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <EditableText
              as="span"
              html={card.author}
              editMode={editMode}
              onChange={(val) => handleUpdateCard(index, { author: val })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white p-8 md:p-16">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.header
          className="flex flex-col items-start justify-between sm:flex-row sm:items-center mb-10"
          variants={headerVariants}
        >
          <div>
            <h1 className="text-black text-4xl font-bold mb-1">
              <EditableText
                html={data.title}
                editMode={editMode}
                onChange={(val) => onUpdate({ title: val })}
              />
            </h1>
            <div className="text-gray-600 text-md">
              <EditableText
                html={data.description}
                editMode={editMode}
                onChange={(val) => onUpdate({ description: val })}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">

            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              {showAll ? "Show Less" : "Show More"}
              <svg
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
        </motion.header>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={cardsGridVariants}
        >
          {displayingCards && displayingCards.length > 0 ? (
            displayingCards.map((card, index) => (
              <Card key={index} card={card} index={index} />
            ))
          ) : null}

          {/* Add New Insight Card */}
          {editMode && (
            <motion.div
              initial="visible"
              animate="visible"
              onClick={handleAddCard}
              className="flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100 hover:border-blue-400 transition-all group"
            >
              <div className="mb-4 rounded-full bg-white p-4 shadow-sm group-hover:shadow-md transition-all">
                <Plus size={32} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Add Insight</h3>
              <p className="mt-2 text-sm text-gray-500">Create a new insight card</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForensicInsights;
