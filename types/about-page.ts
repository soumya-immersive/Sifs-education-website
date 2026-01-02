export interface AboutHeroData {
  heading: string;
  subtitle: string;
  image: string;
  badgeNumber: string;
  badgeText: string;
  tag: string;
  h2: string;
  paragraphs: string[];
}

export interface MissionCard {
  icon: string;
  title: string;
  description: string;
}

export interface MissionData {
  mainImage: string;
  cards: MissionCard[];
}

export interface InitiativesData {
  leftImage: string;
  bgImage: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  listLeftTitle: string;
  listLeftItems: string[];
  listRightTitle1: string;
  listRightItems1: string[];
  listRightTitle2: string;
  listRightItems2: string[];
}

export interface Expert {
  name: string;
  role: string;
  image: string;
}

export interface TeamData {
  subtitle: string;
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  browseLink: string;
  browseText: string;
  experts: Expert[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  course: string;
  content: string;
  quote: string;
  avatar: string;
}

export interface TestimonialsData {
  heading: string;
  subheading: string;
  bgImage: string;
  items: TestimonialItem[];
}

export interface AboutPageData {
  hero: AboutHeroData;
  mission: MissionData;
  initiatives: InitiativesData;
  team: TeamData;
  testimonials: TestimonialsData;
}
