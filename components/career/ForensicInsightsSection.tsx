import Image from "next/image";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { CareerInsightsData, InsightCard } from "@/types/career-page";

// --- 1. TYPE DEFINITION ---
interface ForensicInsightsProps {
  data: CareerInsightsData;
  editMode: boolean;
  updateData: (newData: CareerInsightsData) => void;
}

// --- FIXED EASING (VALID FOR FRAMER MOTION v10+) ---
const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

// --- Framer Motion Variants ---

// 1. Section container
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

// 2. Header Block
const headerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

// 3. Cards Grid Container
const cardsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// 4. Individual Card animation
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutCubic },
  },
};

// --- 2. MAIN COMPONENT ---
const ForensicInsights: React.FC<ForensicInsightsProps> = ({ data, editMode, updateData }) => {

  const addCard = () => {
    const newCard: InsightCard = {
      id: Date.now(),
      title: "New Insight Title",
      description: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(),
      author: "John Doe",
      imageSrc: "/forensic-insights1.png",
      tag: "Tutorial"
    };
    updateData({ ...data, cards: [...data.cards, newCard] });
  };

  const removeCard = (id: number) => {
    if (confirm("Are you sure you want to remove this insight?")) {
      updateData({ ...data, cards: data.cards.filter(card => card.id !== id) });
    }
  };

  const updateCard = (id: number, updatedCard: Partial<InsightCard>) => {
    updateData({
      ...data,
      cards: data.cards.map(card => card.id === id ? { ...card, ...updatedCard } : card)
    });
  };

  return (
    <div className="bg-white py-8 px-0 md:py-16 md:px-0 mt-2 ">
      <motion.div
        className="mx-auto max-w-7xl px-4"
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
          <div className="flex-1">
            <h2 className="text-black text-4xl font-bold mb-1">
              <EditableText
                html={data.heading}
                editMode={editMode}
                onChange={(h) => updateData({ ...data, heading: h })}
              />
            </h2>
            <div className="text-gray-600 text-md">
              <EditableText
                html={data.subheading}
                editMode={editMode}
                onChange={(h) => updateData({ ...data, subheading: h })}
              />
            </div>
          </div>

          {editMode ? (
            <div className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] cursor-default">
              <EditableText
                html={data.exploreButtonLabel || "Explore"}
                editMode={editMode}
                onChange={(h) => updateData({ ...data, exploreButtonLabel: h })}
                className="text-white"
              />
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
            </div>
          ) : (
            <button className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC]">
              <span dangerouslySetInnerHTML={{ __html: data.exploreButtonLabel || "Explore" }} />
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
          )}

        </motion.header>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardsGridVariants}
        >
          <AnimatePresence mode="popLayout">
            {data.cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl overflow-hidden border border-[6B7385] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative group"
                variants={cardVariants}
              >
                {editMode && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeCard(card.id); }}
                    className="absolute top-2 right-2 z-20 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Image */}
                <div className="relative h-56 w-full">
                  <EditableImage
                    src={card.imageSrc}
                    editMode={editMode}
                    onChange={(src) => updateCard(card.id, { imageSrc: src })}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-green-500 opacity-20 mix-blend-multiply pointer-events-none"></div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="bg-[#EAF8FF] border border-[#00467A] text-black text-xs font-normal px-3 py-1.5 rounded-xs shadow-md inline-block">
                    <EditableText
                      html={card.tag}
                      editMode={editMode}
                      onChange={(h) => updateCard(card.id, { tag: h })}
                    />
                  </span>

                  <h3 className="text-gray-900 text-xl font-bold mb-3 mt-3 leading-snug">
                    <EditableText
                      html={card.title}
                      editMode={editMode}
                      onChange={(h) => updateCard(card.id, { title: h })}
                    />
                  </h3>

                  <div className="text-gray-500 text-sm mb-3 line-clamp-2">
                    <EditableText
                      html={card.description}
                      editMode={editMode}
                      onChange={(h) => updateCard(card.id, { description: h })}
                    />
                  </div>

                  <hr />

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
                      <span>
                        <EditableText
                          html={card.date}
                          editMode={editMode}
                          onChange={(h) => updateCard(card.id, { date: h })}
                        />
                      </span>
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
                      <span>
                        <EditableText
                          html={card.author}
                          editMode={editMode}
                          onChange={(h) => updateCard(card.id, { author: h })}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {editMode && (
            <button
              onClick={addCard}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 hover:bg-blue-50 transition-all group min-h-[400px]"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <p className="text-gray-600 font-medium tracking-tight">Add New Insight Card</p>
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};


export default ForensicInsights;

