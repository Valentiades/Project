import '../styles/sidebar.css';
import Sidebar from '../components/sidebar';

export default function DeviceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="sidebar-section">
            <Sidebar />
            {children}
        </div>
    );
}

