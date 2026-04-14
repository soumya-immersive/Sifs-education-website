"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";

import CoursesHero from "../../../components/courses/CoursesHero";
import CoursesFilterBar from "../../../components/courses/CoursesFilterBar";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import Learning from "../../../components/courses/Learning";

import { TRAINING_PAGE_INITIAL_DATA } from "../../../lib/data/courses-page-data";

export default function TrainingProgramPage({ params: paramsPromise }: { params: Promise<{ program: string }> }) {
  const params = React.use(paramsPromise);
  const { program } = params;

  const data = TRAINING_PAGE_INITIAL_DATA;

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Validate program
  const programData = data.programs.find(
    (p) => p.slug === program
  );

  if (!programData) notFound();

  // 1. Filter items for this program
  let filteredCourses = data.courses.filter(
    (course) => course.programSlug === program
  );

  // 2. Apply Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredCourses = filteredCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.courseCode.toLowerCase().includes(q) ||
      c.overview.toLowerCase().includes(q)
    );
  }

  // 3. Apply Level Filter
  if (level) {
    filteredCourses = filteredCourses.filter(c => c.skillLevel === level);
  }

  // 4. Apply Duration Filter
  if (duration) {
    const minHours = parseInt(duration);
    filteredCourses = filteredCourses.filter(c => (c.durationHours || 0) >= minHours);
  }

  // 5. Apply Sort
  filteredCourses.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    } else {
      return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    }
  });


  return (
    <main className="relative min-h-screen bg-[#F7F9FC]">
      <CoursesHero
        program={programData}
      />

      <CoursesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        level={level}
        onLevelChange={setLevel}
        duration={duration}
        onDurationChange={setDuration}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <CoursesGrid
        courses={filteredCourses}
        realm="training"
      />

      <Learning
        data={data.learning}
      />
    </main>
  );
}
