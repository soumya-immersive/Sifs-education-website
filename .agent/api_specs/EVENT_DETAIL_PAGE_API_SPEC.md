# Event Detail Page API Specification

## Overview
The Event Detail Page uses a combination of static params (for SEO/SSG) and client-side dynamic data (loading from `useEventsPageData` hook which persists to LocalStorage). This allows full editability of the event details.

## Hook: `useEventsPageData`

**Path**: `lib/hooks/useEventsPageData.tsx`

### Returns
- `data`: `EventsPageData` (Global store)
- `updateSection`: `(section: keyof EventsPageData, data: any) => void`
- `updateEvent`: `(eventId: number, updates: Partial<Event>) => void`
- `editMode`: `boolean`
- `toggleEditMode`: `() => void`

## Data Structure: `Event`

The `Event` object contains all details for a specific event.

```typescript
interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;       // e.g. "08 Dec, 2025" or "2025-12-08"
  duration: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  price: number;
  discountedPrice: number;
  currency: string;
  heroImage: string;
  coverImage?: string;
  description: string;
  objectives: string[];
  
  // Schedule
  schedule: {
    day: number;
    title: string;
    description: string;
    time?: string;    // e.g. "06:00 PM - 07:00 PM"
    image?: string;
  }[];

  // FAQs
  faqs: {
    question: string;
    answer: string;
  }[];

  // Instructors
  instructors: {
    name: string;
    role: string;
    image: string;
  }[];

  // Contact & Venue (New Fields)
  contactEmail?: string;
  contactPhone?: string;
  venue?: string;
  venueAddress?: string;
  venueEmail?: string;
  venuePhone?: string;
  platform?: string;
  registrationLink?: string;
  schedulePdfLink?: string;
}
```

## Component Usage

### `EventDetailClient.tsx`
- Fetches event by `slug`.
- Passes `editMode` and `onUpdate` to children.
- Manages `Participatory` section (adding partners calls `updateSection`).
- Manages `UpcomingEvents` (filtering `data.events`).

### `EventSidebar.tsx`
- Editable Fields: Date, Price, Contact Info, Venue Info, Platform.
- Buttons: Register (updates `registrationLink`), Download (updates `schedulePdfLink`).

### `EventSchedule.tsx`
- Fully editable schedule items (Title, Description, Time, Image).
- Add/Remove Days.

### `EventHero.tsx`
- Countdown timer dynamically parsed from `event.date`.
- Editable Backgrounds (`heroImage`, `coverImage`).

## Persistence
All updates are saved to `localStorage` key `events_page_data` via the hook.
