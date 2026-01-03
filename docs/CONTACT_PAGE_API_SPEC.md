# Contact Page API Specification

This document defines the RESTful APIs for managing the Contact page content.

---

## Table of Contents
1. [Contact Page APIs](#1-contact-page-apis)
2. [Data Models](#2-data-models)
3. [Error Handling](#3-error-handling)

---

## 1. Contact Page APIs

### API 1: GET `/api/contact`

Fetches all data for the Contact page.

**HTTP Method**: `GET`

**Response Status Codes**:
- `200 OK`: Data retrieved successfully
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "banner": {
    "title": "Get in Touch",
    "subtitle": "Reference giving information on its origins...",
    "bgImage": "/contact-gradient-bg.png"
  },
  "formSection": {
    "title": "Get in touch",
    "fields": [
      { "name": "first", "placeholder": "First name", "type": "text" },
      { "name": "email", "placeholder": "Email", "type": "email" },
      { "name": "mobile", "placeholder": "Mobile number", "type": "tel" },
      { "name": "subject", "placeholder": "Subject", "type": "text" },
      { "name": "address", "placeholder": "Full Address", "type": "textarea", "rows": 3 },
      { "name": "message", "placeholder": "Message", "type": "textarea", "rows": 4 }
    ],
    "buttonText": "Send Message →"
  },
  "infoSection": {
    "title": "We are here to help you",
    "officeTitle": "CORP OFFICE",
    "officeAddress": {
      "icon": "/contact/1.png",
      "lines": [
        "A-14, Mahendru Enclave, Model Town Metro Station,",
        "Delhi-110033, India."
      ]
    },
    "departments": [
      {
        "id": "education",
        "icon": "/contact/2.png",
        "title": "Education",
        "phones": ["+91-730-391-3002", "+91-11-470-74263"],
        "email": "education@sifs.in"
      }
    ]
  },
  "internationalAssociates": {
    "title": "International Associates",
    "locations": [
      { "id": "lucknow", "name": "Lucknow" }
    ]
  },
  "nationalPresence": {
    "title": "National Presence",
    "cities": [
      { "id": "ahmedabad", "name": "Ahmedabad" },
      { "id": "mumbai", "name": "Mumbai" }
    ]
  }
}
```

---

### API 2: PUT `/api/contact`

Updates the Contact page content.

**HTTP Method**: `PUT`

**Request Headers**:
- `Content-Type: application/json`

**Request Body**: Same structure as GET response

**Response Status Codes**:
- `200 OK`: Updated successfully
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Contact page updated successfully",
  "data": { /* updated data object */ }
}
```

**Validation Rules**:
- `banner.title` is required, 1-100 characters
- `formSection.fields` must be an array with at least one field
- Each field must have `name`, `placeholder`, and `type`
- `departments` must be an array
- Each department must have `id`, `title`, `phones` (array), and `email`
- Email fields must be valid email format
- Phone numbers should follow international format

---

## 2. Data Models

### Complete TypeScript Interfaces

```typescript
interface ContactDepartment {
  id: string;
  icon: string;
  title: string;
  phones: string[];
  email: string;
}

interface ContactLocation {
  id: string;
  name: string;
}

interface ContactBanner {
  title: string;
  subtitle: string;
  bgImage: string;
}

interface ContactFormField {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  rows?: number;
}

interface ContactFormSection {
  title: string;
  fields: ContactFormField[];
  buttonText: string;
}

interface ContactInfoSection {
  title: string;
  officeTitle: string;
  officeAddress: {
    icon: string;
    lines: string[];
  };
  departments: ContactDepartment[];
}

interface ContactInternationalAssociates {
  title: string;
  locations: ContactLocation[];
}

interface ContactNationalPresence {
  title: string;
  cities: ContactLocation[];
}

interface ContactPageData {
  banner: ContactBanner;
  formSection: ContactFormSection;
  infoSection: ContactInfoSection;
  internationalAssociates: ContactInternationalAssociates;
  nationalPresence: ContactNationalPresence;
}
```

---

## 3. Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `INVALID_EMAIL` | 400 | Email format is invalid |
| `INVALID_PHONE` | 400 | Phone number format is invalid |
| `DUPLICATE_ID` | 400 | Department or location ID already exists |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource does not exist |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

---

## 4. Frontend Integration

### Using the Hook

```typescript
import { useContactPageData } from "@/hooks/useContactPageData";

function ContactPage() {
  const { data, updateSection, editMode, setEditMode, saveData } = 
    useContactPageData();
  
  // Update banner
  const handleBannerUpdate = (updates: Partial<ContactBanner>) => {
    updateSection("banner", { ...data.banner, ...updates });
  };
  
  // Add department
  const addDepartment = () => {
    const newDept = {
      id: `dept-${Date.now()}`,
      icon: "/contact/icon.png",
      title: "New Department",
      phones: ["+91-XXX-XXX-XXXX"],
      email: "new@sifs.in"
    };
    updateSection("infoSection", {
      ...data.infoSection,
      departments: [...data.infoSection.departments, newDept]
    });
  };
}
```

---

**Document Version**: 1.0  
**Last Updated**: January 3, 2026  
**Maintained By**: SIFS Development Team
