import { Poppins } from 'next/font/google';
import '../styles/globals.css'; // ✅ Correct path

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata = {
    title: 'FocusFlo',
    description: 'Simple Task Management App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
