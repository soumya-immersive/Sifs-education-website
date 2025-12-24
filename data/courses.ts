export interface Course {
  id: number;

  programSlug: string;
  slug: string;

  title: string;
  overview: string;
  courseCode: string;

  heroImage: string;

  // 🔹 NEW (used by CourseHero & cards)
  rating: number;
  reviewsCount: number;
  bannerImage: string;
}

export const courses: Course[] = [
  {
    id: 1,
    programSlug: "associate-degree",
    slug: "forensic-science-criminal-investigation",
    title: "Forensic Science & Criminal Investigation",
    overview:
      "Learn crime scene analysis and applications of scientific methodologies to uncover the truth behind matters pertaining to law.",
    courseCode: "FSWD-101",
    heroImage: "/courses/course1.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/course/hero-bg.png",
  },
  {
    id: 2,
    programSlug: "foundation-certificate",
    slug: "forensic-psycology",
    title: "Forensic Psychology",
    overview:
      "Understand criminal behavior, forensic assessment techniques, and psychology in legal investigations.",
    courseCode: "FCP-102",
    heroImage: "/courses/course1.png",
    rating: 4.6,
    reviewsCount: 98,
    bannerImage: "/course/hero-bg.png",
  },
  {
    id: 3,
    programSlug: "advanced-certificate",
    slug: "forensic-science-criminal-investigation",
    title: "Advanced Forensic Science",
    overview:
      "Advanced methodologies and practical exposure in forensic science investigations.",
    courseCode: "ACP-201",
    heroImage: "/courses/course1.png",
    rating: 4.7,
    reviewsCount: 75,
    bannerImage: "/course/hero-bg.png",
  },
  {
    id: 4,
    programSlug: "professional-courses",
    slug: "forensic-science-criminal-investigation",
    title: "Professional Forensic Investigation",
    overview:
      "Industry-oriented forensic training for professionals and law enforcement.",
    courseCode: "PC-301",
    heroImage: "/courses/course1.png",
    rating: 4.9,
    reviewsCount: 210,
    bannerImage: "/course/hero-bg.png",
  },
  {
    id: 5,
    programSlug: "classroom-courses",
    slug: "introduction-to-forensic-science",
    title: "Introduction to Forensic Science",
    overview:
      "An introductory classroom-based course covering the basics of forensic science.",
    courseCode: "CC-101",
    heroImage: "/courses/course1.png",
    rating: 4.5,
    reviewsCount: 60,
    bannerImage: "/course/hero-bg.png",
  },
];
