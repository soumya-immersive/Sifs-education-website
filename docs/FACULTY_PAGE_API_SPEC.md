# Faculty Page API Specification

This document provides the **exact** JSON structures for the Faculty Page APIs.
The frontend expects these specific fields.

## Data Types & Handling
- **Images**:
  - **GET**: Returns a URL string.
  - **PUT/POST**: Base64 encoded string if updated.

---

## 1. GET `/api/faculty`
**Method**: `GET`
**Description**: Retrieve the current content of the Faculty Page.

### **Response Body (200 OK)**
```json
{
  "hero": {
    "title": "Meet our Team Members",
    "subtitle": "Home / Faculties",
    "bgImage": "/contact-gradient-bg.png"
  },
  "filters": ["All", "Adjunct Faculty", "Instructors"],
  "faculty": [
    {
      "id": "faculty-1",
      "name": "Aastha Kalra",
      "role": "Graphologist",
      "category": "Adjunct Faculty",
      "image": "/faculty/1.png",
      "socials": {
        "facebook": "#",
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#"
      }
    },
    {
      "id": "faculty-2",
      "name": "Abhishek Vashishth",
      "role": "Forensic Document Examiner",
      "category": "Adjunct Faculty",
      "image": "/faculty/2.png",
      "socials": {
        "facebook": "#",
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#"
      }
    }
  ]
}
```

---

## 2. PUT / POST `/api/faculty`
**Method**: `PUT` (or `POST`)
**Description**: Update the Faculty Page content. The request body must be the **full object**.

### **Request Body Example**
```json
{
  "hero": {
    "title": "Updated Title",
    "subtitle": "Updated Subtitle",
    "bgImage": "data:image/png;base64,..."
  },
  "filters": ["All", "Updated Category", "New Category"],
  "faculty": [
    {
      "id": "faculty-1",
      "name": "Updated Name",
      "role": "Updated Role",
      "category": "Adjunct Faculty",
      "image": "data:image/png;base64,...",
      "socials": {
        "facebook": "https://facebook.com/new",
        "twitter": "#",
        "linkedin": "#",
        "instagram": "#"
      }
    },
    {
       "id": "new-id-123",
       "name": "New Faculty Member",
       "role": "New Role",
       "category": "Instructors",
       "image": "data:image/png;base64,...",
       "socials": {}
    }
  ]
}
```
