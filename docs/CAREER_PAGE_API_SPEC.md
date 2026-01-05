# Career Page API Specification (Consolidated)

This document defines the consolidated "Full Sync" API for the Career Page. This approach allows the frontend to manage the entire state (Hero, Categories, Job Openings, and Insights) through a single data structure.

## Primary Endpoints

### 1. GET `/api/career`
**Description**: Retrieve the entire state of the Career Page. 

**Response Body (200 OK)**:
```json
{
  "hero": {
    "title": "Join Us! Your Path to Excellence",
    "subtitle": "Discover rewarding opportunities at SIFS India and shape the future of forensic science.",
    "bgImage": "/contact-gradient-bg.png"
  },
  "categories": [
    { "id": 1, "name": "Forensic Trainee" },
    { "id": 2, "name": "Junior Scientific Officer" },
    { "id": 3, "name": "Scientific Officer" },
    { "id": 4, "name": "Admin Officer" },
    { "id": 5, "name": "Support Team" },
    { "id": 6, "name": "Marketing Strategic" },
    { "id": 7, "name": "Online Maintenance Team" }
  ],
  "jobs": [
    {
      "id": 1,
      "title": "Intern-Education Department",
      "experience": "Fresher",
      "deadline": "20th March, 2025",
      "educationalExperience": "Post Graduate in Field of Forensic Science",
      "category": "Forensic Trainee",
      "applyButtonLabel": "Apply Now"
    },
    {
      "id": 2,
      "title": "Intern Education Department",
      "experience": "Fresher",
      "deadline": "31st March, 2025",
      "educationalExperience": "Any Graduate or Post Graduate in Field of Forensic Science",
      "category": "Forensic Trainee",
      "applyButtonLabel": "Apply Now"
    },
    {
      "id": 3,
      "title": "Cyber Security Trainer",
      "experience": "1-3 Years",
      "deadline": "31st March, 2025",
      "educationalExperience": "A Bachelor's degree with excellent passing percentage in relevant fields of IT such as BCA or BTech, related",
      "category": "Marketing Strategic",
      "applyButtonLabel": "Apply Now"
    }
  ],
  "insights": {
    "heading": "Forensic Insights",
    "subheading": "Decoding Crime Mysteries: Expand Your Knowledge and Explore the Latest Advancements",
    "exploreButtonLabel": "Explore",
    "cards": [
      {
        "id": 1,
        "title": "Hands-on Facial Reconstruction Training Delhi, India",
        "description": "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focused program...",
        "date": "2 DEC, 2025",
        "author": "John Doe",
        "imageSrc": "/forensic-insights1.png",
        "tag": "Tutorial"
      },
      {
        "id": 2,
        "title": "Document Authenticity Training Delhi",
        "description": "Comprehensive workshop on verifying the authenticity of legal and corporate documents.",
        "date": "21 DEC, 2025",
        "author": "SIFS India",
        "imageSrc": "/forensic-insights2.png",
        "tag": "Hands-on"
      }
    ]
  }
}
```

---

### 2. PUT `/api/career`
**Description**: Update the entire Career Page state. This endpoint is called when the user clicks "Save Changes" in the Admin UI.

**Request Body**:
The request body must be the **Full JSON Object** as defined in the GET response above.

**Example with Update**:
```json
{
  "hero": {
    "title": "Start Your Career in Forensics",
    "subtitle": "Join the leading institute in forensic education.",
    "bgImage": "data:image/png;base64,..." 
  },
  "categories": [
    { "id": 1, "name": "Forensic Analyst" }
  ],
  "jobs": [
    {
      "id": 1,
      "title": "Senior Forensic Analyst",
      "experience": "5+ Years",
      "deadline": "15th April, 2025",
      "educationalExperience": "PhD in Forensic Science",
      "category": "Forensic Analyst",
      "applyButtonLabel": "Submit Application"
    }
  ],
  "insights": {
    "heading": "Latest Career Insights",
    "subheading": "Tips and tricks for your forensic career.",
    "exploreButtonLabel": "Learn More",
    "cards": [
      {
        "id": 1,
        "title": "Career in Cyber Forensics",
        "description": "New article on the booming field of cyber forensics.",
        "date": "03 JAN, 2026",
        "author": "Admin",
        "imageSrc": "/career-insights1.png",
        "tag": "Career Advice"
      }
    ]
  }
}
```

---

## Technical Details

### Image Uploads
- **GET**: Returns image URLs (e.g., `/images/hero.jpg`).
- **PUT**: New images are sent as **Base64 strings** (`data:image/jpeg;base64,...`). The backend must save these to storage and update the database with the new URL.

### Data Consistency
- **Category Links**: Job openings are categorised. When a category name is changed in the `categories` array, the backend should ensure that all corresponding `jobs` are updated or that the `category` field in `jobs` matches the new name.

### Consolidated Model
- This "Full Sync" approach simplifies state management by sending the entire page configuration in a single request, ensuring that the frontend and backend are always in sync.
