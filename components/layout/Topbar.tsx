// components/layout/Topbar.tsx

"use client";
import React, { useEffect, useState } from "react";
import { Phone, Mail } from 'lucide-react';
import { API_BASE_URL } from "../../lib/config";

interface Social {
  id: number;
  icon: string;
  url: string;
  platform: string;
  serial_number: number;
  is_valid: boolean;
}

const Topbar = () => {
  const [supportPhone, setSupportPhone] = useState("+91 730-391-3002");
  const [supportEmail, setSupportEmail] = useState("education@sifs.in");
  const [socials, setSocials] = useState<Social[]>([]);

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

          // Check for socials in top level or data level
          if (json.socials && Array.isArray(json.socials)) {
            setSocials(json.socials);
          } else if (json.data?.socials && Array.isArray(json.data.socials)) {
            setSocials(json.data.socials);
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

      {/* Left Side: Contact */}
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

      {/* Right Side: Social Links (Dynamic) */}
      <div className="flex items-center space-x-4">
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.platform}
            className="hover:text-indigo-600 transition-colors"
          >
            {/* Using Font Awesome classes directly from API */}
            <i className={`${social.icon} text-base`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Topbar;