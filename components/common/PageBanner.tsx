"use client";

import React from "react";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgImage: string; 
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, bgImage }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-16 text-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>

      {subtitle && (
        <p className="mt-2 text-sm md:text-base opacity-90">{subtitle}</p>
      )}
    </div>
  );
};

export default PageBanner;
