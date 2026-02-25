"use client";

import { useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Training } from "../../data/trainings";

interface Props {
  training: Training;
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

export default function TrainingAccordionBlocks({ training }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const blocks = [];

  if (training.caseStudies) {
    blocks.push({
      title: "Training Essentials ",
      content: (
        <div
          className="prose prose-sm max-w-none text-gray-600 space-y-2"
          dangerouslySetInnerHTML={{ __html: training.caseStudies }}
        />
      ),
    });
  }



  // if (training.comments && training.comments.length > 0) {
  //   blocks.push({
  //     title: "Community Q&A",
  //     content: (
  //       <div className="space-y-4">
  //         {training.comments.map((comment) => (
  //           <div key={comment.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
  //             <h4 className="font-semibold text-gray-800 mb-1">Q: {comment.query}</h4>
  //             <div className="text-gray-600 text-sm">
  //               <span className="font-semibold text-indigo-600">A: </span>
  //               <span dangerouslySetInnerHTML={{ __html: comment.reply }} />
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //   });
  // }

  if (training.prospectus) {
    const p = training.prospectus;
    const levels = [
      { title: p.level_one, content: p.body_one },
      { title: p.level_two, content: p.body_two },
      { title: p.level_three, content: p.body_three },
      { title: p.level_four, content: p.body_four },
    ].filter((l) => l.title || l.content);

    if (levels.length > 0) {
      blocks.push({
        title: "Prospectus",
        content: (
          <div className="space-y-6">
            {p.image_url && (
              <div className="mb-6 rounded-xl overflow-hidden border border-indigo-50 shadow-sm">
                <img
                  src={p.image_url}
                  alt="Prospectus"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {levels.map((item, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-indigo-100 pb-2 last:border-0 last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-sm" />
                {item.title && <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>}
                {item.content && (
                  <div
                    className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}
              </div>
            ))}
          </div>
        ),
      });
    }
  }

  if (training.faqs && training.faqs.length > 0) {
    blocks.push({
      title: "FAQ",
      content: (
        <div className="space-y-4">
          {training.faqs.map((faq) => (
            <div key={faq.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <h4 className="font-semibold text-gray-800 mb-1">{faq.question}</h4>
              <div
                className="text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          ))}
        </div>
      ),
    });
  }

  if (training.reviews && training.reviews.length > 0) {
    blocks.push({
      title: "Reviews",
      content: (
        <div className="space-y-4">
          {training.reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-800 text-sm">{review.student_name}</h4>
                <div className="flex text-yellow-400">
                  {[...Array(review.star || 5)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div
                className="text-gray-600 text-sm italic"
                dangerouslySetInnerHTML={{ __html: review.review }}
              />
            </div>
          ))}
        </div>
      ),
    });
  }

  // Always add Certification Details as a static block if needed, or maybe dependent on something
  // blocks.push({
  //   title: "Certification Details",
  //   content: (
  //     <div className="text-sm text-gray-600 leading-relaxed space-y-2">
  //       <p>
  //         Upon successful completion of the {training.title} training, participants will receive an
  //         industry-recognized certificate from SIFS India.
  //       </p>
  //       <p>
  //         This certification validates your practical skills and knowledge in {training.overview.toLowerCase()}.
  //         It is valuable for career advancement in forensic science labs, law enforcement agencies, and private security firms.
  //       </p>
  //     </div>
  //   )
  // });

  return (
    <div className="space-y-3 pt-4">
      {blocks.map((block, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={block.title}
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
                         text-sm font-semibold text-gray-900 hover:bg-[#E8EEFF] transition text-left"
            >
              {block.title}

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
                  {block.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}