"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Internship } from "../../data/internships";

interface Props {
  internship: Internship;
}



/* ---------------- Animations ---------------- */

const itemFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.15 },
    },
  },
};

export default function InternshipAccordionBlocks({ internship }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Define sections similar to Course Page
  const SECTIONS = ["Curriculum", "FAQ", "Case Studies", "Reviews"];

  return (
    <div className="space-y-3 pt-4">
      {SECTIONS.map((title, index) => {
        const isOpen = openIndex === index;

        // Determine if section has content
        let hasContent = false;
        if (title === "Curriculum") {
          // Only use prospectus for Curriculum. We don't want to fallback to training_outline because it's already shown in Info section.
          hasContent = !!internship.prospectus;
        } else if (title === "FAQ") {
          hasContent = !!((internship.faq && internship.faq.length > 0) || (internship.comments && internship.comments.length > 0));
        } else if (title === "Case Studies") {
          // Use case_studies field if available
          hasContent = !!internship.case_studies;
        } else if (title === "Reviews") {
          hasContent = !!(internship.reviews && internship.reviews.length > 0);
        }

        if (!hasContent) return null;

        return (
          <motion.div
            key={title}
            className="bg-[#4559ed12] rounded-lg overflow-hidden border border-[#E3E9FF]"
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 
                         text-sm font-semibold text-gray-900 hover:bg-[#E8EEFF] transition"
            >
              {title === "Curriculum" && !internship.prospectus ? "Training Modules" : title}

              <ChevronRight
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="px-5 py-4 text-sm text-gray-600 bg-white border-t border-[#E3E9FF]"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="prose prose-sm max-w-none text-gray-600">
                    {title === "Curriculum" ? (
                      internship.prospectus ? (
                        <div className="space-y-6 not-prose">
                          {[
                            { level: internship.prospectus.level_one, body: internship.prospectus.body_one },
                            { level: internship.prospectus.level_two, body: internship.prospectus.body_two },
                            { level: internship.prospectus.level_three, body: internship.prospectus.body_three },
                            { level: internship.prospectus.level_four, body: internship.prospectus.body_four }
                          ].map((item, idx) => (
                            item.level && item.body ? (
                              <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                                <h4 className="font-bold text-gray-800 mb-3 text-lg border-b border-gray-200 pb-2">{item.level}</h4>
                                <div className="text-sm space-y-2 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.body }} />
                              </div>
                            ) : null
                          ))}
                        </div>
                      ) : (
                        <p>Curriculum detailed information coming soon.</p>
                      )
                    ) : title === "FAQ" ? (
                      <div className="space-y-4 not-prose">
                        {/* Official FAQs */}
                        {internship.faq && internship.faq.map((f: any) => (
                          <div key={`faq-${f.id}`} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <p className="font-semibold text-gray-800 mb-2">Q: {f.question}</p>
                            <div className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm" dangerouslySetInnerHTML={{ __html: f.answer }} />
                          </div>
                        ))}
                        {/* User Comments/Queries */}
                        {internship.comments && internship.comments.map((c: any) => (
                          <div key={`comment-${c.id}`} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <p className="font-semibold text-gray-800 mb-1">Q: {c.query}</p>
                            <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: c.reply }} />
                          </div>
                        ))}
                      </div>
                    ) : title === "Case Studies" ? (
                      <div dangerouslySetInnerHTML={{ __html: internship.case_studies || "" }} />
                    ) : title === "Reviews" ? (
                      <div className="space-y-6 not-prose">
                        {internship.reviews && internship.reviews.map((review: any) => (
                          <div key={review.id} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <div className="font-bold text-gray-900">{review.student_name || review.name}</div>
                              <div className="flex text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={i < (review.star || 5) ? "text-yellow-500" : "text-gray-300"}>★</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-gray-600 text-sm italic" dangerouslySetInnerHTML={{ __html: review.review }} />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}