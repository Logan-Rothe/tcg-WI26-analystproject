import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Poppins } from "next/font/google";
import { headers } from 'next/headers'; // Add this import

export const metadata = {
  title: "Your Site Name",
  description: "Your description here",
};

// Load Poppins using next/font/google
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const headerExcludedPages = [
  'recruitment/case-practice'
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathName = headers().get('x-pathname') || '';
  const shouldExcludeHeaderFooter = headerExcludedPages.includes(pathName);

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {!shouldExcludeHeaderFooter && <Header />}
        {children}
        {!shouldExcludeHeaderFooter && <Footer />}
      </body>
    </html>
  );
}