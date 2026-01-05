
"use client";

import { useState, useEffect } from "react";
import { EventsPageData, Event } from "../types/events-page";
import { EVENTS_PAGE_INITIAL_DATA } from "../lib/data/events-page-data";

const STORAGE_KEY = "sifs_events_page_data";

export function useEventsPageData() {
  const [data, setData] = useState<EventsPageData>(EVENTS_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const local = JSON.parse(raw);
        // Deep merge logic (simplified for now, assuming structure matches)
        setData((prev) => ({
            ...prev,
            ...local,
            hero: { ...prev.hero, ...(local.hero || {}) },
            stats: { ...prev.stats, ...(local.stats || {}) },
            // For arrays like events, we typically replace rather than merge individual items for simplicity
            events: local.events && Array.isArray(local.events) ? local.events : prev.events,
            archive: { ...prev.archive, ...(local.archive || {}) },
            participatory: { ...prev.participatory, ...(local.participatory || {}) },
            insights: { ...prev.insights, ...(local.insights || {}) },
        }));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(EVENTS_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load events page data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveData = async () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save data", e);
      return false;
    }
  };

  const updateSection = <K extends keyof EventsPageData>(
    section: K,
    sectionData: Partial<EventsPageData[K]>
  ) => {
    setData((prev) => {
        // @ts-ignore - complex type mapping
        const updated = { ...prev, [section]: { ...prev[section], ...sectionData } };
        // For events array, specific update logic is better handled by specialized functions
        // but this generic one works for replacement or partial object updates
        return updated;
    });
  };

  const updateEvent = (id: number, updates: Partial<Event>) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const addEvent = (event: Event) => {
    setData((prev) => ({
      ...prev,
      events: [...prev.events, event],
    }));
  };

  const deleteEvent = (id: number) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  return {
    data,
    isLoaded,
    editMode,
    setEditMode,
    updateSection,
    updateEvent,
    addEvent,
    deleteEvent,
    saveData,
  };
}
