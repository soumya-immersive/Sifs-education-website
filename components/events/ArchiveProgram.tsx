"use client";

import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Edit, Plus, Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, easeOut } from "framer-motion";
import { ArchiveProgramData } from "../../types/events-page";
import EditableText from "../editable/EditableText";
import EditableImage from "../editable/EditableImage";

interface ArchiveProgramProps {
  data: ArchiveProgramData;
  editMode: boolean;
  onUpdate: (data: Partial<ArchiveProgramData>) => void;
}

const ProgramCard = ({
  program,
  index,
  editMode,
  onUpdateProgram,
  onDeleteProgram
}: {
  program: ArchiveProgramData['programs'][0];
  index: number;
  editMode: boolean;
  onUpdateProgram: (index: number, p: Partial<ArchiveProgramData['programs'][0]>) => void;
  onDeleteProgram: (index: number) => void;
}) => {
  const buttonClasses = program.primary
    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
    : 'bg-gray-100 hover:bg-gray-300 text-gray-400';

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 relative group h-full flex flex-col">
      {editMode && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Delete this program?")) onDeleteProgram(index);
          }}
          className="absolute top-2 right-2 z-50 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      )}

      <div className="relative h-48 overflow-hidden shrink-0">
        <EditableImage
          src={program.image}
          alt={program.title}
          editMode={editMode}
          onChange={(src) => onUpdateProgram(index, { image: src })}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-sm text-[#008DD2] mb-1">
          <EditableText
            html={program.date}
            editMode={editMode}
            onChange={(val) => onUpdateProgram(index, { date: val })}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <EditableText
            html={program.title}
            editMode={editMode}
            onChange={(val) => onUpdateProgram(index, { title: val })}
          />
        </h3>

        <hr className="mt-auto" />

        <button
          className={`flex items-center justify-center w-full py-3 rounded-lg font-normal transition duration-300 ease-in-out mt-3 cursor-pointer ${buttonClasses}`}
        >
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function ArchiveProgram({ data, editMode, onUpdate }: ArchiveProgramProps) {
  const swiperRef = useRef<any>(null);

  const handleUpdateProgram = (index: number, updates: Partial<ArchiveProgramData['programs'][0]>) => {
    const newPrograms = [...data.programs];
    newPrograms[index] = { ...newPrograms[index], ...updates };
    onUpdate({ programs: newPrograms });
  };

  const handleDeleteProgram = (index: number) => {
    const newPrograms = data.programs.filter((_, i) => i !== index);
    onUpdate({ programs: newPrograms });
  };

  const handleAddProgram = () => {
    const newProgram = {
      title: "New Program",
      date: "Date",
      image: "/online-courses/1.png",
      primary: false
    };
    onUpdate({ programs: [...data.programs, newProgram] });
  };

  const [showAll, setShowAll] = React.useState(false);

  // Auto-swipe functionality
  // Note: Swiper Autoplay module must be imported if we want true auto-swipe. 
  // User asked for "auto swipe from lef tto right". Default is left to right.
  // We need to import Autoplay module.

  // Logic for display:
  // If editing, we probably want to see *all* or have a way to access them. Slider works fine for access, but user said "when editing then show all possoble programs cards there". 
  // Maybe grid view when editing? Or just ensuring all are swipable? 
  // "explore all bitton to show all and when editing then show all possoble programs cards there"
  // This implies expanding the view.

  const displayPrograms = (editMode || showAll) ? data.programs : data.programs; // All are always in data, but maybe we want to render them in a GRID if "show all"?
  // If we are using Swiper, showing "all" means either showing all slides (which it does) or switching to a Grid layout?
  // User said "show all button ... when editing then show all possible programs cards there"
  // Let's toggle between Swiper and Grid.

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            <EditableText
              html={data.title}
              editMode={editMode}
              onChange={(val) => onUpdate({ title: val })}
            />
          </h2>

          <div className="flex gap-4">

            <button
              onClick={() => !editMode && setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
               hover:from-[#354ED8] hover:to-[#A24EDC] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${editMode ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {showAll ? 'Show Less' : 'Explore All'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Content: Swiper OR Grid */}
        <motion.div className="relative" variants={itemVariants}>
          {(editMode || showAll) ? (
            // Grid View for "Show All" or "Edit Mode"
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.programs?.map((program, index) => (
                <div key={index} className="h-full">
                  <ProgramCard
                    program={program}
                    index={index}
                    editMode={editMode}
                    onUpdateProgram={handleUpdateProgram}
                    onDeleteProgram={handleDeleteProgram}
                  />
                </div>
              ))}

              {/* Add New Program Card */}
              {editMode && (
                <motion.div
                  initial="visible"
                  animate="visible"
                  onClick={handleAddProgram}
                  className="flex min-h-[300px] h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100 hover:border-blue-400 transition-all group"
                >
                  <div className="mb-4 rounded-full bg-white p-4 shadow-sm group-hover:shadow-md transition-all">
                    <Plus size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Add Program</h3>
                </motion.div>
              )}
            </div>
          ) : (
            // Swiper View
            <>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1.2}
                loop={true}
                /* Autoplay must be configured in Swiper component props to work, but we didn't import Autoplay module in this file yet. 
                   I will need to add the import in a separate `multi_replace` or `replace_file` is not enough if imports change at top.
                   Actually I can replace the whole file or use `multi_replace` to add imports.
                   Let's stick to simple props for now, I'll update imports later or use `write_to_file`.
                */
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 4 },
                }}
                className="!pb-12"
              >
                {data.programs?.map((program, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <ProgramCard
                      program={program}
                      index={index}
                      editMode={editMode}
                      onUpdateProgram={handleUpdateProgram}
                      onDeleteProgram={handleDeleteProgram}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white text-[#008DD2] rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center hover:scale-110 transition cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#008DD2] text-white rounded-full shadow-lg z-20 hidden lg:flex items-center justify-center hover:scale-110 transition cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
