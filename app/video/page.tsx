"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, ChevronDown, ChevronUp } from "lucide-react"; 

interface VideoItem {
  id: number;
  title: string;
  subtitle: string; 
  img: string;
  videoUrl: string;
}

const videoItems: VideoItem[] = [ 
  {
    id: 1,
    title: "SHOCKING Card Swapping Case",
    subtitle: "Cyber Forensic Analysis",
    img: "/video1.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
  {
    id: 2,
    title: "Prevent Fraud Calls Like a PRO",
    subtitle: "Digital Safety Tips",
    img: "/video2.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
  {
    id: 3,
    title: "Insurance Investigation After CAR FIRE",
    subtitle: "Forensic Investigation",
    img: "/video3.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
  {
    id: 4,
    title: "Secret Techniques of Photo Facial Analysis",
    subtitle: "Image Forensics",
    img: "/video4.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
  {
    id: 5,
    title: "Photo Morphing: Magical Transformations",
    subtitle: "Multimedia Analysis",
    img: "/video5.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
  {
    id: 6,
    title: "EXPOSING Fake Photos: Deciphering the Truth",
    subtitle: "Expert Verification",
    img: "/video6.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WoOTTfD3oSA",
  },
];

export default function VideoGalleryPage() {
  const INITIAL_LIMIT = 3; 
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  const isAllLoaded = visibleCount >= videoItems.length;

  const toggleVisibleItems = () => {
    if (isAllLoaded) {
      setVisibleCount(INITIAL_LIMIT); 
    } else {
      setVisibleCount(videoItems.length); 
    }
  };

  const handleVideoClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="w-full mb-12">
      {/* Banner Section */}
      <div className="w-full h-52 md:h-64 relative">
        <Image
          src="/gallery-banner.png"
          alt="Video Gallery Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                Visual Gallery
            </h1>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Forensic Science Events Video Showcase
        </h2>
        <p className="text-lg text-gray-600 mt-1">Event Highlights & More</p>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoItems.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            onClick={() => handleVideoClick(item.videoUrl)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-3 border cursor-pointer group" 
          >
            <div className="relative w-full h-48 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-16 h-16 text-white bg-indigo-600/80 rounded-full p-3 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-900 text-center">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 text-center">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Load More/Less Button */}
      <div className="w-full flex justify-center pb-12">
        <button 
          onClick={toggleVisibleItems}
          className="cursor-pointer flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#3E58EE] to-[#B565E7] hover:from-[#354ED8] hover:to-[#A24EDC] text-white font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          {isAllLoaded ? (
            <>
              Load Less <ChevronUp className="w-5 h-5" />
            </>
          ) : (
            <>
              Load More <ChevronDown className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}