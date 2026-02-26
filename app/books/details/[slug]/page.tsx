import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";
import { fetchJSON } from "@/lib/fetchUtils";
import { BookDetailResponse } from "@/types/book";

import BookHero from "@/components/book/BookHero";
import BookInfo from "@/components/book/BookInfo";
import BookSidebar from "@/components/book/BookSidebar";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function BookDetailsPage({ params }: Props) {
    const { slug } = await params;

    let data: BookDetailResponse["data"];
    try {
        const res = await fetchJSON<BookDetailResponse>(
            `${API_BASE_URL}/EducationAndInternship/Website/book/forensic-book-details/${slug}`
        );
        if (!res.success) {
            notFound();
        }
        data = res.data;
    } catch (error) {
        console.error("Failed to fetch book details:", error);
        notFound();
    }

    const { book } = data;

    return (
        <main className="bg-gray-50/50">
            <BookHero book={book} />

            <div className="max-w-7xl mx-auto px-4 py-12 pb-32">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN: Main Content */}
                    <div className="lg:w-2/3 space-y-12">
                        <BookInfo book={book} />

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
