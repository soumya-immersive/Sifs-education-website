export interface Internship {
  id: number | string;
  programSlug: string;
  slug: string;
  title: string;
  overview?: string; // Made optional
  internshipCode?: string; // Made optional
  heroImage: string;
  rating?: number; // Made optional
  reviewsCount?: number; // Made optional
  bannerImage?: string; // Made optional
  highlights?: string[];
  // Add other fields that might come from API or your mapped object
  description?: string;
  image?: string;
  category?: string;
  duration?: string;
  level?: string;
  price?: string;
  originalPrice?: number;
  students?: number;
  tags?: string[];
  features?: string[];
  video_id?: string;
  video_url?: string;
  instructors?: import("@/types/course").ApiInstructor[];
  priceLevel1?: string;
  priceLevel2?: string;
  priceLevel3?: string;
  callForAssistance?: string;
  faq?: any[];
  reviews?: any[];
  comments?: any[];
  case_studies?: string; // HTML content
  training_outline?: string; // HTML content
  prospectus?: {
    level_one?: string;
    body_one?: string;
    level_two?: string;
    body_two?: string;
    level_three?: string;
    body_three?: string;
    level_four?: string;
    body_four?: string;
  };
  seo_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
}

export const internships: Internship[] = [
  {
    id: 1,
    programSlug: "lab-based",
    slug: "cyber-forensic-investigation",
    title: "Cyber Forensic Investigation",
    overview:
      "Learn to investigate digital crimes using industry-grade forensic tools.",
    internshipCode: "LBI-101",
    heroImage: "/internships/internship.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/internship/hero-bg.png",
    highlights: [
      "Live Cyber Crime Case Studies",
      "Network Forensic Tools Training",
      "Digital Evidence Collection Protocols"
    ]
  },
  {
    id: 2,
    programSlug: "online",
    slug: "digital-forensics-foundation",
    title: "Digital Forensics Foundation",
    overview:
      "Online internship covering core concepts of digital forensics.",
    internshipCode: "OI-201",
    heroImage: "/internships/internship.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/internship/hero-bg.png",
    highlights: [
      "Live Cyber Crime Case Studies",
      "Network Forensic Tools Training",
      "Digital Evidence Collection Protocols"
    ]
  },
];
