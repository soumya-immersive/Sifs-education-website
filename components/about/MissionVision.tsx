"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { MissionData } from "@/types/about-page";

/* ---------------- Animations (Scroll Only) ---------------- */

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface MissionVisionProps {
  data: MissionData;
  editMode: boolean;
  updateData: (newData: MissionData) => void;
}

export default function MissionVision({ data, editMode, updateData }: MissionVisionProps) {

  const addCard = () => {
    // Ensuring new card has unique/valid initial content
    const newCard = {
      icon: "/about-us/mission.png", // Default icon to prevent empty image
      title: "New Title",
      description: "Description of the new value..."
    };
    // Create new array to force re-render
    const updatedCards = [...data.cards, newCard];
    updateData({ ...data, cards: updatedCards });
  };

  const removeCard = (index: number) => {
    // Using explicit index filtering
    if (confirm("Delete this card?")) {
      const newCards = [...data.cards];
      newCards.splice(index, 1);
      updateData({ ...data, cards: newCards });
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* MAIN IMAGE - COMMENTED OUT
        <motion.div
          variants={fadeUp}
          className="rounded-2xl overflow-hidden shadow-lg mb-14"
        >
          <EditableImage
            src={data.mainImage}
            editMode={editMode}
            onChange={(src) => updateData({ ...data, mainImage: src })}
            className="w-full"
          />
        </motion.div> 
        */}

        {/* INFO CARDS */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={container}
        >
          {data.cards.map((card, index) => (
            <motion.div
              key={index}
              variants={scaleFade}
              // FORCE VISIBLE: If we are in edit mode or it's a new item, we don't want it hidden by parent stagger
              initial="visible"
              animate="visible"
              className="bg-white p-6 relative group border border-transparent hover:border-gray-100 rounded-xl transition-all"
            >
              {editMode && (
                <div className="absolute top-2 right-2 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCard(index);
                    }}
                    className="text-red-500 p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors shadow-sm"
                    title="Delete Card"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <EditableImage
                    src={card.icon}
                    editMode={editMode}
                    onChange={(src) => {
                      const newCards = [...data.cards];
                      newCards[index].icon = src;
                      updateData({ ...data, cards: newCards });
                    }}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <div className="font-semibold text-black text-lg">
                  <EditableText
                    html={card.title}
                    editMode={editMode}
                    onChange={(val) => {
                      const newCards = [...data.cards];
                      newCards[index].title = val;
                      updateData({ ...data, cards: newCards });
                    }}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600 leading-relaxed">
                <EditableText
                  html={card.description}
                  editMode={editMode}
                  onChange={(val) => {
                    const newCards = [...data.cards];
                    newCards[index].description = val;
                    updateData({ ...data, cards: newCards });
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {editMode && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={addCard}
              className="flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm"
            >
              <Plus size={18} /> Add New Card
            </button>
          </div>
        )}

      </motion.div>
    </section>
  );
}
