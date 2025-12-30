import { notFound } from "next/navigation";

import BooksHero from "../../../components/books/BooksHero";
import BooksFilterBar from "../../../components/books/BooksFilterBar";
import BooksGrid from "../../../components/books/BooksGrid";
import Learning from "../../../components/books/Learning"; 

import { bookCategories } from "../../../data/bookCategories";
import { books } from "../../../data/books";

interface Props {
  params: Promise<{ category: string }>;
}

/**
 * Next.js 15 Category Page
 * Resolves the performance timestamp error by correctly awaiting params.
 */
export default async function BookCategoryPage({ params }: Props) {
  // 1. Await params immediately at the top level
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;

  // 2. Find Category Data
  const categoryData = bookCategories.find(
    (c) => c.slug === categorySlug
  );

  // 3. 404 if category doesn't exist
  if (!categoryData) {
    notFound();
  }

  // 4. Filter Books for this category
  const categoryBooks = books.filter(
    (book) => book.categorySlug === categorySlug
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Pass the category object to the Hero */}
      <BooksHero category={categoryData} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BooksFilterBar />
        
        {/* Ensure we handle empty states within the Grid or here */}
        <section className="mt-8">
          <BooksGrid books={categoryBooks} />
        </section>
      </div>

      <Learning />
    </main>
  );
}