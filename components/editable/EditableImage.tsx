"use client";

import React, { useRef, useState } from "react";
import { Upload, Link, X } from "lucide-react";

interface EditableImageProps {
    src: string;
    alt?: string;
    editMode: boolean;
    className?: string;
    onChange: (src: string) => void;
}

export default function EditableImage({
    src,
    alt = "",
    editMode,
    className = "",
    onChange,
}: EditableImageProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    // We use local preview state to show changes immediately before parent updates (although parent update is fast)
    const [preview, setPreview] = useState<string>(src);

    // Sync preview when prop changes
    React.useEffect(() => {
        setPreview(src);
    }, [src]);

    const handleFile = (file?: File) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = String(reader.result || "");
            setPreview(result);
            onChange(result);
        };
        reader.readAsDataURL(file);
    };

    return (
<<<<<<< HEAD
        <div className={`relative group ${className} ${editMode ? "cursor-pointer" : ""} overflow-hidden`}>
            <img
                src={preview}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-300 ${editMode ? "ring-4 ring-offset-2 ring-blue-500/20" : ""
                    }`}
            />
=======
        <div className={`relative group ${className} ${editMode ? "cursor-pointer" : ""}`}>
            {preview ? (
                <img
                    src={preview}
                    alt={alt}
                    className={`w-full h-auto object-cover transition-all duration-300 ${editMode ? "ring-4 ring-offset-2 ring-blue-500/20" : ""
                        }`}
                />
            ) : (
                editMode ? (
                    <div className={`w-full min-h-[200px] bg-gray-100 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg ${editMode ? "ring-4 ring-offset-2 ring-blue-500/20" : ""}`}>
                        <span>No Image</span>
                    </div>
                ) : null
            )}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

            {editMode && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm rounded-[inherit]">
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex flex-col items-center gap-2 text-white hover:text-blue-300 transition-colors"
                        title="Upload Image"
                    >
                        <div className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            <Upload size={24} />
                        </div>
                        <span className="text-xs font-medium">Upload</span>
                    </button>

                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                </div>
            )}
        </div>
    );
}
