"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ActiveTabTitleProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const ActiveTabTitle: React.FC<ActiveTabTitleProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative pb-3 text-base md:text-lg font-medium transition duration-200 ease-in-out outline-none cursor-pointer ${
        isActive
          ? 'text-black font-bold'
          : 'text-gray-500 hover:text-[#B065E8]'
      }`}
    >
      {title}
      
      {/* Custom Brush Stroke Indicator */}
      {isActive && (
        <motion.span 
          layoutId="activeTabUnderline"
          className="absolute bottom-0 left-0 w-full h-1"
          style={{
            background: 'linear-gradient(to right, #B065E8, #B065E8, #a05fe0, #B065E8)',
            borderRadius: '2px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(176, 101, 232, 0.5)',
          }}
        />
      )}
    </button>
  );
};

export default ActiveTabTitle;