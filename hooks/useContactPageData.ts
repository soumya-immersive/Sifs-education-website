"use client";

import { useState, useEffect } from "react";
import { ContactPageData } from "../types/contact-page";
import { CONTACT_PAGE_INITIAL_DATA } from "../lib/data/contact-page-data";

const STORAGE_KEY = "sifs_contact_page_data";

export function useContactPageData() {
  const [data, setData] = useState<ContactPageData>(CONTACT_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const local = JSON.parse(raw);
        setData({
          ...CONTACT_PAGE_INITIAL_DATA,
          ...local,
          banner: {
            ...CONTACT_PAGE_INITIAL_DATA.banner,
            ...(local.banner || {})
          },
          formSection: {
            ...CONTACT_PAGE_INITIAL_DATA.formSection,
            ...(local.formSection || {}),
            fields: Array.isArray(local.formSection?.fields)
              ? local.formSection.fields
              : CONTACT_PAGE_INITIAL_DATA.formSection.fields
          },
          infoSection: {
            ...CONTACT_PAGE_INITIAL_DATA.infoSection,
            ...(local.infoSection || {}),
            departments: Array.isArray(local.infoSection?.departments)
              ? local.infoSection.departments
              : CONTACT_PAGE_INITIAL_DATA.infoSection.departments
          },
          internationalAssociates: {
            ...CONTACT_PAGE_INITIAL_DATA.internationalAssociates,
            ...(local.internationalAssociates || {}),
            locations: Array.isArray(local.internationalAssociates?.locations)
              ? local.internationalAssociates.locations
              : CONTACT_PAGE_INITIAL_DATA.internationalAssociates.locations
          },
          nationalPresence: {
            ...CONTACT_PAGE_INITIAL_DATA.nationalPresence,
            ...(local.nationalPresence || {}),
            cities: Array.isArray(local.nationalPresence?.cities)
              ? local.nationalPresence.cities
              : CONTACT_PAGE_INITIAL_DATA.nationalPresence.cities
          }
        });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CONTACT_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load contact page data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (
    sectionKey: keyof ContactPageData,
    newData: any
  ) => {
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

  const saveData = async () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Failed to save data", e);
      return false;
    }
  };

  const resetToDefault = () => {
    setData(CONTACT_PAGE_INITIAL_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CONTACT_PAGE_INITIAL_DATA));
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
