import "./globals.css";

export const metadata = {
    title: "معهد الحمد - حفظ القرآن الكريم",
    description: "معهد الحمد - مركز تعليم القرآن الكريم والعلوم الشرعية",
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body className={`antialiased`}>{children}</body>
        </html>
    );
}
