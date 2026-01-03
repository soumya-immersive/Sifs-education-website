# Dynamic Programs API Specification

This document defines the **comprehensive RESTful API structure** for managing all dynamic program sections (Courses, Internships, Training) on the SIFS forensic education platform. The APIs are realm-agnostic and designed for complete CRUD operations across all program types.

**Supported Realms**: `courses`, `internships`, `training`

---

## Table of Contents
1. [Program Landing Page APIs](#1-program-landing-page-apis)
2. [Item Details Page APIs](#2-item-details-page-apis)
3. [Data Models](#3-data-models)
4. [Implementation Notes](#4-implementation-notes)
5. [Error Handling](#5-error-handling)

---

## 1. Program Landing Page APIs (`/{realm}/[programSlug]`)

These APIs manage the content for program-wide landing pages (e.g., Associate Degree, Lab Based Internship, Corporate Training).

### API 1: GET `/api/{realm}/program/{programSlug}`

Fetches all data required to render a specific program category's landing page, including program metadata, associated items list, learning section content, and FAQs.

**HTTP Method**: `GET`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program (e.g., `associate-degree`, `lab-based`, `corporate-training`)

**Query Parameters**: None

**Examples**:
- `GET /api/courses/program/associate-degree`
- `GET /api/courses/program/foundation-certificate`
- `GET /api/internships/program/lab-based`
- `GET /api/internships/program/online`
- `GET /api/training/program/corporate-training`
- `GET /api/training/program/onsite-training`

**Response Status Codes**:
- `200 OK`: Program found and data returned successfully
- `404 Not Found`: Program with specified slug does not exist
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (200 OK):
```json
{
  "program": {
    "slug": "associate-degree",
    "label": "Associate Degree Program",
    "subtitle": "Explore our professional forensic science courses designed for comprehensive career development in forensic investigation and criminal justice.",
    "heroImage": "/courses/hero.png",
    "heroBgImage": "/courses/hero-bg.png"
  },
  "courses": [
    {
      "id": 1,
      "programSlug": "associate-degree",
      "slug": "forensic-investigation",
      "title": "Forensic Science and Criminal Investigation",
      "courseCode": "FSP 101",
      "overview": "Comprehensive learning program designed for forensic professionals, covering crime scene analysis and investigation techniques.",
      "description": "Professional forensic science and criminal investigation program.",
      "rating": 4.8,
      "reviewsCount": 1250,
      "image": "/courses/course1.png",
      "bannerImage": "/course/hero-bg.png",
      "skillLevel": "level1",
      "durationHours": 10,
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "programSlug": "associate-degree",
      "slug": "digital-forensics",
      "title": "Advanced Digital Forensics",
      "courseCode": "FSP 201",
      "overview": "Master digital evidence recovery, mobile forensics, and cybercrime investigation techniques.",
      "description": "Advanced technical training in digital forensic analysis.",
      "rating": 4.9,
      "reviewsCount": 890,
      "image": "/courses/course2.png",
      "bannerImage": "/course/hero-bg.png",
      "skillLevel": "level2",
      "durationHours": 20,
      "createdAt": "2025-01-02T00:00:00.000Z"
    }
  ],
  "learning": {
    "title": "Step into the New Era of Learning",
    "subtitle": "Our courses blend in-depth learning and interactive sessions, all while staying deeply grounded in core forensic principles.",
    "image": "/student-pointing.png",
    "exploreLabel": "Explore Programs",
    "storyLabel": "Watch Student Story"
  },
  "enquiries": {
    "title": "Enquiries from Forensic Learners",
    "faqs": [
      {
        "question": "What are the differences between Level 1, Level 2, and Level 3 courses?",
        "author": "Haszel Williams",
        "answer": "The course curriculum is designed according to the difficulty level and duration needed to complete it. Level 1 is a foundational course (3 months). Level 2 is more advanced (6 months). Level 3 is the most advanced, combining content from Levels 1 and 2 with additional topics."
      },
      {
        "question": "I have no previous experience in forensics. Can I enroll in this course?",
        "author": "Kevin Johnson",
        "answer": "Yes, our foundational courses (Level 1) are designed for beginners with no prior experience."
      },
      {
        "question": "Are real-world case studies included in the curriculum?",
        "author": "Prasath Narayan",
        "answer": "Absolutely! We focus on practical application through real-world case studies and interactive sessions."
      }
    ]
  }
}
```

**Field Descriptions**:

**`program` Object**:
- `slug` (string): URL-safe unique identifier for the program
- `label` (string): Human-readable display name
- `subtitle` (string, optional): Descriptive tagline for the program
- `heroImage` (string, optional): Path to hero section foreground image
- `heroBgImage` (string, optional): Path to hero section background image

**`courses` Array** (Note: This field name is used universally across all realms):
- `id` (number): Unique identifier for the item
- `programSlug` (string): Reference to parent program
- `slug` (string): URL-safe unique identifier for the item
- `title` (string): Display title
- `courseCode` (string): Course/internship/training code (e.g., "FSP 101", "LBI-201", "CT-301")
- `overview` (string): Brief description for card display
- `description` (string): Full description
- `rating` (number): Average rating (0-5)
- `reviewsCount` (number): Total number of reviews
- `image` (string): Card thumbnail image path
- `bannerImage` (string): Detail page banner image path
- `skillLevel` (string, optional): One of `level1`, `level2`, `level3`
- `durationHours` (number, optional): Duration in hours
- `createdAt` (string): ISO 8601 timestamp

**`learning` Object**:
- `title` (string): Section heading
- `subtitle` (string): Section description
- `image` (string): Featured image path
- `exploreLabel` (string, optional): CTA button text
- `storyLabel` (string, optional): Secondary CTA text

**`enquiries` Object**:
- `title` (string): FAQ section heading
- `faqs` (array): List of FAQ items
  - `question` (string): The question text
  - `author` (string): Name of person who asked
  - `answer` (string, optional): The answer text

---

### API 2: PUT `/api/{realm}/program/{programSlug}`

Updates the metadata and static sections (Hero, Learning, FAQ) of a program page. This endpoint is used for editing program-level content without modifying the associated items list.

**HTTP Method**: `PUT`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program

**Request Headers**:
- `Content-Type: application/json`

**Request Body**:
```json
{
  "program": {
    "slug": "associate-degree",
    "label": "Associate Degree Program - Updated",
    "subtitle": "Updated subtitle with new messaging...",
    "heroImage": "/courses/new-hero.png",
    "heroBgImage": "/courses/new-bg.png"
  },
  "learning": {
    "title": "Updated Learning Section Title",
    "subtitle": "Updated description...",
    "image": "/new-student-pointing.png",
    "exploreLabel": "Explore All Programs",
    "storyLabel": "Watch Success Stories"
  },
  "enquiries": {
    "title": "Updated FAQ Title",
    "faqs": [
      {
        "question": "New question?",
        "author": "New Author",
        "answer": "New answer..."
      }
    ]
  }
}
```

**Response Status Codes**:
- `200 OK`: Program updated successfully
- `400 Bad Request`: Invalid request body or validation error
- `404 Not Found`: Program with specified slug does not exist
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Program updated successfully",
  "data": {
    "program": { /* updated program object */ },
    "learning": { /* updated learning object */ },
    "enquiries": { /* updated enquiries object */ }
  }
}
```

**Validation Rules**:
- `program.slug` must match the path parameter `programSlug`
- `program.label` is required and must be 1-200 characters
- Image paths must be valid strings
- FAQ items must have both `question` and `author` fields

---

### API 3: POST `/api/{realm}/program/{programSlug}/item`

Adds a new item (course/internship/training) into a specific program category. This creates a new entry with minimal required fields; full details can be added later via the PUT details endpoint.

**HTTP Method**: `POST`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program

**Request Headers**:
- `Content-Type: application/json`

**Request Body** (Minimum Required):
```json
{
  "title": "New Forensic Course Title",
  "courseCode": "FSP 202",
  "overview": "Initial overview content describing the new course offering...",
  "slug": "new-forensic-course"
}
```

**Request Body** (Full Optional Fields):
```json
{
  "title": "New Forensic Course Title",
  "courseCode": "FSP 202",
  "overview": "Initial overview content describing the new course offering...",
  "slug": "new-forensic-course",
  "description": "Full description of the course...",
  "descriptionParts": [
    "First paragraph with detailed information...",
    "Second paragraph continuing the description..."
  ],
  "rating": 5.0,
  "reviewsCount": 0,
  "image": "/courses/new-course.png",
  "bannerImage": "/course/new-banner.png",
  "skillLevel": "level1",
  "durationHours": 15,
  "sidebarData": {
    "image": "/course/sidebar.png",
    "includes": [
      { "label": "Price", "value": "$75.00", "icon": "/course/icon1.png", "highlight": true }
    ],
    "instructors": []
  },
  "highlights": [
    "Key feature 1",
    "Key feature 2"
  ],
  "accordionItems": [
    { "title": "Curriculum", "content": "Course modules..." }
  ],
  "paymentDetails": {
    "paypal": "forensicdocument@gmail.com",
    "bankName": "ICICI BANK",
    "accountName": "SIFS INDIA PVT. LTD.",
    "accountNo": "663055000006",
    "type": "Current Account",
    "ifsc": "ICIC0000160",
    "qrImage": "/course/qr.png"
  }
}
```

**Response Status Codes**:
- `201 Created`: Item created successfully
- `400 Bad Request`: Invalid request body or validation error
- `404 Not Found`: Program with specified slug does not exist
- `409 Conflict`: Item with same slug already exists in this program
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (201 Created):
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "id": 123,
    "programSlug": "associate-degree",
    "slug": "new-forensic-course",
    "title": "New Forensic Course Title",
    "courseCode": "FSP 202",
    "overview": "Initial overview content...",
    "createdAt": "2025-01-03T10:30:00.000Z",
    /* ... all other fields with defaults if not provided */
  }
}
```

**Validation Rules**:
- `title` is required, 1-200 characters
- `courseCode` is required, 1-50 characters
- `overview` is required, 1-1000 characters
- `slug` is required, must be URL-safe (lowercase, hyphens only), unique within program
- `rating` must be between 0 and 5 if provided
- `skillLevel` must be one of `level1`, `level2`, `level3` if provided

---

## 2. Item Details Page APIs (`/{realm}/[programSlug]/[courseSlug]`)

These APIs manage the comprehensive content of individual item detail pages, including full descriptions, instructors, payment information, syllabus, and all metadata.

### API 4: GET `/api/{realm}/details/{programSlug}/{itemSlug}`

Retrieves the complete, detailed content for a specific item (course/internship/training), including all sections displayed on the detail page.

**HTTP Method**: `GET`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program
- `itemSlug` (string, required): URL-safe identifier for the specific item

**Query Parameters**: None

**Examples**:
- `GET /api/courses/details/associate-degree/forensic-investigation`
- `GET /api/courses/details/foundation-certificate/introduction-to-forensics`
- `GET /api/internships/details/lab-based/cyber-forensic-investigation`
- `GET /api/internships/details/online/digital-forensics-foundation`
- `GET /api/training/details/corporate-training/fingerprint-analysis`
- `GET /api/training/details/onsite-training/crime-scene-investigation`

**Response Status Codes**:
- `200 OK`: Item found and data returned successfully
- `404 Not Found`: Item with specified slug does not exist in the specified program
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (200 OK):
```json
{
  "id": 1,
  "programSlug": "associate-degree",
  "slug": "forensic-investigation",
  "title": "Forensic Science and Criminal Investigation",
  "courseCode": "FSP 101",
  "overview": "Comprehensive learning program designed for forensic professionals, covering crime scene analysis and investigation techniques.",
  "description": "Professional forensic science and criminal investigation program offering in-depth training.",
  "descriptionParts": [
    "This certificate program on <strong>Forensic Science and Criminal Investigation</strong> serves as an essential resource for students, practitioners, and forensic enthusiasts. It bridges the gap between theoretical principles and practical field application.",
    "Guided by industry veterans, the curriculum delves into the intricacies of evidence analysis, legal frameworks, and the evolving landscape of criminal investigation. Every module is meticulously designed to include the latest advancements in forensic technology.",
    "Participants will find a structured approach to complex topics. The inclusion of real-life case studies provides a narrative backbone to the technical data, making it both an educational powerhouse and an engaging learning experience."
  ],
  "rating": 4.8,
  "reviewsCount": 1250,
  "image": "/courses/course1.png",
  "bannerImage": "/course/hero-bg.png",
  "sidebarData": {
    "image": "/course/sidebar.png",
    "includes": [
      { 
        "label": "Price", 
        "value": "$60.00", 
        "icon": "/course/icon1.png", 
        "highlight": true 
      },
      { 
        "label": "Enrolled", 
        "value": "7 Students", 
        "icon": "/course/icon2.png" 
      },
      { 
        "label": "Lessons", 
        "value": "5 Lessons", 
        "icon": "/course/icon3.png" 
      },
      { 
        "label": "Duration", 
        "value": "10 Hours", 
        "icon": "/course/icon4.png" 
      },
      { 
        "label": "Quiz", 
        "value": "Yes", 
        "icon": "/course/icon5.png" 
      }
    ],
    "instructors": [
      {
        "name": "Dr. Rajneek K Singh",
        "role": "Honorary Director",
        "image": "/course/ins1.png",
        "linkedin": "https://linkedin.com/in/rajneek-singh",
        "facebook": "https://facebook.com/rajneek.singh",
        "twitter": "https://twitter.com/rajneeksingh",
        "instagram": "https://instagram.com/rajneeksingh"
      },
      {
        "name": "Dr. Renu Devi",
        "role": "HOD & Assistant Professor",
        "image": "/course/ins2.png",
        "linkedin": "https://linkedin.com/in/renu-devi"
      },
      {
        "name": "Jyoti Verma",
        "role": "Forensic Instructor",
        "image": "/course/ins3.png"
      }
    ]
  },
  "highlights": [
    "Crime Scene Management",
    "Evidence Collection & Preservation",
    "Fingerprint Analysis",
    "Document Examination",
    "Digital Forensics Basics",
    "Legal Procedures"
  ],
  "accordionItems": [
    { 
      "title": "Curriculum", 
      "content": "Details about modules and topics covered in the course. Module 1: Introduction to Forensic Science. Module 2: Crime Scene Processing. Module 3: Evidence Analysis..." 
    },
    { 
      "title": "FAQ", 
      "content": "Common questions and answers for prospective students. Q: What are the prerequisites? A: No prior experience required for Level 1..." 
    },
    { 
      "title": "Case Studies", 
      "content": "Analysis of real-world forensic investigations. Case Study 1: The Mumbai Evidence Recovery Case. Case Study 2: Digital Forensics in Cybercrime..." 
    },
    { 
      "title": "Reviews", 
      "content": "Feedback from previous participants. 'This course transformed my career in forensic science.' - Student testimonial..." 
    }
  ],
  "paymentDetails": {
    "paypal": "forensicdocument@gmail.com",
    "bankName": "ICICI BANK",
    "accountName": "SIFS INDIA PVT. LTD.",
    "accountNo": "663055000006",
    "type": "Current Account",
    "ifsc": "ICIC0000160",
    "qrImage": "/course/qr.png"
  },
  "skillLevel": "level1",
  "durationHours": 10,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "aboutTitle": "About this Course",
  "aboutSubtitle": "Information & Overview",
  "editionLabel": "2025 Edition",
  "programLabel": "Professional Program"
}
```

**Field Descriptions**:

**Core Fields**:
- `id` (number): Unique identifier
- `programSlug` (string): Parent program reference
- `slug` (string): URL-safe unique identifier
- `title` (string): Display title
- `courseCode` (string): Item code
- `overview` (string): Brief description (used in cards)
- `description` (string): Full single-paragraph description
- `descriptionParts` (array of strings): Multi-paragraph description with HTML support
- `rating` (number): Average rating 0-5
- `reviewsCount` (number): Total reviews
- `image` (string): Card/thumbnail image
- `bannerImage` (string): Detail page hero image

**`sidebarData` Object**:
- `image` (string): Sidebar thumbnail
- `includes` (array): Key information items
  - `label` (string): Display label
  - `value` (string): Display value
  - `icon` (string): Icon path
  - `highlight` (boolean, optional): Whether to emphasize this item
- `instructors` (array): Instructor profiles
  - `name` (string): Full name
  - `role` (string): Position/title
  - `image` (string): Profile photo
  - `linkedin`, `facebook`, `twitter`, `instagram` (string, optional): Social media URLs

**`highlights` Array**: List of key features/benefits (strings)

**`accordionItems` Array**: Expandable content sections
- `title` (string): Section heading
- `content` (string): Section content (HTML supported)

**`paymentDetails` Object**:
- `paypal` (string): PayPal email
- `bankName` (string): Bank name
- `accountName` (string): Account holder name
- `accountNo` (string): Account number
- `type` (string): Account type
- `ifsc` (string): IFSC code
- `qrImage` (string): QR code image path

**Metadata Fields**:
- `skillLevel` (string, optional): `level1`, `level2`, or `level3`
- `durationHours` (number, optional): Duration in hours
- `createdAt` (string): ISO 8601 timestamp
- `aboutTitle` (string, optional): Custom "About" section title
- `aboutSubtitle` (string, optional): Custom "About" section subtitle
- `editionLabel` (string, optional): Edition year/version
- `programLabel` (string, optional): Program category label

---

### API 5: PUT `/api/{realm}/details/{programSlug}/{itemSlug}`

Updates the complete technical and administrative details of an item. This endpoint allows full modification of all item fields.

**HTTP Method**: `PUT`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program
- `itemSlug` (string, required): URL-safe identifier for the specific item

**Request Headers**:
- `Content-Type: application/json`

**Request Body**: Same structure as GET response (all fields optional except `slug` which must match path parameter)

**Example Request Body** (Partial Update):
```json
{
  "slug": "forensic-investigation",
  "title": "Updated: Forensic Science and Criminal Investigation",
  "overview": "Updated overview text...",
  "rating": 4.9,
  "reviewsCount": 1300,
  "highlights": [
    "Updated highlight 1",
    "Updated highlight 2",
    "New highlight 3"
  ],
  "sidebarData": {
    "image": "/course/sidebar.png",
    "includes": [
      { "label": "Price", "value": "$65.00", "icon": "/course/icon1.png", "highlight": true },
      { "label": "Duration", "value": "12 Hours", "icon": "/course/icon4.png" }
    ],
    "instructors": [
      {
        "name": "Dr. Rajneek K Singh",
        "role": "Honorary Director",
        "image": "/course/ins1.png",
        "linkedin": "https://linkedin.com/in/rajneek-singh",
        "facebook": "https://facebook.com/rajneek.singh"
      }
    ]
  }
}
```

**Response Status Codes**:
- `200 OK`: Item updated successfully
- `400 Bad Request`: Invalid request body or validation error
- `404 Not Found`: Item with specified slug does not exist
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    /* Complete updated item object */
  }
}
```

**Validation Rules**:
- `slug` must match the path parameter `itemSlug`
- `programSlug` must match the path parameter `programSlug`
- `title` must be 1-200 characters if provided
- `courseCode` must be 1-50 characters if provided
- `rating` must be between 0 and 5 if provided
- `skillLevel` must be one of `level1`, `level2`, `level3` if provided
- Social media URLs must be valid URLs if provided
- Image paths must be valid strings

---

### API 6: DELETE `/api/{realm}/details/{programSlug}/{itemSlug}`

Completely removes an item entry from the database. This is a destructive operation and cannot be undone.

**HTTP Method**: `DELETE`

**Path Parameters**:
- `realm` (string, required): One of `courses`, `internships`, or `training`
- `programSlug` (string, required): URL-safe identifier for the program
- `itemSlug` (string, required): URL-safe identifier for the specific item

**Request Body**: None

**Examples**:
- `DELETE /api/courses/details/associate-degree/old-course`
- `DELETE /api/internships/details/lab-based/discontinued-internship`
- `DELETE /api/training/details/corporate-training/outdated-training`

**Response Status Codes**:
- `200 OK`: Item deleted successfully
- `404 Not Found`: Item with specified slug does not exist
- `500 Internal Server Error`: Server-side error occurred

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "deletedItem": {
    "id": 123,
    "slug": "old-course",
    "title": "Old Course Title"
  }
}
```

---

## 3. Data Models

### Complete TypeScript Interface Reference

```typescript
// Program metadata
interface CourseProgram {
  slug: string;
  label: string;
  subtitle?: string;
  heroImage?: string;
  heroBgImage?: string;
}

// Instructor profile
interface CourseInstructor {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

// Sidebar include item
interface CourseSidebarIncludeItem {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}

// Sidebar data structure
interface CourseSidebarData {
  image: string;
  includes: CourseSidebarIncludeItem[];
  instructors: CourseInstructor[];
}

// Accordion/expandable section
interface CourseAccordionItem {
  title: string;
  content: string;
}

// Payment information
interface CoursePaymentDetails {
  paypal: string;
  bankName: string;
  accountName: string;
  accountNo: string;
  type: string;
  ifsc: string;
  qrImage: string;
}

// Complete item/course structure
interface Course {
  id: number;
  programSlug: string;
  slug: string;
  title: string;
  courseCode: string;
  overview: string;
  description: string;
  descriptionParts: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  bannerImage: string;
  sidebarData: CourseSidebarData;
  highlights: string[];
  accordionItems: CourseAccordionItem[];
  paymentDetails: CoursePaymentDetails;
  skillLevel?: "level1" | "level2" | "level3";
  durationHours?: number;
  createdAt?: string;
  aboutTitle?: string;
  aboutSubtitle?: string;
  editionLabel?: string;
  programLabel?: string;
}

// Learning section
interface LearningData {
  title: string;
  subtitle: string;
  image: string;
  exploreLabel?: string;
  storyLabel?: string;
}

// FAQ item
interface EnquiryItem {
  question: string;
  author: string;
  answer?: string;
}

// FAQ section
interface EnquiriesData {
  title: string;
  faqs: EnquiryItem[];
}

// Complete page data structure
interface CoursesPageData {
  hero: CoursesHeroData;
  programs: CourseProgram[];
  courses: Course[];
  learning: LearningData;
  enquiries: EnquiriesData;
}
```

---

## 4. Implementation Notes

### Realm-Specific Behavior

**Unified Data Structure**:
- All three realms (`courses`, `internships`, `training`) use **identical** data structures
- The field name `courses` is used universally in the API responses, even for internships and training
- This allows for a single, reusable frontend codebase across all program types

**Frontend State Management**:
- The frontend uses the `useDynamicPageData(realm)` hook to manage state
- Hook signature: `useDynamicPageData(realm: "courses" | "internships" | "training")`
- Each realm maintains separate localStorage persistence

**Code Field Naming**:
- The `courseCode` field is used universally across all realms
- Examples: "FSP 101" (courses), "LBI-101" (internships), "CT-101" (training)
- This maintains consistency while allowing realm-specific prefixes

### Data Persistence

**LocalStorage Keys** (Frontend Only):
- **Courses**: `sifs_courses_page_data`
- **Internships**: `sifs_internships_page_data`
- **Training**: `sifs_training_page_data`

**Backend Storage**:
- Backend should store data in separate database tables/collections per realm
- Recommended table names: `courses`, `internships`, `trainings`
- Or use a single table with a `realm` discriminator column

### Routing Structure

**Frontend Routes**:
- Program Landing: `/{realm}/[program]` (e.g., `/courses/associate-degree`)
- Item Details: `/{realm}/[program]/[course]` (e.g., `/courses/associate-degree/forensic-investigation`)

**Important**: The second-level dynamic segment is always `[course]` for consistency across all realms, even though it may represent an internship or training item.

**API Routes**:
- Program: `/api/{realm}/program/{programSlug}`
- Item Details: `/api/{realm}/details/{programSlug}/{itemSlug}`

### Authentication & Authorization

**Recommendations** (to be implemented):
- All `PUT`, `POST`, and `DELETE` endpoints should require authentication
- Implement role-based access control (RBAC) for admin users
- Use JWT tokens or session-based authentication
- Rate limiting should be applied to prevent abuse

### Caching Strategy

**Recommendations**:
- `GET` endpoints should implement HTTP caching headers
- Suggested cache duration: 5-15 minutes for program landing pages
- Item details can be cached longer (30-60 minutes)
- Implement ETags for conditional requests
- Consider CDN caching for static content

---

## 5. Error Handling

### Standard Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      /* Optional additional error context */
    }
  }
}
```

### Common Error Codes

**400 Bad Request**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "fields": {
        "title": "Title is required and must be 1-200 characters",
        "courseCode": "Course code must be alphanumeric"
      }
    }
  }
}
```

