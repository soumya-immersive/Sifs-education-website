"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";
import { TeamData } from "@/types/about-page";

interface ExpertTeamProps {
  data: TeamData;
  editMode: boolean;
  updateData: (newData: TeamData) => void;
}

export default function ExpertTeam({ data, editMode, updateData }: ExpertTeamProps) {

  const addExpert = () => {
    updateData({
      ...data,
      experts: [
        ...data.experts,
        {
          name: "New Member",
          role: "Role",
          image: "/teams/team1.png" // placeholder
        }
      ]
    });
  };

  const removeExpert = (index: number) => {
    if (confirm("Remove this team member?")) {
      const newExperts = data.experts.filter((_, i) => i !== index);
      updateData({ ...data, experts: newExperts });
    }
  };

  return (
    <section
      className="py-20 bg-cover bg-center"
      style={{
        backgroundImage: "url('/about-us/team-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="text-sm font-normal text-[#3A58EE]">
              <EditableText
                html={data.subtitle}
                editMode={editMode}
                onChange={(val) => updateData({ ...data, subtitle: val })}
              />
            </div>
            <h2 className="text-2xl font-semibold text-black">
              <EditableText
                html={data.headingPrefix}
                editMode={editMode}
                onChange={(val) => updateData({ ...data, headingPrefix: val })}
                as="span"
                className="mr-1"
              />
              <span className="relative inline-block mr-1">
                <span className="relative z-10">
                  <EditableText
                    html={data.headingHighlight}
                    editMode={editMode}
                    onChange={(val) => updateData({ ...data, headingHighlight: val })}
                    as="span"
                  />
                </span>

                {/* Yellow underline */}
                <Image
                  src="/yellow-underline.png"
                  alt=""
                  width={120}
                  height={14}
                  className="absolute left-0 -bottom-1 z-0"
                />
              </span>
              <EditableText
                html={data.headingSuffix}
                editMode={editMode}
                onChange={(val) => updateData({ ...data, headingSuffix: val })}
                as="span"
              />
            </h2>
          </div>

          <Link
            href={data.browseLink}
            onClick={(e) => editMode && e.preventDefault()}
            className={`px-5 py-2 rounded-lg text-sm text-white
                       bg-gradient-to-r from-violet-600 to-indigo-600
                       hover:from-violet-700 hover:to-indigo-700
                       transition ${editMode ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            <EditableText
              html={data.browseText}
              editMode={editMode}
              onChange={(val) => updateData({ ...data, browseText: val })}
              as="span"
            />
          </Link>
        </div>

        {/* TEAM GRID */}
        <div className="grid md:grid-cols-4 gap-6">
          {data.experts.map((item, i) => (
            <motion.div
              key={i}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative rounded-xl overflow-hidden shadow-md group text-center"
            >
              {editMode && (
                <button
                  onClick={() => removeExpert(i)}
                  className="absolute top-2 right-2 z-20 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                  title="Remove Member"
                >
                  <Trash2 size={16} />
                </button>
              )}

              {/* IMAGE */}
              <EditableImage
                src={item.image}
                editMode={editMode}
                onChange={(src) => {
                  const newExperts = [...data.experts];
                  newExperts[i].image = src;
                  updateData({ ...data, experts: newExperts });
                }}
                className="w-full h-[360px] object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0
                bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
              />

              {/* TEXT ABOVE OVERLAY */}
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: {
                    scale: 1.12,
                    transition: { duration: 0.35, ease: "easeOut" },
                  },
                }}
                className="absolute bottom-0 left-0 right-0 p-4 text-white z-10"
              >
                <div className="font-semibold leading-tight">
                  <EditableText
                    html={item.name}
                    editMode={editMode}
                    onChange={(val) => {
                      const newExperts = [...data.experts];
                      newExperts[i].name = val;
                      updateData({ ...data, experts: newExperts });
                    }}
                    className="text-white"
                  />
                </div>
                <div className="text-xs opacity-90 text-[#D08522]">
                  <EditableText
                    html={item.role}
                    editMode={editMode}
                    onChange={(val) => {
                      const newExperts = [...data.experts];
                      newExperts[i].role = val;
                      updateData({ ...data, experts: newExperts });
                    }}
                    className="text-[#D08522]"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {editMode && (
            <button
              onClick={addExpert}
              className="flex flex-col items-center justify-center h-[360px] border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <Plus size={32} />
              <span className="mt-2 font-medium">Add Member</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
