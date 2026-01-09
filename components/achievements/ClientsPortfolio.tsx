"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

interface ClientsPortfolioProps {
  data: {
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    categories?: string[];
    items: {
      logo: string;
      category: string;
    }[];
  };
}

export default function SatisfiedClientsPortfolio({
  data,
}: ClientsPortfolioProps) {
  const [activeTab, setActiveTab] = useState("All");

  const defaultCategories = [
    "Institution",
    "Law Enforcement",
    "Forensic Labs",
    "Financial Group",
    "Corporate",
    "Organization",
    "Others"
  ];

  const categories = data?.categories || defaultCategories;

  if (!data) return null;

  const filtered =
    activeTab === "All"
      ? data.items
      : data.items.filter((c) => c.category === activeTab);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold mb-8 text-black">
          <div
            dangerouslySetInnerHTML={{ __html: data.headingPrefix }}
            className="inline"
          />{" "}
          <span className="relative inline-block">
            <span className="relative z-10">
              <div
                dangerouslySetInnerHTML={{ __html: data.headingHighlight }}
                className="inline"
              />
            </span>
            <Image
              src="/yellow-underline.png"
              alt=""
              width={150}
              height={14}
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
            />
          </span>{" "}
          <div
            dangerouslySetInnerHTML={{ __html: data.headingSuffix }}
            className="inline"
          />
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm items-center">
          <button
            onClick={() => setActiveTab("All")}
            className={`relative pb-1 ${activeTab === "All"
              ? "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600"
              : "text-gray-500"
              }`}
          >
            All
          </button>

          {categories.map((tab, idx) => (
            <div key={idx} className="relative group flex items-center">
              <button
                onClick={() => setActiveTab(tab)}
                className={`relative pb-1 ${activeTab === tab
                  ? "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500"
                  }`}
              >
                {tab}
              </button>
            </div>
          ))}
        </div>

        {/* Slider Container */}
        <div className="relative border border-blue-300 rounded-2xl px-12 py-8 bg-[#F0F4F5] min-h-[300px]">

          {/* Arrows */}
          <button className="swiper-prev cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 shadow-lg bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition z-10">
            <ChevronLeft />
          </button>

          <button className="swiper-next cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition z-10">
            <ChevronRight />
          </button>

          <Swiper
            modules={[Navigation, Grid, Autoplay]}
            grid={{ rows: 2, fill: "row" }}
            slidesPerView={2}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 30 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 6, spaceBetween: 30 },
            }}
            className="!pb-0"
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <div className="group relative flex items-center justify-center border border-blue-200 bg-white/50 rounded-xl p-4 h-[120px] mb-6 last:mb-0 hover:bg-white hover:shadow-sm transition-all">
                  <img
                    src={item.logo || "/placeholder.png"}
                    alt="Client"
                    className="object-contain w-full h-full max-h-[80px]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
