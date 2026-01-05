"use client";

import { useState, useEffect } from "react";
import { BlogPageData } from "@/types/blog-page";
import { BLOG_PAGE_INITIAL_DATA } from "@/lib/data/blog-page-data";

const STORAGE_KEY = "sifs_blog_page_data";

export function useBlogPageData() {
  const [data, setData] = useState<BlogPageData>(BLOG_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load blog page data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (sectionKey: keyof BlogPageData, newData: any) => {
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

  const updateMultiple = (updates: Partial<BlogPageData>) => {
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
      console.error("Failed to save blog data", e);
      return false;
    }
  };

  const resetToDefault = () => {
    if (confirm("Reset all blog content to default?")) {
      setData(BLOG_PAGE_INITIAL_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_PAGE_INITIAL_DATA));
    }
  };

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
