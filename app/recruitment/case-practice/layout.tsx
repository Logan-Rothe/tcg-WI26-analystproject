export default function CasePracticeLayout({ children }: { children: React.ReactNode }) {

    return (
    <html lang="en" className={poppins.variable}>
        <body>
        {children}
        </body>
    </html>
    );
}