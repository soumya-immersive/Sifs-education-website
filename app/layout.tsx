import './globals.css';
import Topbar from '../components/layout/Topbar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RouteChangeHandler from '../components/RouteChangeHandler';
import { ReactNode } from 'react'; // Add this import
import { Metadata } from 'next';
import { API_BASE_URL, BASE_URL } from '../lib/config';
import { Toaster } from 'react-hot-toast';
import MaintenanceView from '../components/common/MaintenanceView';

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
      if (json.data.bs?.maintainance_mode === 1) {
        return {
          title: "Maintenance Mode | SIFS India",
          description: "Our website is currently under maintenance. We will be back soon.",
        };
      }

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
  let dir = "ltr";
  let favicon = "/favicon.ico";
  let bs: any = null;
  let isMaintenance = false;

  try {
    const response = await fetch(`${API_BASE_URL}/EducationAndInternship/Website/front`, {
      cache: 'no-store',
    });
    const json = await response.json();
    if (json.success && json.data) {
      lang = json.data.currentLang?.code || "en";
      dir = json.data.currentLang?.rtl === 1 ? "rtl" : "ltr";
      bs = json.data.bs;
      isMaintenance = bs?.maintainance_mode === 1;
      favicon = bs?.favicon
        ? `${BASE_URL}/uploads/Education-And-Internship-Admin-Favicon/${bs.favicon}`
        : "/favicon.ico";
    }
  } catch (error) {
    console.error("Error fetching layout data:", error);
  }

  return (
    <html lang={lang} dir={dir}>
      <head>
        <link rel="icon" href={favicon} sizes="any" />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <Toaster position="top-right" />
        {isMaintenance ? (
          <MaintenanceView
            text={bs?.maintainance_text}
            image={bs?.maintainance_image_url}
          />
        ) : (
          <>
            <RouteChangeHandler />
            <Topbar />
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}

        {/* Dynamic Scripts from CMS */}
        {!isMaintenance && (
          <>
            {bs?.is_analytics === 1 && bs?.google_analytics_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.google_analytics_script }} />
            )}
            {bs?.is_facebook_pexel === 1 && bs?.facebook_pexel_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.facebook_pexel_script }} />
            )}
            {bs?.is_tawkto === 1 && bs?.tawk_to_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.tawk_to_script }} />
            )}
            {bs?.is_addthis === 1 && bs?.addthis_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.addthis_script }} />
            )}
            {bs?.is_disqus === 1 && bs?.disqus_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.disqus_script }} />
            )}
            {bs?.is_appzi === 1 && bs?.appzi_script && (
              <div dangerouslySetInnerHTML={{ __html: bs.appzi_script }} />
            )}
          </>
        )}
      </body>
    </html>
  );
}
