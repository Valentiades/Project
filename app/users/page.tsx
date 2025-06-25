'use client';

import { useState } from 'react';
import {
    Pencil,
    Trash2,
    User,
    Save,
    X,
    Shield,
    Calendar,
    Router,
    HardDrive,
    Mail,
    Search
} from 'lucide-react';
import '../styles/uses.css';

export default function UsersPage() {
    interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        stationCount: number;
        nodeCount: number;
        role: 'user' | 'admin';
        joinDate: string;
        avatar?: string;
    }

    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            firstName: 'Jetsada',
            lastName: 'Srichanet',
            email: 'jetsada.sc@rmuti.ac.th',
            stationCount: 1,
            nodeCount: 12,
            role: 'admin',
            joinDate: '2024-01-15',
            avatar: 'https://scontent.fkkc4-1.fna.fbcdn.net/v/t39.30808-6/481831425_1788380978682671_650266796413665363_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFVIbN-psxZg_dHjgOfbvx1lyGacGpFqcWXIZpwakWpxcndrWCxHyM29ppvaXtcuVJ1sHZ6VqxDWT85WSJtqeoC&_nc_ohc=NErEjf_n-EoQ7kNvwHR2zHg&_nc_oc=AdmNM7JQ_RbTy2oVL3_NrGfHXjWZiARloC65e0U0dPVjWLAhm4EUrZ8p15Tj3hGJOAug7RzwdasjXtFj1j7GP5bC&_nc_zt=23&_nc_ht=scontent.fkkc4-1.fna&_nc_gid=4B-2A3BSTNDALrpqgUYY3w&oh=00_AfN0-Gj1YyGQWeibMWcwlKzZbg8XETdSybdi9MuV4LHFHQ&oe=684F6199'
        },
        {
            id: 2,
            firstName: 'Nattawat',
            lastName: 'Phongoon',
            email: 'nattawat.pg@rmuti.ac.th',
            stationCount: 2,
            nodeCount: 24,
            role: 'user',
            joinDate: '2024-02-20',
            avatar: 'https://scontent.fkkc4-1.fna.fbcdn.net/v/t39.30808-6/448908750_2122679684768544_4588103373257837198_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGzOl8VWXav4pZfgdzwHw-m21-ACJmkn1rbX4AImaSfWuJrZbILX4hQQrT2ETxZ43-9JFHLohQSy6Pr6_8wPdvZ&_nc_ohc=1hr76B3hq6MQ7kNvwHaG3cv&_nc_oc=Adn97gRwYCYk4dwzIaOlZp0tnuKDHb3QdqY_UiocPbt2jKCByLAakHCP312Yo74RPYPtsM1ivWz0j7O9p0xESogz&_nc_zt=23&_nc_ht=scontent.fkkc4-1.fna&_nc_gid=B4VIOrTTy3mPh9laWjJ-cA&oh=00_AfMXIK17WXW8Ca5NbP1gAI8C5Dzq0EjepPweLZHgdWMXrw&oe=684F7C21'
        },
        {
            id: 3,
            firstName: 'Pakorn',
            lastName: 'Singkajan',
            email: 'pakorn.sk@rmuti.ac.th',
            stationCount: 3,
            nodeCount: 36,
            role: 'user',
            joinDate: '2024-03-10',
            avatar: 'https://scontent.fkkc4-1.fna.fbcdn.net/v/t39.30808-6/488405329_2089316924826696_7448747501553913987_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFZq5MxdB2Go7V-DUbZP7nLK9ykqo88oE8r3KSqjzygT6-GJW39TPUPNG9WE2VSdcAjlmH06BRYLFPUBor_HUlh&_nc_ohc=Vy3jZ2wkyTkQ7kNvwGadatY&_nc_oc=AdktEsBzCkwsnjz6ZK84sqUAUrWNxoXBe_GUW1q7ZGRdAa_GikcAZ1gWdASOWPbX-dVZTPcNO548g6elmY3MNzBI&_nc_zt=23&_nc_ht=scontent.fkkc4-1.fna&_nc_gid=jID8nuTXp_Y-ltBobCudew&oh=00_AfPyFWbw40Jk1QCiKLzJht6GGrwSekJAKVQ8oLo1nkk_nQ&oe=684F6DE3'
        },
        {
            id: 4,
            firstName: 'Somchai',
            lastName: 'Jaidee',
            email: 'somchai.jd@rmuti.ac.th',
            stationCount: 1,
            nodeCount: 8,
            role: 'user',
            joinDate: '2024-04-05',
        },
        {
            id: 5,
            firstName: 'Siriporn',
            lastName: 'Namthip',
            email: 'siriporn.nt@rmuti.ac.th',
            stationCount: 2,
            nodeCount: 16,
            role: 'admin',
            joinDate: '2024-01-20',
        },
        {
            id: 6,
            firstName: 'Krit',
            lastName: 'Suwan',
            email: 'krit.sw@rmuti.ac.th',
            stationCount: 1,
            nodeCount: 6,
            role: 'user',
            joinDate: '2024-05-12',
        },
        {
            id: 7,
            firstName: 'Malee',
            lastName: 'Ploypech',
            email: 'malee.pp@rmuti.ac.th',
            stationCount: 3,
            nodeCount: 30,
            role: 'user',
            joinDate: '2024-03-25',
        },
        {
            id: 8,
            firstName: 'Wichai',
            lastName: 'Kamkaew',
            email: 'wichai.kk@rmuti.ac.th',
            stationCount: 2,
            nodeCount: 20,
            role: 'admin',
            joinDate: '2024-02-10',
        },
        {
            id: 9,
            firstName: 'Apinya',
            lastName: 'Thongsuk',
            email: 'apinya.ts@rmuti.ac.th',
            stationCount: 1,
            nodeCount: 10,
            role: 'user',
            joinDate: '2024-04-18',
        },
        {
            id: 10,
            firstName: 'Chanon',
            lastName: 'Boonmee',
            email: 'chanon.bm@rmuti.ac.th',
            stationCount: 4,
            nodeCount: 40,
            role: 'user',
            joinDate: '2024-05-02',
        },
        {
            id: 11,
            firstName: 'Suda',
            lastName: 'Kaewta',
            email: 'suda.kt@rmuti.ac.th',
            stationCount: 2,
            nodeCount: 18,
            role: 'admin',
            joinDate: '2024-03-08',
        },
        {
            id: 12,
            firstName: 'Preecha',
            lastName: 'Saengthong',
            email: 'preecha.st@rmuti.ac.th',
            stationCount: 1,
            nodeCount: 14,
            role: 'user',
            joinDate: '2024-05-20',
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Reset to first page when search term changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleEdit = (user: User) => {
        setSelectedUser({ ...user });
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleView = (user: User) => {
        setSelectedUser(user);
        setModalMode('view');
        setIsModalOpen(true);
    };

    const handleDeleteClick = (userId: number) => {
        setUserToDelete(userId);
        setShowConfirmDelete(true);
    };

    const handleDelete = () => {
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== userToDelete));
            showToast('ลบผู้ใช้สำเร็จ', 'error');
            setShowConfirmDelete(false);
            setUserToDelete(null);

            // Adjust current page if necessary
            const newFilteredUsers = users.filter(user => user.id !== userToDelete).filter(user =>
                user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const newTotalPages = Math.ceil(newFilteredUsers.length / itemsPerPage);
            if (currentPage > newTotalPages && newTotalPages > 0) {
                setCurrentPage(newTotalPages);
            }
        }
    };

    const handleSave = () => {
        if (selectedUser) {
            setUsers(users.map(user =>
                user.id === selectedUser.id ? selectedUser : user
            ));
            showToast('บันทึกข้อมูลสำเร็จ', 'success');
            setIsModalOpen(false);
            setSelectedUser(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const closeConfirmModal = () => {
        setShowConfirmDelete(false);
        setUserToDelete(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Pagination handlers
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="users-container">
            {/* Header */}
            <div className="users-header">
                <h1 className="users-title">จัดการผู้ใช้
                    <div className="users-count">
                        <User size={16} />
                        <span className='users-total'>
                            ผู้ใช้ทั้งหมด: {filteredUsers.length} คน
                            {searchTerm && ` (จากทั้งหมด ${users.length} คน)`}
                        </span>
                    </div>
                </h1>
                <div className="us-header-actions">
                    <div className="us-search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ นามสกุล หรืออีเมล..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="users-table-container">
                <div className="table-scroll">
                    <table className="users-table">
                        <thead className="table-thead">
                            <tr>
                                <th className="table-th">ผู้ใช้</th>
                                <th className="table-th table-th-center">Station</th>
                                <th className="table-th table-th-center">Node</th>
                                <th className="table-th table-th-center">บทบาท</th>
                                <th className="table-th table-th-center">วันที่สมัคร</th>
                                <th className="table-th table-th-center">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody className="table-tbody">
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="table-td">
                                            <div className="user-info">
                                                <div className="user-avatar">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            alt={`${user.firstName} ${user.lastName}`}
                                                        />
                                                    ) : (
                                                        `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="user-name">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className="user-email">
                                                        <Mail size={16} />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-td table-td-center">
                                            <div className="badge badge-station">
                                                {user.stationCount}
                                                <Router size={24} />
                                            </div>
                                        </td>
                                        <td className="table-td table-td-center">
                                            <div className="badge badge-node">
                                                {user.nodeCount}
                                                <HardDrive size={24} />
                                            </div>
                                        </td>
                                        <td className="table-td table-td-center">
                                            <div className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                                                {user.role === 'admin' ? <Shield size={24} /> : <User size={24} />}
                                                {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้งาน'}
                                            </div>
                                        </td>
                                        <td className="table-td table-td-center">
                                            <div className="date-info">
                                                <Calendar size={24} />
                                                {formatDate(user.joinDate)}
                                            </div>
                                        </td>
                                        <td className="table-td table-td-center">
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="btn btn-edit"
                                                >
                                                    <Pencil size={16} />
                                                    แก้ไข
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(user.id)}
                                                    className="btn btn-delete"
                                                >
                                                    <Trash2 size={16} />
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="table-td table-td-center">
                                        <div style={{ padding: '2rem', color: '#666' }}>
                                            {searchTerm ? 'ไม่พบผู้ใช้ที่ค้นหา' : 'ไม่มีข้อมูลผู้ใช้'}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
                <div className="users-pagination">
                    
                    <button
                        onClick={goToPrevious}
                        disabled={currentPage === 1}
                        className="us-page-button"
                    >
                        ก่อนหน้า
                    </button>

                    <span className="us-page-info">
                        หน้า {currentPage} จาก {totalPages}
                    </span>

                    <button
                        onClick={goToNext}
                        disabled={currentPage === totalPages}
                        className="us-page-button"
                    >
                        ถัดไป
                    </button>
                </div>
            )}

            {/* Edit/View Modal */}
            {isModalOpen && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {modalMode === 'view' ? 'ข้อมูลผู้ใช้' : 'แก้ไขข้อมูลผู้ใช้'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="modal-close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-avatar-container">
                                <div className="modal-avatar">
                                    {selectedUser.avatar ? (
                                        <img
                                            src={selectedUser.avatar}
                                            alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                        />
                                    ) : (
                                        `${selectedUser.firstName.charAt(0)}${selectedUser.lastName.charAt(0)}`
                                    )}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">ชื่อ</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={selectedUser.firstName}
                                        onChange={(e) => {
                                            setSelectedUser({
                                                ...selectedUser,
                                                firstName: e.target.value
                                            });
                                        }}
                                        readOnly={modalMode === 'view'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">นามสกุล</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={selectedUser.lastName}
                                        onChange={(e) => {
                                            setSelectedUser({
                                                ...selectedUser,
                                                lastName: e.target.value
                                            });
                                        }}
                                        readOnly={modalMode === 'view'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">อีเมล</label>
                                    <input
                                        type="email"
                                        className="form-input"
                                        value={selectedUser.email}
                                        onChange={(e) => {
                                            setSelectedUser({
                                                ...selectedUser,
                                                email: e.target.value
                                            });
                                        }}
                                        readOnly={modalMode === 'view'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">บทบาท</label>
                                    <select
                                        className="form-select"
                                        value={selectedUser.role}
                                        onChange={(e) => {
                                            setSelectedUser({
                                                ...selectedUser,
                                                role: e.target.value as 'user' | 'admin'
                                            });
                                        }}
                                        disabled={modalMode === 'view'}
                                    >
                                        <option value="user">ผู้ใช้งาน</option>
                                        <option value="admin">ผู้ดูแลระบบ</option>
                                    </select>
                                </div>

                                <div className="form-grid-2">
                                    <div className="form-group">
                                        <label className="form-label">จำนวน Station</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={selectedUser.stationCount}
                                            readOnly
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">จำนวน Node</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={selectedUser.nodeCount}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">วันที่สมัครบัญชี</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formatDate(selectedUser.joinDate)}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={closeModal}
                                className="btn btn-secondary"
                            >
                                {modalMode === 'view' ? 'ปิด' : 'ยกเลิก'}
                            </button>
                            {modalMode === 'edit' && (
                                <button
                                    onClick={handleSave}
                                    className="btn btn-primary"
                                >
                                    <Save size={16} />
                                    บันทึก
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showConfirmDelete && (
                <div className="modal-overlay">
                    <div className="confirm-modal">
                        <div className="confirm-content">
                            <div className="confirm-icon">
                                <Trash2 size={32} />
                            </div>
                            <h2 className="confirm-title">ยืนยันการลบผู้ใช้</h2>
                            <p className="confirm-message">
                                คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้? <br />การดำเนินการนี้ไม่สามารถยกเลิกได้
                            </p>

                            <div className="confirm-actions">
                                <button
                                    onClick={closeConfirmModal}
                                    className="btn btn-secondary"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="btn btn-delete"
                                >
                                    <Trash2 size={16} />
                                    ลบผู้ใช้
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}