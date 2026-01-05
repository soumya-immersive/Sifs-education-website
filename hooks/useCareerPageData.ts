import { useState, useEffect } from "react";
import { CAREER_PAGE_INITIAL_DATA } from "@/lib/data/career-page-data";

const STORAGE_KEY = "careerPageContent:v1";

export function useCareerPageData() {
  const [data, setData] = useState(CAREER_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        // First run: persist initial data
         localStorage.setItem(STORAGE_KEY, JSON.stringify(CAREER_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load career data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof typeof CAREER_PAGE_INITIAL_DATA, newData: any) => {
    setData(prev => {
      const updated = { ...prev, [sectionKey]: newData };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save updates", e);
      }
      return updated;
    });
  };

  const updateMultiple = (updates: Partial<typeof CAREER_PAGE_INITIAL_DATA>) => {
    setData(prev => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save updates", e);
      }
      return updated;
    });
  };

  const saveData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  };

  const resetToDefault = () => {
      setData(CAREER_PAGE_INITIAL_DATA);
       localStorage.setItem(STORAGE_KEY, JSON.stringify(CAREER_PAGE_INITIAL_DATA));
  }

  return {
    data,
    updateSection,
    updateMultiple,
    editMode,
    setEditMode,
    saveData,
    isLoaded,
    resetToDefault
  };
}
