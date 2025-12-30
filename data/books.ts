export interface Book {
  id: number;
  slug: string;
  title: string;
  author: string;
  category: string;      
  categorySlug: string;   
  price: string;
  coverImage: string;
  overview: string;
  publisher?: string;
  language?: string;
  pageCount?: number;
  publishedDate?: string;
  fullDescription?: string;
  description?: string;
  bannerImage?: string;
  bookCode?: string;
  rating: number;      
  reviewsCount?: number;
  tableOfContents?: { title: string; page: number }[];
  format?: string;       
  inStock?: boolean;
  authors?: {           
    name: string;
    role: string;
    img: string;
  }[];
}

export const books: Book[] = [
  {
    id: 1,
    slug: "forensic-handbook",
    title: "Forensic Science Handbook",
    author: "Dr. Rajneek K Singh",
    category: "Forensic Science",
    categorySlug: "forensic-science",
    price: "₹1,499",
    coverImage: "/books/hero.png",
    bannerImage: "/books/banner.jpg", 
    bookCode: "ISBN 978-81",        
    rating: 4.8,                    
    reviewsCount: 1250,              
    overview: "A comprehensive guide covering modern forensic investigation techniques.",
    publisher: "SIFS India",
    language: "English",
    pageCount: 450,
    publishedDate: "October 2023",
    fullDescription: "This handbook provides a deep dive into crime scene management, fingerprint analysis, and digital forensics...",
    format: "Hardcover",
    inStock: true,
    authors: [
      { 
        name: "Dr. Rajneek K Singh", 
        role: "Principal Author", 
        img: "/book/author-1.png" 
      },
      { 
        name: "Prof. Anil Kumar", 
        role: "Contributor", 
        img: "/book/author-2.png" 
      }
    ]
  },
];