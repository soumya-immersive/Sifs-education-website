"use client";

import React, { useState, useEffect } from 'react';
import { Event } from "../../data/events"; // Ensure this path is correct

interface EventHeroProps {
  event: Event;
}

const EventHero = ({ event }: EventHeroProps) => {
  // Paths to your images in the public/event folder
  const backgroundImage = '/event/hero-bg.png'; 
  const overlapImage = '/event/hero-bg1.png'; // The big overlapping image

  // --- Countdown Logic ---
  // Using a fixed date or you can use event.date if you parse it to a timestamp
  const targetDate = new Date('January 12, 2026 00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '00', hours: '00', minutes: '00', seconds: '00'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative w-full flex flex-col items-center overflow-visible">
      
      {/* 1. MAIN BANNER BOX */}
      <div 
        className="relative w-full min-h-[400px] flex flex-col items-center justify-center pt-6 md:pt-10 px-6 md:px-10 pb-24 overflow-hidden border border-gray-200 mb-24"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header Text - Now Dynamic */}
        <p className="text-orange-500 font-bold text-sm md:text-base mb-2 uppercase tracking-widest">
          {event.category || "Micro Certificate Program"}
        </p>
        <h1 className="text-3xl md:text-6xl font-black text-gray-900 mb-10 text-center max-w-4xl">
          {event.title}
        </h1>

        {/* Countdown Grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          <TimerCard value={timeLeft.days} label="DAYS" color="border-blue-400" bgColor="bg-blue-50/50" />
          <TimerCard value={timeLeft.hours} label="HOUR" color="border-orange-300" bgColor="bg-orange-50/50" />
          <TimerCard value={timeLeft.minutes} label="MIN" color="border-green-300" bgColor="bg-green-50/50" />
          <TimerCard value={timeLeft.seconds} label="SEC" color="border-purple-300" bgColor="bg-purple-50/50" />
        </div>

        {/* Footer Info Row - Now Dynamic */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div className="flex items-center">
            <span className="text-orange-500 text-3xl md:text-5xl font-black mr-3">
               {/* Extracting day from string if possible, otherwise showing full date */}
               {event.date.split(' ')[0]}
            </span>
            <span className="text-gray-900 font-black text-xl md:text-2xl uppercase tracking-tighter">
              {event.date.split(' ').slice(1).join(' ')}
            </span>
          </div>
          
          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 transition-all shadow-xl active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.618L15 11.618V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3.618l6 3V8.618z" />
            </svg>
            <span className="font-bold text-lg capitalize">{event.mode} Platform</span>
          </button>
        </div>
      </div>

      {/* Overlapping Image */}
      <div className="absolute bottom-0 z-20 w-full max-w-7xl transform top-[420px] px-8 hidden md:block">
        <div className="relative group">
          <img 
            src={overlapImage} 
            alt={event.title} 
            className="w-full h-auto rounded-[32px] object-cover shadow-2xl"
          />
          <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none"></div>
        </div>
      </div>

    </div>
  );
};

// Reusable Sub-component for Timer Boxes with Types
interface TimerCardProps {
    value: string;
    label: string;
    color: string;
    bgColor: string;
}

const TimerCard = ({ value, label, color, bgColor }: TimerCardProps) => (
  <div className={`flex flex-col items-center justify-center w-20 h-24 md:w-28 md:h-32 border-2 rounded-2xl ${color} ${bgColor} backdrop-blur-sm shadow-sm`}>
    <span className="text-3xl md:text-5xl font-black text-gray-800 leading-none">{value}</span>
    <span className="text-[10px] md:text-xs font-bold text-gray-500 mt-3 tracking-widest">{label}</span>
  </div>
);

export default EventHero;