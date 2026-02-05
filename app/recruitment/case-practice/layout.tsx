export default function CasePracticeLayout({ children }: { children: React.ReactNode }) {


    // Load Poppins using next/font/google
    const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
    });

    return (
    <html lang="en" className={poppins.variable}>
        <body>
        {children}
        </body>
    </html>
    );
}