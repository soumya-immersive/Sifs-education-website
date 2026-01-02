export type TeamMember = {
    id: string;
    name: string;
    role: string;
    category: string;
    image: string;
    description: string;
    socials?: {
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
  };
  