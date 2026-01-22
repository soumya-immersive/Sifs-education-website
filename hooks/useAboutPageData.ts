import { useState, useEffect } from "react";
import { ABOUT_PAGE_INITIAL_DATA } from "@/lib/data/about-page-data";
import { API_BASE_URL } from "@/lib/config";

const STORAGE_KEY = "aboutPageContent:v1";

export function useAboutPageData() {
  const [data, setData] = useState(ABOUT_PAGE_INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch from API on mount
  useEffect(() => {
    const fetchData = async () => {
      console.log('🚀 Starting to fetch about data...');

      // Clear localStorage to force API fetch
      localStorage.removeItem(STORAGE_KEY);
      console.log('🗑️ Cleared localStorage');

      try {
        const apiUrl = `${API_BASE_URL}/EducationAndInternship/Website/front`;
        console.log('📡 Fetching about data from:', apiUrl);
        const response = await fetch(apiUrl);
        console.log('📥 API Response status:', response.status);

        if (response.ok) {
          const apiData = await response.json();
          console.log('=== RAW API Response ===');
          console.log('Full API Data:', apiData);
          console.log('Data object:', apiData.data);
          console.log('BS Object:', apiData.data?.bs);
          console.log('education2_section_title:', apiData.data?.bs?.education2_section_title);
          console.log('education2_section_subtitle:', apiData.data?.bs?.education2_section_subtitle);
          console.log('education2_bg:', apiData.data?.bs?.education2_bg);
          console.log('about_us:', apiData.data?.bs?.about_us);
          console.log('======================');

          const bs = apiData.data?.bs;



          // Extract image from about_us if present
          let heroImage = "/home-about.png";
          let heroParagraphs = ["Online learning is one of the most flexible ways to gain knowledge."];

          // Check if about_us has an image
          const imgMatch = bs?.about_us?.match(/<img[^>]+src="([^">]+)"/);

          // Determine Hero Image
          if (imgMatch && imgMatch[1]) {
            heroImage = imgMatch[1];
          } else if (bs?.education2_bg) {
            heroImage = `/EducationAndInternship/storage/app/img/${bs.education2_bg}`;
          }

          // Process Text Content
          const cleanAboutUsText = bs?.about_us
            ? bs.about_us.replace(/<img[^>]*>/g, "") // Remove image from text area
            : "";

          // Transform API data to match expected structure
          const transformedData = {
            hero: {
              heading: "Hi, Sherlock Institute of Forensic <br/> Science India",
              subtitle: bs?.intro_section_title || "Forensic Science Institute",
              image: heroImage,
              badgeNumber: "19+",
              badgeText: "Years of <br/> Experience",
              tag: "About Us",
              h2: bs?.education2_section_title || "<span class=\"relative z-10\">Learn Any</span> where, Any Time",
              paragraphs: cleanAboutUsText
                ? [cleanAboutUsText]
                : bs?.education2_section_subtitle
                  ? bs.education2_section_subtitle
                    .replace(/<[^>]*>/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .split('.')
                    .filter((p: string) => p.trim().length > 20)
                    .map((p: string) => p.trim() + '.')
                  : heroParagraphs
            },
            // Keep other sections from initial data
            mission: ABOUT_PAGE_INITIAL_DATA.mission,
            initiatives: ABOUT_PAGE_INITIAL_DATA.initiatives,
            team: ABOUT_PAGE_INITIAL_DATA.team,
            testimonials: ABOUT_PAGE_INITIAL_DATA.testimonials
          };

          console.log('=== Transformed Data ===');
          console.log('Transformed hero:', transformedData.hero);
          console.log('========================');
          setData(transformedData);
          // Also cache in localStorage as backup
          localStorage.setItem(STORAGE_KEY, JSON.stringify(transformedData));
        } else {
          console.log('API failed with status:', response.status);
          // Fallback to localStorage if API fails
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            console.log('Using localStorage data');
            setData(JSON.parse(raw));
          } else {
            console.log('No localStorage data, using initial data');
            setData(ABOUT_PAGE_INITIAL_DATA);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ABOUT_PAGE_INITIAL_DATA));
          }
        }
      } catch (e) {
        console.error("Failed to fetch about data from API", e);
        setError("Failed to load data");
        // Fallback to localStorage
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            console.log('Using localStorage data after error');
            setData(JSON.parse(raw));
          } else {
            console.log('Using ABOUT_PAGE_INITIAL_DATA');
            setData(ABOUT_PAGE_INITIAL_DATA);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ABOUT_PAGE_INITIAL_DATA));
          }
        } catch (localError) {
          console.error("Failed to load from localStorage", localError);
        }
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
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
    resetToDefault,
    error
  };
}
