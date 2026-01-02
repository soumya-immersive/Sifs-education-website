"use client";

import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import EditableImage from "../editable/EditableImage";
import EditableText from "../editable/EditableText";

interface AchievementsIntroProps {
    data: {
        backgroundImage: string;
        mainImage: string;
        badgeText: string;
        heading: string;
        paragraphs: string[];
        list: string[];
    };
    editMode: boolean;
    updateData: (data: any) => void;
}

export default function AchievementsIntro({
    data,
    editMode,
    updateData,
}: AchievementsIntroProps) {
    if (!data) return null;

    const updateParagraph = (index: number, newHtml: string) => {
        const newParagraphs = [...data.paragraphs];
        newParagraphs[index] = newHtml;
        updateData({ ...data, paragraphs: newParagraphs });
    };

    const addParagraph = () => {
        updateData({ ...data, paragraphs: [...data.paragraphs, "New paragraph..."] });
    };

    const removeParagraph = (index: number) => {
        if (confirm("Delete this paragraph?")) {
            const newParagraphs = data.paragraphs.filter((_, i) => i !== index);
            updateData({ ...data, paragraphs: newParagraphs });
        }
    };

    const updateListItem = (index: number, newHtml: string) => {
        const newList = [...data.list];
        newList[index] = newHtml;
        updateData({ ...data, list: newList });
    };

    const addListItem = () => {
        updateData({ ...data, list: [...data.list, "New list item..."] });
    };

    const removeListItem = (index: number) => {
        if (confirm("Delete this list item?")) {
            const newList = data.list.filter((_, i) => i !== index);
            updateData({ ...data, list: newList });
        }
    };

    return (
        <section className="relative py-20 bg-cover bg-center no-repeat">
            {/* Background Image - Absolute */}
            <div className="absolute inset-0 z-0">
                <EditableImage
                    src={data.backgroundImage}
                    alt="Background"
                    editMode={editMode}
                    className="w-full h-full object-cover opacity-30"
                    onChange={(newSrc) => updateData({ ...data, backgroundImage: newSrc })}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    <div className="relative w-full">
                        <EditableImage
                            src={data.mainImage}
                            alt="SIFS Achievements"
                            editMode={editMode}
                            className="w-full h-auto rounded-2xl object-cover"
                            onChange={(newSrc) => updateData({ ...data, mainImage: newSrc })}
                        />
                    </div>

                    <div>
                        <span className="inline-block rounded-full border border-[#067CB6] px-8 py-2 text-sm font-semibold text-black bg-[#E7ECEF]">
                            <EditableText
                                html={data.badgeText}
                                editMode={editMode}
                                onChange={(val) => updateData({ ...data, badgeText: val })}
                            />
                        </span>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-4">
                            <span className="relative inline-block">
                                <span className="relative z-10">
                                    <EditableText
                                        html={data.heading}
                                        editMode={editMode}
                                        onChange={(val) => updateData({ ...data, heading: val })}
                                    />
                                </span>

                                <Image
                                    src="/yellow-underline.png"
                                    alt=""
                                    width={220}
                                    height={16}
                                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
                                />
                            </span>
                        </h2>

                        <div className="space-y-4 mb-6">
                            {data.paragraphs.map((para, index) => (
                                <div key={index} className="relative group">
                                    {editMode && (
                                        <button
                                            onClick={() => removeParagraph(index)}
                                            className="absolute -left-8 top-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                            title="Delete Paragraph"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                    <EditableText
                                        html={para}
                                        editMode={editMode}
                                        className="text-sm text-gray-600 leading-relaxed block"
                                        onChange={(val) => updateParagraph(index, val)}
                                    />
                                </div>
                            ))}
                            {editMode && (
                                <button
                                    onClick={addParagraph}
                                    className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                                >
                                    <Plus size={14} /> Add Paragraph
                                </button>
                            )}
                        </div>

                        <ul className="text-sm text-[#00467A] list-disc pl-5 space-y-3">
                            {data.list.map((item, index) => (
                                <li key={index} className="pl-2 relative group">
                                    {editMode && (
                                        <button
                                            onClick={() => removeListItem(index)}
                                            className="absolute -left-6 top-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                            title="Delete Item"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                    <EditableText
                                        html={item}
                                        editMode={editMode}
                                        onChange={(val) => updateListItem(index, val)}
                                    />
                                </li>
                            ))}
                            {editMode && (
                                <li className="list-none pt-2">
                                    <button
                                        onClick={addListItem}
                                        className="flex items-center gap-1 text-xs text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                                    >
                                        <Plus size={14} /> Add Item
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
