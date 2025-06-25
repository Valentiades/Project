import '../styles/sidebar.css';
import Sidebar from '../components/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sidebar-section">
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
