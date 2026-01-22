// components/events/Participatory.tsx
"use client";

import React from "react";
import Image from "next/image";
<<<<<<< HEAD
import { motion, Variants } from "framer-motion";
import { ParticipatoryData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { Plus, Trash2 } from "lucide-react";
=======
import { motion, spring, easeOut } from "framer-motion";

interface Partner {
  id: number;
  image: string;
  image_url?: string;
  url: string;
}

interface Testimonial {
  id: number;
  name: string;
  heading: string;
  comment: string;
}

interface ParticipatoryProps {
  partners: Partner[];
  testimonials: Testimonial[];
}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

// --------------------
//     VARIANTS FIXED
// --------------------

// Main container (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

// Logo animation
const logoItemVariants: Variants = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

// Text fade-up
const textItemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

<<<<<<< HEAD
interface ParticipatoryProps {
  editMode: boolean;
  data: ParticipatoryData;
  onUpdate: (newData: Partial<ParticipatoryData>) => void;
  onAddPartner: () => void;
  onDeletePartner: (index: number) => void;
}

export default function Participatory({
  editMode,
  data,
  onUpdate,
  onAddPartner,
  onDeletePartner,
}: ParticipatoryProps) {
  const handleUpdatePartner = (index: number, updatedFields: { logo?: string; name?: string }) => {
    const newPartners = [...data.partners];
    newPartners[index] = { ...newPartners[index], ...updatedFields };
    onUpdate({ partners: newPartners });
  };

  const handleDeletePartner = (index: number) => {
    onDeletePartner(index);
  };
=======
export default function Participatory({ partners, testimonials }: ParticipatoryProps) {
  // Use partners if available, otherwise show default
  const displayPartners = partners && partners.length > 0 ? partners.slice(0, 6) : [];
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Bottom layers */}
          <div className="absolute inset-x-4 -bottom-5 h-5 rounded-2xl bg-white/80 shadow-md" />
          <div className="absolute inset-x-8 -bottom-10 h-5 rounded-2xl bg-white/60 shadow-sm" />

          {/* Main card */}
          <div className="relative rounded-3xl bg-white px-6 py-10 shadow-xl md:px-10">
            <div className="text-center">
              <motion.h2
                className="text-2xl font-extrabold text-gray-900 md:text-3xl"
                variants={textItemVariants}
              >
                <EditableText
                  html={data.title}
                  onChange={(val) => onUpdate({ title: val })}
                  editMode={editMode}
                />
              </motion.h2>

              <motion.div
                className="mt-2 text-sm text-gray-500 md:text-base"
                variants={textItemVariants}
              >
                <EditableText
                  html={data.description}
                  onChange={(val) => onUpdate({ description: val })}
                  editMode={editMode}
                />
              </motion.div>
            </div>

            {/* Logos */}
<<<<<<< HEAD
            <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-4">
              {data.partners.map((partner, index) => (
                <motion.div
                  key={partner.name + index}
                  className="group relative flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                  variants={logoItemVariants}
                  initial="visible"
                  animate="visible"
                >
                  {editMode && (
                    <button
                      onClick={() => handleDeletePartner(index)}
                      className="absolute -top-2 -right-2 z-10 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      title="Delete Partner"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                  <div className="relative w-full h-full">
                    {editMode ? (
                      <EditableImage
                        src={partner.logo}
                        alt={partner.name}
                        editMode={editMode}
                        onChange={(src) => handleUpdatePartner(index, { logo: src })}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
              {editMode && (
                <motion.div
                  key="add-partner"
                  initial="visible"
                  animate="visible"
                  className="flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                >

                  <button
                    onClick={onAddPartner}
                    className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-500 transition-all"
                    title="Add New Partner"
                  >
                    <Plus size={32} />
                  </button>
                </motion.div>
              )}
            </motion.div>
=======
            {displayPartners.length > 0 ? (
              <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-4">
                {displayPartners.map((partner) => {
                  // Ensure valid image source
                  const imageSrc = (partner.image_url && partner.image_url.trim() !== '')
                    ? partner.image_url
                    : (partner.image && partner.image.trim() !== '')
                      ? partner.image
                      : "/placeholder-partner.png";

                  return (
                    <motion.div
                      key={partner.id}
                      className="flex h-16 w-28 items-center justify-center md:h-32 md:w-40"
                      variants={logoItemVariants}
                    >
                      <a href={partner.url} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={imageSrc}
                          alt="Partner"
                          width={150}
                          height={100}
                          className="max-h-full max-w-full object-contain hover:scale-110 transition-transform"
                          unoptimized={imageSrc.startsWith('http')}
                        />
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="mt-10 text-center text-gray-500">
                <p>No partners available at the moment.</p>
              </div>
            )}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
          </div>
        </motion.div>
      </div>
    </section>
  );
}
