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

export interface TrainingProspectus {
  id: number;
  level_one: string | null;
  body_one: string | null;
  level_two: string | null;
  body_two: string | null;
  level_three: string | null;
  body_three: string | null;
  level_four: string | null;
  body_four: string | null;
  prospectus_image: string | null;
  image_url: string | null;
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
  prospectus?: TrainingProspectus;
  created_at?: string;
  updated_at?: string;
}

export const trainings: Training[] = []
