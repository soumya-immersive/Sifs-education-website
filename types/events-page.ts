
export interface EventsHeroData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  enrolledCount: string;
  features: string[];
  certificateTitle: string;
  certificateDescription: string;
  buttonLabel?: string;
}

export interface JourneyStatsData {
  bgImage: string;
  title: string;
  description: string;
  counts: {
    events: number;
    participants: string;
    countries: number;
    speakers: number;
  };
}

export interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  duration: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  price: number;
  discountedPrice: number;
  currency: string;
  heroImage: string;
  coverImage?: string;
  description: string;
  objectives: string[];
  schedule: {
    day: number;
    title: string;
    description: string;
    time?: string;
    image?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seats: {
    total: number;
    available: number;
  };
  instructors: {
    name: string;
    role: string;
    image: string;
  }[];
  // New fields for Detail Page Sidebar editability
  contactEmail?: string;
  contactPhone?: string;
  venue?: string; // e.g., "Online Zoom"
  venueAddress?: string; // e.g., description
  venueEmail?: string;
  venuePhone?: string;
  platform?: string; // e.g. "Zoom Platform"
  registrationLink?: string;
  schedulePdfLink?: string; // For "Download Schedule"
}

export interface ArchiveProgramData {
  title: string;
  description: string;
  image: string;
  years: string[];
  programs: {
    title: string;
    date: string;
    image: string;
    primary?: boolean;
  }[];
}

export interface ParticipatoryData {
  title: string;
  description: string;
  image: string; // Background or main image if any
  partners: {
    name: string;
    logo: string;
  }[];
}

export interface ForensicInsightsData {
  title: string;
  description: string;
  cards: {
    title: string;
    description: string;
    date: string;
    author: string;
    imageSrc: string;
  }[];
}

export interface EventsPageData {
  hero: EventsHeroData;
  stats: JourneyStatsData;
  events: Event[];
  showAllButtonLabel?: string;
  archive: ArchiveProgramData;
  team: {
    subtitle: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    browseLink: string;
    browseText: string;
    experts: {
      name: string;
      role: string;
      image: string;
    }[];
  };
  participatory: ParticipatoryData;
  insights: ForensicInsightsData;
}
