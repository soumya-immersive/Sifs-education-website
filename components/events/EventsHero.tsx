"use client";

import Image from "next/image";
import { Check, Edit, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";
<<<<<<< HEAD
import { EventsHeroData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
=======
import Link from "next/link";

/* ---------------- Types ---------------- */
interface Slider {
  id: number;
  title: string;
  text: string;
  event_date: string;
  location: string;
  button_text: string;
  button_url: string;
  image: string;
  image_url: string;
}

interface EventsHeroProps {
  sliders: Slider[];
}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

/* ---------------- Animations ---------------- */
// reuse existing variants...
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

<<<<<<< HEAD
interface EventsHeroProps {
  data: EventsHeroData;
  editMode: boolean;
  onUpdate: (data: Partial<EventsHeroData>) => void;
}

export default function EventsHero({ data, editMode, onUpdate }: EventsHeroProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
=======
export default function EventsHero({ sliders }: EventsHeroProps) {
  // Use the first slider or fallback to default data
  const slider = sliders && sliders.length > 0 ? sliders[0] : null;

  // Ensure we have a valid image source
  const imageSrc = (slider?.image_url && slider.image_url.trim() !== '')
    ? slider.image_url
    : "/events/1.png";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 overflow-hidden">
      <motion.div
        className="grid md:grid-cols-2 gap-12 items-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Image */}
        <motion.div variants={fadeUp} className="relative group">
          {/* Hover Upload UI */}
          {editMode && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-xl">
              <label className="cursor-pointer bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center border border-blue-100">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Edit size={20} />
              </label>
            </div>
          )}
          <Image
<<<<<<< HEAD
            src={data.image}
            alt="Forensic Training"
=======
            src={imageSrc}
            alt={slider?.title || "Forensic Training"}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
            width={520}
            height={420}
            className="rounded-xl object-cover"
            unoptimized={imageSrc.startsWith('http')}
          />

          <motion.div
            variants={scaleFade}
            className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold z-20"
          >
            <EditableText
              html={data.enrolledCount}
              editMode={editMode}
              onChange={(val) => onUpdate({ enrolledCount: val })}
            />
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div variants={container}>
          <motion.span
            variants={fadeUp}
            className="inline-block mb-4 rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]"
          >
<<<<<<< HEAD
            <EditableText
              html={data.subtitle}
              editMode={editMode}
              onChange={(val) => onUpdate({ subtitle: val })}
            />
=======
            {slider?.title || "Online Training in"}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold text-black mb-4 mt-4"
          >
<<<<<<< HEAD
            <EditableText
              html={data.title}
              editMode={editMode}
              onChange={(val) => onUpdate({ title: val })}
            />
=======
            {slider?.text || "Forensic Science"}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
            <EditableText
              html={data.description}
              editMode={editMode}
              onChange={(val) => onUpdate({ description: val })}
            />
          </motion.div>

<<<<<<< HEAD
          {/* Features List with Add/Delete */}
          <ul className="space-y-2 mb-6">
            {data.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 font-normal text-black relative group"
              >
                <Check className="text-green-500 shrink-0" size={18} />
                <div className="flex-1">
                  <EditableText
                    html={feature}
                    editMode={editMode}
                    onChange={(val) => {
                      const newFeatures = [...data.features];
                      newFeatures[index] = val;
                      onUpdate({ features: newFeatures });
                    }}
                  />
                </div>
                {editMode && (
                  <button
                    onClick={() => {
                      const newFeatures = data.features.filter((_, i) => i !== index);
                      onUpdate({ features: newFeatures });
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                    title="Delete Feature"
                  >
                    <Edit size={12} className="rotate-45" />
                  </button>
                )}
              </li>
            ))}
            {editMode && (
              <li className="mt-2">
                <button
                  onClick={() => onUpdate({ features: [...data.features, "New Feature"] })}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors border border-blue-200"
                >
                  <div className="bg-blue-500 text-white p-1 rounded-full">
                    <Plus size={14} />
                  </div>
                  Add Feature
                </button>
              </li>
            )}
          </ul>
=======
          <motion.ul variants={container} className="space-y-2 mb-6">
            <motion.li
              variants={fadeUp}
              className="flex items-center gap-2 font-normal text-black"
            >
              <Check className="text-green-500" size={18} />
              {slider?.event_date || "Training without border"}
            </motion.li>

            <motion.li
              variants={fadeUp}
              className="flex items-center gap-2 font-normal text-black"
            >
              <Check className="text-green-500" size={18} />
              {slider?.location || "Online"}
            </motion.li>
          </motion.ul>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

          <motion.hr variants={fadeUp} />

          <motion.h2
            variants={fadeUp}
            className="text-lg font-semibold text-black mb-2 mt-4"
          >
            <EditableText
              html={data.certificateTitle}
              editMode={editMode}
              onChange={(val) => onUpdate({ certificateTitle: val })}
            />
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="text-[#6B7385] mb-6 font-normal"
          >
<<<<<<< HEAD
            <EditableText
              html={data.certificateDescription}
              editMode={editMode}
              onChange={(val) => onUpdate({ certificateDescription: val })}
            />
          </motion.div>

          <motion.div
            variants={scaleFade}
            className={`inline-block ${editMode ? '' : 'cursor-pointer'}`}
          >
            {editMode ? (
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium">
                <EditableText
                  html={data.buttonLabel || "Download Certificate"}
                  editMode={editMode}
                  onChange={(val) => onUpdate({ buttonLabel: val })}
                />
              </div>
            ) : (
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all"
              >
                {data.buttonLabel || "Download Certificate"} →
              </button>
            )}
          </motion.div>
=======
            Hey you've done great job! here you can download your <br />
            certificate of achievement.
          </motion.p>

          {slider?.button_url ? (
            <Link href={slider.button_url}>
              <motion.button
                variants={scaleFade}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
              >
                {slider.button_text || "Explore"} →
              </motion.button>
            </Link>
          ) : (
            <motion.button
              variants={scaleFade}
              className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium"
            >
              Download Certificate →
            </motion.button>
          )}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
        </motion.div>
      </motion.div>
    </section>
  );
}
