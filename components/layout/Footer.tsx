// components/layout/Footer.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Framer Motion Variants (NO `ease` to avoid TS type issues) ---

// Parent container
const footerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

// CTA Banner (dramatic slide up)
const ctaBannerVariants = {
  hidden: { y: 150, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

// Main content (slide up)
const mainContentVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      delay: 0.2,
    },
  },
};

// Copyright (fade in)
const copyrightVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.9 } },
};

// LinkList helper
const LinkList: React.FC<{ title: string; links: string[] }> = ({
  title,
  links,
}) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-gray-900 font-bold mb-4">{title}</h3>
    <ul className="space-y-3 text-sm text-gray-700">
      {links.map((link, index) => (
        <li
          key={index}
          className="hover:text-blue-600 cursor-pointer transition-colors"
        >
          {link}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const backgroundStyle = {
    backgroundImage: "url(/footer-bg.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#e0e3d2",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const backgroundStyle1 = {
    backgroundImage: "url(/footer-bg-round.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#e0e3d2",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <footer className="relative w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={footerContainerVariants}
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* CTA Banner */}
        <motion.div
          className="z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-top-20"
          variants={ctaBannerVariants}
        >
          <div
            className="py-12 px-6 rounded-[50px] md:rounded-[80px] text-center shadow-2xl bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden"
            style={backgroundStyle1}
          >
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
              <div className="text-left md:mr-10 mb-6 md:mb-0">
                <h2 className="text-white text-3xl font-bold mb-2">
                  Forensic Insights in Your Inbox
                </h2>
                <p className="text-purple-200">
                  Sign Up to Stay Informed About the Latest Happenings and Offers
                </p>
              </div>

              <form className="flex w-full md:w-auto p-2 bg-white rounded-full">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-grow py-3 px-5 rounded-l-full outline-none text-gray-800"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shrink-0"
                  aria-label="Subscribe"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4L3 11l5 3 6-6 3.232 3.232-6.232 2.768L20 19z"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* decorative subtle bubbles */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-white/20 rounded-full filter blur-3xl" />
              <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-white/20 rounded-full filter blur-3xl" />
            </div>
          </div>
        </motion.div>

        {/* Main Footer */}
        <motion.div
          className="relative pt-32 pb-12 text-gray-800"
          style={backgroundStyle}
          variants={mainContentVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 pb-10">
              {/* Logo & description */}
              <div className="md:col-span-1">
                <div className="text-2xl font-black text-gray-900 mb-4">
                  <span className="text-blue-600">SIFS</span>{" "}
                  <span className="text-red-600">INDIA</span>
                </div>
                <p className="font-bold mb-4">Sherlock Institute of Forensic Science</p>
                <p className="text-sm text-gray-700 mb-6">
                  Since 2006, the institute has conducted the best offline and online diploma and certificate courses in forensic science.
                </p>

                <div className="flex space-x-3">
                  {["f", "in", "k", "x"].map((icon, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                      {icon.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <LinkList
                title="Training & Internships"
                links={[
                  "Lab Bases Internship",
                  "Online Internship",
                  "Hands on Training",
                  "Online Training",
                ]}
              />

              <LinkList
                title="Forensic Courses"
                links={[
                  "Associate Degree Program",
                  "Foundation Certificate Courses",
                  "Professional Courses",
                  "Advanced Certificate Courses",
                ]}
              />

              <LinkList
                title="Student Corner"
                links={["Study Online", "Forensic Events", "Journey at Glance", "Reach Us"]}
              />

              {/* Contact */}
              <div>
                <h3 className="text-gray-900 font-bold mb-4">Contact Us</h3>
                <ul className="flex flex-col md:flex-row md:flex-wrap text-sm text-gray-700 md:space-x-8">
                  <li className="flex items-start mb-4">
                    <span className="mr-2 text-blue-600">📍</span>
                    <span>
                      A-14, Mahendru Enclave <br /> Model Town, Delhi-110033
                    </span>
                  </li>

                  <li className="flex items-start mb-4">
                    <span className="mr-2 text-blue-600">📞</span>
                    <span>
                      Call Us: <strong>011-47074263</strong>
                      <br />
                      Mobile: <strong>91-7303913002</strong>
                    </span>
                  </li>

                  <li className="flex items-start mb-2">
                    <span className="mr-2 text-blue-600">📧</span>
                    <span>
                      E-Mail: <strong>info@sifs.in</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="bg-[#00467A] py-4 text-center text-sm text-white"
          variants={copyrightVariants}
        >
          Copyright © 2025 SIFS INDIA. All Rights Reserved
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
