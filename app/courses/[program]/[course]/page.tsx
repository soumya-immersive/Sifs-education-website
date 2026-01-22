"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
<<<<<<< HEAD
import { Toaster, toast } from "react-hot-toast";
import { Loader2, Edit, Save } from "lucide-react";
=======
import { courses, type Course } from "../../../../data/courses";
import { API_BASE_URL } from "@/lib/config";
import type { ApiCourseDetailsResponse, ApiComment } from "@/types/course";
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

import CourseHero from "../../../../components/course/CourseHero";
import CourseSidebar from "../../../../components/course/CourseSidebar";
import CourseInfo from "../../../../components/course/CourseInfo";
import CourseHighlights from "../../../../components/course/CourseHighlights";
import AccordionBlocks from "../../../../components/course/AccordionBlocks";
import PaymentDetails from "../../../../components/course/PaymentDetails";
import EnquiriesSection from "../../../../components/course/EnquiriesSection";

import { useDynamicPageData } from "../../../../hooks/useDynamicPageData";

interface PageProps {
  params: Promise<{
    program: string;
    course: string;
  }>;
}

<<<<<<< HEAD
export default function CourseDetailsPage({ params: paramsPromise }: PageProps) {
  const params = React.use(paramsPromise);
  const { program, course: courseSlug } = params;

  const {
    data,
    updateSection,
    editMode,
    setEditMode,
    saveData,
    isLoaded
  } = useDynamicPageData("courses");

  const [isSaving, setIsSaving] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  const courseIndex = data.courses.findIndex(
    (c) => c.programSlug === program && c.slug === courseSlug
  );
=======
async function getApiCourseDetails(slug: string, programSlug: string): Promise<Course | null> {
  const url = `${API_BASE_URL}/EducationAndInternship/Website/courses/course-details/${slug}`;
  console.log(`[CourseDetails] Fetching: ${url}`);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    console.log(`[CourseDetails] Response Status: ${response.status}`);

    if (!response.ok) {
      console.error(`[CourseDetails] Failed: ${response.statusText}`);
      return null;
    }

    const json: ApiCourseDetailsResponse = await response.json();

    if (json.success && json.data && json.data.course) {
      const apiCourse = json.data.course;
      const apiComments = json.data.comments || [];

      return {
        id: apiCourse.id,
        programSlug: programSlug,
        slug: apiCourse.slug,
        title: apiCourse.title,
        overview: apiCourse.sub_title || "",
        courseCode: apiCourse.course_code,
        heroImage: apiCourse.image_url || "/courses/course1.png", // Fallback

        // Extended fields
        description: apiCourse.sub_title || "", // Using subtitle as description
        priceLevel1: apiCourse.price_level_1,
        priceLevel2: apiCourse.price_level_2,
        priceLevel3: apiCourse.price_level_3,
        callForAssistance: apiCourse.call_for_assistance,
        duration: apiCourse.duration,
        level: apiCourse.level,
        courseOutline: apiCourse.course_outline,
        caseStudies: apiCourse.case_studies,
        faqs: apiComments,
        video_url: apiCourse.video_url || undefined,

        // New Mappings
        instructors: json.data.instructors,
        courseFaqs: json.data.faq,
        reviewsList: json.data.reviews,
        prospectus: json.data.prospectus,

        // Defaults for required fields not in API
        rating: 5.0,
        reviewsCount: 120,
        bannerImage: "/course/hero-bg.png",
      };
    } else {
      console.error("[CourseDetails] Invalid JSON structure:", JSON.stringify(json).slice(0, 200));
    }
    return null;
  } catch (error) {
    console.error("[CourseDetails] Error fetching course details:", error);
    return null;
  }
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { program, course: courseSlug } = await params;

  let course: Course | null | undefined;

  const apiSupportedPrograms = ["associate-degree", "foundation-certificate", "advanced-certificate", "short-term-courses", "professional-courses", "classroom-courses"];

  if (apiSupportedPrograms.includes(program)) {
    course = await getApiCourseDetails(courseSlug, program);
  } else {
    course = courses.find(
      (c) =>
        c.programSlug === program &&
        c.slug === courseSlug
    );
  }
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e

  const course = data.courses[courseIndex];

  if (!course) notFound();

  const handleEditClick = () => {
    setIsEditLoading(true);
    setEditMode(true);
    setIsEditLoading(false);
  };

<<<<<<< HEAD
  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveData();
    setTimeout(() => {
      if (success) {
        setEditMode(false);
        toast.success("✅ Course updated successfully");
      } else {
        toast.error("❌ Failed to save course changes");
      }
      setIsSaving(false);
    }, 800);
  };

  const updateCourse = (updatedInfo: any) => {
    const updatedCourses = [...data.courses];
    updatedCourses[courseIndex] = { ...course, ...updatedInfo };
    updateSection("courses", updatedCourses);
  };

  return (
    <main className="relative bg-white min-h-screen">
      <Toaster position="top-right" />

      {/* Admin Controls */}
      <div className="fixed bottom-6 right-6 z-[1000] flex gap-2">
        {!editMode ? (
          <button
            onClick={handleEditClick}
            disabled={isEditLoading}
            className={`flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all font-medium ${isEditLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isEditLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Edit size={18} />
            )}
            {isEditLoading ? 'Loading...' : 'Edit Page'}
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all font-medium animate-in fade-in zoom-in ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      <CourseHero
        course={course}
        editMode={editMode}
        onUpdate={updateCourse}
      />

      <div className="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-12">
        <div className="lg:col-span-2 space-y-12">
          <CourseInfo
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <CourseHighlights
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <AccordionBlocks
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
          <PaymentDetails
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
=======
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CourseInfo course={course} />

          {/* For dynamic courses, content like highlights and payment details are included in the courseOutline/Overview */}
          {!course.courseOutline && <CourseHighlights course={course} />}

          <AccordionBlocks course={course} />

          {!course.courseOutline && <PaymentDetails course={course} />}
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
        </div>

        <div className="lg:-mt-48 relative z-20">
          <CourseSidebar
            course={course}
            editMode={editMode}
            onUpdate={updateCourse}
          />
        </div>
      </div>

<<<<<<< HEAD
      <EnquiriesSection
        data={data.enquiries}
        editMode={editMode}
        onUpdate={(updatedInfo: any) => {
          updateSection("enquiries", { ...data.enquiries, ...updatedInfo });
        }}
      />
    </main>
=======
      <EnquiriesSection enquiries={course.faqs} />
    </section>
>>>>>>> 1cc90f746229fa7dd4dbbdbfc00fa50b69451e2e
  );
}