import './globals.css';
import Topbar from '../components/layout/Topbar';
import Header from '../components/layout/Header';
import { ReactNode } from 'react'; // Add this import

export default function RootLayout({
  children,
}: {
  children: ReactNode; // More explicit than React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
