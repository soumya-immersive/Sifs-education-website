# Blog Page API Specification (Consolidated)

This document defines the consolidated "Full Sync" API for the Blog system. This approach allows the frontend to manage the entire state (Hero, Categories, Posts, and Recent Posts) through a single data structure.

## Primary Endpoints

### 1. GET `/api/blog`
**Description**: Retrieve the entire state of the blog system. 

**Response Body (200 OK)**:
```json
{
  "hero": {
    "title": "Blog",
    "subtitle": "Informative content and latest updates from SIFS India.",
    "bgImage": "/blog-gradient-bg.png"
  },
  "categories": [
    { "id": 1, "name": "Forensic Science" },
    { "id": 2, "name": "Crime Scene Investigation" },
    { "id": 3, "name": "Cyber Security & Law" }
  ],
  "posts": [
    {
      "id": 1,
      "slug": "hands-on-facial-reconstruction-training-delhi-india",
      "title": "Hands-on Facial Reconstruction Training Delhi, India",
      "author": "John Doe",
      "date": "2 Dec, 2025",
      "category": "Forensic Science",
      "excerpt": "Our hands-on facial reconstruction training in Delhi, India, is a highly practical, skill-focused program...",
      "heroImage": "/blog/blog-main-hero.png",
      "image": "/blog/blog-main-hero.png",
      "contentImage": "/blog/training-ui.png",
      "introduction": "This training program emphasizes applied learning supported by strong conceptual clarity.",
      "content": "<h2 class=\"text-2xl font-bold text-gray-900\">Practice-Focused Training Methodology</h2><p class=\"text-gray-600\">This training program emphasizes applied learning...</p><ul class=\"list-disc ml-5 space-y-2 text-gray-600\"><li>Core principles of document authenticity</li><li>Identification of genuine, altered, and forged documents</li></ul>",
      "socialLinks": {
        "facebook": "https://facebook.com/sifsindia",
        "instagram": "https://instagram.com/sifsindia",
        "linkedin": "https://linkedin.com/company/sifsindia",
        "twitter": "https://twitter.com/sifsindia"
      }
    },
    {
      "id": 2,
      "slug": "document-authenticity-training-delhi",
      "title": "Document Authenticity Training Delhi",
      "author": "SIFS India",
      "date": "21 Dec, 2025",
      "category": "Document Examination",
      "excerpt": "The ability to verify the authenticity of documents is a vital skill in legal, corporate...",
      "heroImage": "/blog/blog-main-hero.png",
      "image": "/blog/blog-main-hero.png",
      "contentImage": "/blog/training-ui.png",
      "introduction": "Training overview for document verification essentials...",
      "content": "<h2 class=\"text-2xl font-bold text-gray-900\">Core Concepts</h2><p>Course covers the essentials of document verification...</p>",
      "socialLinks": {
        "facebook": "https://facebook.com/sifsindia",
        "instagram": "https://instagram.com/sifsindia",
        "linkedin": "https://linkedin.com/company/sifsindia",
        "twitter": "https://twitter.com/sifsindia"
      }
    }
  ],
  "recentPostIds": [1,2]
}
```

---

### 2. PUT `/api/blog`
**Description**: Update the entire blog state. This endpoint is called when the user clicks "Save Changes" in the Admin UI.

**Request Body**:
The request body must be the **Full JSON Object** as defined in the GET response above.

**Example with Image Update**:
```json
{
  "hero": {
    "title": "Updates from SIFS",
    "subtitle": "Discover the latest in forensic science.",
    "bgImage": "data:image/png;base64,..." 
  },
  "categories": [
    { "id": 1, "name": "Forensic Medicine" }
  ],
  "posts": [
    {
      "id": 1,
      "slug": "updated-slug",
      "title": "Updated Post",
      "author": "SIFS India",
      "date": "03 Jan 2026",
      "category": "Forensic Medicine",
      "excerpt": "Updated excerpt content...",
      "heroImage": "/blog/main.png",
      "image": "/blog/thumb.png",
      "contentImage": "/blog/secondary.png",
      "introduction": "Updated intro...",
      "content": "<p>Updated body content...</p>",
      "socialLinks": {
        "facebook": "https://facebook.com/sifs",
        "instagram": "https://instagram.com/sifs",
        "linkedin": "https://linkedin.com/sifs",
        "twitter": "https://twitter.com/sifs"
      }
    }
  ],
  "recentPostIds": [1]
}
```

---

## Technical Implementation Details

### Image Handling
- **Incoming (GET)**: Frontend expects a relative or absolute URL string.
- **Outgoing (PUT)**: If the user uploads a new image, the frontend sends a **Base64 string** (e.g., `data:image/jpeg;base64,...`). The backend should:
  1. Detect the Data URI.
  2. Upload/Save the file to the server.
  3. Replace the field value with the new permanent URL.

### Rich Text (HTML)
- The `content` field contains raw HTML. The backend should persist this exactly as sent to maintain formatting (bold, headings, lists).

### Dynamic Slugs
- Slugs should be unique. When a post title is edited, the frontend generates a new slug (e.g., "Hello World" -> "hello-world"). The backend should use the `slug` for identifying posts in SEO-friendly URLs.

### Full Synchronization
- This "Collab/Consolidated" API allows for easy versioning and undo/redo features on the backend as every save contains the complete state of the blog page.
