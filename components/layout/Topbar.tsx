// components/layout/Topbar.tsx

"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Phone, Mail, Facebook, Linkedin } from 'lucide-react';
import { API_BASE_URL } from "../../lib/config";

const Topbar = () => {
  const [supportPhone, setSupportPhone] = useState("+91 730-391-3002");
  const [supportEmail, setSupportEmail] = useState("education@sifs.in");

  useEffect(() => {
    const fetchTopbarData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
          cache: 'no-store'
        });
        const json = await response.json();

        if (json.success) {
          if (json.data?.bs?.support_phone) {
            setSupportPhone(json.data.bs.support_phone);
          }
          if (json.data?.bs?.support_email) {
            setSupportEmail(json.data.bs.support_email);
          }
        }
      } catch (error) {
        console.error("Failed to fetch topbar data:", error);
      }
    };

    fetchTopbarData();
  }, []);

  return (
    <div className="hidden bg-white text-gray-600 border-b border-gray-100 py-2 text-xs lg:flex justify-between items-center px-12 xl:px-24">

      {/* Left Side: Contact and Socials */}
      <div className="flex items-center space-x-4">
        <a href={`tel:${supportPhone.replace(/\s+/g, '')}`} className="flex items-center hover:text-indigo-600 transition-colors">
          <Phone className="w-3 h-3 mr-1" />
          <span>{supportPhone}</span>
        </a>
        <span className="text-gray-300">|</span>
        <a href={`mailto:${supportEmail}`} className="flex items-center hover:text-indigo-600 transition-colors">
          <Mail className="w-3 h-3 mr-1" />
          <span>{supportEmail}</span>
        </a>
      </div>

      {/* Right Side: Auxiliary Links */}
      <div className="flex items-center space-x-6">
        <a href="#" aria-label="Facebook" className="hover:text-indigo-600 transition-colors">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-indigo-600 transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Topbar;