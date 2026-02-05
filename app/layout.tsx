import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Poppins } from "next/font/google";

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



export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}