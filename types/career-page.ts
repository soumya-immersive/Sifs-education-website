export interface CareerHeroData {
  title: string;
  subtitle: string;
  bgImage: string;
}

export interface JobOpening {
  id: number;
  title: string;
  experience: string;
  deadline: string;
  educationalExperience: string;
  category: string;
  applyButtonLabel?: string;
}

export interface InsightCard {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  imageSrc: string;
  tag: string;
}

export interface CareerInsightsData {
  heading: string;
  subheading: string;
  cards: InsightCard[];
  exploreButtonLabel?: string;
}

export interface CareerCategory {
  id: number;
  name: string;
}

export interface CareerPageData {
  hero: CareerHeroData;
  jobs: JobOpening[];
  insights: CareerInsightsData;
  categories: CareerCategory[];
}
