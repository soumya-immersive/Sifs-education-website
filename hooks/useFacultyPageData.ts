import { useState, useEffect } from "react";
import { FACULTY_PAGE_INITIAL_DATA } from "@/lib/data/faculty-page-data";

const STORAGE_KEY = "facultyPageContent:v1";

export function useFacultyPageData() {
  const [data, setData] = useState(FACULTY_PAGE_INITIAL_DATA);
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
         localStorage.setItem(STORAGE_KEY, JSON.stringify(FACULTY_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load faculty data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof typeof FACULTY_PAGE_INITIAL_DATA, newData: any) => {
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
      setData(FACULTY_PAGE_INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(FACULTY_PAGE_INITIAL_DATA));
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
