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
  team: [] as TeamMember[]
};
