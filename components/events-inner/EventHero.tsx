"use client";

import React, { useState, useEffect } from "react";
import { Event } from "../../types/events-page";
import Image from "next/image";

interface EventHeroProps {
  event: Event;
}

const EventHero = ({ event }: EventHeroProps) => {
  const backgroundImage = event.heroImage || "/event/hero-bg.png";
  const overlapImage = event.coverImage || "/event/hero-bg1.png";

  // Parse event date for countdown. Assuming format "08 Dec, 2025" or similar.
  // We try to parse it, fallback to extensive future date if fail.
  const targetDate = new Date(event.date).getTime() || new Date().getTime() + 86400000 * 10;

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0"),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative w-full">

      {/* ================= HERO SECTION ================= */}
      <div
        className="relative w-full flex flex-col items-center
                   pt-10 px-6 pb-32 md:pb-44
                   bg-gradient-to-r from-[#f7f9fc] via-[#eef5e6] to-[#f3fbfa] bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="text-orange-500 font-bold text-sm md:text-base mb-2 uppercase tracking-widest">
          <div dangerouslySetInnerHTML={{ __html: event.category || "Micro Certificate Program" }} />
        </div>

        <h1 className="text-3xl md:text-6xl font-black text-gray-900 mb-10 text-center max-w-4xl">
          <div dangerouslySetInnerHTML={{ __html: event.title }} />
        </h1>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          <TimerCard value={timeLeft.days} label="DAYS" color="border-blue-400" bgColor="bg-blue-50/50" />
          <TimerCard value={timeLeft.hours} label="HOUR" color="border-orange-300" bgColor="bg-orange-50/50" />
          <TimerCard value={timeLeft.minutes} label="MIN" color="border-green-300" bgColor="bg-green-50/50" />
          <TimerCard value={timeLeft.seconds} label="SEC" color="border-purple-300" bgColor="bg-purple-50/50" />
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex items-center">
            <div className="text-orange-500 text-3xl md:text-5xl font-black mr-3">
              <div dangerouslySetInnerHTML={{ __html: event.date.split(" ")[0] }} />
            </div>
            <div className="text-gray-900 font-black text-xl md:text-2xl uppercase tracking-tighter">
              <div dangerouslySetInnerHTML={{ __html: event.date.split(" ").slice(1).join(" ") }} />
            </div>
          </div>

          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 shadow-xl active:scale-95 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.618L15 11.618V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3.618l6 3V8.618z" />
            </svg>
            <span className="font-bold text-lg capitalize flex gap-1">
              <div dangerouslySetInnerHTML={{ __html: event.mode.toString() }} /> Platform
            </span>
          </button>
        </div>
      </div>

      {/* ================= OVERLAPPING IMAGE ================= */}
      <div className="relative z-20 -mt-20 md:-mt-32 px-12 hidden md:block">
        <div className="mx-auto max-w-7xl">
          <div className="relative h-[400px]">
            <Image
              src={overlapImage}
              alt={event.title}
              fill
              className="w-full rounded-[32px] object-cover shadow-2xl"
            />
            <div className="absolute inset-0 rounded-[32px]
                            shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]
                            pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= TIMER CARD ================= */
interface TimerCardProps {
  value: string;
  label: string;
  color: string;
  bgColor: string;
}

const TimerCard = ({ value, label, color, bgColor }: TimerCardProps) => (
  <div
    className={`flex flex-col items-center justify-center
                w-20 h-24 md:w-28 md:h-32
                border-2 rounded-2xl ${color} ${bgColor}
                backdrop-blur-sm shadow-sm`}
  >
    <span className="text-3xl md:text-7xl font-black text-gray-800 leading-none">
      {value}
    </span>
    <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 tracking-widest">
      {label}
    </span>
  </div>
);

export default EventHero;
