"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import FloatingToolbar from "./FloatingToolbar";

interface EditableTextProps {
    id?: string;
    html: string;
    editMode: boolean;
    className?: string;
    onChange: (html: string) => void;
    as?: string;
}

export default function EditableText({
    id,
    html,
    editMode,
    className = "",
    onChange,
    as = "span",
}: EditableTextProps) {
    const [isFocused, setIsFocused] = React.useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-500 underline cursor-pointer",
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: html,
        editable: editMode,
        editorProps: {
            attributes: {
                class: `outline-none min-h-[1.5em] transition-all duration-200 ${editMode ? "ring-2 ring-dashed ring-blue-300 rounded p-1 hover:ring-blue-400" : ""
                    } ${className}`,
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        immediatelyRender: false,
    });

    // Sync editMode
    useEffect(() => {
        if (editor && editor.isEditable !== editMode) {
            editor.setEditable(editMode);
        }
    }, [editMode, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className={`relative ${as === "span" ? "inline-block" : "block"}`} id={id}>
            {editMode && isFocused && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[100] whitespace-nowrap">
                    <FloatingToolbar editor={editor} visible={editMode} />
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    );
}
