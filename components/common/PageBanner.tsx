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
      className="bg-cover bg-center bg-no-repeat py-20 text-center text-white relative transition-all"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </h1>

        {subtitle !== undefined && (
          <div className="mt-2 text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: subtitle }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;

