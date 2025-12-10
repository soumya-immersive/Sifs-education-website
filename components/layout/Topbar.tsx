// components/layout/Topbar.tsx

"use client";
import { Phone, Facebook, Linkedin } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="hidden bg-white text-gray-600 border-b border-gray-100 py-2 text-xs lg:flex justify-between items-center px-12 xl:px-24">
      
      {/* Left Side: Contact and Socials */}
      <div className="flex items-center space-x-4">
        <a href="tel:+917303913002" className="flex items-center hover:text-indigo-600 transition-colors">
          <Phone className="w-3 h-3 mr-1" />
          <span>+91 730-391-3002</span>
        </a>
        <div className="flex items-center space-x-3">
          <a href="#" aria-label="Facebook" className="hover:text-indigo-600 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Right Side: Auxiliary Links */}
      <div className="flex items-center space-x-6">
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Study online
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Forensic Events
        </a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-indigo-600 transition-colors">
          Journey at Glance
        </a>
      </div>
    </div>
  );
};

export default Topbar;