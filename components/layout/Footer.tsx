"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Loader2 } from "lucide-react";
import { API_BASE_URL, BASE_URL } from "../../lib/config";
import toast from "react-hot-toast";

interface Social {
  id: number;
  icon: string;
  url: string;
  platform: string;
  serial_number: number;
  is_valid: boolean;
}

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

// Interface for Footer Data
interface LinkItem {
  label: string;
  path: string;
}

interface Section {
  title: string;
  links: LinkItem[];
}

interface FooterDataAttributes {
  footer_sections: Section[];
  footer_description?: string;
  contact_mail: string;
  support_phone: string;
  copyright_text: string;
  support_email: string;
  footer_logo: string;
  socials: Social[];
  newsletter_title?: string;
  newsletter_subtitle?: string;
  newsletter_text?: string;
}

// Helper to determine if link is external or internal
const isExternal = (url: string) => url.startsWith("http");

// LinkList helper
const LinkList: React.FC<{ title: string; links: LinkItem[] }> = ({
  title,
  links,
}) => (
  <div className="mb-8 md:mb-0">
    <h3 className="text-gray-900 font-bold mb-4">{title}</h3>
    <ul className="space-y-3 text-sm text-gray-700">
      {links.map((link, index) => (
        <li key={index}>
          {isExternal(link.path) ? (
            <a
              href={link.path}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 cursor-pointer transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              href={link.path}
              className="hover:text-blue-600 cursor-pointer transition-colors"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const [data, setData] = useState<FooterDataAttributes | null>(null);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/EducationAndInternship/Website/front/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Successfully subscribed!");
        setEmail("");
      } else {
        toast.error(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/EducationAndInternship/Website/front`,
          { cache: "no-store" }
        );
        const json = await response.json();

        console.log("Footer API Response:", json);

        // Prioritize be based on user feedback
        const bs = json.data?.bs;
        const be = json.data?.be;

        const footerText = be?.footer_text || bs?.footer_text || "";

        if (json.success && footerText) {
          console.log("Footer text found, parsing...");
          const parsedSections = parseFooterText(footerText);

          setData({
            footer_sections: parsedSections,
            footer_description: bs?.footer_text || "",
            contact_mail: bs?.contact_mail || be?.order_mail || "info@sifs.in",
            support_email: bs?.support_email || "education@sifs.in",
            support_phone: bs?.support_phone || "011-47074263",
            copyright_text: bs?.copyright_text || "Copyright © 2025 SIFS INDIA. All Rights Reserved",
            footer_logo: bs?.footer_logo || "",
            socials: json.socials || json.data?.socials || [],
            newsletter_title: bs?.newsl_section_title || "",
            newsletter_subtitle: bs?.newsl_section_subtitle || "",
            newsletter_text: bs?.newsletter_text || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };

    fetchData();
  }, []);

  // Helper to Sanitize API Paths (Copied from Header for consistency)
  const sanitizePath = (url: string): string => {
    if (!url) return "#";
    const lowerUrl = url.toLowerCase();

    // If URL contains sifs.in domain, extract the path and make it internal
    if (lowerUrl.includes("sifs.in")) {
      try {
        const urlObj = new URL(url);
        // Return just the pathname (e.g., /about, /contact, etc.)
        return urlObj.pathname;
      } catch (e) {
        // If URL parsing fails, try to extract path manually
        const match = url.match(/sifs\.in(\/[^?#]*)/i);
        if (match && match[1]) {
          return match[1];
        }
      }
    }

    // Fix specifically for Vision and Mission
    if (lowerUrl.includes("vision-and-mission") || lowerUrl.includes("vision-and-mision")) {
      return "/vision-and-mission";
    }

    if (lowerUrl.includes("events/team")) return "/faculty";
    if (lowerUrl.includes("our-presence")) return "/our-presence";

    return url;
  };

  const parseFooterText = (html: string): Section[] => {
    if (typeof window === "undefined" || !html) return [];

    try {
      const parser = new DOMParser();
      // Ensure wrapper to handle divs
      const doc = parser.parseFromString(`<body>${html}</body>`, "text/html");
      const sections: Section[] = [];

      // New data structure seems to be flat: <h4>Title</h4> <ul>...</ul> <h4>Title</h4> ...
      // Old structure had wrappers. We need to support the new flat structure.

      const h4s = doc.querySelectorAll("h4");

      h4s.forEach((h4) => {
        const title = h4.textContent?.trim() || "";

        // Find the next UL sibling
        // We traverse siblings until we find a UL or another H4 (which would mean no UL for this title)
        let next: Element | null = h4.nextElementSibling;
        let linksList: Element | null = null;

        while (next) {
          if (next.tagName.toLowerCase() === 'ul') {
            linksList = next;
            break;
          }
          if (next.tagName.toLowerCase() === 'h4') {
            // Hit the next title without finding a UL
            break;
          }
          next = next.nextElementSibling;
        }

        if (linksList) {
          const linkEls = linksList.querySelectorAll("a");
          const links: LinkItem[] = [];

          linkEls.forEach((a) => {
            const rawPath = a.getAttribute("href") || "#";
            links.push({
              label: a.textContent?.trim() || "",
              path: sanitizePath(rawPath),
            });
          });

          if (links.length > 0) {
            sections.push({ title, links });
          }
        }
      });

      return sections;
    } catch (e) {
      console.error("Error parsing footer TEXT", e);
      return [];
    }
  };

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

  const renderContactInfo = (html: string) => {
    if (!html) return null;

    // Split by paragraph tags and filter out empty strings/br tags
    const paragraphs = html
      .split(/<p>|<\/p>/)
      .map((s) => s.trim())
      .filter((s) => s !== "" && s !== "<br>" && s !== "&nbsp;");

    if (paragraphs.length === 0) {
      return (
        <div
          className="text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return (
      <ul className="flex flex-col space-y-4 text-sm text-gray-700">
        {paragraphs.map((content, idx) => {
          let icon = "📍";
          const lower = content.toLowerCase();

          if (
            lower.includes("tel") ||
            lower.includes("call") ||
            lower.includes("mobile") ||
            lower.includes("+91")
          ) {
            icon = "📞";
          } else if (lower.includes("mail") || lower.includes("@")) {
            icon = "📧";
          }

          return (
            <li key={idx} className="flex items-start">
              <span className="mr-2 text-blue-600">{icon}</span>
              <span
                className="[&_strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </li>
          );
        })}
      </ul>
    );
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
          className="z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-top-20 w-full"
          variants={ctaBannerVariants}
        >
          <div
            className="py-12 px-6 rounded-[50px] md:rounded-[80px] text-center shadow-2xl bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden"
            style={backgroundStyle1}
          >
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
              <div className="text-center md:text-left md:mr-10 mb-6 md:mb-0">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {data?.newsletter_title}
                </h2>
                <p className="text-purple-200 text-sm md:text-base">
                  {data?.newsletter_subtitle}
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-auto p-2 bg-white rounded-full"
              >
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-grow py-3 px-5 rounded-l-full outline-none text-gray-800 text-sm md:text-base w-full"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shrink-0 disabled:bg-blue-400"
                  aria-label="Subscribe"
                >
                  {isSubscribing ? (
                    <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-white animate-spin" />
                  ) : (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4L3 11l5 3 6-6 3.232 3.232-6.232 2.768L20 19z"></path>
                    </svg>
                  )}
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
          className="relative pt-20 pb-12 lg:pt-36 text-gray-800"
          style={backgroundStyle}
          variants={mainContentVariants}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5 pb-10">
              {/* Logo & description (Col 1) */}
              <div className="md:col-span-1">
                <Link href="/">
                  {data?.footer_logo ? (
                    <img
                      src={`${BASE_URL}/uploads/Education-And-Internship-Admin-FooterLogo/${data.footer_logo}`}
                      alt="SIFS Logo"
                      className="max-h-12 w-auto mb-6"
                    />
                  ) : (
                    <div className="text-2xl font-black text-gray-900 mb-4">
                      <span className="text-blue-600">SIFS</span>{" "}
                      <span className="text-red-600">INDIA</span>
                    </div>
                  )}
                </Link>

                {data?.footer_description ? (
                  <div
                    className="text-sm text-gray-700 mb-6 [&_p]:mb-4 [&_strong]:font-bold [&_strong]:block [&_strong]:mb-1"
                    dangerouslySetInnerHTML={{ __html: data.footer_description }}
                  />
                ) : (
                  <>
                    <p className="font-bold mb-4">Sherlock Institute of Forensic Science</p>
                    <p className="text-sm text-gray-700 mb-6">
                      Since 2006, the institute has conducted the best offline and online diploma and certificate courses in forensic science.
                    </p>
                  </>
                )}

                <div className="flex space-x-3 justify-start">
                  {data?.socials && data.socials.length > 0 ? (
                    data.socials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full flex items-center justify-start text-gray-800 hover:text-blue-600 transition-colors"
                        aria-label={social.platform}
                      >
                        <i className={`${social.icon} text-xl`} />
                      </a>
                    ))
                  ) : (
                    <>
                      <a href="#" className="w-8 h-14 rounded-full flex items-center justify-start text-gray-800 hover:text-blue-600 transition-colors">
                        <Facebook size={24} />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full flex items-center justify-start text-gray-800 hover:text-blue-600 transition-colors">
                        <Linkedin size={24} />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full flex items-center justify-start text-gray-800 hover:text-blue-600 transition-colors">
                        <Instagram size={24} />
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full flex items-center justify-start text-gray-800 hover:text-blue-600 transition-colors">
                        <Twitter size={24} />
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Dynamic Footer Link Sections (Cols 2, 3, 4) */}
              {data && data.footer_sections.length > 0 ? (
                data.footer_sections.map((section, idx) => (
                  <LinkList key={idx} title={section.title} links={section.links} />
                ))
              ) : (
                // Fallback static structure
                <>
                  <LinkList
                    title="Training & Internships"
                    links={[
                      { label: "Lab Based Internship", path: "/lab-based-internship" },
                      { label: "Online Internship", path: "/online-forensic-internship" },
                      { label: "Hands on Training", path: "/hands-on-training" },
                      { label: "Online Training", path: "/online-training" },
                    ]}
                  />
                  <LinkList
                    title="Forensic Courses"
                    links={[
                      { label: "Associate Degree Program", path: "/online-courses" },
                      { label: "Foundation Certificate Courses", path: "/foundation-forensic-courses" },
                      { label: "Professional Courses", path: "/professional-forensic-courses" },
                      { label: "Advanced Certificate Courses", path: "short-term-courses" },
                    ]}
                  />
                  <LinkList
                    title="Student Corner"
                    links={[
                      { label: "Study Online", path: "/online-courses" },
                      { label: "Forensic Events", path: "/conference" },
                      { label: "Journey at Glance", path: "/image-gallery" },
                      { label: "Reach Us", path: "/contact" },
                    ]}
                  />
                </>
              )}


              {/* Contact (Col 5) */}
              <div>
                <h3 className="text-gray-900 font-bold mb-4">Contact Us</h3>
                {data?.newsletter_text ? (
                  renderContactInfo(data.newsletter_text)
                ) : (
                  <ul className="flex flex-col space-y-4 text-sm text-gray-700">
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
                        Mobile: <strong>{data?.support_phone || "91-7303913002"}</strong>
                      </span>
                    </li>

                    <li className="flex items-start mb-2">
                      <span className="mr-2 text-blue-600">📧</span>
                      <span>
                        E-Mail: <strong>{data?.contact_mail || "info@sifs.in"}</strong>
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="bg-[#00467A] py-4 text-center text-sm text-white flex justify-center items-center"
          variants={copyrightVariants}
        >
          {data?.copyright_text ? (
            <div dangerouslySetInnerHTML={{ __html: data.copyright_text }} className="flex gap-1 items-center justify-center flex-wrap [&_p]:inline [&_p]:m-0 [&_a]:underline" />
          ) : (
            <span>Copyright © 20256 SIFS INDIA. All Rights Reserved</span>
          )}
        </motion.div>
      </motion.div>
    </footer >
  );
};

export default Footer;
