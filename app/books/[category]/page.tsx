"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";

import BooksHero from "../../../components/books/BooksHero";
import BooksFilterBar from "../../../components/books/BooksFilterBar";
import BooksGrid from "../../../components/books/BooksGrid";
import Learning from "../../../components/books/Learning";
import { BOOKS_PAGE_INITIAL_DATA } from "../../../lib/data/courses-page-data";

interface Props {
  params: Promise<{ category: string }>;
}

export default function BookCategoryPage({ params: paramsPromise }: Props) {
  const params = React.use(paramsPromise);
  const categorySlug = params.category;

  const data = BOOKS_PAGE_INITIAL_DATA;

  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Validate program/category
  const programData = data.programs.find(
    (p) => p.slug === categorySlug
  );

  if (!programData) notFound();

  // 1. Filter books (courses) for this program
  let filteredBooks = data.courses.filter(
    (book) => book.programSlug === categorySlug
  );

  // 2. Apply Search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredBooks = filteredBooks.filter(b =>
      b.title.toLowerCase().includes(q) ||
      (b.author && b.author.toLowerCase().includes(q)) ||
      (b.courseCode && b.courseCode.toLowerCase().includes(q)) || // treating courseCode as ISBN
      b.overview.toLowerCase().includes(q)
    );
  }

  // 3. Apply Genre Filter (using genre field if present, or maybe programLabel?)
  if (genre) {
    filteredBooks = filteredBooks.filter(b => b.genre?.toLowerCase() === genre.toLowerCase());
  }

  // 4. Apply Format Filter
  if (format) {
    filteredBooks = filteredBooks.filter(b => b.format?.toLowerCase() === format.toLowerCase());
  }

  // 5. Apply Sort
  filteredBooks.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();

    switch (sortOrder) {
      case 'newest':
        return dateB - dateA;
      case 'oldest': // Fallback or if added
        return dateA - dateB;
      case 'popular':
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'az':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <main className="relative min-h-screen bg-white">
      <BooksHero
        program={programData}
      />

      <BooksFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        genre={genre}
        onGenreChange={setGenre}
        format={format}
        onFormatChange={setFormat}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <BooksGrid
        books={filteredBooks}
      />

      <Learning
        data={data.learning}
      />
    </main>
  );
}