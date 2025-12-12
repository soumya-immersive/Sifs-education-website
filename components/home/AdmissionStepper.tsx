// components/home/AdmissionStepper.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// Define the structure for a single step
interface Step {
  number: number;
  title: string;
  description?: string;
  active: boolean;
}

// Data for the 6 steps in the admission process
const admissionSteps: Step[] = [
  { number: 1, title: "VISIT WEBSITE", active: false },
  {
    number: 2,
    title: "SELECT COURSES",
    description: "Learn about curriculum and the respective fee structure.",
    active: true,
  },
  { number: 3, title: "FILL APPLICATION FORM", active: false },
  { number: 4, title: "UPLOAD DOCUMENT", active: false },
  { number: 5, title: "MAKE PAYMENT", active: false },
  { number: 6, title: "START STUDYING", active: false },
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

// Helper Component for the vertical line on mobile
const VerticalLine: React.FC = () => (
  <div className="absolute left-[24px] top-0 h-full w-0.5 bg-gray-300 sm:hidden"></div>
);

// Helper Component for a single Step
interface StepItemProps {
  step: Step;
  isLast: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, isLast }) => {
  const blueColor = "text-blue-600";
  const lightGrayBg = "text-gray-200";

  const statusCircleClasses =
    "w-4 h-4 bg-blue-500 border-2 border-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20";

  const innerDotClasses = step.active
    ? "w-2 h-2 bg-white rounded-full"
    : "hidden";

  return (
    <motion.div
      className="flex flex-row w-full text-left sm:flex-col sm:items-center sm:flex-1 sm:text-center relative py-4 sm:min-w-0"
      variants={stepItemVariants}
    >
      {!isLast && <VerticalLine />}

      <div className="flex items-center w-full relative h-10 sm:h-10 sm:justify-center">
        {step.number !== 1 && (
          <div className="hidden sm:flex-1 h-0.5 bg-gray-300 sm:block"></div>
        )}

        <div className="relative flex-shrink-0 w-12 h-10 flex items-center justify-center z-30">
          <span
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl font-extrabold ${lightGrayBg} z-10`}
          >
            {String(step.number).padStart(2, "0")}
          </span>

          <div className={statusCircleClasses}>
            <div className="flex items-center justify-center w-full h-full">
              <span className={innerDotClasses}></span>
            </div>
          </div>
        </div>

        {!isLast && (
          <div className="hidden sm:flex-1 h-0.5 bg-gray-300 sm:block"></div>
        )}
      </div>

      <div className="mt-0 ml-6 sm:ml-0 sm:mt-6 sm:text-center flex-1">
        {step.description && (
          <p className="text-xs font-semibold text-gray-700 mb-1 uppercase">
            {step.title}
          </p>
        )}

        <p
          className={`text-sm sm:text-base font-semibold uppercase ${
            step.active ? blueColor : "text-gray-900"
          }`}
        >
          {step.title}
        </p>

        {step.description && (
          <p className="mt-1 text-xs text-gray-600 max-w-none sm:max-w-[140px] sm:mx-auto">
            {step.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Main Admission Stepper Component
const AdmissionStepper: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="text-center mb-12 sm:mb-16"
          variants={headerItemVariants}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 inline-block relative">
            Process of Admission
            <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 h-1 w-2/3 bg-orange-400 rounded-full"></span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Education made easy! customized just for you.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-start sm:flex-row sm:justify-between items-start pb-4"
          variants={stepperContainerVariants}
        >
          {admissionSteps.map((step, index) => (
            <StepItem
              key={step.number}
              step={step}
              isLast={index === admissionSteps.length - 1}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdmissionStepper;
