// components/home/AdmissionStepper.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the structure for a single step
interface Step {
  number: number;
  title: string;
  active?: boolean;
}

// Data for the 6 steps in the admission process
const admissionSteps: Step[] = [
  {
    number: 1,
    title: "VISIT WEBSITE",
    active: false,
  },
  {
    number: 2,
    title: "SELECT COURSES",
    active: true,
  },
  {
    number: 3,
    title: "FILL APPLICATION FORM",
    active: false,
  },
  {
    number: 4,
    title: "UPLOAD DOCUMENT",
    active: false,
  },
  {
    number: 5,
    title: "MAKE PAYMENT",
    active: false,
  },
  {
    number: 6,
    title: "START STUDYING",
    active: false,
  },
];

// --- Framer Motion Variants (TS SAFE) ---
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const headerItemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stepperContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const stepItemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Helper Component for a single Step
interface StepItemProps {
  step: Step;
  isLast: boolean;
  isFirst: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, isLast, isFirst }) => {
  return (
    <motion.div
      className="flex flex-row lg:flex-col lg:items-center lg:flex-1 relative group min-h-[80px] lg:min-h-0"
      variants={stepItemVariants}
    >
      {/* 
        CONTAINER 1: Circle & Lines 
        Mobile: Fixed column on the left
        Desktop: Full width horizontal bar with centered node
      */}
      <div className="flex-none w-16 lg:w-full flex flex-col lg:flex-row items-center lg:justify-center relative mr-4 lg:mr-0 mb-0 lg:mb-6">

        {/* Vertical Line (Mobile Only) */}
        {!isLast && (
          <div
            className={`absolute w-0.5 bg-gray-300 lg:hidden -z-10 left-1/2 -translate-x-1/2 bottom-0 ${isFirst ? 'top-8' : 'top-0'}`}
          />
        )}

        {/* Horizontal Line Left (Desktop Only) */}
        <div className={`hidden lg:block flex-1 h-0.5 ${isFirst ? 'bg-transparent' : 'bg-gray-300'}`}></div>

        {/* NODE CENTER */}
        <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center z-20">

          {/* Large Watermark Number - BEHIND */}
          <span
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-gray-200 select-none z-0"
          >
            {String(step.number).padStart(2, "0")}
          </span>

          {/* Small Dot - FOREGROUND */}
          {step.active ? (
            // Active (Step 2): Hollow Ring (White bg, Blue Border)

            // relative z-10 w-4 h-4 bg-white border-[3px] border-blue-500 rounded-full
            <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-transparent"></div>
          ) : (
            // Inactive: Solid Blue Dot (added ring-white to separate from background if needed)
            <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full ring-4 ring-transparent"></div>
          )}
        </div>

        {/* Horizontal Line Right (Desktop Only) */}
        <div className={`hidden lg:block flex-1 h-0.5 ${isLast ? 'bg-transparent' : 'bg-gray-300'}`}></div>
      </div>

      {/* 
        CONTAINER 2: Text Content
        Mobile: Centered vertically with circle using h-16 wrapper
        Desktop: Centered text below circle
      */}
      <div className="flex-1 pb-8 lg:pb-0 lg:px-2 lg:text-center">
        <div className="h-16 flex items-center lg:h-auto lg:block lg:justify-center">
          <h3 className="text-sm sm:text-base font-bold uppercase leading-tight text-gray-900">
            {step.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// Main AdmissionStepper Component
const AdmissionStepper: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fbfcff] relative bg-[url('/fee-structure/bg.png')] bg-cover bg-center bg-no-repeat">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="text-center mb-10"
          variants={headerItemVariants}
        >
          <h2 className="text-2xl font-semibold text-black">
            Process of{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Admission</span>
              {/* Decorative underline */}
              <Image
                src="/yellow-underline.png"
                alt="underline"
                width={180}
                height={12}
                className="absolute left-0 -bottom-1 w-full h-auto -z-0 opacity-80"
              />
            </span>
          </h2>
          <p className="mt-2 temt-2 text-sm text-gray-500">
            Education made easy! customized just for you.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row justify-between items-stretch lg:items-start"
          variants={stepperContainerVariants}
        >
          {admissionSteps.map((step, index) => (
            <StepItem
              key={step.number}
              step={step}
              isLast={index === admissionSteps.length - 1}
              isFirst={index === 0}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdmissionStepper;
