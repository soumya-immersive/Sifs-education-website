import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/fetchUtils";
import { BooksResponse } from "@/types/book";

import BooksHero from "@/components/books/BooksHero";
import BooksFilterBar from "@/components/books/BooksFilterBar";
import BooksGrid from "@/components/books/BooksGrid";
import Learning from "@/components/books/Learning";

interface Props {
    searchParams: Promise<{ page?: string; sb?: string }>;
}

export default async function BooksPage({ searchParams }: Props) {
    const { page, sb } = await searchParams;
    const currentPage = page ? parseInt(page) : 1;
    const searchTerm = sb || "";

    let data: BooksResponse["data"];
    try {
        const res = await fetchJSON<BooksResponse>(
            `${API_BASE_URL}/EducationAndInternship/Website/book/forensic-books?page=${currentPage}&sb=${searchTerm}`
        );
        if (!res.success) {
            notFound();
        }
        data = res.data;
    } catch (error) {
        console.error("Failed to fetch books:", error);
        notFound();
    }

    const allBooks = data.books || [];

    const categoryData = {
        slug: "all",
        label: searchTerm ? `Search: ${searchTerm}` : "Forensic Books",
        image: "/books/hero.png",
    };

    return (
        <main className="min-h-screen bg-white">
            <BooksHero category={categoryData} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <BooksFilterBar
                    categories={data.categories}
                    activeCategory="all"
                    baseUrl="/books"
                />

                <section className="mt-8">
                    <BooksGrid
                        books={allBooks}
                        pagination={data.pageSection}
                        baseUrl={`/books`}
                        searchTerm={searchTerm}
                    />
                </section>
            </div>

            <Learning />
        </main>
    );
}
