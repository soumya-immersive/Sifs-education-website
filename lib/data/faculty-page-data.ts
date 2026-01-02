import { FacultyMember } from "@/types/faculty";

export const FACULTY_PAGE_INITIAL_DATA = {
  hero: {
    title: "Meet our Team Members",
    subtitle: "Home / Faculties",
    bgImage: "/contact-gradient-bg.png",
  },
  filters: ["All", "Adjunct Faculty", "Instructors"],
  faculty: [
    {
      id: "faculty-1",
      name: "Aastha Kalra",
      role: "Graphologist",
      category: "Adjunct Faculty",
      image: "/faculty/1.png",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: "faculty-2",
      name: "Abhishek Vashishth",
      role: "Forensic Document Examiner",
      category: "Adjunct Faculty",
      image: "/faculty/2.png",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: "faculty-3",
      name: "Abi K S",
      role: "Head & Assistant Professor",
      category: "Instructors",
      image: "/faculty/3.png",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: "faculty-4",
      name: "Achshah Merrin John",
      role: "Lecturer",
      category: "Instructors",
      image: "/faculty/4.png",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: "faculty-5",
      name: "Aastha Kalra",
      role: "Graphologist",
      category: "Adjunct Faculty",
      image: "/faculty/1.png",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
  ] as FacultyMember[]
};
