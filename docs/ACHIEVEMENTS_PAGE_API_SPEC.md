# Achievements Page API Specification

This document provides the **exact** JSON structures for the Achievements Page APIs.
The frontend expects these specific fields.

## Data Types & Handling
- **Images**:
  - **GET**: Returns a URL string (e.g., `/images/hero.png` or `https://example.com/image.jpg`).
  - **PUT/POST**: If an image is updated by the user, the frontend converts it to a **Base64 encoded string** (Data URI). The backend must detect if an image field contains a Base64 string (starts with `data:image/...`), upload it to storage, and save the new URL. If the field is unchanged, it remains a URL.

---

## 1. GET `/api/achievements`
**Method**: `GET`
**Description**: Retrieve the current content of the Achievements Page.

### **Response Body (200 OK)**
```json
{
  "hero": {
    "image": "/achievements/banner.png"
  },
  "intro": {
    "backgroundImage": "/achievements/intro-bg.png",
    "mainImage": "/achievements/achievements-intro.png",
    "badgeText": "SIFS Achievement",
    "heading": "Our Achievements",
    "paragraphs": [
      "The Sherlock Institute of Forensic Science, India, founded by Dr. Ranjeet Singh in 2006, is an ISO 9001:2015-certified institute registered with the Government of India.",
      "Dr. Ranjeet Singh, its founder and CEO, possesses over a decade of expertise in domains like cyber forensics, digital forensics, fingerprint examination, questioned document examination, and cyber security and has delivered expert opinions in hundreds of criminal cases throughout his career.",
      "His dedication to his work has earned him multiple awards, and he is constantly working to equip a new generation of budding forensic experts with the practical skills needed to excel in the forensic domain through webinars, conferences, workshops, training, and courses worldwide."
    ],
    "list": [
      "Awards from Mr. Biri Singh Sinsinwar, President of the Indian Bar Council.",
      "Speaker in Residence at King George Medical University in Lucknow, India's Uttar Pradesh.",
      "Honorable Speaker at a DIRD, Delhi-sponsored session on Emerging Trends in Cyber Forensic",
      "At India's New Delhi, at the National Institute of Criminology and Forensic Science",
      "ISC Association's Research Journal of Forensic Sciences' editorial board member is from India."
    ]
  },
  "participationTimeline": {
    "headingPrefix": "Participation of",
    "headingHighlight": "Sherlock Institute",
    "headingSuffix": "of Forensic Science",
    "items": [
      {
        "year": "2015",
        "text": "First Prize in Poster Presentation at the National Conference on the Role of Forensic Science in Crime Against Women, RFSCW-CON-2015, Gwalior University"
      },
      {
        "year": "2016",
        "text": "First Prize in Poster presentation in National Seminar on 'Role of Forensic Science in Disaster Victim Identification in Indian Perspective', Bundelkhand University, Uttar Pradesh"
      },
      {
        "year": "2017",
        "text": "Third Prize in Poster presentation in National Seminar on 'Future perspectives of Forensic Science in India', Bundelkhand University, Uttar Pradesh"
      }
    ]
  },
  "achievementYears": {
    "slides": [
      {
        "year": "2018 - 2019",
        "sections": [
          {
            "title": "Police Training",
            "text": "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police"
          },
          {
            "title": "Educational Visits / Keynote & Guest Sessions",
            "text": "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College"
          },
          {
            "title": "Workshops",
            "text": "National Workshop – SACH – A TITHI and Photo Facial Analysis"
          }
        ]
      },
      {
        "year": "2019 - 2020",
        "sections": [
          {
            "title": "Police Training",
            "text": "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police"
          },
          {
            "title": "Educational Visits / Keynote & Guest Sessions",
            "text": "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College"
          },
          {
            "title": "Workshops",
            "text": "National Workshop – SACH – A TITHI and Photo Facial Analysis"
          }
        ]
      },
      {
        "year": "2020 - 2021",
        "sections": [
          {
            "title": "Police Training",
            "text": "Haridwar Police Station, Aryabhatta Police, DFS Bangalore, Visit case of DFSL (Cybersecurity), Delhi Police"
          },
          {
            "title": "Educational Visits / Keynote & Guest Sessions",
            "text": "Law College, Delhi University, FORENSICIN2020, BIT Institute of Excellence, Rishikesh College"
          },
          {
            "title": "Workshops",
            "text": "National Workshop – SACH – A TITHI and Photo Facial Analysis"
          }
        ]
      }
    ]
  },
  "presence": {
    "backgroundImage": "/about-us/initiatives-bg.png",
    "mainImage": "/achievements/presence.png",
    "headingPrefix": "Our",
    "headingHighlight": "Presence",
    "description": "Since 2006, the Sherlock Institute of Forensic Science India has witnessed extensive growth globally in the field of forensic education and investigation. We have conducted numerous in-house and customized outdoor training programs and workshops, catering to students, professionals, and law enforcement officials. Our mission is to strengthen the knowledge base of aspiring forensic professionals and law enforcement professionals from diverse backgrounds, which is essential in today’s competitive world.",
    "mediaLists": [
      {
        "title": "Media Presence",
        "items": ["News Nation", "Aajtak Update", "Sahara"]
      },
      {
        "title": "Media Presence",
        "items": ["Zee Hindustan", "NDTV", "Nav Bharat"]
      },
      {
        "title": "Media Presence",
        "items": ["Punjab Kesari", "Dainik Jagran"]
      }
    ]
  },
  "universityCollaborations": {
    "headingPrefix": "Academic",
    "headingHighlight": "Collaborations",
    "headingSuffix": "(MoU)",
    "items": [
      "SketchCop Academy, USA",
      "Tarlac State University, Philippines",
      "Centurion University, Andhra Pradesh",
      "Galgotias University, Greater Noida",
      "Federal University of Technology, Nigeria",
      "Amity University, Noida",
      "Sharda University, Greater Noida",
      "SRM University, Chennai",
      "Lovely Professional University, Punjab",
      "University of Philippines"
    ]
  },
  "clients": {
    "headingPrefix": "Satisfied",
    "headingHighlight": "Clients’",
    "headingSuffix": "Portfolio",
    "categories": [
        "Institution",
        "Law Enforcement",
        "Forensic Labs",
        "Financial Group",
        "Corporate",
        "Organization",
        "Others"
    ],
    "items": [
      { "logo": "/clients/1.png", "category": "Institution" },
      { "logo": "/clients/2.png", "category": "Institution" },
      { "logo": "/clients/3.png", "category": "Corporate" },
      { "logo": "/clients/4.png", "category": "Corporate" },
      { "logo": "/clients/5.png", "category": "Law Enforcement" },
      { "logo": "/clients/6.png", "category": "Corporate" },
      { "logo": "/clients/7.png", "category": "Organization" },
      { "logo": "/clients/8.png", "category": "Others" },
      { "logo": "/clients/9.png", "category": "Institution" },
      { "logo": "/clients/10.png", "category": "Forensic Labs" },
      { "logo": "/clients/11.png", "category": "Organization" },
      { "logo": "/clients/12.png", "category": "Others" }
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
        "content": "SIFS provided me with an excellent online learning opportunity. The website was easy to use, and the course content and work was extensive.",
        "quote": "Fantastic platform with quality courses",
        "avatar": "https://randomuser.me/api/portraits/men/54.jpg"
      }
    ]
  }
}
```

