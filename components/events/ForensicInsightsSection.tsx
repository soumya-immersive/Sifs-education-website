"use client";


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { API_BASE_URL, BASE_URL } from "@/lib/config";

// --- 1. TYPE DEFINITIONS ---
interface CardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  imageSrc: string;
  slug: string;
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  main_image: string;
  publish_date: string;
  author: string;
  content: string;
}

interface SectionData {
  blog_section_title: string;
  blog_section_subtitle: string;
}

// --- FIXED EASING (VALID FOR FRAMER MOTION v10+) ---
const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

// --- Framer Motion Variants ---

// 1. Section container
const sectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

// 2. Header Block
const headerVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easeOutCubic },
  },
};

// 3. Cards Grid Container
const cardsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// 4. Individual Card animation
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutCubic },
  },
};

// --- 2. MAIN COMPONENT ---
const ForensicInsights: React.FC = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [sectionData, setSectionData] = useState<SectionData>({
    blog_section_title: "Forensic Insights",
    blog_section_subtitle: "Decoding Crime Mysteries: Expand Your Knowledge and Explore the Latest Advancements",
  });
  const [loading, setLoading] = useState(true);

  // Fetch section data and blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`);
        const data = await response.json();

        if (data?.success && data?.data) {
          // Update section data
          if (data.data.bs) {
            setSectionData({
              blog_section_title: data.data.bs.blog_section_title || "Forensic Insights",
              blog_section_subtitle: data.data.bs.blog_section_subtitle || "Decoding Crime Mysteries: Expand Your Knowledge and Explore the Latest Advancements",
            });
          }

          // Update blogs
          if (data.data.blogs) {
            setBlogs(data.data.blogs.slice(0, 3)); // Get first 3 blogs
          }
        }
      } catch (error) {
        console.error("Error fetching forensic insights data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  // Helper function to strip HTML tags and truncate
  const stripHtmlAndTruncate = (html: string, maxLength: number = 100) => {
    if (!html) return "";
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Card component
  const Card: React.FC<CardProps> = ({
    title,
    description,
    date,
    author,
    imageSrc,
    slug,
  }) => (
    <motion.div
      className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] transition-transform duration-300 hover:scale-[1.02] cursor-pointer shadow-sm hover:shadow-md h-full flex flex-col"
      variants={cardVariants}
      onClick={() => router.push(`/blog/${slug}`)}
    >
      {/* Image */}
      <div className="relative h-56 w-full shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-black/0"></div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-3">
          <span className="bg-[#eff6ff] border border-[#bfdbfe] text-[#1e40af] text-xs font-medium px-2.5 py-0.5 rounded">
            Tutorial
          </span>
        </div>


        <h3 className="text-gray-900 text-xl font-bold mb-3 leading-snug line-clamp-2">
          {title}
        </h3>

        {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2 grow">
          {description}
        </p> */}

        <hr className="mb-4 border-gray-100" />

        {/* Footer info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span>{date}</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Transform blogs to card data
  const cardsData: CardProps[] = blogs.map((blog) => ({
    title: blog.title,
    description: stripHtmlAndTruncate(blog.content),
    date: formatDate(blog.publish_date),
    author: blog.author || "SIFS India",
    imageSrc: blog.main_image
      ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Blog-Main/${blog.main_image}`
      : "/forensic-insights1.png",
    slug: blog.slug,
  }));

  const handleExploreClick = () => {
    router.push("/blog");
  };

  if (loading) {
    return (
      <div className="bg-white p-8 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 pb-32">
      <motion.div
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        variants={sectionContainerVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header */}
        <motion.header
          className="flex flex-col items-start justify-between sm:flex-row sm:items-center mb-10"
          variants={headerVariants}
        >
          <div>
            <h1 className="text-black text-4xl font-bold mb-1">
              {sectionData.blog_section_title}
            </h1>
            <p className="text-gray-600 text-md">
              {sectionData.blog_section_subtitle}
            </p>
          </div>

          <button
            onClick={handleExploreClick}
            className="mt-4 sm:mt-0 px-8 py-3 text-lg font-medium text-white rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center group bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
            Explore
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </button>
        </motion.header>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardsGridVariants}
        >
          {cardsData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForensicInsights;
