"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
// import { Event } from "../../data/events";

interface FaqItem {
  question: string;
  answer: string;
}

interface EventWithFaq {
  faqs: FaqItem[];
  [key: string]: any;
}

interface Props {
  event: EventWithFaq;
}

export default function EventFaq({ event }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!event || !event.faqs || event.faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">All About Program</h2>
        <p className="text-gray-500 font-normal">Get your queries resolve here</p>
      </div>

      <div className="space-y-4">
        {event.faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="overflow-hidden rounded-xl transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full flex items-center justify-between p-3 text-left transition-all duration-300 ${isOpen
                    ? 'bg-[#E08A23] text-white shadow-lg'
                    : 'bg-[#F2F2F2] text-[#4D4D4D] hover:bg-gray-200'
                  }`}
              >
                <span className="font-medium text-lg">
                  {faq.question}
                </span>
                <div className="transition-transform duration-300">
                  {isOpen ? (
                    <ChevronDown className="w-6 h-6 text-white" />
                  ) : (
                    <ChevronRight className="w-6 h-6 text-black" />
                  )}
                </div>
              </button>

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
                      {faq.answer}
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