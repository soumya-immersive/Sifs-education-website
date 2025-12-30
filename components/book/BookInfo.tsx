"use client";

import { motion } from "framer-motion";
import { Calendar, Globe, Hash, Library } from "lucide-react";
import { Book } from "../../data/books";

interface Props {
  book: Book;
}

export default function BookDetails({ book }: Props) {
  const detailItems = [
    {
      label: "Publisher",
      value: book.publisher || "Not Specified",
      icon: <Library className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Language",
      value: book.language || "English",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Pages",
      value: `${book.pageCount || "---"} Pages`,
      icon: <Hash className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Published",
      value: book.publishedDate || "Recently",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {detailItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-start p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="mb-3 p-2 bg-white rounded-lg shadow-sm">
              {item.icon}
            </div>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-900 mt-1">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
          {book.fullDescription || book.description}
        </div>
      </div>
    </section>
  );
}