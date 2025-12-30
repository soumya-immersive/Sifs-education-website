// 1. Define the Interface first
export interface Event {
  id: number;
  slug: string; // This fixes your page.tsx error
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
  description: string;
  objectives: string[];
  schedule: {
    day: number;
    title: string;
    description: string;
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
}
export const events: Event[] = [
  // Event 1: Digital Forensics & Cyber Security
  {
    id: 1,
    slug: "digital-forensics-cyber-security", 
    title: "Digital Forensics & Cyber Security",
    category: "Cyber Security",
    date: "08 Dec, 2025",
    duration: "5 Days",
    location: "Online",
    mode: "online",
    price: 199,
    discountedPrice: 149,
    currency: "USD",
    heroImage: "/events/digital-forensics-hero.jpg",
    description: "A micro certificate program offered by Sherlock Institute of Forensic Science (SIFS) India is an intensive 5-day program focused on digital forensics and cyber security.",
    
    objectives: [
      "Understand digital forensic investigation techniques",
      "Learn cyber security best practices",
      "Master evidence collection and analysis"
    ],
    
    schedule: [
      { day: 1, title: "Introduction to Digital Forensics", description: "Basic concepts and tools" },
      { day: 2, title: "Cyber Security Fundamentals", description: "Security principles and protocols" },
      { day: 3, title: "Evidence Collection", description: "Digital evidence preservation" },
      { day: 4, title: "Forensic Analysis", description: "Data recovery and analysis" },
      { day: 5, title: "Case Studies & Reporting", description: "Real-world applications" }
    ],
    
    faqs: [
      { question: "Who is this program for?", answer: "IT professionals, law enforcement, students" },
      { question: "What will I learn?", answer: "Digital forensic investigation techniques" }
    ],
    
    seats: { total: 100, available: 45 },
    instructors: [
      { name: "Dr. Alex Johnson", role: "Cyber Security Expert", image: "/instructors/alex-johnson.jpg" }
    ]
  },
  
  
  {
    id: 2,
    slug: "6th-international-forensic-science-conference",
    title: "6th International Forensic Science Conference",
    category: "Conference",
    date: "08 Dec, 2025",
    duration: "3 Days",
    location: "Mumbai, India",
    mode: "hybrid",
    price: 399,
    discountedPrice: 349,
    currency: "USD",
    heroImage: "/events/conference-hero.jpg",
    description: "An intensive 5-day program focused on contemporary forensic science domains with international experts.",
    
    objectives: [
      "Network with forensic science experts",
      "Learn about latest research",
      "Explore career opportunities"
    ],
    
    schedule: [
      { day: 1, title: "Opening Ceremony", description: "Keynote speeches" },
      { day: 2, title: "Research Presentations", description: "Latest findings" },
      { day: 3, title: "Workshops & Networking", description: "Interactive sessions" }
    ],
    
    faqs: [
      { question: "Is this conference online or offline?", answer: "Hybrid mode available" }
    ],
    
    seats: { total: 500, available: 120 },
    instructors: [
      { name: "Prof. Robert Chen", role: "Conference Chair", image: "/instructors/robert-chen.jpg" }
    ]
  },
  
  // Event 3: Global Dimensions of Forensic Science
  {
    id: 3,
    slug: "global-dimensions-forensic-science-strengthening-justice",
    title: "Global Dimensions of Forensic Science: Strengthening Justice",
    category: "International Program",
    date: "08 Dec, 2025",
    duration: "4 Days",
    location: "Online",
    mode: "online",
    price: 249,
    discountedPrice: 199,
    currency: "USD",
    heroImage: "/events/global-forensics-hero.jpg",
    description: "A program exploring global best practices in forensic science and justice system integration.",
    
    objectives: [
      "Understand global forensic standards",
      "Learn international best practices",
      "Network with global experts"
    ],
    
    schedule: [
      { day: 1, title: "Global Standards", description: "International protocols" },
      { day: 2, title: "Case Studies", description: "Cross-border investigations" },
      { day: 3, title: "Legal Framework", description: "International law" },
      { day: 4, title: "Future Trends", description: "Emerging technologies" }
    ],
    
    faqs: [
      { question: "Will I get a certificate?", answer: "Yes, international certificate provided" }
    ],
    
    seats: { total: 200, available: 75 },
    instructors: [
      { name: "Dr. Sarah Williams", role: "International Forensic Expert", image: "/instructors/sarah-williams.jpg" }
    ]
  },
  
  // Event 4: Forensic Psychology (your existing event)
  {
    id: 4,
    slug: "forensic-psychology-principles-practice-ethics",
    title: "Forensic Psychology - Its Principles, Practice & Ethics",
    category: "Forensic Science",
    date: "20 January 2025",
    duration: "5 Days",
    location: "Delhi, India",
    mode: "hybrid",
    price: 299,
    discountedPrice: 249,
    currency: "USD",
    heroImage: "/events/forensic-psychology-hero.jpg",
    description: "Before performing the Civil War, a program focused on Psychological science. It displayed an innovative perspective on computer vision and innovation in the field of mental psychology over time...",
    
    objectives: [
      "Understand the principles of forensic psychology",
      "Learn practical applications in legal settings",
      "Explore ethical considerations in the field"
    ],
    
    schedule: [
      { day: 1, title: "Introduction to Forensic Psychology", description: "Basic concepts and historical perspective" },
      { day: 2, title: "The right foot of philosophy", description: "A reference choice covers the movement" },
      { day: 3, title: "Human behavior and its legal activities", description: "Understanding behavioral patterns in legal context" },
      { day: 4, title: "Practical Applications", description: "Case studies and real-world applications" },
      { day: 5, title: "Ethics and Professional Practice", description: "Ethical considerations and career guidance" }
    ],
    
    faqs: [
      { question: "Who will I learn from in this program?", answer: "The program is taught by experienced forensic psychologists and legal experts." },
      { question: "What will I be the question of the special?", answer: "You'll gain specialized knowledge in forensic psychology applications." }
    ],
    
    seats: { total: 50, available: 32 },
    instructors: [
      { name: "Dr. John Smith", role: "Lead Forensic Psychologist", image: "/instructors/john-smith.jpg" },
      { name: "Prof. Jane Doe", role: "Legal Psychology Expert", image: "/instructors/jane-doe.jpg" }
    ]
  }
];