**404 Not Found**:
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Program 'invalid-slug' not found in realm 'courses'",
    "details": {
      "realm": "courses",
      "programSlug": "invalid-slug"
    }
  }
}
```

**409 Conflict**:
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_SLUG",
    "message": "An item with slug 'forensic-investigation' already exists in program 'associate-degree'",
    "details": {
      "programSlug": "associate-degree",
      "itemSlug": "forensic-investigation"
    }
  }
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred. Please try again later.",
    "details": {
      "requestId": "req_abc123xyz"
    }
  }
}
```

### Error Code Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `INVALID_REALM` | 400 | Realm parameter is not one of: courses, internships, training |
| `RESOURCE_NOT_FOUND` | 404 | Requested program or item does not exist |
| `DUPLICATE_SLUG` | 409 | Item with same slug already exists in program |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
| `DATABASE_ERROR` | 500 | Database operation failed |

---

## 6. Example Workflows

### Workflow 1: Creating a New Course

1. **Create the course item**:
   ```
   POST /api/courses/program/associate-degree/item
   ```
   Body:
   ```json
   {
     "title": "Forensic Psychology",
     "courseCode": "FSP 301",
     "overview": "Explore the intersection of psychology and criminal investigation...",
     "slug": "forensic-psychology"
   }
   ```

