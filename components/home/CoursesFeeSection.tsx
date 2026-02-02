"use client";

import { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useFeeCategoriesData } from "@/hooks/useFeeCategoriesData";
import { FeeCategory } from "@/types/fee";

// --- Framer Motion Variants ---

const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.15 },
  },
};

const itemSlideUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as any },
  },
};

const cardsGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as any },
  },
};

export default function CoursePricing() {
  const { feeCategories, selectedCategoryFees, loading, feesLoading, fetchCategoryFees, sectionTitle, sectionSubtitle } = useFeeCategoriesData();
  const [activeCategory, setActiveCategory] = useState<FeeCategory | null>(null);
  // Track active ID instead of index to maintain highlight state across tabs
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  // Set first category as active when categories are loaded
  useEffect(() => {
    if (feeCategories.length > 0 && !activeCategory) {
      setActiveCategory(feeCategories[0]);
      fetchCategoryFees(feeCategories[0].slug);
    }
  }, [feeCategories, activeCategory, fetchCategoryFees]);

  // Handle category change
  const handleCategoryChange = (category: FeeCategory) => {
    setActiveCategory(category);
    setActiveLevel(null);
    fetchCategoryFees(category.slug);
  };

  // Show loading skeleton while fetching categories
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-[#fbfcff] relative bg-[url('/fee-structure/bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-10"></div>
            <div className="flex justify-center gap-6 mb-14">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded w-32"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderTitle = () => {
    if (!sectionTitle) {
      return (
        <>
          Courses &{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Training Fee</span>
            <Image
              src="/yellow-underline.png"
              alt=""
              width={180}
              height={16}
              className="absolute left-0 -bottom-2 z-0"
            />
          </span>
        </>
      );
    }

    const parts = sectionTitle.split('&');
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}&{" "}
          <span className="relative inline-block">
            <span className="relative z-10">{parts[1]}</span>
            <Image
              src="/yellow-underline.png"
              alt=""
              width={180}
              height={16}
              className="absolute left-0 -bottom-2 z-0"
            />
          </span>
        </>
      );
    }

    return sectionTitle;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fbfcff] relative bg-[url('/fee-structure/bg.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="max-w-6xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.div variants={itemSlideUpVariants}>
          <h2 className="text-2xl font-semibold text-black">
            {renderTitle()}
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-2xl mx-auto">
            {sectionSubtitle || "Invest in Your Knowledge: Discover the Right Courses and Training Fees That Fit You"}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.nav
          className="flex flex-wrap justify-center gap-6 mt-10"
          variants={itemSlideUpVariants}
        >
          {feeCategories.map((category) => {
            const active = category.id === activeCategory?.id;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-1 pb-2 text-sm font-semibold transition-colors cursor-pointer ${active ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
                  }`}
              >
                <span>{category.name}</span>
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 transition-all ${active ? "bg-purple-600 scale-x-100" : "bg-transparent scale-x-0"
                    }`}
                />
              </button>
            );
          })}
        </motion.nav>

        {/* Cards Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory?.id}
            className={`grid gap-8 mt-14 ${selectedCategoryFees.length === 0
              ? "flex justify-center"
              : selectedCategoryFees.length === 1
                ? "flex justify-center"
                : selectedCategoryFees.length === 2
                  ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                  : "grid-cols-1 sm:grid-cols-3"
              }`}
            variants={cardsGridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {feesLoading ? (
              // Loading skeleton for fees
              [1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="relative flex justify-center w-full max-w-md mx-auto"
                  variants={cardVariants}
                >
                  <div className="w-full rounded-2xl px-12 pt-8 pb-16 bg-gray-100 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>
                </motion.div>
              ))
            ) : selectedCategoryFees.length === 0 ? (
              <motion.div
                className="text-gray-500 text-center py-8"
                variants={cardVariants}
              >
                No fees available for this category
              </motion.div>
            ) : (
              selectedCategoryFees.map((fee, index) => {
                const isActive = activeLevel === fee.id || (activeLevel === null && index === Math.floor(selectedCategoryFees.length / 2));

                return (
                  <motion.div
                    key={fee.id}
                    className="relative flex justify-center w-full max-w-md mx-auto"
                    variants={cardVariants}
                  >
                    <article
                      onClick={() => setActiveLevel(fee.id)}
                      className={`w-full rounded-2xl px-12 pt-8 pb-16 relative cursor-pointer transform transition-all duration-300
                        ${isActive
                          ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white shadow-2xl scale-[1.03]"
                          : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 shadow-md hover:shadow-lg"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-left">
                          <p className={`font-semibold ${isActive ? "text-white" : "text-gray-800"}`}>
                            {fee.title}
                          </p>
                          <h3
                            className={`mt-2 text-2xl font-extrabold ${isActive ? "text-white" : "text-gray-900"
                              }`}
                          >
                            {fee.price}
                          </h3>
                        </div>

                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md shrink-0
                            ${isActive
                              ? "bg-white text-purple-600"
                              : "bg-purple-50 text-purple-600"
                            }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                          >
                            <path
                              fill="currentColor"
                              d="M12 2L2 7l10 5 10-5-10-5zm0 7.2L6.1 7 12 4.1 17.9 7 12 9.2zM4 10.1v5.6c0 1.2.7 2.3 1.8 2.8L12 21l6.2-2.5c1.1-.45 1.8-1.6 1.8-2.8v-5.6L12 15l-8-4.9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </article>

                    <Link href={fee.redirect_url || "#"}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLevel(fee.id);
                        }}
                        className={`absolute left-1/2 -translate-x-1/2 -bottom-5 px-6 py-2 rounded-lg text-sm font-semibold shadow-md z-10 transition-all cursor-pointer
                        ${isActive
                            ? "bg-white text-purple-600"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}
                      >
                        Visit List →
                      </button>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pill */}
        <motion.div className="mt-24 mb-12 relative" variants={itemSlideUpVariants}>
          <span className="inline-block px-6 py-3 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm shadow-sm absolute left-1/2 -translate-x-1/2 bottom-0 whitespace-nowrap">
            All Courses Available On This Affordable Fee
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}