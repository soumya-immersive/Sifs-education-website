"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Event } from "../../types/events-page";
import EditableText from "../editable/EditableText";

interface Props {
  event: Event;
  editMode: boolean;
  onUpdate: (updates: Partial<Event>) => void;
}

export default function EventFaq({ event, editMode, onUpdate }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleUpdateFaq = (index: number, updates: any) => {
    const newFaqs = [...event.faqs];
    newFaqs[index] = { ...newFaqs[index], ...updates };
    onUpdate({ faqs: newFaqs });
  };

  const handleAddFaq = () => {
    const newFaq = {
      question: "New Question?",
      answer: "Answer to the new question..."
    };
    onUpdate({ faqs: [...(event.faqs || []), newFaq] });
    setOpenIndex((event.faqs?.length || 0)); // Open new FAQ
  };

  const handleDeleteFaq = (index: number) => {
    const newFaqs = event.faqs.filter((_, i) => i !== index);
    onUpdate({ faqs: newFaqs });
    setOpenIndex(null);
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All About Program</h2>
          <p className="text-gray-500 font-normal">Get your queries resolve here</p>
        </div>
        {editMode && (
          <button
            onClick={handleAddFaq}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={16} /> Add FAQ
          </button>
        )}
      </div>

      <div className="space-y-4">
        {event.faqs?.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl transition-all duration-300 relative group"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full flex items-center justify-between p-3 text-left transition-all duration-300 pr-12 ${isOpen
                    ? 'bg-[#E08A23] text-white shadow-lg'
                    : 'bg-[#F2F2F2] text-[#4D4D4D] hover:bg-gray-200'
                  }`}
              >
                <span className="font-medium text-lg w-full">
                  <EditableText
                    html={faq.question}
                    editMode={editMode}
                    onChange={(val) => handleUpdateFaq(index, { question: val })}
                    className={isOpen ? "text-white" : "text-[#4D4D4D]"}
                  />
                </span>
                <div className="transition-transform duration-300 shrink-0 ml-4">
                  {isOpen ? (
                    <ChevronDown className="w-6 h-6 text-white" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-black" />
                  )}
                </div>
              </button>
              {editMode && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteFaq(index); }}
                  className="absolute top-3 right-12 z-10 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete FAQ"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white border-x border-b border-gray-100 rounded-b-xl"
                  >
                    <div className="p-8 text-[#666666] text-base leading-relaxed font-medium">
                      <EditableText
                        html={faq.answer}
                        editMode={editMode}
                        onChange={(val) => handleUpdateFaq(index, { answer: val })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}