export interface Internship {
  id: number;
  programSlug: "lab-based" | "online";
  slug: string;
  title: string;
  overview: string;
  internshipCode: string;
  heroImage: string;
  // 🔹 NEW (used by Inner cards)
  rating: number;
  reviewsCount: number;
  bannerImage: string;
}

export const internships: Internship[] = [
  {
    id: 1,
    programSlug: "lab-based",
    slug: "cyber-forensic-investigation",
    title: "Cyber Forensic Investigation",
    overview:
      "Learn to investigate digital crimes using industry-grade forensic tools.",
    internshipCode: "LBI-101",
    heroImage: "/internships/internship.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/internship/hero-bg.png",
  },
  {
    id: 2,
    programSlug: "online",
    slug: "digital-forensics-foundation",
    title: "Digital Forensics Foundation",
    overview:
      "Online internship covering core concepts of digital forensics.",
    internshipCode: "OI-201",
    heroImage: "/internships/internship.png",
    rating: 4.8,
    reviewsCount: 150,
    bannerImage: "/internship/hero-bg.png",
  },
];