2. **Update with full details**:
   ```
   PUT /api/courses/details/associate-degree/forensic-psychology
   ```
   Body: (Complete item object with all fields)

3. **Verify the course appears on the program page**:
   ```
   GET /api/courses/program/associate-degree
   ```

### Workflow 2: Updating Program Landing Page

1. **Fetch current data**:
   ```
   GET /api/courses/program/associate-degree
   ```

2. **Update program metadata**:
   ```
   PUT /api/courses/program/associate-degree
   ```
   Body:
   ```json
   {
     "program": {
       "slug": "associate-degree",
       "label": "Associate Degree Program - 2025",
       "subtitle": "Updated for 2025 with new curriculum...",
       "heroImage": "/courses/hero-2025.png",
       "heroBgImage": "/courses/bg-2025.png"
     },
     "learning": { /* existing or updated */ },
     "enquiries": { /* existing or updated */ }
   }
   ```

### Workflow 3: Migrating Between Realms

To move an item from one realm to another (e.g., course to training):

1. **Fetch the item from source realm**:
   ```
   GET /api/courses/details/associate-degree/forensic-investigation
   ```

2. **Create in target realm**:
   ```
   POST /api/training/program/corporate-training/item
   ```
   Body: (Use data from step 1, adjust `programSlug` and `courseCode`)

