"use client";

import React from "react";

interface PageBannerProps {
  title: string;
  // Option 1: Reference from the React namespace
  subtitle?: React.ReactNode;
  bgImage: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, bgImage }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-16 text-center text-white relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better readability if needed, though not strictly requested. Keeping as is but rendering HTML. */}
      <h1
        className="text-3xl md:text-4xl font-extrabold"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {subtitle && (
        <div
          className="mt-2 text-sm md:text-base opacity-90"
          dangerouslySetInnerHTML={{ __html: subtitle as string }}
        />
      )}
    </div>
  );
};

export default PageBanner;