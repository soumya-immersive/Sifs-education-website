export interface CourseProgram {
  slug: string;
  label: string;
  subtitle?: string;
  heroImage?: string;
  heroBgImage?: string;
}

export interface CourseInstructor {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface Instructor extends CourseInstructor {}

export interface CourseAccordionItem {
  title: string;
  content: string;
}

export interface AccordionItem extends CourseAccordionItem {}

export interface CoursePaymentDetails {
  paypal: string;
  bankName: string;
  accountName: string;
  accountNo: string;
  type: string;
  ifsc: string;
  qrImage: string;
}

export interface PaymentDetails extends CoursePaymentDetails {}

export interface CourseSidebarIncludeItem {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}

export interface SidebarIncludeItem extends CourseSidebarIncludeItem {}

export interface CourseSidebarData {
  image: string;
  includes: CourseSidebarIncludeItem[];
  instructors: CourseInstructor[];
}

export interface SidebarData extends CourseSidebarData {}

export interface Course {
  id: number;
  programSlug: string;
  slug: string;
  title: string;
  courseCode: string;
  overview: string;
  description: string;
  descriptionParts: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  bannerImage: string;
  sidebarData: CourseSidebarData;
  highlights: string[];
  accordionItems: CourseAccordionItem[];
  paymentDetails: CoursePaymentDetails;
  skillLevel?: "level1" | "level2" | "level3";
  durationHours?: number;
  createdAt?: string;
  aboutTitle?: string;
  aboutSubtitle?: string;
  editionLabel?: string;
  programLabel?: string;
  // Book specific fields
  author?: string;
  publisher?: string;
  language?: string;
  pageCount?: number;
  publishedDate?: string;
  format?: string;
  genre?: string;
  inStock?: boolean;
}

export interface CoursesHeroData {
  title: string;
  subtitle: string;
  bgImage: string;
}

export interface LearningData {
  title: string;
  subtitle: string;
  image: string;
  exploreLabel?: string;
  storyLabel?: string;
}

export interface EnquiryItem {
  question: string;
  author: string;
  answer?: string;
}

export interface EnquiriesData {
  title: string;
  faqs: EnquiryItem[];
}

export interface CoursesPageData {
  hero: CoursesHeroData;
  programs: CourseProgram[];
  courses: Course[];
  learning: LearningData;
  enquiries: EnquiriesData;
}
