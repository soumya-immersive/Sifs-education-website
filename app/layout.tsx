import './globals.css';
import Topbar from '../components/layout/Topbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RouteChangeHandler from '../components/RouteChangeHandler';
import { ReactNode } from 'react'; // Add this import
import { Metadata } from 'next';
import { API_BASE_URL, BASE_URL } from '../lib/config';
import { Toaster } from 'react-hot-toast';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = "Sherlock Institute of Forensic Science";
  const defaultDesc = "Industry-specific and Job-ready Forensic Science Courses, Internships, and Workshops.";

  try {
    const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
      cache: 'no-store',
    });
    const json = await response.json();

    if (json.success && json.data) {
      const faviconPath = json.data.bs?.favicon
        ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Favicon/${json.data.bs.favicon}`
        : "/favicon.ico";

      const title = json.data.be?.home_meta_title || defaultTitle;
      const description = json.data.be?.home_meta_description || defaultDesc;

      return {
        title: {
          default: title,
          template: `%s | ${title}`,
        },
        description: description,
        icons: {
          icon: faviconPath,
          shortcut: faviconPath,
          apple: faviconPath,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${defaultTitle}`,
    },
    description: defaultDesc,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  let lang = "en";
  let favicon = "/favicon.ico";

  try {
    const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
      cache: 'no-store',
    });
    const json = await response.json();
    if (json.success && json.data) {
      lang = json.data.currentLang?.code || "en";
      favicon = json.data.bs?.favicon
        ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Favicon/${json.data.bs.favicon}`
        : "/favicon.ico";
    }
  } catch (error) {
    console.error("Error fetching layout data:", error);
  }

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href={favicon} sizes="any" />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <Toaster position="top-right" />
        <RouteChangeHandler />
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
