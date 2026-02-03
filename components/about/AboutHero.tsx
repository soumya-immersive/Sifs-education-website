"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { AboutHeroData } from "@/types/about-page";

/* ---------------- Animations (TS Safe) ---------------- */

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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const scaleFade: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface AboutHeroProps {
  data: AboutHeroData;
  editMode: boolean;
  updateData: (newData: AboutHeroData) => void;
}

export default function AboutHero({ data, editMode, updateData }: AboutHeroProps) {
  // Use data from props directly
  const content = data;

  const updateAndSave = (next: AboutHeroData) => {
    updateData(next);
  };

  const addParagraph = () => {
    updateAndSave({ ...content, paragraphs: [...content.paragraphs, "New paragraph..."] });
  };

  const removeParagraph = (index: number) => {
    if (confirm("Delete this paragraph?")) {
      const newParagraphs = content.paragraphs.filter((_, i) => i !== index);
      updateAndSave({ ...content, paragraphs: newParagraphs });
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        {/* <motion.div variants={fadeUp} className="text-3xl md:text-4xl font-semibold text-gray-900">
          <EditableText
            html={content.heading}
            editMode={editMode}
            onChange={(h) => updateAndSave({ ...content, heading: h })}
            className="mx-auto max-w-3xl text-center text-gray-900"
          />
        </motion.div> */}

        {/* <motion.div variants={fadeUp} className="text-sm text-gray-500 mt-3">
          <EditableText
            html={content.subtitle}
            editMode={editMode}
            onChange={(h) => updateAndSave({ ...content, subtitle: h })}
            className="mx-auto max-w-2xl text-center text-gray-500"
          />
        </motion.div> */}

        {/* Content Section */}
        <div className="flex flex-col gap-12 items-center text-left">
          {/* LEFT – Image */}

          <motion.div variants={fadeLeft} className="relative w-full max-w-5xl">
            <div className="rounded-2xl overflow-hidden">
              <EditableImage
                src={content.image}
                editMode={editMode}
                onChange={(src) => updateAndSave({ ...content, image: src })}
                className="h-[300px]"
              />
            </div>

          </motion.div>

          {/* RIGHT – Text */}
          <motion.div variants={container} className="w-full max-w-4xl">
            {/* <motion.span variants={fadeUp} className="inline-block px-8 py-2 rounded-full border border-[#067CB6] text-sm font-semibold text-black bg-[#E7ECEF]">
              <EditableText
                html={content.tag}
                editMode={editMode}
                onChange={(h) => updateAndSave({ ...content, tag: h })}
                className="inline-block"
              />
            </motion.span> */}

            <motion.div variants={fadeUp} className="text-2xl font-semibold mb-4 mt-4 text-black">
              <EditableText
                html={content.h2}
                editMode={editMode}
                onChange={(h) => updateAndSave({ ...content, h2: h })}
                className="text-black"
              />
            </motion.div>

            {content.paragraphs.map((p: string, idx: number) => (
              <motion.div variants={fadeUp} className="text-gray-600 text-sm leading-relaxed mb-4 group relative" key={idx}>
                <div className="flex-1">
                  <EditableText
                    html={p}
                    editMode={editMode}
                    onChange={(h) => {
                      const next = [...content.paragraphs];
                      next[idx] = h;
                      updateAndSave({ ...content, paragraphs: next });
                    }}
                  />
                </div>
                {editMode && (
                  <button
                    onClick={() => removeParagraph(idx)}
                    className="absolute -right-6 top-0 text-red-500 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                    title="Remove Paragraph"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}

            {editMode && (
              <button
                onClick={addParagraph}
                className="flex items-center gap-2 mt-4 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
              >
                <Plus size={16} /> Add Paragraph
              </button>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
}
