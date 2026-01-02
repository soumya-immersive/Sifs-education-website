"use client";

import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import EditableImage from "../editable/EditableImage";
import EditableText from "../editable/EditableText";

interface OurPresenceProps {
  data: {
    backgroundImage: string;
    mainImage: string;
    headingPrefix: string;
    headingHighlight: string;
    description: string;
    mediaLists: {
      title: string;
      items: string[];
    }[];
  };
  editMode: boolean;
  updateData: (data: any) => void;
}

export default function OurPresence({
  data,
  editMode,
  updateData
}: OurPresenceProps) {

  if (!data) return null;

  const updateMediaListTitle = (listIndex: number, val: string) => {
    const newLists = [...data.mediaLists];
    newLists[listIndex] = { ...newLists[listIndex], title: val };
    updateData({ ...data, mediaLists: newLists });
  }

  const updateMediaListItem = (listIndex: number, itemIndex: number, val: string) => {
    const newLists = [...data.mediaLists];
    const newItems = [...newLists[listIndex].items];
    newItems[itemIndex] = val;
    newLists[listIndex] = { ...newLists[listIndex], items: newItems };
    updateData({ ...data, mediaLists: newLists });
  }

  const addMediaListItem = (listIndex: number) => {
    const newLists = [...data.mediaLists];
    const newItems = [...newLists[listIndex].items, "New Item"];
    newLists[listIndex] = { ...newLists[listIndex], items: newItems };
    updateData({ ...data, mediaLists: newLists });
  }

  const removeMediaListItem = (listIndex: number, itemIndex: number) => {
    if (confirm("Delete this item?")) {
      const newLists = [...data.mediaLists];
      const newItems = newLists[listIndex].items.filter((_, i) => i !== itemIndex);
      newLists[listIndex] = { ...newLists[listIndex], items: newItems };
      updateData({ ...data, mediaLists: newLists });
    }
  }

  return (
    <section className="relative py-20 bg-cover bg-center">
      {/* Background Image - Absolute */}
      <div className="absolute inset-0 z-0">
        <EditableImage
          src={data.backgroundImage}
          alt="Background"
          editMode={editMode}
          className="w-full h-full object-cover"
          onChange={(newSrc) => updateData({ ...data, backgroundImage: newSrc })}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* OUTER CARD */}
        <div className="bg-[#F5F6FA] rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT IMAGE BLOCK */}
            <div className="relative flex justify-center lg:justify-start">
              {/* Gradient shape behind image - kept as part of design, or could be editable if needed but usually static */}
              <EditableImage
                src={data.mainImage}
                alt="Our Presence"
                editMode={editMode}
                className="relative z-10 rounded-2xl object-cover"
                onChange={(newSrc) => updateData({ ...data, mainImage: newSrc })}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4">
                <EditableText
                  html={data.headingPrefix}
                  editMode={editMode}
                  onChange={(val) => updateData({ ...data, headingPrefix: val })}
                />{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">
                    <EditableText
                      html={data.headingHighlight}
                      editMode={editMode}
                      onChange={(val) => updateData({ ...data, headingHighlight: val })}
                    />
                  </span>

                  {/* Yellow underline image */}
                  <Image
                    src="/yellow-underline.png"
                    alt=""
                    width={160}
                    height={14}
                    className="absolute left-0 -bottom-1 z-0"
                  />
                </span>
              </h2>

              <div className="text-sm text-gray-600 leading-relaxed mb-8 max-w-xl">
                <EditableText
                  html={data.description}
                  editMode={editMode}
                  onChange={(val) => updateData({ ...data, description: val })}
                />
              </div>

              {/* MEDIA PRESENCE LISTS */}
              <div className="grid sm:grid-cols-3 gap-6 text-sm">

                {data.mediaLists.map((list, i) => (
                  <div key={i}>
                    <div className="font-semibold text-black mb-3">
                      <EditableText
                        html={list.title}
                        editMode={editMode}
                        onChange={(val) => updateMediaListTitle(i, val)}
                      />
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      {list.items.map((item, j) => (
                        <li key={j} className="flex gap-2 group relative">
                          <span className="text-green-500">✔</span>
                          <div className="flex-1">
                            <EditableText
                              html={item}
                              editMode={editMode}
                              onChange={(val) => updateMediaListItem(i, j, val)}
                            />
                          </div>
                          {editMode && (
                            <button
                              onClick={() => removeMediaListItem(i, j)}
                              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </li>
                      ))}
                      {editMode && (
                        <li className="pt-2">
                          <button
                            onClick={() => addMediaListItem(i)}
                            className="flex items-center gap-1 text-[10px] text-blue-600 hover:bg-blue-50 px-2 py-1 rounded border border-blue-200"
                          >
                            <Plus size={10} /> Add Item
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
