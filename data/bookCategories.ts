export interface BookCategory {
    slug: string;
    label: string;
    image?: string;
  }
  
  export const bookCategories: BookCategory[] = [
    {
      slug: "forensic-science",
      label: "Forensic Science",
      image: "/books/hero.png",
    },
  ];
  