'use client';
import React, { useState, useRef } from 'react';
import {
    Home, Sprout, BarChart2, Database, Settings,
    LogOut, Book, Server, User, HelpCircle,
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
    Sheet, PanelRightClose, PanelLeftClose, Router, HardDrive,
    Wrench, X, Image, Edit2
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/sidebar.css';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [deviceMenuOpen, setDeviceMenuOpen] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileImage, setProfileImage] = useState('/default-avatar.png');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const patname = usePathname();

    const isActive = (path: string) => patname === path;

    const handleLogout = () => {
        console.log('Logging out...');
    };

    const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success('บันทึกข้อมูลสำเร็จ');
        setShowProfileModal(false);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div
                className={`sidebar-toggle ${collapsed ? 'collapsed' : 'expanded'}`}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
            </div>

            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-image">
                        <img src="/logo-png/green.png" alt="Logo" />
                    </div>
                    {!collapsed && (
                        <div className="logo-text">
                            <h3>ระบบเก็บข้อมูลสุขภาพดิน<br />สำหรับเกษตรกรการปลูกพืชผัก</h3>
                        </div>
                    )}
                </div>
            </div>

            <div className="sidebar-menu">
                <ul>
                    <li className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => router.push('/dashboard')}>
                        <div className="menu-link">
                            <Home size={collapsed ? 24 : 20} />
                            {!collapsed && <span>หน้าหลัก</span>}
                            {collapsed && <div className="tooltip">หน้าหลัก</div>}
                        </div>
                    </li>

                    <li className={`menu-item ${isActive('/fertilizer') ? 'active' : ''}`} onClick={() => router.push('/fertilizer')}>
                        <div className="menu-link">
                            <Sprout size={collapsed ? 24 : 20} />
                            {!collapsed && <span>แนะนำการใช้ปุ๋ย</span>}
                            {collapsed && <div className="tooltip">แนะนำการใช้ปุ๋ย</div>}
                        </div>
                    </li>
                    <li className={`menu-item ${isActive('/data-table') ? 'active' : ''}`} onClick={() => router.push('/data-table')}>
                        <div className="menu-link">
                            <Sheet size={collapsed ? 24 : 20} />
                            {!collapsed && <span>ตารางข้อมูล</span>}
                            {collapsed && <div className="tooltip">ตารางข้อมูล</div>}
                        </div>
                    </li>

                    <li className={`menu-item ${isActive('/device') ? 'active' : ''}`} onClick={() => router.push('/device')}>
                        <div className="menu-link">
                            <Wrench size={collapsed ? 24 : 20} />
                            {!collapsed && <span>จัดการอุปกรณ์</span>}
                            {collapsed && <div className="tooltip">จัดการอุปกรณ์</div>}
                        </div>
                    </li>

                    {/* <li className={`menu-item ${deviceMenuOpen ? 'open' : ''}`}>
                        <div className="menu-link" onClick={() => setDeviceMenuOpen(!deviceMenuOpen)}>
                            <Settings size={collapsed ? 24 : 20} />
                            {!collapsed && (
                                <>
                                    <span>จัดการอุปกรณ์</span>
                                    <span className="submenu-toggle">
                                        {deviceMenuOpen ? <ChevronDown size={16} /> : <ChevronDown size={16} />}
                                    </span>
                                </>
                            )}
                            {collapsed && <div className="tooltip">จัดการอุปกรณ์</div>}
                        </div>

                        
                        {collapsed && (
                            <div className={`collapsed-submenu ${deviceMenuOpen ? 'open' : ''}`}>
                                <div className="submenu-item-collapsed">
                                    <div className="menu-link">
                                        <Router size={20} />
                                        <div className="tooltip submenu-tooltip">Station</div>
                                    </div>
                                </div>
                                <div className="submenu-item-collapsed">
                                    <div className="menu-link">
                                        <Server size={20} />
                                        <div className="tooltip submenu-tooltip">Node</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!collapsed && (
                            <ul className={`submenu ${deviceMenuOpen ? 'open' : ''}`}>
                                <li className="submenu-item">
                                    <div className="menu-link">
                                        <Book size={18} />
                                        <span>Station</span>
                                    </div>
                                </li>
                                <li className="submenu-item">
                                    <div className="menu-link">
                                        <Server size={18} />
                                        <span>Node</span>
                                    </div>
                                </li>
                            </ul>
                        )}
                    </li> */}

                    <li className={`menu-item ${isActive('/users') ? 'active' : ''}`} onClick={() => router.push('/users')}>
                        <div className="menu-link">
                            <User size={collapsed ? 24 : 20} />
                            {!collapsed && <span>จัดการผู้ใช้งาน</span>}
                            {collapsed && <div className="tooltip">จัดการผู้ใช้งาน</div>}
                        </div>
                    </li>
                    {/* <li className={`menu-item ${isActive('/setting') ? 'active' : ''}`} onClick={() => router.push('/setting')}>
                        <div className="menu-link">
                            <Settings size={collapsed ? 24 : 20} />
                            {!collapsed && <span>ตั้งค่า</span>}
                            {collapsed && <div className="tooltip">ตั้งค่า</div>}
                        </div>
                    </li> */}
                    <li className={`menu-item ${isActive('/support') ? 'active' : ''}`} onClick={() => router.push('/support')}>
                        <div className="menu-link">
                            <HelpCircle size={collapsed ? 24 : 20} />
                            {!collapsed && <span>ติดต่อผู้ดูแล</span>}
                            {collapsed && <div className="tooltip">ติดต่อผู้ดูแล</div>}
                        </div>
                    </li>
                </ul>
            </div>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={() => router.push('/auth')}>
                    <LogOut size={collapsed ? 24 : 20} />
                    {!collapsed && <span>ออกจากระบบ</span>}
                    {collapsed && <div className="tooltip logout-tooltip">ออกจากระบบ</div>}
                </button>
            </div>
        </div>
    );
}