import './globals.css';
import Topbar from '../components/layout/Topbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RouteChangeHandler from '../components/RouteChangeHandler';
import { ReactNode } from 'react'; // Add this import
import { Metadata } from 'next';
import { API_BASE_URL, BASE_URL } from '../lib/config';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
      cache: 'no-store',
    });
    const json = await response.json();

    if (json.success && json.data?.bs?.favicon) {
      const faviconPath = `${BASE_URL}/uploads/Education-And-Internship-Admin-Logo/${json.data.bs.favicon}`;
      return {
        icons: {
          icon: faviconPath,
          shortcut: faviconPath,
          apple: faviconPath,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching favicon:", error);
  }

  return {
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: ReactNode; // More explicit than React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <RouteChangeHandler />
        <Topbar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
