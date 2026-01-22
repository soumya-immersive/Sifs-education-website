"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../../lib/config";

import { coursePrograms } from "../../data/coursePrograms";
import { internshipPrograms } from "../../data/internshipPrograms";
import { trainingPrograms } from "../../data/trainingPrograms";
// import { bookCategories } from "../../data/bookCategories";

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
  { label: "Books", path: "/courses/associate-degree" },
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

        console.log("API Response:", json); // Debugging
        console.log("Data object keys:", json.data ? Object.keys(json.data) : "No data"); // Debugging

        // header_text is inside data.be object
        const headerText = json.data?.be?.header_text;

        if (json.success && headerText) {
          console.log("Found header text length:", headerText.length);
          console.log("Header text content:", headerText.substring(0, 200)); // Show first 200 chars
          const parsedItems = parseHeaderHTML(headerText);
          console.log("Parsed Nav Items:", parsedItems);

          if (parsedItems.length > 0) {
            setNavItems(parsedItems);
          } else {
            console.warn("No nav items parsed from header_text");
          }
        } else {
          console.warn("Header text not found in data.be. Checking data.bs...");
          // Fallback to data.bs if data.be doesn't have header_text
          const headerTextBs = json.data?.bs?.header_text;
          if (headerTextBs) {
            console.log("Found header text in bs, length:", headerTextBs.length);
            const parsedItems = parseHeaderHTML(headerTextBs);
            if (parsedItems.length > 0) {
              setNavItems(parsedItems);
            }
          } else {
            console.warn("Header text not found in data.be or data.bs");
          }
        }
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };

    fetchHeaderData();
  }, [isMounted]);

  /* -------------------------
     Helper to Sanitize API Paths
     Redirects legacy/external links to local routes
  ------------------------- */
  const sanitizePath = (url: string): string => {
    if (!url) return "#";

    // Normalize string
    const lowerUrl = url.toLowerCase();

    // Specific Redirections (API Slugs to Internal Routes)
    if (lowerUrl.includes("foundation-forensic-courses") || lowerUrl === "foundation-forensic-courses") {
      return "/courses/foundation-certificate";
    }
    if (lowerUrl === "online-courses" || lowerUrl.includes("/online-courses")) {
      return "/courses/associate-degree";
    }

    // Specific Redirections (Legacy/External)
    if (lowerUrl.includes("events/team")) {
      return "/faculty";
    }
    if (lowerUrl.includes("our-presence") || lowerUrl.includes("sifs.in/page/our-presence")) {
      return "/our-presence";
    }

    // If it points to the client domain, try to extract the relative path
    // or return as is if we can't map it. 
    // For now, we only strictly map the Team page as requested.

    // Fix specifically for Vision and Mission if casing is wrong or has typos
    if (lowerUrl.includes("vision-and-mission") || lowerUrl.includes("vision-and-mision")) {
      return "/vision-and-mission";
    }

    // Optionally handle other common routes if standard matching applies
    if (lowerUrl.includes("sifs.in/about")) return "/about";
    if (lowerUrl.includes("sifs.in/contact")) return "/contact";

    return url;
  };

  const parseHeaderHTML = (htmlString: string): NavItem[] => {
    // Triple check we're in browser environment
    if (typeof window === "undefined") {
      console.warn("parseHeaderHTML called on server-side, returning empty array");
      return [];
    }

    if (typeof DOMParser === "undefined") {
      console.error("DOMParser is not available");
      return [];
    }

    if (!htmlString || htmlString.trim() === "") {
      console.warn("Empty HTML string provided to parseHeaderHTML");
      return [];
    }

    try {
      const parser = new DOMParser();
      // Parse the snippet. Wrapping in body ensures we have a root.
      const doc = parser.parseFromString(`<body>${htmlString}</body>`, "text/html");

      // Check if parsing was successful
      if (!doc || !doc.body) {
        console.error("Failed to parse HTML document");
        return [];
      }

      const body = doc.body;

      const items: NavItem[] = [];

      // Helper to extract clean link data
      const extractLink = (a: Element): NavItem => ({
        label: a.textContent?.trim() || "",
        path: sanitizePath(a.getAttribute("href") || "#"),
        target: a.getAttribute("target") || undefined
      });

      // Strategy:
      // 1. First, get any standalone links in <p> tags BEFORE the <ul>
      // 2. Process the <ul> with dropdown logic
      // 3. Get any standalone links in <p> tags AFTER the <ul>

      const ul = body.querySelector("ul");

      if (ul) {
        // Get all direct children of body to maintain order
        const bodyChildren = Array.from(body.children);

        // Process elements before UL
        for (const child of bodyChildren) {
          if (child === ul) break;
          if (child.tagName === "P") {
            const link = child.querySelector("a");
            if (link) {
              items.push(extractLink(link));
            }
          }
        }

        // Process the UL - Reconstruct Dropdowns
        const anchors = Array.from(ul.querySelectorAll("a"));
        let currentGroup: NavItem | null = null;

        anchors.forEach((a) => {
          const rawHref = a.getAttribute("href");
          // Check for section headers (href="#" or specific javascript void)
          const isHeader = rawHref === "#" || rawHref === "" || rawHref === "javascript:void(0)" || rawHref === "javascript:;";

          if (isHeader) {
            // This acts as a Section Header (Dropdown Parent)
            currentGroup = {
              label: a.textContent?.trim() || "",
              path: "#",
              children: []
            };
            items.push(currentGroup);
          } else {
            // This is a Link
            const linkItem = extractLink(a);

            if (currentGroup) {
              // If we have an active header, add to it
              currentGroup.children?.push(linkItem);
            } else {
              // Result of loose link before any header? Treat as top level.
              items.push(linkItem);
            }
          }
        });

        // Process elements after UL
        let foundUl = false;
        for (const child of bodyChildren) {
          if (child === ul) {
            foundUl = true;
            continue;
          }
          if (foundUl && child.tagName === "P") {
            const link = child.querySelector("a");
            if (link) {
              items.push(extractLink(link));
            }
          }
        }
      } else {
        // Fallback: If no UL structure found at all (e.g. just flat text or divs)
        // We just grab all links found in the body.
        const allLinks = body.querySelectorAll("a");
        allLinks.forEach(a => items.push(extractLink(a)));
      }

      console.log(`Successfully parsed ${items.length} navigation items`);
      return items;
    } catch (e) {
      console.error("Error parsing header HTML:", e);
      return [];
    }
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const toggleSubMenu = (label: string) => {
    setOpenMenu((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isExternalLink = (path: string) => path.startsWith("http");

  // Helper to determine target attribute
  const getTarget = (item: NavItem) => item.target || (isExternalLink(item.path || "") ? "_blank" : undefined);

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
            className="w-auto h-auto"
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
