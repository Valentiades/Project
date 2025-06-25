import '../styles/sidebar.css';
import Sidebar from '../components/sidebar';

export default function DatatableLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sidebar-section">
            <Sidebar />
            {children}
        </div>
    );
}

