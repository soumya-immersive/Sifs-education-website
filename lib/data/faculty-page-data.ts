import { FacultyMember } from "@/types/faculty";

export const FACULTY_PAGE_INITIAL_DATA = {
  hero: {
    title: "Meet our Team Members",
    subtitle: "Home / Faculties",
    bgImage: "/contact-gradient-bg.png",
  },
  filters: ["All", "Instructors", "Adjunct Faculty"],
  faculty: [] as FacultyMember[]
};
