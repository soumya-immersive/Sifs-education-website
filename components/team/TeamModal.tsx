"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { TeamMember } from "../../types/team";

interface Props {
  member: TeamMember | null;
  onClose: () => void;
  editMode?: boolean;
  onUpdate?: (id: string, field: keyof TeamMember, value: string) => void;
  onSave?: () => void;
}

export default function TeamModal({ member, onClose, editMode, onUpdate, onSave }: Props) {
  if (!member) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-black/70 flex items-center justify-center px-4"
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
          className="absolute top-4 right-4 text-gray-600 hover:text-black z-10 bg-white rounded-full p-1"
        >
          <X size={22} />
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* IMAGE */}
          <div className="bg-[#5b88c6] rounded-lg overflow-hidden h-[300px] md:h-auto">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-pink-600 uppercase">
                <div dangerouslySetInnerHTML={{ __html: member.name }} />
              </h2>

              <div
                className="font-medium text-gray-700 mt-1"
                dangerouslySetInnerHTML={{ __html: member.role }}
              />
            </div>

            <div className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line flex-grow">
              {editMode && onUpdate ? (
                <div className="flex flex-col h-full gap-2">
                  <textarea
                    value={member.description}
                    onChange={(e) => onUpdate(member.id, 'description', e.target.value)}
                    className="w-full h-[200px] p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Enter full description here..."
                  />
                  {onSave && (
                    <button
                      onClick={onSave}
                      className="self-end px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                    >
                      Save Details
                    </button>
                  )}
                </div>
              ) : (
                member.description
              )}
            </div>

            {editMode && (
              <p className="text-xs text-gray-400 mt-2 italic">
                * Description changes are saved specifically here.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
