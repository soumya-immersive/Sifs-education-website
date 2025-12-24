// src/data/courses.ts

export interface Course {
  id: string;
  programSlug: string;
  slug: string;

  title: string;
  shortTitle?: string;
  courseCode: string;

  rating: number;
  reviewsCount: number;
  heroImage: string;

  duration: string;
  mode: "Online" | "Offline" | "Hybrid";
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;

  price: number;
  discountedPrice?: number;

  overview: string;
  highlights: string[];

  syllabus: {
    title: string;
    points: string[];
  }[];

  eligibility: string[];
  careerOpportunities: string[];

  featured?: boolean;
}

export const courses: Course[] = [
  {
    id: "fsp-101",
    programSlug: "foundation-certificate",
    slug: "forensic-science-criminal-investigation",
    title: "Forensic Science & Criminal Investigation",
    shortTitle: "Forensic Science",
    courseCode: "FSP 101",
    rating: 4.8,
    reviewsCount: 150,
    heroImage: "/course/hero-bg.png",
    duration: "6 Months",
    mode: "Offline",
    level: "Beginner",
    language: "English",
    price: 60000,
    discountedPrice: 45000,
    overview:
      "This course introduces the fundamentals of forensic science and criminal investigation with hands-on exposure to real case studies.",
    highlights: [
      "Hands-on forensic lab exposure",
      "Expert faculty from law enforcement",
      "Case study based learning",
      "Industry recognized certification",
    ],
    syllabus: [
      {
        title: "Introduction to Forensic Science",
        points: [
          "History of forensic science",
          "Branches of forensics",
          "Role of forensic expert",
        ],
      },
      {
        title: "Crime Scene Investigation",
        points: [
          "Securing a crime scene",
          "Evidence collection",
          "Chain of custody",
        ],
      },
    ],
    eligibility: [
      "12th pass or equivalent",
      "Basic science background preferred",
    ],
    careerOpportunities: [
      "Forensic Analyst",
      "Crime Scene Investigator",
      "Forensic Assistant",
    ],
    featured: true,
  },

  {
    id: "acc-201",
    programSlug: "advanced-certificate",
    slug: "forensic-toxicology",
    title: "Forensic Toxicology",
    courseCode: "ACC 201",
    rating: 4.6,
    reviewsCount: 92,
    heroImage: "/course/hero-bg.png",
    duration: "4 Months",
    mode: "Hybrid",
    level: "Advanced",
    language: "English",
    price: 80000,
    overview:
      "Advanced training in toxicological analysis related to forensic investigations.",
    highlights: [
      "Drug & poison analysis",
      "Real lab instrumentation",
      "Expert toxicologists",
    ],
    syllabus: [
      {
        title: "Basics of Toxicology",
        points: ["Types of poisons", "Toxicokinetics"],
      },
    ],
    eligibility: [
      "Graduate in science",
      "Background in chemistry preferred",
    ],
    careerOpportunities: [
      "Forensic Toxicologist",
      "Lab Analyst",
    ],
  },
];
