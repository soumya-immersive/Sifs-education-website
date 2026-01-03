"use client";

import { useState, useEffect } from "react";
import { CoursesPageData } from "../types/courses-page";
import { 
  COURSES_PAGE_INITIAL_DATA, 
  INTERNSHIPS_PAGE_INITIAL_DATA, 
  TRAINING_PAGE_INITIAL_DATA,
  BOOKS_PAGE_INITIAL_DATA
} from "../lib/data/courses-page-data";

export type Realm = "courses" | "internships" | "training" | "books";

const REALM_MAP: Record<Realm, { storageKey: string, initialData: CoursesPageData }> = {
  courses: {
    storageKey: "sifs_courses_page_data",
    initialData: COURSES_PAGE_INITIAL_DATA
  },
  internships: {
    storageKey: "sifs_internships_page_data",
    initialData: INTERNSHIPS_PAGE_INITIAL_DATA
  },
  training: {
    storageKey: "sifs_training_page_data",
    initialData: TRAINING_PAGE_INITIAL_DATA
  },
  books: {
    storageKey: "sifs_books_page_data",
    initialData: BOOKS_PAGE_INITIAL_DATA
  }
};

export function useDynamicPageData(realm: Realm = "courses") {
  const { storageKey, initialData } = REALM_MAP[realm];
  const [data, setData] = useState<CoursesPageData>(initialData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const local = JSON.parse(raw);
        // Deep merge logic to prevent losing new structure fields from initialData
        const mergedPrograms = [...initialData.programs];
        if (local.programs && Array.isArray(local.programs)) {
          local.programs.forEach((lp: any) => {
            const idx = mergedPrograms.findIndex(p => p.slug === lp.slug);
            if (idx > -1) mergedPrograms[idx] = { ...mergedPrograms[idx], ...lp };
            else mergedPrograms.push(lp);
          });
        }

        setData({
          ...initialData,
          ...local,
          programs: mergedPrograms,
          courses: Array.isArray(local.courses) ? local.courses : initialData.courses,
          learning: { ...initialData.learning, ...(local.learning || {}) },
          hero: { ...initialData.hero, ...(local.hero || {}) },
          enquiries: { ...initialData.enquiries, ...(local.enquiries || {}) },
        });
      } else {
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
    } catch (e) {
      console.error(`Failed to load ${realm} page data`, e);
    } finally {
      setIsLoaded(true);
    }
  }, [realm, storageKey, initialData]);

  const updateSection = (sectionKey: keyof CoursesPageData, newData: any) => {
    setData((prev) => {
      const updated = { ...prev, [sectionKey]: newData };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save updates", e);
      }
      return updated;
    });
  };

  const saveData = async () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save data", e);
      return false;
    }
  };

  const resetToDefault = () => {
    setData(initialData);
    localStorage.setItem(storageKey, JSON.stringify(initialData));
  };

  return {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded,
    resetToDefault,
  };
}
