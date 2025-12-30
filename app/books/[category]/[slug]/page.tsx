import { notFound } from "next/navigation";

import { books } from "../../../../data/books";
import { bookCategories } from "../../../../data/bookCategories";

import BookHero from "../../../../components/book/BookHero";
import BookInfo from "../../../../components/book/BookInfo";
import BookHighlights from "../../../../components/book/BookHighlights";
import BookSidebar from "../../../../components/book/BookSidebar";
import BookEnquiriesSection from "../../../../components/book/BookEnquiriesSection";
import BookAccordionBlocks from "../../../../components/book/BookAccordionBlocks";

// 1. Define the props with params as a Promise
interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// 2. Make the function 'async'
export default async function BookDetailsPage({ params }: Props) {
  
  // 3. Await the params (This fixes the 'negative time stamp' error)
  const { category, slug } = await params;

  /* ---------- Validate Category ---------- */
  const categoryExists = bookCategories.some(
    (c) => c.slug === category
  );

  if (!categoryExists) {
    notFound();
  }

  /* ---------- Find Book ---------- */
  const book = books.find(
    (b) =>
      b.slug === slug &&
      b.categorySlug === category
  );

  if (!book) {
    notFound();
  }

  return (
    <main>
      <BookHero book={book} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:w-2/3 space-y-12">
            <BookInfo book={book} />
            <BookHighlights book={book} />
            <BookAccordionBlocks book={book} />
            <BookEnquiriesSection />
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:w-1/3">
            <BookSidebar book={book} />
          </div>
          
        </div>
      </div>
    </main>
  );
}