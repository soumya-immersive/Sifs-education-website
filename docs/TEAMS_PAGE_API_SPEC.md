# Teams Page API Specification

This document provides the **exact** JSON structures for the Teams Page APIs.
The frontend expects these specific fields.

## Data Types & Handling
- **Images**:
  - **GET**: Returns a URL string.
  - **PUT/POST**: Base64 encoded string if updated.
- **Socials**:
  - Keys: `facebook`, `twitter`, `linkedin`, `instagram`
  - Values: Full URL strings.

---

## 1. GET `/api/teams`
**Method**: `GET`
**Description**: Retrieve the current content of the Teams Page.

### **Response Body (200 OK)**
```json
{
  "hero": {
    "title": "Meet Our Team Members",
    "subtitle": "Home / Team Members",
    "bgImage": "/contact-gradient-bg.png"
  },
  "filters": [
    "All",
    "International Advisory Board",
    "National Advisory Board",
    "Speaker",
    "Scientific Committee",
    "Supportive Body",
    "Core Team",
    "Volunteer"
  ],
  "team": [
    {
      "id": "team-1",
      "name": "Anushka Karle",
      "role": "Psychologist",
      "category": "Core Team",
      "image": "/teams/team1.png",
      "description": "Full description text...",
      "socials": {
        "facebook": "#",
        "linkedin": "#"
      }
    }
  ]
}
```

---

## 2. PUT / POST `/api/teams`
**Method**: `PUT` (or `POST`)
**Description**: Update the Teams Page content.

### **Request Body Example**
```json
{
  "hero": {
    "title": "Updated Title",
    "subtitle": "Updated Subtitle",
    "bgImage": "data:image/png;base64,..."
  },
  "filters": ["All", "New Category", "Core Team"],
  "team": [
    {
      "id": "team-1",
      "name": "Updated Name",
      "role": "Updated Role",
      "category": "New Category",
      "image": "/teams/team1.png",
      "description": "Updated description...",
      "socials": {
        "facebook": "https://facebook.com/newlink"
      }
    }
  ]
}
```