---

## 2. PUT / POST `/api/achievements`
**Method**: `PUT` (or `POST`)
**Description**: Update the Achievements Page content. The request body must be the **full object**.

### **Request Body Example (With Base64 Image)**
```json
{
  "hero": {
    "image": "data:image/png;base64,iVBORw0KGgo..."
  },
  "intro": {
    "backgroundImage": "data:image/jpeg;base64,...",
    "mainImage": "/achievements/achievements-intro.png",
    "heading": "Updated Achievements",
    "paragraphs": [
      "Updated paragraph 1..."
    ],
    "list": [
      "Updated list item 1"
    ]
  },
  "participationTimeline": {
    "items": [
      {
        "year": "2016",
        "text": "Updated text..."
      }
    ]
  },
  "achievementYears": {
    "slides": [
      {
        "year": "2022 - 2023",
        "sections": [
          {
            "title": "New Training",
            "text": "Updated description..."
          }
        ]
      }
    ]
  },
  "presence": {
    "mediaLists": [
      {
        "title": "New Channel",
        "items": ["Channel 1", "Channel 2"]
      }
    ]
  },
  "universityCollaborations": {
    "items": [
        "New University",
        "Another University"
    ]
  },
  "clients": {
    "categories": ["Institution", "New Category"],
    "items": [
        { "logo": "data:image/png;base64,...", "category": "Institution" }
    ]
  },
  "testimonials": {
    "items": [
        {
            "id": 1,
            "name": "Updated Name",
            "course": "Updated Course",
            "content": "Updated content...",
            "quote": "Updated Quote",
            "avatar": "data:image/jpeg;base64,..."
        }
    ]
  }
}
```
