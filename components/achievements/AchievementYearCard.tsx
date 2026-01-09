"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

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
}

export default function AchievementYearCard({
  data,
}: AchievementYearCardProps) {

  if (!data) return null;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      autoplay={{
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
              <div
                dangerouslySetInnerHTML={{ __html: slide.year }}
              />
            </div>

            <div className="space-y-4 text-sm">
              {slide.sections.map((sec, idx) => (
                <div key={idx}>
                  <div className="font-semibold">
                    <div
                      dangerouslySetInnerHTML={{ __html: sec.title }}
                    />
                  </div>
                  <div className="opacity-90 leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{ __html: sec.text }}
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