3. **Delete from source realm** (optional):
   ```
   DELETE /api/courses/details/associate-degree/forensic-investigation
   ```

---

## Appendix: Frontend Integration

### Using the Dynamic Hook

```typescript
import { useDynamicPageData } from "@/hooks/useDynamicPageData";

function CourseProgramPage({ params }: { params: { program: string } }) {
  const { data, updateSection, editMode, setEditMode, saveData, isLoaded } = 
    useDynamicPageData("courses");
  
  // Access program data
  const program = data.programs.find(p => p.slug === params.program);
  
  // Filter courses for this program
  const programCourses = data.courses.filter(c => c.programSlug === params.program);
  
  // Update program info
  const handleUpdate = (updatedInfo: Partial<CourseProgram>) => {
    const updatedPrograms = data.programs.map(p =>
      p.slug === params.program ? { ...p, ...updatedInfo } : p
    );
    updateSection("programs", updatedPrograms);
  };
  
  return (/* JSX */);
}
```

### API Integration Example

```typescript
// Fetch program data from API
async function fetchProgramData(realm: string, programSlug: string) {
  const response = await fetch(`/api/${realm}/program/${programSlug}`);
  if (!response.ok) throw new Error("Failed to fetch program data");
  return response.json();
}

// Update program data via API
async function updateProgramData(
  realm: string, 
  programSlug: string, 
  data: any
) {
  const response = await fetch(`/api/${realm}/program/${programSlug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update program");
  return response.json();
}
```

---

**Document Version**: 1.0  
**Last Updated**: January 3, 2026  
**Maintained By**: SIFS Development Team
