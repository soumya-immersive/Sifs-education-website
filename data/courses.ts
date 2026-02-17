import { ApiComment } from "@/types/course";

export interface Course {
  id: number;

  programSlug: string;
  slug: string;

  title: string;
  overview: string;
  courseCode: string;

  heroImage: string;
  description?: string;

  // 🔹 NEW (used by CourseHero & cards)
  rating: number;
  reviewsCount: number;
  bannerImage: string;

  // 🔹 Dynamic API Fields
  priceLevel1?: string;
  priceLevel2?: string;
  priceLevel3?: string;
  callForAssistance?: string;
  duration?: string;
  level?: string;
  courseOutline?: string; // HTML content
  caseStudies?: string; // HTML content
  faqs?: ApiComment[];
  video_url?: string;

  // 🔹 New Dynamic Fields (Full API Support)
  instructors?: import("@/types/course").ApiInstructor[];
  courseFaqs?: import("@/types/course").ApiFaq[];
  reviewsList?: import("@/types/course").ApiReview[];
  prospectus?: import("@/types/course").ApiProspectus;
}

export const courses: Course[] = [
  {
    id: 1,
    programSlug: "onilne-courses",
    slug: "forensic-science-criminal-investigation",
    title: "Forensic Science & Criminal Investigation",
    overview:
      "Learn crime scene analysis and applications of scientific methodologies to uncover the truth behind matters pertaining to law.",
    courseCode: "FSWD-101",
    heroImage: "/courses/course1.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/course/hero-bg.png",
    description: "An advanced program covering latent print development and identification techniques."
  },

];
