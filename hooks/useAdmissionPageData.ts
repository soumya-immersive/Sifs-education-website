"use client";

import { useState, useEffect } from "react";
import { AdmissionPageData } from "../types/admission-page";
import { ADMISSION_PAGE_INITIAL_DATA } from "../lib/data/admission-page-data";

const STORAGE_KEY = "sifs_admission_page_data";

export function useAdmissionPageData() {
  const [data, setData] = useState<AdmissionPageData>(ADMISSION_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const local = JSON.parse(raw);
        setData({
          ...ADMISSION_PAGE_INITIAL_DATA,
          ...local,
          uploadDocuments: {
            ...ADMISSION_PAGE_INITIAL_DATA.uploadDocuments,
            ...(local.uploadDocuments || {})
          },
          termsAndConditions: {
            ...ADMISSION_PAGE_INITIAL_DATA.termsAndConditions,
            ...(local.termsAndConditions || {}),
            sections: Array.isArray(local.termsAndConditions?.sections)
              ? local.termsAndConditions.sections
              : ADMISSION_PAGE_INITIAL_DATA.termsAndConditions.sections
          }
        });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ADMISSION_PAGE_INITIAL_DATA));
      }
    } catch (e) {
      console.error("Failed to load admission page data", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSection = (
    sectionKey: keyof AdmissionPageData,
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
    setData(ADMISSION_PAGE_INITIAL_DATA);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ADMISSION_PAGE_INITIAL_DATA));
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
