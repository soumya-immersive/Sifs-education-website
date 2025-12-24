"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { coursePrograms } from "../../data/coursePrograms";

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
    children: [
      { label: "Lab based Internship", path: "/internship/lab" },
      { label: "Online Internship", path: "/internship/online" },
    ],
  },
  { label: "Training", path: "/training" },
  { label: "Admission", path: "/admission" },
  { label: "Events", path: "/events" },
  { label: "Books", path: "/books" },
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
                {/* ✅ Parent goes to /courses */}
                <Link
                  href={item.path ?? "#"}
                  className="flex items-center gap-1 font-medium text-gray-700 hover:text-indigo-600"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-xl shadow-xl
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
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
                href={item.path}
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ---------------- Mobile Navigation ---------------- */}
      {isMenuOpen && (
        <nav className="lg:hidden px-4 py-4 space-y-2 border-t">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex w-full justify-between items-center py-2 px-3 font-medium"
                >
                  {item.label}
                  <ChevronDown
                    className={openMenu[item.label] ? "rotate-180" : ""}
                  />
                </button>

                {openMenu[item.label] && (
                  <div className="ml-4 space-y-1">
                    <Link
                      href={item.path ?? "#"}
                      onClick={toggleMenu}
                      className="block py-2 px-3 text-sm font-semibold text-indigo-600"
                    >
                      View All →
                    </Link>

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
                href={item.path}
                onClick={toggleMenu}
                className="block py-2 px-3 font-medium"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}
