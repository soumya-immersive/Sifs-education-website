"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { API_BASE_URL, BASE_URL } from "../../lib/config";

import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";

/* -------------------------
   Navigation Configuration (Fallback)
------------------------- */
const defaultNavItems = [
  {
    label: "Institute",
    children: [
      { label: "About", path: "/about" },
      { label: "Vision & Mission", path: "/vision-and-mission" },
      { label: "Achievement", path: "/achievements" },
      { label: "Our Faculty", path: "/team" },
      { label: "Career", path: "/career" },
      { label: "Blog", path: "/blog" },
    ],
  },
  {
    label: "Courses",
    children: coursePrograms.map((program) => ({
      label: program.label,
      path: `/${program.slug}`,
    })),
  },
  {
    label: "Internship",
    children: internshipPrograms.map((program) => ({
      label: program.label,
      path: `/${program.slug}`,
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
  { label: "Books", path: "/associate-degree" },
  { label: "Reach Us", path: "/contact" },
];

interface NavItem {
  label: string;
  path?: string;
  target?: string;
  children?: NavItem[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [logo, setLogo] = useState<string>("/logo/logo.png");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client-side after component is mounted
    if (!isMounted) return;

    const fetchHeaderData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error("API request failed:", response.status);
          return;
        }

        const json = await response.json();

        console.log("API Response:", json);

        if (json.success) {
          // Set Logo if available
          if (json.data?.bs?.logo) {
            const logoPath = `${BASE_URL}/uploads/Education-And-Internship-Admin-Logo/${json.data.bs.logo}`;
            setLogo(logoPath);
          }

          // Check both possible locations for header_text
          const headerText = json.data?.be?.header_text || json.data?.bs?.header_text;

          if (headerText) {
            console.log("Found header text:", headerText.substring(0, 200));
            const parsedItems = parseHeaderHTML(headerText);
            console.log("Parsed Nav Items:", parsedItems);

            if (parsedItems.length > 0) {
              setNavItems(parsedItems);
            } else {
              console.warn("No nav items parsed, using default");
            }
          } else {
            console.warn("Header text not found, using default nav items");
          }
        }
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };

    fetchHeaderData();
  }, [isMounted]);

  /* -------------------------
     HTML Decoding Function
     Decodes &lt; &gt; &amp; etc. to actual HTML
  ------------------------- */
  const decodeHTML = (html: string): string => {
    if (!html) return "";

    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  };

  /* -------------------------
     Sanitize Path Helper
  ------------------------- */
  const sanitizePath = (url: string): string => {
    if (!url) return "#";

    const trimmed = url.trim();

    // If it's already a relative path starting with /, return as is
    if (trimmed.startsWith("/")) {
      return trimmed;
    }

    // If it's # or empty, return #
    if (trimmed === "#" || trimmed === "") {
      return "#";
    }

    // For external URLs, return as is (they'll be handled by target="_blank")
    if (trimmed.startsWith("http")) {
      return trimmed;
    }

    // Default fallback
    return "#";
  };

  /* -------------------------
     Parse Header HTML
     Handles HTML-encoded content and proper structure
  ------------------------- */
  const parseHeaderHTML = (htmlString: string): NavItem[] => {
    if (typeof window === "undefined") {
      return [];
    }

    if (!htmlString || htmlString.trim() === "") {
      return defaultNavItems;
    }

    try {
      // Step 1: Decode HTML entities
      const decodedHTML = decodeHTML(htmlString);
      console.log("Decoded HTML:", decodedHTML.substring(0, 200));

      // Step 2: Extract actual HTML from <pre> tag if present
      let actualHTML = decodedHTML;
      if (decodedHTML.includes('<pre') && decodedHTML.includes('</pre>')) {
        const preMatch = decodedHTML.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
        if (preMatch && preMatch[1]) {
          actualHTML = preMatch[1].trim();
        }
      }

      console.log("Actual HTML to parse:", actualHTML.substring(0, 200));

      // Step 3: Parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(actualHTML, "text/html");

      const items: NavItem[] = [];

      // Step 4: Process structure
      // First, look for standalone Home link
      const paragraphs = Array.from(doc.querySelectorAll('p'));

      // Process each paragraph for standalone links
      paragraphs.forEach((p, index) => {
        const links = Array.from(p.querySelectorAll('a'));
        links.forEach((link) => {
          const href = link.getAttribute('href') || '#';
          const text = link.textContent?.trim() || '';

          if (text) {
            // If it's the first paragraph with "Home", add it
            if (index === 0 && text.toLowerCase() === 'home') {
              items.push({
                label: text,
                path: sanitizePath(href)
              });
            }
            // If it's the last paragraph with "Reach Us", add it
            else if (index === paragraphs.length - 1 && text.toLowerCase().includes('reach')) {
              items.push({
                label: text,
                path: sanitizePath(href)
              });
            }
          }
        });
      });

      // Step 5: Process UL for dropdown menus
      const ul = doc.querySelector('ul');
      if (ul) {
        const listItems = Array.from(ul.querySelectorAll('li'));

        listItems.forEach((li) => {
          const links = Array.from(li.querySelectorAll('a'));

          if (links.length === 0) return;

          // Find dropdown parent (link with href="#")
          const parentLink = links.find(link => {
            const href = link.getAttribute('href') || '';
            return href === '#' || href === '' || href.includes('EducationAndInternship#');
          });

          if (parentLink && links.length > 1) {
            // This is a dropdown with children
            const parentText = parentLink.textContent?.trim() || '';
            const children: NavItem[] = [];

            // Add all other links as children
            links.forEach(link => {
              if (link === parentLink) return;

              const href = link.getAttribute('href') || '#';
              const text = link.textContent?.trim() || '';

              if (text && href !== '#' && !href.includes('EducationAndInternship#')) {
                children.push({
                  label: text,
                  path: sanitizePath(href)
                });
              }
            });

            if (parentText && children.length > 0) {
              items.push({
                label: parentText,
                path: '#', // Dropdown parent doesn't navigate
                children
              });
            }
          } else if (links.length === 1) {
            // Single link - could be dropdown parent or regular link
            const link = links[0];
            const href = link.getAttribute('href') || '#';
            const text = link.textContent?.trim() || '';

            if (text) {
              if (href === '#' || href.includes('EducationAndInternship#')) {
                // This might be a dropdown parent without inline children
                // Check if next li elements belong to this dropdown
                const nextItems: NavItem[] = [];
                let nextLi = li.nextElementSibling;

                while (nextLi && nextLi.tagName === 'LI') {
                  const childLinks = Array.from(nextLi.querySelectorAll('a'));
                  childLinks.forEach(childLink => {
                    const childHref = childLink.getAttribute('href') || '#';
                    const childText = childLink.textContent?.trim() || '';

                    if (childText && childHref !== '#' && !childHref.includes('EducationAndInternship#')) {
                      nextItems.push({
                        label: childText,
                        path: sanitizePath(childHref)
                      });
                    }
                  });

                  nextLi = nextLi.nextElementSibling;
                }

                if (nextItems.length > 0) {
                  items.push({
                    label: text,
                    path: '#',
                    children: nextItems
                  });
                } else {
                  items.push({
                    label: text,
                    path: sanitizePath(href)
                  });
                }
              } else {
                // Regular link
                items.push({
                  label: text,
                  path: sanitizePath(href)
                });
              }
            }
          }
        });
      }

      console.log("Final parsed items:", items);

      // If no items were parsed, return defaults
      return items.length > 0 ? items : defaultNavItems;

    } catch (error) {
      console.error("Error parsing header HTML:", error);
      return defaultNavItems;
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSubMenu = (label: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isExternalLink = (path: string) => path && path.startsWith("http");

  const getTarget = (item: NavItem) => (isExternalLink(item.path || "") ? "_blank" : undefined);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="flex items-center justify-between h-20 px-4 md:px-12 xl:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="SIFS Logo"
            width={150}
            height={100}
            priority
            className="h-auto w-auto max-h-16 object-contain"
          />
        </Link>

        {/* ---------------- Desktop Navigation ---------------- */}
        <nav className="hidden lg:flex flex-1 justify-center space-x-6">
          {navItems.map((item, index) =>
            item.children && item.children.length > 0 ? (
              <div key={`${item.label}-${index}`} className="relative group">
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
                    {item.children.map((child, cIndex) => {
                      const childTarget = getTarget(child);
                      return (
                        <li key={`${child.label}-${cIndex}`}>
                          {childTarget === "_blank" ? (
                            <a
                              href={child.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between px-4 py-2 text-sm
                                      text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                            >
                              {child.label}
                              <ChevronRight className="w-4 h-4 opacity-60" />
                            </a>
                          ) : (
                            <Link
                              href={child.path || "#"}
                              className="flex items-center justify-between px-4 py-2 text-sm
                                       text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                            >
                              {child.label}
                              <ChevronRight className="w-4 h-4 opacity-60" />
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              (getTarget(item) === "_blank") ? (
                <a
                  key={`${item.label}-${index}`}
                  href={item.path || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-700 hover:text-indigo-600"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={`${item.label}-${index}`}
                  href={item.path || "#"}
                  className="font-medium text-gray-700 hover:text-indigo-600"
                >
                  {item.label}
                </Link>
              )
            )
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <a
            href="https://sifs-student-panel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block bg-gradient-to-r from-[#3E58EE] to-[#B565E7]
                       hover:from-[#354ED8] hover:to-[#A24EDC]
                       text-white font-medium py-2 px-6 rounded-lg shadow-lg transition"
          >
            Sign Up
          </a>

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
        <nav className="lg:hidden px-4 py-4 space-y-2 border-t bg-white h-screen overflow-y-auto pb-20">
          {navItems.map((item, index) =>
            item.children && item.children.length > 0 ? (
              <div key={`${item.label}-${index}`}>
                <button
                  onClick={() => toggleSubMenu(item.label)}
                  className="flex w-full justify-between items-center py-2 px-3 font-medium text-black"
                >
                  {item.label}
                  <ChevronDown
                    className={`transition ${openMenu[item.label] ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openMenu[item.label] && (
                  <div className="ml-4 space-y-1">
                    {item.children.map((child, cIndex) => {
                      const childTarget = getTarget(child);
                      return (
                        isExternalLink(child.path || "") || childTarget === "_blank" ? (
                          <a
                            key={`${child.label}-${cIndex}`}
                            href={child.path}
                            target={childTarget || "_self"}
                            rel={childTarget === "_blank" ? "noopener noreferrer" : undefined}
                            onClick={toggleMenu}
                            className="block py-2 px-3 text-sm text-gray-600"
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={`${child.label}-${cIndex}`}
                            href={child.path || "#"}
                            onClick={toggleMenu}
                            className="block py-2 px-3 text-sm text-gray-600"
                          >
                            {child.label}
                          </Link>
                        )
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              (getTarget(item) === "_blank") ? (
                <a
                  key={`${item.label}-${index}`}
                  href={item.path || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={toggleMenu}
                  className="block py-2 px-3 font-medium text-black"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={`${item.label}-${index}`}
                  href={item.path || "#"}
                  onClick={toggleMenu}
                  className="block py-2 px-3 font-medium text-black"
                >
                  {item.label}
                </Link>
              )
            )
          )}

          {/* Mobile CTA */}
          <a
            href="https://sifs-student-panel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-3 bg-indigo-600 hover:bg-indigo-700
                       text-white font-medium py-2 px-6 rounded-lg shadow-lg transition text-center"
          >
            Sign Up
          </a>
        </nav>
      )}
    </header>
  );
}