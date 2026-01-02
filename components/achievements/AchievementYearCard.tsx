"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import EditableText from "../editable/EditableText";

import "swiper/css";
import "swiper/css/pagination";

interface AchievementYearCardProps {
  data: {
    slides: {
      year: string;
      sections: {
        title: string;
        text: string;
      }[];
    }[];
  };
  editMode: boolean;
  updateData: (data: any) => void;
}

export default function AchievementYearCard({
  data,
  editMode,
  updateData
}: AchievementYearCardProps) {

  if (!data) return null;

  const updateSlideYear = (slideIndex: number, val: string) => {
    const newSlides = [...data.slides];
    newSlides[slideIndex] = { ...newSlides[slideIndex], year: val };
    updateData({ ...data, slides: newSlides });
  }

  const updateSection = (slideIndex: number, sectionIndex: number, field: "title" | "text", val: string) => {
    const newSlides = [...data.slides];
    const newSections = [...newSlides[slideIndex].sections];
    newSections[sectionIndex] = { ...newSections[sectionIndex], [field]: val };
    newSlides[slideIndex] = { ...newSlides[slideIndex], sections: newSections };
    updateData({ ...data, slides: newSlides });
  }

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      autoplay={editMode ? false : { // Disable autoplay in edit mode
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      className="achievement-swiper w-full"
    >
      {data.slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-6 text-white min-h-[320px]">
            <div className="font-semibold mb-4 text-lg">
              <EditableText
                html={slide.year}
                editMode={editMode}
                onChange={(val) => updateSlideYear(i, val)}
              />
            </div>

            <div className="space-y-4 text-sm">
              {slide.sections.map((sec, idx) => (
                <div key={idx}>
                  <div className="font-semibold">
                    <EditableText
                      html={sec.title}
                      editMode={editMode}
                      onChange={(val) => updateSection(i, idx, "title", val)}
                    />
                  </div>
                  <div className="opacity-90 leading-relaxed">
                    <EditableText
                      html={sec.text}
                      editMode={editMode}
                      onChange={(val) => updateSection(i, idx, "text", val)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
