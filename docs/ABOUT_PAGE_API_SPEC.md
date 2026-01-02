# About Page API Specification

This document provides the **exact** JSON structures for the About Page APIs.
The frontend expects these specific fields.

## Data Types & Handling
- **Images**:
  - **GET**: Returns a URL string (e.g., `/images/hero.png` or `https://example.com/image.jpg`).
  - **PUT/POST**: If an image is updated by the user, the frontend converts it to a **Base64 encoded string** (Data URI). The backend must detect if an image field contains a Base64 string (starts with `data:image/...`), upload it to storage, and save the new URL. If the field is unchanged, it remains a URL.

---

## 1. GET `/api/about`
**Method**: `GET`
**Description**: Retrieve the current content of the About Page.

### **Response Body (200 OK)**
```json
{
  "hero": {
    "heading": "Hi, Sherlock Institute of Forensic <br/> Science India",
    "subtitle": "is registered under the Government of India and ISO 9001:2015 certified <br/> forensic science institute in India.",
    "image": "/about-us/about.png",
    "badgeNumber": "19+",
    "badgeText": "Years of <br/> Experience",
    "tag": "About Us",
    "h2": "<span class=\"relative z-10\">Learn Any</span> where, Any Time",
    "paragraphs": [
      "Since 2006, the institute has conducted the best offline and online diploma and certificate courses in forensic science and has gained immense popularity globally for revolutionizing the field of forensic education.",
      "The learner-friendly educational platform was established to fulfill the demand and supply difference between skilled forensic professionals and serve law enforcement agencies.",
      "We offer several short- and long-term certificate, diploma, postgraduate diploma, foundational, and professional courses.",
      "Our hands-on approach and real-life case studies help students understand complex cases and apply their learnings effectively."
    ]
  },
  "mission": {
    "mainImage": "/about-us/mission-bg.png",
    "cards": [
      {
        "icon": "/about-us/mission.png",
        "title": "Our Mission",
        "description": "Our mission is to empower individuals with the essential forensic expertise to promote justice on a global scale."
      },
      {
        "icon": "/about-us/vision.png",
        "title": "Our Vision",
        "description": "We visualize a society where forensic science plays a fundamental role in promoting justice, truth, security, and the well-being of communities."
      },
      {
        "icon": "/about-us/purpose.png",
        "title": "Our Purpose",
        "description": "Our purpose is to excel in promoting knowledge, revealing the truth, and training forensic professionals across borders."
      },
      {
         "icon": "data:image/svg+xml;base64,...", 
         "title": "New Value",
         "description": "New description..."
      }
    ]
  },
  "initiatives": {
    "leftImage": "/about-us/initiatives.png",
    "bgImage": "/about-us/initiatives-bg.png",
    "headingPrefix": "SIFS India’s",
    "headingHighlight": "Educational",
    "headingSuffix": "Initiatives",
    "description": "We also conduct several awareness programs, webinars, workshops, and conferences round the year covering various famous forensic cases and insights on the latest developments in forensics, giving you the opportunity to learn new findings and also present your research work to the world.",
    "listLeftTitle": "Offline and Online Forensic Courses:",
    "listLeftItems": [
      "Short-term and Long-term",
      "Foundational",
      "Professional"
    ],
    "listRightTitle1": "Online Training and Internships for:",
    "listRightItems1": [
      "Students",
      "Professionals"
    ],
    "listRightTitle2": "Hands-on Forensic Training for:",
    "listRightItems2": [
      "Corporates",
      "Police Personnel",
      "Students and Professionals"
    ]
  },
  "team": {
    "subtitle": "Team Members",
    "headingPrefix": "Meet",
    "headingHighlight": "Our Exp",
    "headingSuffix": "ert Team",
    "browseLink": "/teams",
    "browseText": "Explore All Team →",
    "experts": [
      {
        "name": "Anushka Karle",
        "role": "Psychologist",
        "image": "/teams/team1.png"
      },
      {
        "name": "Abhishek Vashishth",
        "role": "Fingerprint Expert",
        "image": "/teams/team2.png"
      },
      {
        "name": "A. Mohan Krishan",
        "role": "Deputy Director",
        "image": "/teams/team3.png"
      },
      {
        "name": "Abd Samuel Qaleb",
        "role": "Forensic Analyst",
        "image": "/teams/team4.png"
      }
    ]
  },
  "testimonials": {
    "heading": "What Our Happy Student Say About Us",
    "subheading": "Real Success Stories. Hear What Our Course Attendees Have to Say!",
    "bgImage": "/testimonials-bg.png",
    "items": [
      {
        "id": 1,
        "name": "Zodia-Kay Smith",
        "course": "Document & Handwriting Examination",
        "content": "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote": "Great Learning Experience Overall",
        "avatar": "https://randomuser.me/api/portraits/women/32.jpg"
      },
      {
        "id": 2,
        "name": "Patrice Tyron Johnson",
        "course": "Criminology and Victimology",
        "content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote": "Fantastic platform with quality courses",
        "avatar: "https://randomuser.me/api/portraits/men/54.jpg"
      },
      {
        "id": 3,
        "name": "Felissa Aliyah Jones",
        "course: "Fingerprint Examination & Analysis",
        "content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote: "Very satisfied with the lessons",
        "avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        "id": 4,
        "name": "Patrice Tyron Johnson",
        "course: "Criminology and Victimology",
        "content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote: "Fantastic platform with quality courses",
        "avatar: "https://randomuser.me/api/portraits/men/54.jpg"
      },
      {
        "id": 5,
        "name": "Felissa Aliyah Jones",
        "course: "Fingerprint Examination & Analysis",
        "content: "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote: "Very satisfied with the lessons",
        "avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    ]
  }
}
```

