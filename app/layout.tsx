import { Kanit } from 'next/font/google';
import './globals.css';
import Loading from './components/loading';

const kanit = Kanit({
  weight: '400',
  subsets: ['thai', 'latin'],
});

export const metadata = {
  title: 'SHDMS',
  description: 'ระบบเก็บข้อมูลสุขภาพดิน',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={kanit.className}>
        <Loading>{children}</Loading>
      </body>
    </html>
  );
}
