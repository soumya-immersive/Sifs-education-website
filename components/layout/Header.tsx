// components/layout/Header.tsx

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // <-- 1. Import useState
import { Menu, X } from 'lucide-react'; // <-- Import icons for menu and close

// Define the main navigation items
const navItems = [
  'Institute', 'Courses', 'Internship', 'Training', 
  'Admission', 'Events', 'Books', 'Reach Us'
];

const Header = () => {
  // 2. Initialize State: Tracks whether the mobile menu is open (false by default)
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-12 xl:px-24">
        
        {/* Logo and Institute Name (Left Side) */}
        <Link href="/" className="flex items-center space-x-2">
          {/* ... (Logo Image component remains the same) ... */}
          <Image 
            src="/logo/logo.png"
            alt="SIFS Forensic Science Institute Logo"
            width={100}
            height={100}
          />
          {/*<span className="text-xl font-bold text-gray-800 hidden sm:block">
            FORENSIC SCIENCE INSTITUTE
  </span>*/}
        </Link>
        
        {/* Desktop Navigation (Center) */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(/\s/g, '-')}`} 
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button and Mobile Menu Toggle (Right Side) */}
        <div className="flex items-center space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg hidden lg:block">
            Sign Up
          </button>
          
          {/* 3. Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-indigo-600"
            onClick={toggleMenu} // <-- Attach the click handler
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {/* Show X icon when menu is open, otherwise show Menu icon */}
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 4. Conditional Mobile Menu Content (Full-width, drops down) */}
      <div 
        id="mobile-menu" 
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0' // <-- Toggles visibility
        }`}
      >
        <nav className="flex flex-col py-4 px-4 sm:px-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(/\s/g, '-')}`} 
                  className="text-gray-700 hover:bg-indigo-50 block py-2 px-3 rounded-md font-medium"
                  onClick={toggleMenu} // Close menu when a link is clicked
            >
              {item}
            </Link>
          ))}
          {/* Include the Sign Up button for mobile */}
          <button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-lg">
            Sign Up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;