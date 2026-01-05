# Events Page API Specification

## Overview
This document outlines the data structure and API for the dynamic Events Page (`/events`) and Event Detail Pages (`/events/[slug]`). The data is managed via a custom hook `useEventsPageData` and persisted in `localStorage` under the key `sifs_events_page_data`.

## Data Structure

### Core Interface: `EventsPageData`

```typescript
interface EventsPageData {
  hero: EventsHeroData;
  stats: JourneyStatsData;
  events: Event[]; // List of all events (upcoming and past)
  archive: ArchiveProgramData;
  participatory: ParticipatoryData;
  insights: ForensicInsightsData;
}
```

### Component Interfaces

#### 1. Hero Section (`EventsHero`)
```typescript
interface EventsHeroData {
  title: string;
  subtitle: string; // "Online Training in"
  description: string;
  image: string;
  enrolledCount: string; // "9,394+ Enrolled Learners"
  features: string[]; // ["Training without border", "Online"]
  certificateTitle: string;
  certificateDescription: string;
}
```

#### 2. Journey Stats (`JourneyStats`)
```typescript
interface JourneyStatsData {
  bgImage: string;
  title: string;
  description: string;
  counts: {
    events: number;
    participants: string; // "350K+"
    countries: number;
    speakers: number;
  };
}
```

#### 3. Event Interface (`Event`)
Reused and extended from existing `data/events.ts`.
```typescript
interface Event {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string; // Display string, e.g., "08 Dec, 2025"
  isoDate?: string; // For sorting
  duration: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  price: number;
  discountedPrice: number;
  currency: string;
  heroImage: string; // Large banner for detail page
  coverImage: string; // Thumbnail for list view
  description: string;
  objectives: string[];
  schedule: {
    day: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  seats: {
    total: number;
    available: number;
  };
  instructors: {
    name: string;
    role: string;
    image: string;
  }[];
  // Timer data
  timerValues?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}
```

#### 4. Archive Program (`ArchiveProgram`)
```typescript
interface ArchiveProgramData {
  title: string;
  description: string;
  image: string;
  years: string[]; // ["2020", "2021", "2022", ...]
}
```

#### 5. Participatory Section (`Participatory`)
```typescript
interface ParticipatoryData {
  title: string;
  description: string;
  image: string;
  buttonText: string;
}
```

#### 6. Forensic Insights (`ForensicInsightsSection`)
```typescript
interface ForensicInsightsData {
  title: string;
  description: string;
  videos: {
    id: string;
    thumbnail: string;
    title: string;
    url: string;
  }[];
}
```

## Hook: `useEventsPageData`

### Usage
```typescript
const { data, updateSection, updateEvent, addEvent, deleteEvent, saveData, isLoaded } = useEventsPageData();
```

### Methods
- **`updateSection(section: keyof EventsPageData, data: Partial<SectionData>)`**: Updates a specific section (hero, stats, etc.).
- **`updateEvent(id: number, data: Partial<Event>)`**: Updates a specific event by ID.
- **`addEvent(event: Omit<Event, "id">)`**: Adds a new event.
- **`deleteEvent(id: number)`**: Removes an event.
- **`saveData()`**: Persists changes to `localStorage`.

## Initial Data
Located in `lib/data/events-page-data.ts` as `EVENTS_PAGE_INITIAL_DATA`.
