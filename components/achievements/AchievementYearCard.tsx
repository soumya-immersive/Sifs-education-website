"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function AchievementSlider() {
  const slides = [
    {
      year: "2018 - 2019",
      sections: [
        {
          title: "Police Training",
          text:
            "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police",
        },
        {
          title: "Educational Visits / Keynote & Guest Sessions",
          text:
            "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College",
        },
        {
          title: "Workshops",
          text: "National Workshop – SACH – A TITHI and Photo Facial Analysis",
        },
      ],
    },
    {
      year: "2019 - 2020",
      sections: [
        {
          title: "Police Training",
          text:
            "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police",
        },
        {
          title: "Educational Visits / Keynote & Guest Sessions",
          text:
            "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College",
        },
        {
          title: "Workshops",
          text: "National Workshop – SACH – A TITHI and Photo Facial Analysis",
        },
      ],
    },
    {
      year: "2020 - 2021",
      sections: [
        {
          title: "Police Training",
          text:
            "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police",
        },
        {
          title: "Educational Visits / Keynote & Guest Sessions",
          text:
            "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College",
        },
        {
          title: "Workshops",
          text: "National Workshop – SACH – A TITHI and Photo Facial Analysis",
        },
      ],
    },
  ];

  return (
    <Swiper
      modules={[Pagination]}
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
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 p-6 text-white min-h-[320px]">
            <h4 className="font-semibold mb-4">{slide.year}</h4>

            <div className="space-y-4 text-sm">
              {slide.sections.map((sec, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{sec.title}</p>
                  <p className="opacity-90 leading-relaxed">{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
