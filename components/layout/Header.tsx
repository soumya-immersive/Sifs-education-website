"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
import { bookCategories } from "../../data/bookCategories";


/* -------------------------
   Navigation Configuration
------------------------- */
const navItems = [
  {
    label: "Institute",
    children: [
      { label: "About", path: "/about" },
      { label: "Achievement", path: "/achievements" },
      { label: "Career", path: "/career" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    label: "Courses",
    children: coursePrograms.map((program) => ({
      label: program.label,
      path: `/courses/${program.slug}`,
    })),
  },
  {
    label: "Internship",
    children: internshipPrograms.map((program) => ({
      label: program.label,
      path: `/internships/${program.slug}`,
    })),
  },
  {
    label: "Training",
    children: trainingPrograms.map((program) => ({
      label: program.label,
      path: `/training/${program.slug}`, 
    })),
  },
  {
    label: "Admission",
    children: [
      { label: "Upload Documents", path: "/admission/upload-documents" },
      { label: "Terms & Conditions", path: "/admission/terms-and-conditions" },
    ],
  },
  {
    label: "Events",
    children: [
      { label: "Forensic Events", path: "/events" },
      { label: "Quiz Zone", path: "/quiz" },
      { label: "Work Gallery", path: "/gallery" },
      { label: "Visual Gallery", path: "/video" },
    ],
  },
  //{
    //label: "Books",
    //children: bookCategories.map((category) => ({
      //label: category.label,
      //path: `/books/${category.slug}`,
    //})),
  //},
  { label: "Books", path: "/courses/associate-degree" },
  { label: "Reach Us", path: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSubMenu = (label: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-12 xl:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/logo.png"
            alt="SIFS Logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* ---------------- Desktop Navigation ---------------- */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600 cursor-pointer">
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </span>

                {/* Dropdown */}
                <div
                  className="absolute left-0 top-full mt-3 w-64 bg-white rounded-xl shadow-xl
                             opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                >
                  <ul className="py-2">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.path}
                          className="flex items-center justify-between px-4 py-2 text-sm
                                     text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                        >
                          {child.label}
                          <ChevronRight className="w-4 h-4 opacity-60" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.path || "#"}
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button
            className="hidden lg:block bg-gradient-to-r from-[#3E58EE] to-[#B565E7]
                       hover:from-[#354ED8] hover:to-[#A24EDC]
                       text-white font-medium py-2 px-6 rounded-lg shadow-lg transition"
          >
            Sign Up
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-indigo-600"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ---------------- Mobile Navigation ---------------- */}
      {isMenuOpen && (
        <nav className="lg:hidden px-4 py-4 space-y-2 border-t">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex w-full justify-between items-center py-2 px-3 font-medium text-black"
                >
                  {item.label}
                  <ChevronDown
                    className={`transition ${
                      openMenu[item.label] ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMenu[item.label] && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.path}
                        onClick={toggleMenu}
                        className="block py-2 px-3 text-sm text-gray-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.path || "#"}
                onClick={toggleMenu}
                className="block py-2 px-3 font-medium text-black"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile CTA */}
          <button
            className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700
                       text-white font-medium py-2 px-6 rounded-lg shadow-lg transition"
          >
            Sign Up
          </button>
        </nav>
      )}
    </header>
  );
}
