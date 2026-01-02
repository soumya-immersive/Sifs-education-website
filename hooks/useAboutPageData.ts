import { useState, useEffect } from "react";
import { ABOUT_PAGE_INITIAL_DATA } from "@/lib/data/about-page-data";

const STORAGE_KEY = "aboutPageContent:v1";

export function useAboutPageData() {
  const [data, setData] = useState(ABOUT_PAGE_INITIAL_DATA);
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
         localStorage.setItem(STORAGE_KEY, JSON.stringify(ABOUT_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load about data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof typeof ABOUT_PAGE_INITIAL_DATA, newData: any) => {
    const updated = { ...data, [sectionKey]: newData };
    setData(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save updates", e);
    }
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
      setData(ABOUT_PAGE_INITIAL_DATA);
       localStorage.setItem(STORAGE_KEY, JSON.stringify(ABOUT_PAGE_INITIAL_DATA));
  }

  return {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded,
    resetToDefault
  };
}
