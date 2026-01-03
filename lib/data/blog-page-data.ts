import { BlogPageData } from "@/types/blog-page";

export const BLOG_PAGE_INITIAL_DATA: BlogPageData = {
  hero: {
    title: "Blog",
    subtitle: "Reference giving information on its origins, as well as a random Lipsum generator.",
    bgImage: "/blog-gradient-bg.png"
  },
  categories: [
    { id: 1, name: "Forensic Science" },
    { id: 2, name: "Crime Scene Investigation" },
    { id: 3, name: "Criminology & Victimology" },
    { id: 4, name: "Cyber Security & Law" },
    { id: 5, name: "DNA Fingerprinting" },
    { id: 6, name: "Document Examination" },
    { id: 7, name: "Fingerprint Analysis" },
    { id: 8, name: "Forensic Accounting" },
    { id: 9, name: "Forensic Anthropology" }
  ],
  posts: [
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
      content: `
        <h2 class="text-2xl font-bold text-gray-900">Practice-Focused Training Methodology</h2>
        <p class="text-gray-600">This training program emphasizes applied learning supported by strong conceptual clarity. You are trained in:</p>
        <ul class="list-disc ml-5 space-y-2 text-gray-600">
          <li>Core principles of document authenticity</li>
          <li>Identification of genuine, altered, and forged documents</li>
          <li>Detection of erasures, overwriting, and additions</li>
          <li>Ethical responsibilities and professional limitations</li>
        </ul>
        <h2 class="text-2xl font-bold text-gray-900 mt-8">Extensive Hands-On Practical Exposure</h2>
        <ul class="list-disc ml-5 space-y-2 text-gray-600">
          <li>Examination of real and simulated documents</li>
          <li>Side-by-side comparison of disputed samples</li>
          <li>Supervised practical sessions with expert feedback</li>
          <li>Practice in documenting observations</li>
        </ul>
      `,
      socialLinks: {
        facebook: "https://facebook.com/sifsindia",
        instagram: "https://instagram.com/sifsindia",
        linkedin: "https://linkedin.com/company/sifsindia",
        twitter: "https://twitter.com/sifsindia"
      }
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
      content: `
        <h2 class="text-2xl font-bold text-gray-900">Training Overview</h2>
        <p class="text-gray-600">This course covers the essentials of document verification...</p>
      `,
      socialLinks: {
        facebook: "https://facebook.com/sifsindia",
        instagram: "https://instagram.com/sifsindia",
        linkedin: "https://linkedin.com/company/sifsindia",
        twitter: "https://twitter.com/sifsindia"
      }
    }
  ],
  recentPostIds: [1, 2]
};
