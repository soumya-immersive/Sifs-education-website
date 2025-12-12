// components/layout/Header.tsx

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Navigation items with correct routing
const navItems = [
  { label: "Institute", path: "/institute" },
  { label: "Courses", path: "/courses" },
  { label: "Internship", path: "/internship" },
  { label: "Training", path: "/training" },
  { label: "Admission", path: "/admission" },
  { label: "Events", path: "/events" },
  { label: "Books", path: "/books" },
  { label: "Reach Us", path: "/contact" }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-12 xl:px-24">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo/logo.png"
            alt="SIFS Forensic Science Institute Logo"
            width={100}
            height={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-[#3E58EE] to-[#B565E7] 
          hover:from-[#354ED8] hover:to-[#A24EDC] text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg hidden lg:block">
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

      {/* Mobile Dropdown Menu */}
      <div 
        id="mobile-menu" 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col py-4 px-4 sm:px-6 space-y-2">
          {navItems.map(({ label, path }) => (
            <Link
              key={label}
              href={path}
              className="text-gray-700 hover:bg-indigo-50 block py-2 px-3 rounded-md font-medium"
              onClick={toggleMenu}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Button */}
          <button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg">
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
