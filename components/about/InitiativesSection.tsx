"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { InitiativesData } from "@/types/about-page";

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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

interface InitiativesSectionProps {
  data: InitiativesData;
  editMode: boolean;
  updateData: (newData: InitiativesData) => void;
}

export default function InitiativesSection({ data, editMode, updateData }: InitiativesSectionProps) {

  const addListItem = (listKey: 'listLeftItems' | 'listRightItems1' | 'listRightItems2') => {
    const newList = [...data[listKey], "New Item"];
    updateData({ ...data, [listKey]: newList });
  }

  const removeListItem = (listKey: 'listLeftItems' | 'listRightItems1' | 'listRightItems2', index: number) => {
    if (confirm("Remove this item?")) {
      const newList = data[listKey].filter((_, i) => i !== index);
      updateData({ ...data, [listKey]: newList });
    }
  }

  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url('${data.bgImage}')`,
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {/* OUTER LIGHT GRAY CARD */}
        <motion.div
          variants={fadeUp}
          className="bg-[#F5F6FA] rounded-2xl p-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT GRAY PANEL */}
            <motion.div
              variants={fadeLeft}
              className="bg-[#F5F6FA] rounded-2xl p-4"
            >
              <EditableImage
                src={data.leftImage}
                editMode={editMode}
                onChange={(src) => updateData({ ...data, leftImage: src })}
                className="rounded-xl object-cover"
              />
            </motion.div>

            {/* RIGHT GRAY PANEL */}
            <motion.div
              variants={fadeUp}
              className="bg-[#F5F6FA] rounded-2xl p-6"
            >
              <motion.div
                variants={fadeUp}
                className="text-2xl font-semibold text-black mb-4"
              >
                <EditableText
                  html={data.headingPrefix}
                  editMode={editMode}
                  onChange={(val) => updateData({ ...data, headingPrefix: val })}
                  as="span"
                  className="mr-1"
                />
                <span className="relative inline-block mr-1">
                  <span className="relative z-10">
                    <EditableText
                      html={data.headingHighlight}
                      editMode={editMode}
                      onChange={(val) => updateData({ ...data, headingHighlight: val })}
                      as="span"
                    />
                  </span>

                  {/* Yellow underline */}
                  <Image
                    src="/yellow-underline.png"
                    alt=""
                    width={160}
                    height={14}
                    className="absolute left-0 -bottom-1 z-0"
                  />
                </span>
                <EditableText
                  html={data.headingSuffix}
                  editMode={editMode}
                  onChange={(val) => updateData({ ...data, headingSuffix: val })}
                  as="span"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="text-sm text-gray-600 leading-relaxed mb-8"
              >
                <EditableText
                  html={data.description}
                  editMode={editMode}
                  onChange={(val) => updateData({ ...data, description: val })}
                />
              </motion.div>

              {/* LISTS */}
              <motion.div
                variants={container}
                className="grid sm:grid-cols-2 gap-8 text-sm"
              >

                {/* LEFT COLUMN */}
                <motion.div variants={fadeUp}>
                  <div className="font-semibold mb-3 text-black">
                    <EditableText
                      html={data.listLeftTitle}
                      editMode={editMode}
                      onChange={(val) => updateData({ ...data, listLeftTitle: val })}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listLeftItems.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <EditableText
                            html={item}
                            editMode={editMode}
                            onChange={(val) => {
                              const newItems = [...data.listLeftItems];
                              newItems[i] = val;
                              updateData({ ...data, listLeftItems: newItems });
                            }}
                          />
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeListItem('listLeftItems', i)}
                            className="text-red-500 opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {editMode && (
                    <button
                      onClick={() => addListItem('listLeftItems')}
                      className="mt-2 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus size={12} /> Add Item
                    </button>
                  )}


                  <div className="font-semibold mt-6 mb-3 text-black">
                    <EditableText
                      html={data.listRightTitle1}
                      editMode={editMode}
                      onChange={(val) => updateData({ ...data, listRightTitle1: val })}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listRightItems1.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <EditableText
                            html={item}
                            editMode={editMode}
                            onChange={(val) => {
                              const newItems = [...data.listRightItems1];
                              newItems[i] = val;
                              updateData({ ...data, listRightItems1: newItems });
                            }}
                          />
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeListItem('listRightItems1', i)}
                            className="text-red-500 opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {editMode && (
                    <button
                      onClick={() => addListItem('listRightItems1')}
                      className="mt-2 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus size={12} /> Add Item
                    </button>
                  )}
                </motion.div>

                {/* RIGHT COLUMN */}
                <motion.div variants={fadeUp}>
                  <div className="font-semibold mb-3 text-black">
                    <EditableText
                      html={data.listRightTitle2}
                      editMode={editMode}
                      onChange={(val) => updateData({ ...data, listRightTitle2: val })}
                    />
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    {data.listRightItems2.map((item, i) => (
                      <li key={i} className="flex gap-2 group relative">
                        <span className="text-green-500">✔</span>
                        <div className="flex-1">
                          <EditableText
                            html={item}
                            editMode={editMode}
                            onChange={(val) => {
                              const newItems = [...data.listRightItems2];
                              newItems[i] = val;
                              updateData({ ...data, listRightItems2: newItems });
                            }}
                          />
                        </div>
                        {editMode && (
                          <button
                            onClick={() => removeListItem('listRightItems2', i)}
                            className="text-red-500 opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  {editMode && (
                    <button
                      onClick={() => addListItem('listRightItems2')}
                      className="mt-2 text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus size={12} /> Add Item
                    </button>
                  )}
                </motion.div>

              </motion.div>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
