
import { EventsPageData } from "../../types/events-page";
import { events } from "../../data/events";

export const EVENTS_PAGE_INITIAL_DATA: EventsPageData = {
  hero: {
    title: "Forensic Science",
    subtitle: "Online Training in",
    description: "The Forensic Science & Criminal Investigation Online Internship program by SIFS India aims to equip you with an understanding of the theories, methods, and applications of forensic science within the legal framework for criminal investigations.",
    image: "/events/1.png",
    enrolledCount: "9,394+ Enrolled Learners",
    features: ["Training without border", "Online"],
    certificateTitle: "Download your certificate",
    certificateDescription: "Hey you've done great job! here you can download your certificate of achievement.",
    buttonLabel: "Download Certificate"
  },
  stats: {
    bgImage: "/events/journey.png",
    title: "Journey At A Glance",
    description: "Enthusiasts dedicated to building remarkable program!",
    counts: {
      events: 120,
      participants: "350K+",
      countries: 13,
      speakers: 15
    }
  },
  events: events, // Importing existing events data
  showAllButtonLabel: "Show all →",
  archive: {
    title: "Archive Program",
    description: "Explore our past events and programs.",
    image: "/events/archive.png",
    years: ["2020", "2021", "2022", "2023", "2024"],
    programs: [
      {
        date: "December 08, 2025",
        title: "Crime Scene Investigation",
        image: "/online-courses/1.png",
        primary: true,
      },
      {
        date: "December 08, 2025",
        title: "Graphology",
        image: "/online-courses/2.png",
        primary: false,
      },
      {
        date: "December 08, 2025",
        title: "Ethical Hacking & IT Security",
        image: "/online-courses/3.png",
        primary: false,
      },
      {
        date: "December 08, 2025",
        title: "Digital Forensics",
        image: "/online-courses/2.png",
        primary: false,
      },
    ]
  },
  participatory: {
    title: "Participatory",
    description: "Supporters from different organizations who participated in remarkable program.",
    image: "", 
    partners: [
      { name: "Aster Heal Group", logo: "/events/participatory1.png" },
      { name: "ACPM Medical College", logo: "/events/participatory2.png" },
      { name: "Birla Sun Life", logo: "/events/participatory3.png" },
      { name: "University Partner", logo: "/events/participatory4.png" },
      { name: "Accenture", logo: "/events/participatory5.png" },
      { name: "Sri Paramakalyani College", logo: "/events/participatory6.png"      }
    ]
  },
  team: {
    subtitle: "Team Members",
    headingPrefix: "Meet",
    headingHighlight: "Our Expert",
    headingSuffix: "Team",
    browseLink: "/teams",
    browseText: "Explore All Team →",
    experts: [
      {
        name: "Anushka Karle",
        role: "Psychologist",
        image: "/teams/team1.png"
      },
      {
        name: "Abhishek Vashishth",
        role: "Fingerprint Expert",
        image: "/teams/team2.png"
      },
      {
        name: "A. Mohan Krishan",
        role: "Deputy Director",
        image: "/teams/team3.png"
      },
      {
        name: "Abd Samuel Qaleb",
        role: "Forensic Analyst",
        image: "/teams/team4.png"
      }
    ]
  },
  insights: {
    title: "Forensic Insights",
    description: "Decoding Crime Mysteries: Expand Your Knowledge and Explore the Latest Advancements",
    cards: [
        {
            title: "Hands-on Facial Reconstruction Training Delhi, India",
            description: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
            date: "2 DEC, 2025",
            author: "John Doe",
            imageSrc: "/forensic-insights1.png",
          },
          {
            title: "Hands-on Facial Reconstruction Training Delhi, India",
            description: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
            date: "2 DEC, 2025",
            author: "John Doe",
            imageSrc: "/forensic-insights2.png",
          },
          {
            title: "Hands-on Facial Reconstruction Training Delhi, India",
            description: "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focu...",
            date: "2 DEC, 2025",
            author: "John Doe",
            imageSrc: "/forensic-insights3.png",
          },
    ]
  }
};
