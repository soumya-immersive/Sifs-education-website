import { useState, useEffect } from "react";
import { ACHIEVEMENTS_PAGE_INITIAL_DATA } from "@/lib/data/achievements-page-data";

const STORAGE_KEY = "achievementsPageContent:v1";

export function useAchievementsPageData() {
  const [data, setData] = useState(ACHIEVEMENTS_PAGE_INITIAL_DATA);
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
         localStorage.setItem(STORAGE_KEY, JSON.stringify(ACHIEVEMENTS_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load achievements data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof typeof ACHIEVEMENTS_PAGE_INITIAL_DATA, newData: any) => {
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
      setData(ACHIEVEMENTS_PAGE_INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ACHIEVEMENTS_PAGE_INITIAL_DATA));
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
