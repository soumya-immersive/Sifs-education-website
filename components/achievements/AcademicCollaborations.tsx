"use client";

import { useState } from "react";
import Image from "next/image"
import { Plus, Trash2, X } from "lucide-react";
import EditableText from "../editable/EditableText";

interface AcademicCollaborationsProps {
    data: {
        headingPrefix: string;
        headingHighlight: string;
        headingSuffix: string;
        items: string[];
    };
    editMode: boolean;
    updateData: (data: any) => void;
}

export default function AcademicCollaborations({
    data,
    editMode,
    updateData
}: AcademicCollaborationsProps) {

    if (!data) return null;

    const INITIAL_COUNT = 6;
    const [showAll, setShowAll] = useState(false);

    // In edit mode, we show all items to make them editable
    const visibleItems = (showAll || editMode) ? data.items : data.items.slice(0, INITIAL_COUNT);

    const updateItem = (index: number, val: string) => {
        const newItems = [...data.items];
        newItems[index] = val;
        updateData({ ...data, items: newItems });
    }

    const addItem = () => {
        updateData({ ...data, items: [...data.items, "New University"] });
    }

    const deleteItem = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        if (confirm("Delete this collaboration?")) {
            const newItems = data.items.filter((_, i) => i !== index);
            updateData({ ...data, items: newItems });
        }
    }

    return (
        <section className="py-20">
            <div className="text-center">
                <h3 className="text-2xl lg:text-3xl font-semibold text-black mb-6">
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
                            width={200}
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

                <div className="flex flex-wrap justify-center gap-3 max-w-7xl mx-auto px-4">
                    {visibleItems.map((item, i) => (
                        <div key={i} className="relative group">
                            <span
                                className="inline-block px-5 py-2 rounded-full border border-[#067CB6] text-sm font-normal text-black bg-[#E7ECEF] transition pr-8"
                            >
                                <EditableText
                                    html={item}
                                    editMode={editMode}
                                    onChange={(val) => updateItem(i, val)}
                                />
                            </span>
                            {editMode && (
                                <button
                                    onClick={(e) => deleteItem(e, i)}
                                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 shadow-sm"
                                    title="Delete"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    ))}

                    {editMode && (
                        <button
                            onClick={addItem}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-dashed border-blue-400 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
                        >
                            <Plus size={16} /> Add
                        </button>
                    )}
                </div>

                {data.items.length > INITIAL_COUNT && !editMode && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-8 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] text-white font-normal py-3 px-8 rounded-xl shadow-md hover:opacity-90 transition cursor-pointer"
                    >
                        {showAll ? "Load Less ←" : "Load More →"}
                    </button>
                )}
            </div>
        </section>
    );
}
