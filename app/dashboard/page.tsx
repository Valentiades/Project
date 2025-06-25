'use client';
import { useState, useEffect, useRef } from 'react';
import {
    Router,
    HardDrive,
    LandPlot,
    Sun,
    Cloud,
    CloudRain,
    Thermometer,
    Droplets,
    MapPin,
    TrendingUp,
    TrendingDown,
    Search,
    X,
    Edit2,
    Trash2
    , Mail, Key, Image as ImageIcon, Building, CircuitBoard,
    UserCog, CheckCircle2, AlertCircle,
    User,
    Shield,
    Lock,
    Route
} from "lucide-react";
import '../styles/dashboard.css';
import StationPopup from '../components/StationToken';
import axios from 'axios';

interface Weather {
    Province: string;
    StationNameThai: string;
    Latitude: string;
    Longitude: string;
    Observation: {
        Temperature: string;
        RelativeHumidity: string;
        Rainfall: string;
        MaxTemperature: string;
        MinTemperature: string;
    };
}

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [editingStation, setEditingStation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editStationName, setEditStationName] = useState('');
    const [editStationArea, setEditStationArea] = useState('');
    const [weatherData, setWeatherData] = useState<Weather | null>(null);
    const [showStationPopup, setShowStationPopup] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: 'Jetsada',
        lastName: 'Srichanet',
        email: 'jetsada.sc@rmuti.ac.th',
        stationCount: 1,
        nodeCount: 12,
        role: 'user',
        joinDate: '2024-01-15',
        avatar: 'https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/509008281_1871247730395995_3046561106173517147_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEObFKmqBemTGSElhJj2aDvX54U4Oujs4lfnhTg66OziQZIr6rveD_9mRfBsT9xmLaA00ksqZ9AZKWWqwbSDx7A&_nc_ohc=139bM80a3nYQ7kNvwELC2u9&_nc_oc=AdlsTTbW70G4InUjIqQ2ZSinnDnTOEkoQp52I7bF-9ICaA4gd7sdZmFwFboekry26D5yYejFujWr_c6hWamHAnth&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=f8cLMSuto3Ch43RL2xbTNQ&oh=00_AfNCNrHfSE9Q7yt995Cod4fdwSfX3xkQ7UDxNahPBhYS3Q&oe=685EF36F'
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const stations = [
        {
            id: 1,
            name: 'Station 1',
            status: 'online',
            nodes: 12,
            area: 'แปลงผักบุ้ง',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 2,
            name: 'Station 2',
            status: 'offline',
            nodes: 4,
            area: 'แปลงผักคะน้า',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 3,
            name: 'Station 3',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 4,
            name: 'Station 4',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 5,
            name: 'Station 5',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 6,
            name: 'Station 6',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 7,
            name: 'Station 7',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 8,
            name: 'Station 8',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 9,
            name: 'Station 9',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        },
        {
            id: 10,
            name: 'Station 10',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
    ];

    const totalStations = stations.length;
    const totalNodes = stations.reduce((sum, station) => sum + station.nodes, 0);
    const onlineStations = stations.filter(station => station.status === 'online').length;
    const offlineStations = totalStations - onlineStations;

    const filteredStations = stations.filter(station =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ไอคอนสภาพอากาศ
    const getWeatherIcon = (temperature: string, rainfall: string) => {
        const temp = parseFloat(temperature);
        const rain = parseFloat(rainfall);

        if (rain > 0) {
            return <CloudRain size={32} className="weather-icon rain" />;
        } else if (temp > 35) {
            return <Sun size={32} className="weather-icon hot" />;
        } else if (temp < 20) {
            return <Cloud size={32} className="weather-icon cool" />;
        } else {
            return <Sun size={32} className="weather-icon normal" />;
        }
    };

    // สีตามอุณหภูมิ
    const getTemperatureColor = (temperature: string) => {
        const temp = parseFloat(temperature);
        if (temp > 35) return '#ff4444'; // แดง - ร้อนมาก
        if (temp > 30) return '#ff8800'; // ส้ม - ร้อน
        if (temp > 25) return '#ffdd00'; // เหลือง - อบอุ่น
        if (temp > 20) return '#4ade80'; // เขียว - เย็นสบาย
        return '#60a5fa'; // ฟ้า - เย็น
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // ตรวจสอบว่ามี station token หรือไม่
        const hasStationToken = localStorage.getItem('stationToken');
        if (!hasStationToken) {
            setShowStationPopup(true);
        }

        const fetchData = async () => {
            const res = await axios.get('/api/weather');
            setWeatherData(res.data)
        }
        fetchData();
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        console.log(weatherData)
    }, [weatherData])

    const handleEditProfile = () => {
        setIsProfileOpen(true);
    };

    const handleStationTokenSubmit = (token: string) => {
        localStorage.setItem('stationToken', token);
        setShowStationPopup(false);
    };

    const handleEditClick = (e: React.MouseEvent, station: { id: number; name: string; area: string }) => {
        e.stopPropagation();
        setEditingStation(station as any);
        setEditStationName(station.name || `Station : ${station.id}`);
        setEditStationArea(station.area || '');
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        // TODO: เพิ่มการบันทึกข้อมูลลง database
        setShowEditModal(false);
        setEditingStation(null);
        setEditStationName('');
        setEditStationArea('');
        showToast('บันทึกข้อมูล Station สำเร็จ', 'success');
    };

    const handleDeleteStation = () => {
        // TODO: เพิ่มการลบข้อมูลจาก database
        setShowEditModal(false);
        setEditingStation(null);
        setEditStationName('');
        setEditStationArea('');
        showToast('ลบ Station สำเร็จ', 'error');
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditingStation(null);
        setEditStationName('');
        setEditStationArea('');
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileData(prev => ({
                ...prev,
                profileImage: URL.createObjectURL(file)
            }));
        }
    };

    const handleProfileSave = () => {
        if (newPassword && newPassword !== confirmPassword) {
            showToast('รหัสผ่านไม่ตรงกัน', 'error');
            return;
        }
        // TODO: เพิ่มการบันทึกข้อมูลลง database
        setIsProfileOpen(false);
        showToast('บันทึกข้อมูลสำเร็จ', 'success');
    };

    return (
        <div className="dashboard-container">
            {showStationPopup && (
                <StationPopup onSubmit={handleStationTokenSubmit} />
            )}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h1>ยินดีต้อนรับ : แอดมินอ้น</h1>
                </div>
                <div className="dashboard-profile">
                    <button className='profile-btn' onClick={handleEditProfile}>
                        <img src="https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/509008281_1871247730395995_3046561106173517147_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEObFKmqBemTGSElhJj2aDvX54U4Oujs4lfnhTg66OziQZIr6rveD_9mRfBsT9xmLaA00ksqZ9AZKWWqwbSDx7A&_nc_ohc=139bM80a3nYQ7kNvwELC2u9&_nc_oc=AdlsTTbW70G4InUjIqQ2ZSinnDnTOEkoQp52I7bF-9ICaA4gd7sdZmFwFboekry26D5yYejFujWr_c6hWamHAnth&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=f8cLMSuto3Ch43RL2xbTNQ&oh=00_AfNCNrHfSE9Q7yt995Cod4fdwSfX3xkQ7UDxNahPBhYS3Q&oe=685EF36F" alt="#" />
                    </button>
                </div>
            </div>

            <div className="dashboard-layout">
                <div className="dashboard-side-panel">
                    <div className="dashboard-card">
                        <div className="dashboard-side-card device-card">
                            <h3>Station ทั้งหมด</h3>
                            <div className="dashboard-station-info">
                                <div className="dashboard-station-icon">
                                    <Router size={24} color="#4ADE80" />
                                </div>
                                <div className="dashboard-station-count">{totalStations}</div>
                            </div>
                        </div>

                        <div className="dashboard-side-card device-card">
                            <h3>Node ทั้งหมด</h3>
                            <div className="dashboard-station-info">
                                <div className="dashboard-station-icon">
                                    <HardDrive size={24} color="#4EA8DE" />
                                </div>
                                <div className="dashboard-station-count">{totalNodes}</div>
                            </div>
                        </div>
                    </div>
                    <div className="weather-section">
                        <div className="weather-header">
                            <h3>สภาพอากาศวันนี้</h3>
                            <div className="weather-time">
                                {currentTime.toLocaleTimeString('th-TH', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>
                        </div>

                        {weatherData ? (
                            <div className="weather-card">
                                <div className="weather-location">
                                    <div className="location-info">
                                        <MapPin size={16} className="location-icon" />
                                        <div className="location-text">
                                            <div className="station-name">{weatherData.StationNameThai}</div>
                                            <div className="province-name">อำเภอเมือง{weatherData.Province}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="weather-main">
                                    <div className="weather-icon-container">
                                        {getWeatherIcon(weatherData.Observation.Temperature, weatherData.Observation.Rainfall)}
                                    </div>
                                    <div className="temperature-main">
                                        <span
                                            className="temp-value"
                                            style={{ color: getTemperatureColor(weatherData.Observation.Temperature) }}
                                        >
                                            {weatherData.Observation.Temperature}
                                        </span>
                                        <span className="temp-unit">°C</span>
                                    </div>
                                </div>

                                <p className='clock'>อัพเดทล่าสุด 07:00 น.</p>

                                <div className="weather-details">
                                    <div className="weather-detail-row">
                                        <div className="wh-detail-item">
                                            <Droplets size={16} className="wh-detail-icon humidity" />
                                            <div className="wh-detail-content">
                                                <div className="wh-detail-label">ความชื้น</div>
                                                <div className="wh-detail-humidity">{weatherData.Observation.RelativeHumidity}%</div>
                                            </div>
                                        </div>
                                        <div className="wh-detail-item">
                                            <CloudRain size={16} className="wh-detail-icon rainfall" />
                                            <div className="wh-detail-content">
                                                <div className="wh-detail-label">ฝนตก</div>
                                                <div className="wh-detail-rainfall">{weatherData.Observation.Rainfall} mm</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="weather-minmax">
                                        <div className="minmax-item">
                                            <TrendingUp size={14} className="trend-icon max" />
                                            <span className="minmax-label">สูงสุด</span>
                                            <span className="minmax-value max">{weatherData.Observation.MaxTemperature}°</span>
                                        </div>
                                        <div className="minmax-item">
                                            <TrendingDown size={14} className="trend-icon min" />
                                            <span className="minmax-label">ต่ำสุด</span>
                                            <span className="minmax-value min">{weatherData.Observation.MinTemperature}°</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="weather-loading">
                                <div className="loading-spinner"></div>
                                <span>กำลังโหลดข้อมูลสภาพอากาศ...</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-station-container">
                    {filteredStations.map(station => (
                        <div
                            key={station.id}
                            className={`dashboard-station-card ${station.status}`}
                            onClick={() => window.location.href = `/device/station/${station.id}`}
                        >
                            <div className="dashboard-station-header">
                                <div className="dashboard-station-title">{station.name}</div>
                                <div className="dashboard-station-actions">
                                    <button className="edit-btn" onClick={(e) => handleEditClick(e, station)}>
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="dashboard-station-details">
                                <div className="dashboard-detail-item">
                                    <span className="dashboard-detail-label">Node:</span>
                                    <span className="dashboard-detail-value">{station.nodes}</span>
                                </div>
                                <div className="dashboard-detail-item">
                                    <span className="dashboard-detail-label">พื้นที่:</span>
                                    <span className="dashboard-detail-value">{station.area}</span>
                                </div>
                                <div className="dashboard-detail-item">
                                    <span className="dashboard-detail-label">สถานะ:</span>
                                    <span className={`dashboard-detail-value ${station.status === 'online' ? 'success' : 'offline'}`}>
                                        {station.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
                                    </span>
                                </div>
                            </div>

                            <div className="dashboard-station-footer">
                                <div className="dashboard-update-time">อัพเดทล่าสุด: {station.lastUpdate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isProfileOpen && (
                <div className="edit-modal-overlay" onClick={() => setIsProfileOpen(false)}>
                    <div className="edit-modal profile-modal" onClick={e => e.stopPropagation()}>
                        <div className="edit-modal-header">
                            <div className="modal-title">
                                <h2>แก้ไขข้อมูลผู้ใช้</h2>
                            </div>
                            <button className="close-btn" onClick={() => setIsProfileOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="edit-modal-content">
                            <div className="profile-image-section">
                                <div className="profile-image-container">
                                    <img src={profileData.avatar} alt="Profile" className="profile-preview" />
                                    <div className="image-overlay" onClick={() => fileInputRef.current?.click()}>
                                        <ImageIcon size={24} />
                                        <span>เปลี่ยนรูป</span>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>ชื่อ</label>
                                <input
                                    type="text"
                                    value={profileData.firstName}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>นามสกุล</label>
                                <input
                                    type="text"
                                    value={profileData.lastName}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>อีเมล</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="form-group">
                                <label>รหัสผ่านใหม่</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="ใส่รหัสผ่านใหม่หากต้องการเปลี่ยน"
                                />
                            </div>
                            <div className="form-group">
                                <label>ยืนยันรหัสผ่านใหม่</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="ยืนยันรหัสผ่านใหม่"
                                />
                            </div>
                            <div className="profile-stats">
                                <div className="stats-item">
                                    <div className="stats-label">
                                        <Router size={18} />
                                        <span>Station ทั้งหมด:</span>
                                    </div>
                                    <span className="stats-value">{profileData.stationCount}</span>
                                </div>
                                <div className="stats-item">
                                    <div className="stats-label">
                                        <HardDrive size={18} />
                                        <span>Node ทั้งหมด:</span>
                                    </div>
                                    <span className="stats-value">{profileData.nodeCount}</span>
                                </div>
                                <div className="stats-item">
                                    <div className="stats-label">
                                        <UserCog size={18} />
                                        <span>สถานะ:</span>
                                    </div>
                                    <span className="role-badge">
                                        {profileData.role === 'admin' ? (
                                            <><Shield size={14} /> ผู้ดูแลระบบ</>
                                        ) : (
                                            <><User size={14} /> ผู้ใช้งาน</>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="edit-modal-actions">
                                <button className="cancel-btn" onClick={() => setIsProfileOpen(false)}>ยกเลิก</button>
                                <button className="save-btn" onClick={handleProfileSave}>บันทึก</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            {showEditModal && (
                <div className="edit-modal-overlay" onClick={handleCloseModal}>
                    <div className="edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="edit-modal-header">
                            <div className="modal-title">
                                <h2>แก้ไขข้อมูล Station</h2>
                            </div>
                            <button className="close-btn" onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="edit-modal-content">
                            <div className="form-group">
                                <label>ชื่อ Station</label>
                                <input
                                    type="text"
                                    value={editStationName}
                                    onChange={(e) => setEditStationName(e.target.value)}
                                    placeholder="ระบุชื่อ Station"
                                />
                            </div>
                            <div className="form-group">
                                <label>ชื่อพื้นที่</label>
                                <input
                                    type="text"
                                    value={editStationArea}
                                    onChange={(e) => setEditStationArea(e.target.value)}
                                    placeholder="ระบุชื่อพื้นที่ เช่น สวนผักบุ้ง"
                                />
                            </div>
                            <div className="edit-modal-actions">
                                <button className="delete-btn" onClick={handleDeleteStation}>
                                    <Trash2 size={20} />
                                    ลบ Station
                                </button>
                                <div>
                                    <button className="cancel-btn" onClick={handleCloseModal}>ยกเลิก</button>
                                    <button className="save-btn" onClick={handleSaveEdit}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast.show && (
                <div className={`dh-toast ${toast.type === 'success' ? 'dh-toast-success' : 'dh-toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};