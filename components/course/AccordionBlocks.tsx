"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { Course } from "../../data/courses";

interface Props {
  course: Course;
}

const SECTIONS = ["Curriculum", "FAQ", "Case Studies", "Reviews"];

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

export default function AccordionBlocks({ course }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {SECTIONS.map((title, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={title}
            className="bg-[#4559ed26] rounded-lg overflow-hidden border border-[#E3E9FF]"
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 
                         text-sm font-medium text-black hover:bg-[#E8EEFF] transition"
            >
              {title}

              <ChevronRight
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="px-5 py-4 text-sm text-gray-600 bg-white"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="prose max-w-none text-gray-600">
                    {title === "Curriculum" ? (
                      course.prospectus ? (
                        <div className="space-y-6 not-prose">
                          {course.prospectus.image_url && (
                            <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                              <img
                                src={course.prospectus.image_url}
                                alt="Course Prospectus"
                                className="w-full h-auto object-contain bg-gray-50"
                              />
                            </div>
                          )}
                          {[
                            { level: course.prospectus.level_one, body: course.prospectus.body_one },
                            { level: course.prospectus.level_two, body: course.prospectus.body_two },
                            { level: course.prospectus.level_three, body: course.prospectus.body_three },
                            { level: course.prospectus.level_four, body: course.prospectus.body_four }
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
                      (course.courseFaqs && course.courseFaqs.length > 0) ? (
                        <div className="space-y-4 not-prose">
                          {course.courseFaqs.map((faq) => (
                            <div key={faq.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <p className="font-semibold text-gray-800 mb-2">Q: {faq.question}</p>
                              <div className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </div>
                          ))}
                        </div>
                      ) : (course.faqs && course.faqs.length > 0) ? (
                        <div className="space-y-4 not-prose">
                          {course.faqs.map((faq) => (
                            <div key={faq.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <p className="font-semibold text-gray-800 mb-1">Q: {faq.query}</p>
                              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: faq.reply }} />
                            </div>
                          ))}
                        </div>
                      ) : <p>No FAQs available.</p>
                    ) : title === "Case Studies" ? (
                      course.caseStudies ? (
                        <div dangerouslySetInnerHTML={{ __html: course.caseStudies }} />
                      ) : <p>No case studies available.</p>
                    ) : title === "Reviews" ? (
                      (course.reviewsList && course.reviewsList.length > 0) ? (
                        <div className="space-y-6 not-prose">
                          {course.reviewsList.map(review => (
                            <div key={review.id} className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <div className="font-bold text-gray-900">{review.student_name}</div>
                                <div className="flex text-yellow-500">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < review.star ? "text-yellow-500" : "text-gray-300"}>★</span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-gray-600 text-sm italic" dangerouslySetInnerHTML={{ __html: review.review }} />
                            </div>
                          ))}
                        </div>
                      ) : <p>No reviews yet.</p>
                    ) : (
                      <p>
                        This is the {title.toLowerCase()} content.
                      </p>
                    )}
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