---

## 2. PUT / POST `/api/about`
**Method**: `PUT` (or `POST`)
**Description**: Update the About Page content. The request body must be the **full object**.
**Important**: Any image updated by the user will be sent as a **Base64 string** (e.g., `"data:image/png;base64,..."`). The backend should process this.

### **Request Body Example (With Base64 Image)**
```json
{
  "hero": {
    "heading": "Updated Heading Text",
    "subtitle": "Updated subtitle text...",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    "badgeNumber": "20+",
    "badgeText": "Years of Excellence",
    "tag": "About Us",
    "h2": "New H2 Text",
    "paragraphs": [
      "Updated paragraph 1 content...",
      "Updated paragraph 2 content...",
      "We offer several short- and long-term certificate, diploma, postgraduate diploma, foundational, and professional courses.",
      "Our hands-on approach and real-life case studies help students understand complex cases and apply their learnings effectively."
    ]
  },
  "mission": {
    "mainImage": "/about-us/mission-bg.png",
    "cards": [
      {
        "icon": "/about-us/mission.png",
        "title": "Our Mission",
        "description": "Our mission is to empower individuals with the essential forensic expertise to promote justice on a global scale."
      },
      {
        "icon": "/about-us/vision.png",
        "title": "Our Vision",
        "description": "We visualize a society where forensic science plays a fundamental role in promoting justice, truth, security, and the well-being of communities."
      },
      {
        "icon": "/about-us/purpose.png",
        "title": "Our Purpose",
        "description": "Our purpose is to excel in promoting knowledge, revealing the truth, and training forensic professionals across borders."
      },
      {
         "icon": "data:image/svg+xml;base64,...", 
         "title": "New Value",
         "description": "New description..."
      }
    ]
  },
  "initiatives": {
    "leftImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD... (Updated Image)",
    "bgImage": "/about-us/initiatives-bg.png",
    "headingPrefix": "SIFS India’s",
    "headingHighlight": "Global",
    "headingSuffix": "Initiatives",
    "description": "Updated description text here...",
    "listLeftTitle": "Offline and Online Forensic Courses:",
    "listLeftItems": [
      "Short-term and Long-term",
      "Foundational",
      "Professional",
      "New Course Type"
    ],
    "listRightTitle1": "Online Training and Internships for:",
    "listRightItems1": [
      "Students",
      "Professionals",
      "Researchers"
    ],
    "listRightTitle2": "Hands-on Forensic Training for:",
    "listRightItems2": [
      "Corporates",
      "Police Personnel",
      "Students and Professionals",
      "Judiciary"
    ]
  },
  "team": {
    "subtitle": "Our Leaders",
    "headingPrefix": "Meet",
    "headingHighlight": "The Best",
    "headingSuffix": "Team",
    "browseLink": "/teams",
    "browseText": "View All →",
    "experts": [
      {
        "name": "Anushka Karle",
        "role": "Senior Psychologist",
        "image": "/teams/team1.png"
      },
      {
        "name": "Abhishek Vashishth",
        "role": "Fingerprint Expert",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
      },
      {
        "name": "A. Mohan Krishan",
        "role": "Deputy Director",
        "image": "/teams/team3.png"
      },
      {
        "name": "Abd Samuel Qaleb",
        "role": "Forensic Analyst",
        "image": "/teams/team4.png"
      },
      {
        "name": "New Team Member",
        "role": "Role",
        "image": "data:image/jpeg;base64,..."
      }
    ]
  },
  "testimonials": {
    "heading": "Student Reviews",
    "subheading": "What people are saying...",
    "bgImage": "/testimonials-bg.png",
    "items": [
      {
        "id": 1,
        "name": "Zodia-Kay Smith",
        "course": "Document Examination",
        "content": "Updated testimonial content...",
        "quote": "Amazing Experience",
        "avatar": "https://randomuser.me/api/portraits/women/32.jpg"
      },
      {
        "id": 2,
        "name": "Patrice Tyron Johnson",
        "course": "Criminology",
        "content": "Another updated testimonial...",
        "quote": "Highly Recommended",
        "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
      },
      {
         "id": 3,
         "name": "New Student",
         "course": "New Course",
         "content": "New content...",
         "quote": "New Quote",
         "avatar": "data:image/..."
      }
    ]
  }
}
```
