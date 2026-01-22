"use client";

import { useState } from "react";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Course, CourseAccordionItem } from "../../types/courses-page";
import EditableText from "../editable/EditableText";

interface Props {
  course: Course;
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
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

export default function AccordionBlocks({ course, editMode, onUpdate }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemChange = (index: number, updatedItem: Partial<CourseAccordionItem>) => {
    const updatedItems = [...(course.accordionItems || [])];
    updatedItems[index] = { ...updatedItems[index], ...updatedItem };
    onUpdate?.({ accordionItems: updatedItems });
  };

  const addItem = () => {
    const newItem: CourseAccordionItem = {
      title: "New Section",
      content: "Content for the new section goes here..."
    };
    onUpdate?.({ accordionItems: [...(course.accordionItems || []), newItem] });
  };

  const removeItem = (index: number) => {
    const updatedItems = (course.accordionItems || []).filter((_, i) => i !== index);
    onUpdate?.({ accordionItems: updatedItems });
    if (openIndex === index) setOpenIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-green-500 rounded-full" />
          Course Curriculum & Information
        </h3>
        {editMode && (
          <button
            onClick={addItem}
            className="flex items-center gap-2 text-green-600 font-bold text-sm hover:text-green-700 transition px-3 py-1.5 bg-green-50 rounded-lg border border-green-200"
          >
            <Plus size={14} />
            Add Section
          </button>
        )}
      </div>

      {(course.accordionItems || []).map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={index}
            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? "border-indigo-200 shadow-md bg-indigo-50/10" : "border-gray-100 bg-white"
              }`}
            variants={itemFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="relative group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIndex(isOpen ? null : index);
                  }
                }}
                className={`w-full flex items-center justify-between px-6 py-5 
                           text-left font-bold transition-all cursor-pointer select-none ${isOpen ? "text-indigo-600 bg-indigo-50/50" : "text-gray-800 hover:bg-gray-50"
                  }`}
              >
                <EditableText
                  html={item.title}
                  editMode={!!editMode}
                  onChange={(val) => handleItemChange(index, { title: val })}
                />

<<<<<<< HEAD
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-90 text-indigo-600" : "text-gray-400"
                    }`}
                />
              </div>

              {editMode && (
                <button
                  onClick={() => removeItem(index)}
                  className="absolute right-14 top-1/2 -translate-y-1/2 p-1.5 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Section"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
=======
              <ChevronRight
                className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            </button>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="px-6 py-6 text-base text-gray-600 bg-white border-t border-indigo-50 leading-relaxed"
                  variants={accordionContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
<<<<<<< HEAD
                  <EditableText
                    html={item.content}
                    editMode={!!editMode}
                    onChange={(val) => handleItemChange(index, { content: val })}
                  />
=======
                  <div className="prose max-w-none text-gray-600">
                    {title === "Curriculum" ? (
                      course.prospectus ? (
                        <div className="space-y-6 not-prose">
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
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
