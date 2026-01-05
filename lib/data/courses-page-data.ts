import { CoursesPageData } from "../../types/courses-page";

export const COURSES_PAGE_INITIAL_DATA: CoursesPageData = {
  hero: {
    title: "Expert Forensic Programs",
    subtitle: "Advanced certificate programs in forensic science and criminal investigation.",
    bgImage: "/courses/hero-bg.png"
  },
  programs: [
    {
      slug: "associate-degree",
      label: "Associate Degree Program",
      subtitle: "Explore our professional forensic science courses under Associate Degree Program",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    },
    {
      slug: "foundation-certificate",
      label: "Foundation Certificate Program",
      subtitle: "Foundational courses for aspiring forensic science professionals.",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    },
    {
      slug: "advanced-certificate",
      label: "Advanced Certificate Program",
      subtitle: "Deepen your expertise with our advanced forensic certificate programs.",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    },
    {
      slug: "diploma",
      label: "Diploma Program",
      subtitle: "Professional diploma programs for career advancement in forensics.",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    },
    {
      slug: "professional-courses",
      label: "Professional Courses",
      subtitle: "Specialized courses designed for active forensic practitioners.",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    },
    {
      slug: "classroom-courses",
      label: "Classroom Courses",
      subtitle: "In-person intensive training and classroom-based forensic learning.",
      heroImage: "/courses/hero.png",
      heroBgImage: "/courses/hero-bg.png"
    }
  ],
  courses: [
    {
      id: 1,
      programSlug: "associate-degree",
      slug: "forensic-investigation",
      title: "Forensic Science and Criminal Investigation",
      courseCode: "FSP 101",
      overview: "Comprehensive learning program designed for forensic professionals, covering crime scene analysis and investigation techniques.",
      description: "Professional forensic science and criminal investigation program.",
      descriptionParts: [
        "This certificate program on <strong>Forensic Science and Criminal Investigation</strong> serves as an essential resource for students, practitioners, and forensic enthusiasts. It bridges the gap between theoretical principles and practical field application.",
        "Guided by industry veterans, the curriculum delves into the intricacies of evidence analysis, legal frameworks, and the evolving landscape of criminal investigation. Every module is meticulously designed to include the latest advancements in forensic technology.",
        "Participants will find a structured approach to complex topics. The inclusion of real-life case studies provides a narrative backbone to the technical data, making it both an educational powerhouse and an engaging learning experience."
      ],
      rating: 4.8,
      reviewsCount: 1250,
      image: "/courses/course1.png",
      bannerImage: "/course/hero-bg.png",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Price", value: "$60.00", icon: "/course/icon1.png", highlight: true },
          { label: "Enrolled", value: "7 Students", icon: "/course/icon2.png" },
          { label: "Lessons", value: "5 Lessons", icon: "/course/icon3.png" },
          { label: "Duration", value: "10 Hours", icon: "/course/icon4.png" },
          { label: "Quiz", value: "Yes", icon: "/course/icon5.png" }
        ],
        instructors: [
          { name: "Dr. Rajneek K Singh", role: "Honorary Director", image: "/course/ins1.png" },
          { name: "Dr. Renu Devi", role: "HOD & Assistant Professor", image: "/course/ins2.png" },
          { name: "Jyoti Verma", role: "Forensic Instructor", image: "/course/ins3.png" }
        ]
      },
      highlights: [
        "Crime Scene Management",
        "Evidence Collection & Preservation",
        "Fingerprint Analysis",
        "Document Examination",
        "Digital Forensics Basics",
        "Legal Procedures"
      ],
      accordionItems: [
        { title: "Curriculum", content: "Details about modules and topics covered in the course." },
        { title: "FAQ", content: "Common questions and answers for prospective students." },
        { title: "Case Studies", content: "Analysis of real-world forensic investigations." },
        { title: "Reviews", content: "Feedback from previous participants." }
      ],
      paymentDetails: {
        paypal: "forensicdocument@gmail.com",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      },
      skillLevel: "level1",
      durationHours: 10,
      createdAt: new Date().toISOString(),
      aboutTitle: "About this Course",
      aboutSubtitle: "Information & Overview",
      editionLabel: "2025 Edition",
      programLabel: "Professional Program"
    },
    {
      id: 2,
      programSlug: "foundation-certificate",
      slug: "introduction-to-forensics",
      title: "Introduction to Forensic Science",
      courseCode: "FSP 001",
      overview: "A foundational course for beginners interested in the basics of forensic investigation and crime scene science.",
      description: "Basics of forensic science and investigation.",
      descriptionParts: [
        "This foundational course provides a broad overview of the forensic sciences and their role in the justice system.",
        "Students will explore the history of forensics, basic crime scene processing, and the different disciplines within the field.",
        "Perfect for those starting their journey in forensic science with zero prior experience."
      ],
      rating: 4.9,
      reviewsCount: 850,
      image: "/courses/course1.png",
      bannerImage: "/course/hero-bg.png",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Price", value: "$45.00", icon: "/course/icon1.png", highlight: true },
          { label: "Duration", value: "8 Hours", icon: "/course/icon4.png" }
        ],
        instructors: [
          { name: "Expert Trainer", role: "Specialist", image: "/course/ins1.png" }
        ]
      },
      highlights: [
        "Fundamental forensic principles",
        "Crime scene basics",
        "Intro to evidence types"
      ],
      accordionItems: [
        { title: "Curriculum", content: "Foundational topics covered over 4 weeks." }
      ],
      paymentDetails: {
        paypal: "forensicdocument@gmail.com",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      },
      skillLevel: "level1",
      durationHours: 8,
      createdAt: new Date().toISOString(),
      aboutTitle: "About this Course",
      aboutSubtitle: "Information & Overview",
      editionLabel: "2025 Edition",
      programLabel: "Foundation Program"
    },
    {
      id: 3,
      programSlug: "advanced-certificate",
      slug: "advanced-digital-forensics",
      title: "Advanced Digital Forensic Analysis",
      courseCode: "FSP 501",
      overview: "In-depth technical training on digital evidence recovery, mobile forensics, and network investigation.",
      description: "Technical mastery of digital forensic investigation.",
      descriptionParts: [
        "Dive deep into the world of bits and bytes. This advanced course covers complex data recovery and analysis.",
        "Focus on mobile platform forensics, cloud investigation, and cybercrime response.",
        "Designed for IT professionals and forensic practitioners looking to specialize."
      ],
      rating: 4.7,
      reviewsCount: 450,
      image: "/courses/course1.png",
      bannerImage: "/course/hero-bg.png",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Price", value: "$120.00", icon: "/course/icon1.png", highlight: true },
          { label: "Duration", value: "20 Hours", icon: "/course/icon4.png" }
        ],
        instructors: [
          { name: "Digital Expert", role: "Cyber Specialist", image: "/course/ins3.png" }
        ]
      },
      highlights: [
        "Advanced data recovery",
        "Mobile & Cloud forensics",
        "Expert witness testimony prep"
      ],
      accordionItems: [
        { title: "Technical Modules", content: "Advanced hands-on labs with industry tools." }
      ],
      paymentDetails: {
        paypal: "forensicdocument@gmail.com",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      },
      skillLevel: "level3",
      durationHours: 20,
      createdAt: new Date().toISOString(),
      aboutTitle: "About this Course",
      aboutSubtitle: "Advanced Technical Overview",
      editionLabel: "2025 Edition",
      programLabel: "Advanced Program"
    }
  ],
  learning: {
    title: "Step into the New Era of Learning",
    subtitle: "Our courses blend in-depth learning and interactive sessions, all while staying deeply grounded in core principles.",
    image: "/student-pointing.png",
    exploreLabel: "Explore Programs",
    storyLabel: "Watch Student Story"
  },
  enquiries: {
    title: "Enquiries from Forensic Learners",
    faqs: [
      {
        question: "What are the differences between Level 1, Level 2, and Level 3 courses?",
        author: "Haszel Williams",
        answer: "The course curriculum is designed according to the difficulty level and duration needed to complete it. Level 1 is a foundational course (3 months). Level 2 is more advanced (6 months). Level 3 is the most advanced, combining content from Levels 1 and 2 with additional topics."
      },
      {
        question: "I have no previous experience in forensics. Can I enroll in this course?",
        author: "Kevin Johnson",
        answer: "Yes, our foundational courses (Level 1) are designed for beginners with no prior experience."
      },
      {
        question: "Are real-world case studies included in the curriculum?",
        author: "Prasath Narayan",
        answer: "Absolutely! We focus on practical application through real-world case studies and interactive sessions."
      }
    ]
  }
};
export const INTERNSHIPS_PAGE_INITIAL_DATA: CoursesPageData = {
  hero: {
    title: "Forensic Internships",
    subtitle: "Gain hands-on experience in forensic science through our lab-based and online internships.",
    bgImage: "/internship/hero-bg.png"
  },
  programs: [
    {
      slug: "lab-based",
      label: "Lab Based Internship",
      subtitle: "Join our physical lab for intensive hands-on forensic training.",
      heroImage: "/internships/internship.png",
      heroBgImage: "/internship/hero-bg.png"
    },
    {
      slug: "online",
      label: "Online Internship",
      subtitle: "Flexible online internship programs covering digital and theoretical forensics.",
      heroImage: "/internships/internship.png",
      heroBgImage: "/internship/hero-bg.png"
    }
  ],
  courses: [
    {
      id: 1,
      programSlug: "lab-based",
      slug: "cyber-forensic-investigation",
      title: "Cyber Forensic Investigation",
      courseCode: "LBI-101",
      overview: "Learn to investigate digital crimes using industry-grade forensic tools.",
      description: "Comprehensive cyber forensic lab internship.",
      descriptionParts: [
        "Learn to investigate digital crimes using industry-grade forensic tools.",
        "Gain hands-on experience with live cyber crime case studies."
      ],
      rating: 4.8,
      reviewsCount: 150,
      image: "/internships/internship.png",
      bannerImage: "/internship/hero-bg.png",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Duration", value: "4 Weeks", icon: "/course/icon4.png" },
          { label: "Type", value: "Lab Based", icon: "/course/icon1.png" }
        ],
        instructors: [
          { name: "Forensic Expert", role: "Lab Lead", image: "/course/ins1.png" }
        ]
      },
      highlights: [
        "Live Cyber Crime Case Studies",
        "Network Forensic Tools Training",
        "Digital Evidence Collection Protocols"
      ],
      accordionItems: [
        { title: "Internship Syllabus", content: "Details of the 4-week lab program." }
      ],
      paymentDetails: {
        paypal: "",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      },
      createdAt: new Date().toISOString()
    }
  ],
  learning: {
    title: "Practical Forensic Experience",
    subtitle: "Bridge the gap between theory and practice with our expert-led internships.",
    image: "/student-pointing.png"
  },
  enquiries: {
    title: "Internship Enquiries",
    faqs: [
      {
        question: "Is there a certificate provided?",
        author: "Intern candidate",
        answer: "Yes, an industry-recognized certificate is provided upon successful completion."
      }
    ]
  }
};

