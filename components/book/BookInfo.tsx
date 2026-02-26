"use client";

import { motion } from "framer-motion";
import { Calendar, Globe, Hash, Library } from "lucide-react";
import { Book } from "@/types/book";

interface Props {
  book: Book;
}

export default function BookInfo({ book }: Props) {
  const detailItems = [
    {
      label: "Code",
      value: book.book_code || "SIFS-BOOK",
      icon: <Library className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Language",
      value: "English",
      icon: <Globe className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Pages",
      value: `${book.page_count || "---"} Pages`,
      icon: <Hash className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Published",
      value: book.publish_date ? new Date(book.publish_date).toLocaleDateString() : "Recently",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
    },
  ];

  return (
    <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {detailItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-4 bg-gray-50/50 rounded-2xl border border-gray-100"
          >
            <div className="mb-3 p-2 bg-white rounded-xl shadow-sm">
              {item.icon}
            </div>
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
              {item.label}
            </span>
            <span className="text-sm font-bold text-gray-900 mt-1">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
          Synopsis & Overview
        </h2>
        <div
          className="prose prose-blue max-w-none text-gray-600 leading-loose text-lg"
          dangerouslySetInnerHTML={{ __html: book.description }}
        />
      </div>
    </section>
  );
}