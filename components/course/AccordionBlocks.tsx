"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const SECTIONS = ["Curriculum", "FAQ", "Case Studies", "Reviews"];

export default function AccordionBlocks() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {SECTIONS.map((title, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={title}
            className="bg-[#4559ed26] rounded-lg overflow-hidden border border-[#E3E9FF]"
          >
            {/* Header */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-black hover:bg-[#E8EEFF] transition"
            >
              {title}

              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Content */}
            {isOpen && (
              <div className="px-5 py-4 text-sm text-gray-600 bg-white">
                <p>
                  This is the {title.toLowerCase()} content. You can replace
                  this with actual data or components.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
