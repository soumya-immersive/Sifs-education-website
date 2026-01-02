import { TeamMember } from "@/types/team";

export const TEAMS_PAGE_INITIAL_DATA = {
  hero: {
    title: "Meet Our Team Members",
    subtitle: "Home / Team Members",
    bgImage: "/contact-gradient-bg.png",
  },
  filters: [
    "All",
    "International Advisory Board",
    "National Advisory Board",
    "Speaker",
    "Scientific Committee",
    "Supportive Body",
    "Core Team",
    "Volunteer",
  ],
  team: [
    {
      id: "team-1",
      name: "Anushka Karle",
      role: "Psychologist",
      category: "Core Team",
      image: "/teams/team1.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-2",
      name: "Abhishek Vashishth",
      role: "Fingerprint Expert",
      category: "Core Team",
      image: "/teams/team2.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-3",
      name: "A. Mohan Krishan",
      role: "Deputy Director",
      category: "Core Team",
      image: "/teams/team3.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-4",
      name: "Abd Samuel Qaleb",
      role: "Forensic Analyst",
      category: "Core Team",
      image: "/teams/team4.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-5",
      name: "Aastha Kalra",
      role: "Graphologist",
      category: "Speaker",
      image: "/teams/team1.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-6",
      name: "Abhishek Kumar",
      role: "Forensic Investigator",
      category: "Supportive Body",
      image: "/teams/team2.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-7",
      name: "Abel Samuel Oden",
      role: "SP, Police Dept.",
      category: "National Advisory Board",
      image: "/teams/team3.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-8",
      name: "Aby Joseph",
      role: "Assistant Professor",
      category: "Scientific Committee",
      image: "/teams/team4.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
    {
      id: "team-9",
      name: "Rohit Mehta",
      role: "Volunteer Coordinator",
      category: "Volunteer",
      image: "/teams/team1.png",
      description: "He is the Superintendent of Nigeria police. He holds a master's degree in forensic psychology. He also holds a certificate in Questioned Document analysis from Sherlock Institute of Forensic Science India, and a certificate in DVI from the University of Torino Italy. He is the Head of the crime scene unit of the Nigeria police forensic. He is a Certified Interpol crime scene instructor. His work involves collecting and analyzing physical evidence, ensuring the integrity of the crime scene, and his expertise extends to various forensic techniques, including fingerprint analysis, questioned document analysis, and digital evidence retrieval. He is also recognized for his detailed reports and expert testimony in court...",
      socials: { facebook: "#", linkedin: "#" }
    },
  ] as TeamMember[]
};
