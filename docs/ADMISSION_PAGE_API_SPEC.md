# Admission Pages API Specification

This document defines the RESTful APIs for managing the Admission section pages (Upload Documents and Terms & Conditions).

---

## Table of Contents
1. [Upload Documents APIs](#1-upload-documents-apis)
2. [Terms and Conditions APIs](#2-terms-and-conditions-apis)
3. [Data Models](#3-data-models)
4. [Error Handling](#4-error-handling)

---

## 1. Upload Documents APIs

### API 1: GET `/api/admission/upload-documents`

Fetches all data for the Upload Documents page.

**HTTP Method**: `GET`

**Response Status Codes**:
- `200 OK`: Data retrieved successfully
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "badge": {
    "icon": "FileCheck",
    "text": "Admission Portal 2025"
  },
  "title": "Document",
  "highlightedTitle": "Verification",
  "description": "Please enter your unique registration number provided during your application to securely upload your educational and identity documents.",
  "placeholder": "Enter Registration Number (e.g. SIFS/2025/001)",
  "buttonText": "VERIFY & PROCEED",
  "helpText": "Having trouble?",
  "supportLinkText": "Contact Support"
}
```

---

### API 2: PUT `/api/admission/upload-documents`

Updates the Upload Documents page content.

**HTTP Method**: `PUT`

**Request Headers**:
- `Content-Type: application/json`

**Request Body**:
```json
{
  "badge": {
    "icon": "FileCheck",
    "text": "Updated Portal Text"
  },
  "title": "Updated Title",
  "highlightedTitle": "Updated Highlight",
  "description": "Updated description text...",
  "placeholder": "Updated placeholder...",
  "buttonText": "UPDATED BUTTON",
  "helpText": "Updated help text",
  "supportLinkText": "Updated Support Link"
}
```

**Response Status Codes**:
- `200 OK`: Updated successfully
- `400 Bad Request`: Invalid request body
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Upload Documents page updated successfully",
  "data": { /* updated data object */ }
}
```

**Validation Rules**:
- All text fields must be strings
- `title`, `highlightedTitle`, and `description` are required
- Text fields should be 1-500 characters

---

## 2. Terms and Conditions APIs

### API 3: GET `/api/admission/terms-and-conditions`

Fetches all data for the Terms and Conditions page.

**HTTP Method**: `GET`

**Response Status Codes**:
- `200 OK`: Data retrieved successfully
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "heroImage": "/terms-hero.png",
  "title": "Terms & Conditions",
  "sections": [
    {
      "id": "intro",
      "title": "",
      "type": "text",
      "content": "SIFS India reserves the right to change prices..."
    },
    {
      "id": "cancellation-by-us",
      "title": "Cancellation by Us",
      "type": "list",
      "content": "SIFS India will be entitled to terminate...",
      "listItems": [
        "Fail to pay required fees.",
        "Act in an aggressive manner...",
        "..."
      ]
    },
    {
      "id": "highlight-section",
      "title": "Important Notice",
      "type": "highlight",
      "content": "This is a highlighted section..."
    }
  ],
  "contactEmail": "contact@sifs.in",
  "address": {
    "lines": [
      "Sherlock Institute of Forensic Science, India,",
      "A-14, Mahendru Enclave,",
      "Near Model Town, Delhi-110033"
    ],
    "note": "Please write the name of your course in the subject line"
  }
}
```

**Field Descriptions**:

**`sections` Array**:
- `id` (string): Unique identifier for the section
- `title` (string): Section heading (can be empty)
- `type` (string): One of `text`, `list`, or `highlight`
- `content` (string): Main content text
- `listItems` (array of strings, optional): Only for `type: 'list'`

**Section Types**:
- `text`: Regular paragraph content
- `list`: Content with bullet points (requires `listItems`)
- `highlight`: Highlighted/emphasized section with special styling

---

### API 4: PUT `/api/admission/terms-and-conditions`

Updates the Terms and Conditions page content.

**HTTP Method**: `PUT`

**Request Headers**:
- `Content-Type: application/json`

**Request Body**: Same structure as GET response

**Example Request Body** (Partial Update):
```json
{
  "heroImage": "/new-terms-hero.png",
  "title": "Updated Terms & Conditions",
  "sections": [
    {
      "id": "new-section",
      "title": "New Section",
      "type": "text",
      "content": "New content..."
    }
  ],
  "contactEmail": "updated@sifs.in",
  "address": {
    "lines": [
      "Updated Address Line 1",
      "Updated Address Line 2"
    ],
    "note": "Updated note"
  }
}
```

**Response Status Codes**:
- `200 OK`: Updated successfully
- `400 Bad Request`: Invalid request body or validation error
- `500 Internal Server Error`: Server-side error

**Response Body** (200 OK):
```json
{
  "success": true,
  "message": "Terms and Conditions updated successfully",
  "data": { /* updated data object */ }
}
```

**Validation Rules**:
- `heroImage` must be a valid image path
- `title` is required, 1-100 characters
- `sections` must be an array with at least one section
- Each section must have `id`, `type`, and `content`
- Section `type` must be one of: `text`, `list`, `highlight`
- If `type` is `list`, `listItems` array is required
- `contactEmail` must be a valid email format
- `address.lines` must be an array of strings

---

## 3. Data Models

### Complete TypeScript Interfaces

```typescript
// Upload Documents Data
interface AdmissionUploadDocuments {
  badge: {
    icon: string;
    text: string;
  };
  title: string;
  highlightedTitle: string;
  description: string;
  placeholder: string;
  buttonText: string;
  helpText: string;
  supportLinkText: string;
}

// Terms Section
interface TermsSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list' | 'highlight';
  listItems?: string[];
}

// Terms and Conditions Data
interface AdmissionTermsAndConditions {
  heroImage: string;
  title: string;
  sections: TermsSection[];
  contactEmail: string;
  address: {
    lines: string[];
    note: string;
  };
}

// Complete Admission Page Data
interface AdmissionPageData {
  uploadDocuments: AdmissionUploadDocuments;
  termsAndConditions: AdmissionTermsAndConditions;
}
```

---

## 4. Error Handling

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
| `INVALID_SECTION_TYPE` | 400 | Section type must be text, list, or highlight |
| `MISSING_LIST_ITEMS` | 400 | List type sections require listItems array |
| `INVALID_EMAIL` | 400 | Contact email format is invalid |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource does not exist |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |

### Error Examples

**Validation Error (400)**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": {
      "fields": {
        "title": "Title is required",
        "contactEmail": "Must be a valid email address"
      }
    }
  }
}
```

**Invalid Section Type (400)**:
```json
{
  "success": false,
  "error": {
    "code": "INVALID_SECTION_TYPE",
    "message": "Section type must be one of: text, list, highlight",
    "details": {
      "sectionId": "section-123",
      "providedType": "invalid-type"
    }
  }
}
```

---

## 5. Frontend Integration

### Using the Hook

```typescript
import { useAdmissionPageData } from "@/hooks/useAdmissionPageData";

function UploadDocumentsPage() {
  const { data, updateSection, editMode, setEditMode, saveData } = 
    useAdmissionPageData();
  
  // Access upload documents data
  const uploadData = data.uploadDocuments;
  
  // Update data
  const handleUpdate = (updates: Partial<AdmissionUploadDocuments>) => {
    updateSection("uploadDocuments", { ...uploadData, ...updates });
  };
  
  // Save to backend
  const handleSave = async () => {
    const success = await saveData();
    if (success) {
      // Show success message
    }
  };
}
```

### API Integration Example

```typescript
// Fetch data from API
async function fetchAdmissionData() {
  const response = await fetch('/api/admission/upload-documents');
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
}

// Update data via API
async function updateAdmissionData(data: AdmissionUploadDocuments) {
  const response = await fetch('/api/admission/upload-documents', {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error("Failed to update");
  return response.json();
}
```

---

**Document Version**: 1.0  
**Last Updated**: January 3, 2026  
**Maintained By**: SIFS Development Team
