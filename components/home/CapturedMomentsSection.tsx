"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Import useRouter

// --- Interfaces and Data ---
interface Moment {
  id: number;
  subtitle: string;
  title: string;
  image: string;
}

const momentData: Moment[] = [
  {
    id: 1,
    subtitle: 'From Clues to Conclusions:',
    title: 'Inside the CSI Workshop at Lucknow',
    image: '/captured-moments/1.png',
  },
  {
    id: 2,
    subtitle: 'A new academic collaboration:',
    title: 'Bridging Academia and Real-World Forensics',
    image: '/captured-moments/1.png',
  },
  {
    id: 3,
    subtitle: 'From Clues to Conclusions:',
    title: 'Inside the CSI Workshop at Lucknow',
    image: '/captured-moments/1.png',
  },
  {
    id: 4,
    subtitle: 'A new academic collaboration:',
    title: 'Bridging Academia and Real-World Forensics',
    image: '/captured-moments/1.png',
  },
];

// --- Framer Motion Variants ---

const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const leftColumnVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const rightColumnVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

// --- Moment Card ---
interface MomentCardProps {
  moment: Moment;
}

const MomentCard: React.FC<MomentCardProps> = ({ moment }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/gallery');
  };

  return (
    <div 
      onClick={handleNavigate}
      className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl h-full cursor-pointer group"
    >
      <div className="relative p-4 md:p-6 bg-gray-50">
        <div className="relative">
          <div
            className="absolute inset-0 z-0 opacity-20 rounded-lg"
            style={{
              backgroundImage: 'url(https://i.imgur.com/blueprint_pattern.png)',
              backgroundSize: '20px 20px',
            }}
          ></div>

          <div className="relative rounded-lg overflow-hidden">
            <img
              src={moment.image}
              alt={moment.title}
              className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <span className="absolute top-4 right-4 text-xs font-bold text-gray-400">
            [Logo]
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <p className="text-sm font-semibold text-orange-500 mb-1">{moment.subtitle}</p>
        <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-[#008DD2] transition-colors">
          {moment.title}
        </h3>
      </div>
    </div>
  );
};

// --- Main Component ---
const CapturedMomentsSection: React.FC = () => {
  const swiperRef = useRef<any>(null);

  return (
    <div
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(to right, #fdf8e6, #ffffff 40%)',
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* LEFT */}
        <motion.div className="text-left" variants={leftColumnVariants}>
          <p className="text-sm font-bold text-[#3A58EE] uppercase mb-2">Captured Achievements</p>
          <h1 className="text-4xl font-bold text-black mb-4">Our Captured Moments</h1>
          <p className="text-md text-[#6B7385] max-w-md">
            Cherishing Achievements Framed in Time: Our Legacy of Excellence and Joy
          </p>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 bg-white text-[#008DD2] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 hover:bg-gray-50 cursor-pointer"
              aria-label="Previous Moment"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 bg-[#008DD2] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 hover:bg-[#008DD2] cursor-pointer"
              aria-label="Next Moment"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div className="relative" variants={rightColumnVariants}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
            }}
            className="mySwiper"
          >
            {momentData.map((moment) => (
              <SwiperSlide key={moment.id}>
                <MomentCard moment={moment} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CapturedMomentsSection;