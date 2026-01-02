"use client";

import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";

interface ParticipationTimelineProps {
  data: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    items: {
      year: string;
      text: string;
    }[];
  };
  editMode: boolean;
  updateData: (data: any) => void;
}

export default function ParticipationTimeline({
  data,
  editMode,
  updateData,
}: ParticipationTimelineProps) {
  if (!data) return null;

  const updateItem = (index: number, field: "year" | "text", value: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateData({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItem = {
      year: "YEAR",
      text: "New participation detail..."
    };
    updateData({ ...data, items: [...data.items, newItem] });
  };

  const deleteItem = (index: number) => {
    if (confirm("Delete this timeline entry?")) {
      const newItems = data.items.filter((_, i) => i !== index);
      updateData({ ...data, items: newItems });
    }
  };

  return (
    <div>
      {/* Title */}
      <h3 className="text-2xl font-semibold mb-12 leading-snug text-black">
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
            width={220}
            height={16}
            className="absolute left-0 -bottom-1 z-0"
          />
        </span>{" "}
        <EditableText
          html={data.headingSuffix}
          editMode={editMode}
          onChange={(val) => updateData({ ...data, headingSuffix: val })}
        />
      </h3>

      {/* Timeline Wrapper */}
      <div className="relative pl-4">

        {/* Vertical Line */}
        <span className="absolute left-[9px] top-2 h-[calc(100%-2.5rem)] w-[2px] bg-[#D08522]" />

        <ul className="space-y-12">
          {data.items.map((item, index) => (
            <li key={index} className="relative flex gap-6 group">

              {/* Diamond Marker */}
              <span className="absolute left-1 top-2 w-4 h-4 bg-[#D08522] rotate-45" />

              {/* Content */}
              <div className="ml-10 relative w-full">
                {editMode && (
                  <button
                    onClick={() => deleteItem(index)}
                    className="absolute -left-8 -top-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete Entry"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="font-normal text-black text-xl mb-1">
                  <EditableText
                    html={item.year}
                    editMode={editMode}
                    onChange={(val) => updateItem(index, "year", val)}
                  />
                </div>
                <div className="text-sm text-[#525252] leading-relaxed max-w-xl">
                  <EditableText
                    html={item.text}
                    editMode={editMode}
                    onChange={(val) => updateItem(index, "text", val)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        {editMode && (
          <button
            onClick={addItem}
            className="mt-8 flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition border border-blue-200"
          >
            <Plus size={16} /> Add Timeline Event
          </button>
        )}
      </div>
    </div>
  );
}
