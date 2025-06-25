import type { Metadata } from 'next';
import { Kanit, Sarabun } from 'next/font/google';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}