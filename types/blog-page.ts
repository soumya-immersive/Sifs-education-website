export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage: string;
  image: string;
  contentImage: string;
  introduction: string;
  content: string; // HTML content for the blog body
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface BlogPageHero {
  title: string;
  subtitle: string;
  bgImage: string;
}

export interface BlogPageData {
  hero: BlogPageHero;
  posts: BlogPost[];
  categories: { id: number; name: string }[];
  recentPostIds: number[];
}
