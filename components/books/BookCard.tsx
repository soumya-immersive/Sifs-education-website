"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Course } from "../../types/courses-page"; // Using the unified Course type
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

/* ---------------- Animations ---------------- */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const buttonVariants: Variants = {
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/* ---------------- Component ---------------- */

interface GraphProps {
  course: Course; // Changed from Book to Course
  editMode?: boolean;
  onUpdate?: (updatedInfo: Partial<Course>) => void;
  onDelete?: () => void;
  realm?: string; // e.g. "books"
}

export default function BookCard({
  course: book, // alias to 'book' to keep code readable
  editMode,
  onUpdate,
  onDelete,
  realm = "books"
}: GraphProps) {

  const stripHtml = (htmlContent: string) => {
    if (typeof window === 'undefined') return htmlContent;
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={!editMode ? { y: -6 } : {}}
      className={`
        bg-white rounded-xl border border-gray-100
        shadow-sm hover:shadow-md transition-shadow p-4
        flex flex-col h-full relative group
        ${editMode ? 'border-dashed border-blue-300' : ''}
      `}
    >
      {editMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete?.();
          }}
          className="absolute -top-2 -right-2 z-30 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete Book"
        >
          <Trash2 size={14} />
        </button>
      )}

      {/* BOOK COVER IMAGE */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 shadow-inner">
        <EditableImage
          src={book.image || "/books/hero.png"} // Mapped from coverImage to image
          alt={stripHtml(book.title)}
          editMode={!!editMode}
          onChange={(val: string) => onUpdate?.({ image: val })}
          className="object-cover w-full h-full"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          <EditableText
            html={book.author || "Unknown Author"}
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ author: val })}
          />
        </div>

        <h3 className="font-bold text-gray-900 mb-2 leading-tight text-lg min-h-[2.5rem] line-clamp-2">
          <EditableText
            html={book.title}
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ title: val })}
          />
        </h3>

        <div className="text-sm text-gray-500 mb-6 line-clamp-3">
          <EditableText
            html={book.overview || book.description || ""} // Fallback to description if overview empty
            editMode={!!editMode}
            onChange={(val: string) => onUpdate?.({ overview: val })}
          />
        </div>

        {/* ADMIN FIELDS */}
        {editMode && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Book Formatting:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  className="text-xs border-b border-gray-200 bg-transparent p-1 focus:border-blue-400 outline-none"
                  placeholder="Publisher"
                  value={book.publisher || ""}
                  onChange={e => onUpdate?.({ publisher: e.target.value })}
                />
                <input
                  type="text"
                  className="text-xs border-b border-gray-200 bg-transparent p-1 focus:border-blue-400 outline-none"
                  placeholder="Language"
                  value={book.language || ""}
                  onChange={e => onUpdate?.({ language: e.target.value })}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Slug:</span>
              <input
                type="text"
                value={book.slug}
                onChange={(e) => onUpdate?.({ slug: e.target.value })}
                className="text-xs font-medium text-gray-600 bg-transparent outline-none border-b border-gray-200 focus:border-indigo-400"
                placeholder="book-slug"
              />
            </div>
          </div>
        )}

        {/* STICK TO BOTTOM */}
        <div className="mt-auto">
          <motion.div variants={buttonVariants} whileHover="hover">
            {editMode ? (
              <div className="w-full bg-gray-100 text-gray-400 px-6 py-3 rounded-lg text-sm font-medium text-center border-2 border-dashed border-gray-200 cursor-default">
                Navigation Disabled
              </div>
            ) : (
              <Link
                href={`/books/${book.programSlug}/${book.slug}`}
                className="
                  inline-block w-full text-center
                  bg-gradient-to-r from-blue-600 to-cyan-500
                  text-white px-6 py-3 rounded-lg
                  text-sm font-semibold transition-all
                "
              >
                View Book Details
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}