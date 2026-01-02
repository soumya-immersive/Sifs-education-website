"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { TeamMember } from "../../types/team";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: Props) {
  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ duration: 0.3 }}
        className="bg-white max-w-4xl w-full rounded-xl p-8 relative overflow-y-auto max-h-[90vh]"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className="bg-[#5b88c6] rounded-lg overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-xl font-semibold text-pink-600 uppercase">
              {member.name}
            </h2>

            <p className="font-medium text-gray-700 mt-1">
              {member.role}
            </p>

            <div className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {member.description}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
