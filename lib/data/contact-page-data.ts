import { ContactPageData } from "../../types/contact-page";

export const CONTACT_PAGE_INITIAL_DATA: ContactPageData = {
  banner: {
    title: "Get in Touch",
    subtitle: "Reference giving information on its origins, as well as a random Lipsum generator.",
    bgImage: "/contact-gradient-bg.png"
  },
  formSection: {
    title: "Get in touch",
    fields: [
      { name: "first", placeholder: "First name", type: "text" },
      { name: "email", placeholder: "Email", type: "email" },
      { name: "mobile", placeholder: "Mobile number", type: "tel" },
      { name: "subject", placeholder: "Subject", type: "text" },
      { name: "address", placeholder: "Full Address", type: "textarea", rows: 3 },
      { name: "message", placeholder: "Message", type: "textarea", rows: 4 }
    ],
    buttonText: "Send Message →"
  },
  infoSection: {
    title: "We are here to help you",
    officeTitle: "CORP OFFICE",
    officeAddress: {
      icon: "/contact/1.png",
      lines: [
        "A-14, Mahendru Enclave, Model Town Metro Station,",
        "Delhi-110033, India."
      ]
    },
    departments: [
      {
        id: "education",
        icon: "/contact/2.png",
        title: "Education",
        phones: ["+91-730-391-3002", "+91-11-470-74263"],
        email: "education@sifs.in"
      },
      {
        id: "training",
        icon: "/contact/3.png",
        title: "Training",
        phones: ["+91-730-391-3003", "+91-11-470-74263"],
        email: "training@sifs.in"
      },
      {
        id: "internship",
        icon: "/contact/4.png",
        title: "Internship",
        phones: ["+91-858-887-7002", "+91-11-470-74263"],
        email: "info@sifs.in"
      },
      {
        id: "workshop",
        icon: "/contact/5.png",
        title: "Workshop",
        phones: ["+91-730-391-3002", "+91-11-470-74263"],
        email: "info@sifs.in"
      }
    ]
  },
  internationalAssociates: {
    title: "International Associates",
    locations: [
      { id: "lucknow", name: "Lucknow" }
    ]
  },
  nationalPresence: {
    title: "National Presence",
    cities: [
      { id: "ahmedabad", name: "Ahmedabad" },
      { id: "amritsar", name: "Amritsar" },
      { id: "bangalore", name: "Bangalore" },
      { id: "chandigarh", name: "Chandigarh" },
      { id: "chennai", name: "Chennai" },
      { id: "dehradun", name: "Dehradun" },
      { id: "hyderabad", name: "Hyderabad" },
      { id: "indore", name: "Indore" },
      { id: "jalandhar", name: "Jalandhar" },
      { id: "kolkata", name: "Kolkata" },
      { id: "kottayam", name: "Kottayam" },
      { id: "mumbai", name: "Mumbai" },
      { id: "pune-city", name: "Pune City" },
      { id: "pune-central", name: "Pune Central" },
      { id: "sahdol", name: "Sahdol" },
      { id: "udaipur", name: "Udaipur" }
    ]
  }
};
