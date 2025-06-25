'use client';
import { useState } from 'react';
import { Search, Settings, Bell, Router, HardDrive, Plus, Edit2, X, Trash2, ChartArea } from 'lucide-react';
import '../styles/device.css';

export default function DevicePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [editingStation, setEditingStation] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [stationName, setStationName] = useState('');
    const [stationArea, setStationArea] = useState('');
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

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
        }
        ,
        {
            id: 4,
            name: 'Station 4',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
        ,
        {
            id: 5,
            name: 'Station 5',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
        ,
        {
            id: 6,
            name: 'Station 6',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
        ,
        {
            id: 7,
            name: 'Station 7',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
        ,
        {
            id: 8,
            name: 'Station 8',
            status: 'offline',
            nodes: 4,
            area: 'แปลงหน้าบ้าน',
            lastUpdate: '14:30:00 น.'
        }
    ];

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const filteredStations = stations.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>, station: any) => {
        e.stopPropagation();
        setEditingStation(station);
        setStationName(station.name || `Station : ${station.id}`);
        setStationArea(station.area || '');
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        // TODO: เพิ่มการบันทึกข้อมูลลง database
        setShowEditModal(false);
        setEditingStation(null);
        showToast('บันทึกข้อมูล Station สำเร็จ', 'success');
    };

    const handleAddStation = () => {
        // TODO: เพิ่มการบันทึก station ใหม่ลง database
        setShowAddModal(false);
        setStationName('');
        setStationArea('');
        showToast('เพิ่ม Station สำเร็จ', 'success');
    };

    const handleDeleteStation = () => {
        // TODO: เพิ่มการลบ station ออกจาก database
        setShowEditModal(false);
        setEditingStation(null);
        showToast('ลบ Station สำเร็จ', 'success');
    };

    return (
        <div className="device-container">
            <div className="device-header">
                <div className="device-title">
                    <h1>จัดการอุปกรณ์</h1>
                </div>
                <div className="header-actions">
                    <div className="device-search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="ค้นหา Station..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="device-overview">
                <div className="overview-card total-stations">
                    <div className="overview-icon">
                        <Router size={24} />
                    </div>
                    <div className="overview-info">
                        <span className="overview-label">Station ทั้งหมด</span>
                        <span className="overview-value">3</span>
                    </div>
                </div>

                <div className="overview-card total-nodes">
                    <div className="overview-icon">
                        <HardDrive size={24} />
                    </div>
                    <div className="overview-info">
                        <span className="overview-label">Node ทั้งหมด</span>
                        <span className="overview-value">20</span>
                    </div>
                </div>
            </div>

            <div className="section-header">
                <h2>Station ทั้งหมด</h2>
                <button className="add-button" onClick={() => setShowAddModal(true)}>
                    <Plus size={20} />
                    เพิ่ม Station
                </button>
            </div>

            <div className="stations-grid">
                {filteredStations.map(station => (
                    <div
                        key={station.id}
                        className={`dv-station-card ${station.status}`}
                        onClick={() => window.location.href = `/device/station/${station.id}`}
                    >
                        <div className="dv-station-header">
                            <div className="dv-station-title">{station.name}</div>
                            <div className="dv-station-actions">
                                <button className="dv-edit-btn" onClick={(e) => handleEditClick(e, station)}>
                                    <Edit2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="dv-station-details">
                            <div className="dv-detail-item">
                                <span className="dv-detail-label">Node:</span>
                                <span className="dv-detail-value">{station.nodes}</span>
                            </div>
                            <div className="dv-detail-item">
                                <span className="dv-detail-label">พื้นที่:</span>
                                <span className="dv-detail-value">{station.area}</span>
                            </div>
                            <div className="dv-detail-item">
                                <span className="dv-detail-label">สถานะ:</span>
                                <span className={`dv-detail-value ${station.status === 'online' ? 'success' : 'offline'}`}>
                                    {station.status === 'online' ? 'ออนไลน์' : 'ออฟไลน์'}
                                </span>
                            </div>
                        </div>

                        <div className="dv-station-footer">
                            <div className="dv-update-time">อัพเดทล่าสุด: {station.lastUpdate}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal แก้ไข Station */}
            {showEditModal && (
                <div className="dv-edit-modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="dv-edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="dv-edit-modal-header">
                            <h2>แก้ไขข้อมูล Station</h2>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="dv-edit-modal-content">
                            <div className="dv-form-group">
                                <label>ชื่อ Station</label>
                                <input
                                    type="text"
                                    value={stationName}
                                    onChange={(e) => setStationName(e.target.value)}
                                    placeholder="ระบุชื่อ Station"
                                />
                            </div>
                            <div className="dv-form-group">
                                <label>ชื่อพื้นที่</label>
                                <input
                                    type="text"
                                    value={stationArea}
                                    onChange={(e) => setStationArea(e.target.value)}
                                    placeholder="ระบุชื่อพื้นที่ เช่น สวนผักบุ้ง"
                                />
                            </div>
                            <div className="dv-edit-modal-actions">
                                <button className="delete-btn" onClick={handleDeleteStation}>
                                    <Trash2 size={20} />
                                    ลบ Station
                                </button>
                                <div>
                                    <button className="cancel-btn" onClick={() => setShowEditModal(false)}>ยกเลิก</button>
                                    <button className="save-btn" onClick={handleSaveEdit}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal เพิ่ม Station */}
            {showAddModal && (
                <div className="dv-edit-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="dv-edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="dv-edit-modal-header">
                            <h2>เพิ่ม Station</h2>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="dv-edit-modal-content">
                            <div className="dv-form-group">
                                <label>ชื่อ Station</label>
                                <input
                                    type="text"
                                    value={stationName}
                                    onChange={(e) => setStationName(e.target.value)}
                                    placeholder="ระบุชื่อ Station"
                                />
                            </div>
                            <div className="dv-form-group">
                                <label>ชื่อพื้นที่</label>
                                <input
                                    type="text"
                                    value={stationArea}
                                    onChange={(e) => setStationArea(e.target.value)}
                                    placeholder="ระบุชื่อพื้นที่ เช่น สวนผักบุ้ง"
                                />
                            </div>
                            <div className="dv-edit-modal-actions">
                                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>ยกเลิก</button>
                                <button className="save-btn" onClick={handleAddStation}>บันทึก</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Toast Notification */}
            {toast.show && (
                <div className={`dv-toast ${toast.type === 'success' ? 'dv-toast-success' : 'dv-toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}