// data/posts.ts - UPDATED VERSION
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt?: string; 
  heroImage: string;
  introduction: string;
  contentImage: string;
  image?: string; 
}

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "hands-on-facial-reconstruction-training-delhi-india", 
    title: "Hands-on Facial Reconstruction Training Delhi, India",
    author: "John Doe", 
    date: "2 Dec, 2025", 
    category: "Tutorial", 
    excerpt: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focused...",
    heroImage: "/blog/blog-main-hero.png", 
    image: "/blog/blog-main-hero.png", 
    contentImage: "/blog/training-ui.png",
    introduction: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focused program designed for forensic professionals...",
  },
  {
    id: 2,
    slug: "hands-on-document-authenticity-training-delhi-india", 
    title: "Hands-on Document Authenticity Training Delhi, India",
    author: "SIFS India",
    date: "21 Dec, 2025",
    category: "News",
    excerpt: "The ability to verify the authenticity of documents is a vital skill in legal, corporate...",
    heroImage: "/blog/blog-main-hero.png",
    image: "/blog/blog-main-hero.png", 
    contentImage: "/blog/training-ui.png",
    introduction: "The ability to verify the authenticity of documents is a vital skill in legal, corporate, and investigative environments...",
  },
  
];