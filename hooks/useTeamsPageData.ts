import { useState, useEffect } from "react";
import { TEAMS_PAGE_INITIAL_DATA } from "@/lib/data/teams-page-data";

const STORAGE_KEY = "teamsPageContent:v2";

export function useTeamsPageData() {
  const [data, setData] = useState(TEAMS_PAGE_INITIAL_DATA);
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(TEAMS_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load teams data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof typeof TEAMS_PAGE_INITIAL_DATA, newData: any) => {
    setData((prev) => {
      const updated = { ...prev, [sectionKey]: newData };
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

  return {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  };
}