export const TRAINING_PAGE_INITIAL_DATA: CoursesPageData = {
  hero: {
    title: "Professional Forensic Training",
    subtitle: "Upskill with our specialized training programs for students and professionals.",
    bgImage: "/training/hero-bg.png"
  },
  programs: [
    {
      slug: "corporate-training",
      label: "Corporate Training",
      subtitle: "Tailored training for law enforcement and corporate security teams.",
      heroImage: "/training/training.png",
      heroBgImage: "/training/hero-bg.png"
    },
    {
      slug: "onsite-training",
      label: "Onsite Training",
      subtitle: "Forensic training sessions delivered at your location.",
      heroImage: "/training/training.png",
      heroBgImage: "/training/hero-bg.png"
    }
  ],
  courses: [
    {
      id: 1,
      programSlug: "corporate-training",
      slug: "fingerprint-analysis",
      title: "Fingerprint Analysis & Examination",
      courseCode: "CT-101",
      overview: "Acquire practical skills in forensic Fingerprint Examination and Verification techniques.",
      description: "Advanced corporate training for fingerprint forensic analysis.",
      descriptionParts: [
        "Acquire practical skills in forensic Fingerprint Examination and Verification techniques.",
        "Effective for criminal investigations and corporate security audits."
      ],
      rating: 4.8,
      reviewsCount: 150,
      image: "/training/training.png",
      bannerImage: "/training/hero-bg.png",
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Mode", value: "On-site / Portal", icon: "/course/icon1.png" },
          { label: "Resource", value: "24/7 Access", icon: "/course/icon2.png" }
        ],
        instructors: [
          { name: "Senior Analyst", role: "Training Lead", image: "/course/ins2.png" }
        ]
      },
      highlights: [
        "24/7 Portal Access",
        "Live Practical Demonstrations",
        "Industry Recognized Certificate"
      ],
      accordionItems: [
        { title: "Training Modules", content: "Comprehensive modules for fingerprint analysis." }
      ],
      paymentDetails: {
        paypal: "",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      },
      createdAt: new Date().toISOString()
    }
  ],
  learning: {
    title: "Advance Your Forensic Career",
    subtitle: "Stay ahead in the field with our modern forensic training methodologies.",
    image: "/student-pointing.png"
  },
  enquiries: {
    title: "Training Enquiries",
    faqs: [
      {
        question: "Can these trainings be customized?",
        author: "Corporate Lead",
        answer: "Yes, we offer highly customizable training packages tailored to specific organizational needs."
      }
    ]
  }
};

