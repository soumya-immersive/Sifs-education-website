"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

const tabs = [
  "All",
  "Institution",
  "Law Enforcement",
  "Forensic Labs",
  "Financial Group",
  "Corporate",
  "Organization",
  "Others",
];

const clients = [
  { logo: "/clients/1.png", category: "Institution" },
  { logo: "/clients/2.png", category: "Institution" },
  { logo: "/clients/3.png", category: "Corporate" },
  { logo: "/clients/4.png", category: "Corporate" },
  { logo: "/clients/5.png", category: "Law Enforcement" },
  { logo: "/clients/6.png", category: "Corporate" },
  { logo: "/clients/7.png", category: "Organization" },
  { logo: "/clients/8.png", category: "Others" },
  { logo: "/clients/9.png", category: "Institution" },
  { logo: "/clients/10.png", category: "Forensic Labs" },
  { logo: "/clients/11.png", category: "Organization" },
  { logo: "/clients/12.png", category: "Others" },
  { logo: "/clients/1.png", category: "Institution" },
  { logo: "/clients/2.png", category: "Institution" },
  { logo: "/clients/3.png", category: "Corporate" },
  { logo: "/clients/4.png", category: "Corporate" },
  { logo: "/clients/5.png", category: "Law Enforcement" },
  { logo: "/clients/6.png", category: "Corporate" },
  { logo: "/clients/7.png", category: "Organization" },
  { logo: "/clients/8.png", category: "Others" },
  { logo: "/clients/9.png", category: "Institution" },
  { logo: "/clients/10.png", category: "Forensic Labs" },
  { logo: "/clients/11.png", category: "Organization" },
  { logo: "/clients/12.png", category: "Others" },
];

export default function SatisfiedClientsPortfolio() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? clients
      : clients.filter((c) => c.category === activeTab);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold mb-8 text-black">
          Satisfied{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Clients’</span>

            {/* Yellow underline */}
            <Image
              src="/yellow-underline.png"
              alt=""
              width={150}
              height={14}
              className="absolute left-1/2 -translate-x-1/2 -bottom-1 z-0"
            />
          </span>{" "}
          Portfolio
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-1 ${
                activeTab === tab
                  ? "text-blue-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Slider Container */}
        <div className="relative border border-blue-300 rounded-2xl px-12 py-6 bg-[#F0F4F5]">

          {/* Arrows */}
          <button className="swiper-prev cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-12 h-12 shadow-lg bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition">
            <ChevronLeft />
          </button>

          <button className="swiper-next cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-12 bg-[#008DD2] text-white rounded-full flex items-center justify-center hover:scale-105 transition">
            <ChevronRight />
          </button>

          <Swiper
            modules={[Navigation, Grid]}
            grid={{ rows: 2, fill: "row" }}
            slidesPerView={6}
            spaceBetween={0}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            loop={true}
            navigation={{
              prevEl: ".swiper-prev",
              nextEl: ".swiper-next",
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="!overflow-hidden"
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="h-34 flex items-center justify-center border-r border-b border-blue-200 last:border-r-0">
                  <Image
                    src={item.logo}
                    alt="Client"
                    width={100}
                    height={60}
                    className="object-contain grayscale hover:grayscale-0 transition"
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
