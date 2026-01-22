export interface TrainingReview {
  id: number;
  student_name: string;
  star: number;
  review: string;
  created_at: string;
}

export interface TrainingFAQ {
  id: number;
  question: string;
  answer: string;
}

export interface TrainingComment {
  id: number;
  name: string;
  query: string;
  reply: string;
}

export interface Training {
  id: number;
  slug: string;
  programSlug: string;
  trainingCode: string;
  title: string;
  overview: string;
  heroImage: string;

  rating: number;
  reviewsCount: number;
  bannerImage: string;
  highlights?: string[];

  // API Fields
  price?: string;
  duration?: string;
  level?: string;
  courseOutline?: string; // mapping training_outline to this or similar
  priceLevel1?: string;
  priceLevel2?: string;
  priceLevel3?: string;
  instructors?: import("@/types/course").ApiInstructor[];
  video_url?: string;
  video_id?: string;
  callForAssistance?: string;
  trainingOutline?: string;
  caseStudies?: string;
  reviews?: TrainingReview[];
  faqs?: TrainingFAQ[];
  comments?: TrainingComment[];
}


export const trainings: Training[] = [
  {
    id: 1,
    slug: "fingerprint-analysis-and-examination",
    programSlug: "corporate-training",
    trainingCode: "CT-101",
    title: "Fingerprint Analysis & Examination",
    overview: "Acquire practical skills in forensic Fingerprint Examination and Verification techniques, for effective criminal investigations.",
    heroImage: "/training/training.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/training/hero-bg.png",
    highlights: [
      "24/7 Portal Access",
      "Live Practical Demonstrations",
      "Industry Recognized Certificate"
    ]
  },
  {
    id: 2,
    slug: "crime-scene-investigation-and-management",
    programSlug: "onsite-training",
    trainingCode: "OST-101",
    title: "Crime Scene Investigation & Management",
    overview: "Become a skilled Crime Scene Investigator. Gain knowledge and practical experience needed to excel in this field.",
    heroImage: "/training/training.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/training/hero-bg.png",
    highlights: [
      "24/7 Portal Access",
      "Live Practical Demonstrations",
      "Industry Recognized Certificate"
    ]
  },
  {
    id: 3,
    slug: "forensic-science-and-criminal-investigation",
    programSlug: "Hands-on-training",
    trainingCode: "LT-101",
    title: "Forensic Science and Criminal Investigation",
    overview: "Acquire expertise in forensic evidence collection, preservation, and analysis and crime scene management techniques.",
    heroImage: "/training/training.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/training/hero-bg.png",
    highlights: [
      "24/7 Portal Access",
      "Live Practical Demonstrations",
      "Industry Recognized Certificate"
    ]
  },
  {
    id: 4,
    slug: "forensic-science-and-criminal-investigation",
    programSlug: "online-training",
    trainingCode: "OT-101",
    title: "Forensic Science and Criminal Investigation",
    overview: "Become well-versed in applying forensic principles to solve complex criminal cases and contribute meaningfully to the field of forensics.",
    heroImage: "/training/training.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/training/hero-bg.png",
    highlights: [
      "24/7 Portal Access",
      "Live Practical Demonstrations",
      "Industry Recognized Certificate"
    ]
  },
];
