"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Unlink
} from "lucide-react";

interface FloatingToolbarProps {
    editor: Editor | null;
    visible?: boolean;
}

export default function FloatingToolbar({ editor, visible = true }: FloatingToolbarProps) {
    if (!editor || !visible) return null;

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex items-center gap-1 bg-white shadow-lg border border-gray-200 rounded-lg p-1 animate-in fade-in zoom-in duration-200">
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
                icon={<Bold size={14} />}
            />
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
                icon={<Italic size={14} />}
            />
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
                icon={<Underline size={14} />}
            />
            <div className="w-[1px] h-4 bg-gray-200 mx-1" />

            <ToolbarBtn
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                isActive={editor.isActive({ textAlign: "left" })}
                icon={<AlignLeft size={14} />}
            />
            <ToolbarBtn
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                isActive={editor.isActive({ textAlign: "center" })}
                icon={<AlignCenter size={14} />}
            />
            <ToolbarBtn
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                isActive={editor.isActive({ textAlign: "right" })}
                icon={<AlignRight size={14} />}
            />
            <div className="w-[1px] h-4 bg-gray-200 mx-1" />

            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
                icon={<List size={14} />}
            />
            <ToolbarBtn
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
                icon={<ListOrdered size={14} />}
            />

            <div className="w-[1px] h-4 bg-gray-200 mx-1" />

            <ToolbarBtn
                onClick={setLink}
                isActive={editor.isActive("link")}
                icon={<LinkIcon size={14} />}
            />
            {editor.isActive("link") && (
                <ToolbarBtn
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    isActive={false}
                    icon={<Unlink size={14} />}
                />
            )}
        </div>
    );
}

function ToolbarBtn({
    onClick,
    isActive,
    icon,
}: {
    onClick: () => void;
    isActive: boolean;
    icon: React.ReactNode;
}) {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors ${isActive ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "text-gray-600"
                }`}
        >
            {icon}
        </button>
    );
}
