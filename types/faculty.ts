export type FacultyMember = {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
};