export const BOOKS_PAGE_INITIAL_DATA: CoursesPageData = {
  hero: {
    title: "Forensic Science Books",
    subtitle: "Comprehensive collection of forensic science books and publications.",
    bgImage: "/books/hero-bg.png"
  },
  programs: [
    {
      slug: "forensic-science",
      label: "Forensic Books",
      subtitle: "Essential reading for forensic science professionals and students",
      heroImage: "/books/hero.png",
      heroBgImage: "/books/hero-bg.png"
    }
  ],
  courses: [
    {
      id: 1,
      programSlug: "forensic-science",
      slug: "forensic-handbook",
      title: "Forensic Science Handbook",
      author: "Dr. Rajneek K Singh",
      courseCode: "ISBN 978-81",
      overview: "A comprehensive guide covering modern forensic investigation techniques.",
      description: "This handbook provides a deep dive into crime scene management, fingerprint analysis, and digital forensics.",
      descriptionParts: [
        "This handbook provides a deep dive into crime scene management, fingerprint analysis, and digital forensics.",
        "Essential reading for students and practitioners."
      ],
      rating: 4.8,
      reviewsCount: 1250,
      image: "/books/hero.png",
      bannerImage: "/books/banner.jpg",
      publisher: "SIFS India",
      language: "English",
      pageCount: 450,
      publishedDate: "October 2023",
      format: "Hardcover",
      inStock: true,
      createdAt: new Date().toISOString(),
      sidebarData: {
        image: "/course/sidebar.png",
        includes: [
          { label: "Price", value: "₹1,499", icon: "/course/icon1.png", highlight: true },
          { label: "Pages", value: "450 Pages", icon: "/course/icon2.png" },
          { label: "Language", value: "English", icon: "/course/icon3.png" },
          { label: "Format", value: "Hardcover", icon: "/course/icon4.png" }
        ],
        instructors: [
          { name: "Dr. Rajneek K Singh", role: "Principal Author", image: "/book/author-1.png" },
          { name: "Prof. Anil Kumar", role: "Contributor", image: "/book/author-2.png" }
        ]
      },
      highlights: [
        "Crime Scene Management",
        "Fingerprint Analysis",
        "Digital Forensics"
      ],
      accordionItems: [
        { title: "Table of Contents", content: "Chapter 1: Introduction..." }
      ],
      paymentDetails: {
        paypal: "",
        bankName: "ICICI BANK",
        accountName: "SIFS INDIA PVT. LTD.",
        accountNo: "663055000006",
        type: "Current Account",
        ifsc: "ICIC0000160",
        qrImage: "/course/qr.png"
      }
    }
  ],
  learning: {
    title: "Expand Your Knowledge",
    subtitle: "Discover our curated collection of forensic science literature.",
    image: "/student-pointing.png"
  },
  enquiries: {
    title: "Book Enquiries",
    faqs: [
      {
        question: "How can I order books?",
        author: "Student",
        answer: "You can order books directly through our website or contact us for bulk orders."
      }
    ]
  }
};
