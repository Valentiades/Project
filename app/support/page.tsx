'use client';

import { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/support.css';
import {
    Mail,
    Phone,
    MessageSquare,
    Send,
    Image,
    ThumbsUp,
    X,
    ExternalLink,
    MoreVertical,
    Edit2,
    Trash2
} from 'lucide-react';

interface Post {
    id: string;
    userId: string;
    userName: string;
    content: string;
    image?: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
    createdAt: string;
}

interface Comment {
    id: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}

export default function Support() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [newComment, setNewComment] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
    const [showStationPopup, setShowStationPopup] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handlePost = () => {
        if (!newPost.trim()) {
            showToast('กรุณากรอกข้อความ', 'error');
            return;
        }

        const post: Post = {
            id: Date.now().toString(),
            userId: 'user123',
            userName: 'คุณ',
            content: newPost,
            image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
            likes: 0,
            liked: false,
            comments: [],
            createdAt: new Date().toLocaleString()
        };

        setPosts([post, ...posts]);
        setNewPost('');
        setSelectedImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        showToast('โพสต์สำเร็จ', 'success');
    };

    const handleLike = (postId: string, e?: React.MouseEvent) => {
        // ป้องกันการเปิดโพสต์เมื่อกดไลค์
        if (e) {
            e.stopPropagation();
        }

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                    liked: !post.liked
                };
            }
            return post;
        }));
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
                    liked: !prev.liked
                }
            })
        }
    };

    const handleComment = (postId: string) => {
        if (!newComment.trim()) {
            showToast('กรุณากรอกความคิดเห็น', 'error');
            return;
        }

        const newCommentObj = {
            id: Date.now().toString(),
            userId: 'user123',
            userName: 'คุณ',
            content: newComment,
            createdAt: new Date().toLocaleString()
        };

        // อัพเดทข้อมูลทั้งใน posts และ selectedPost
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, newCommentObj]
                };
            }
            return post;
        }));

        // อัพเดท selectedPost ถ้ามีการเปิดโมดัลอยู่
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost({
                ...selectedPost,
                comments: [...selectedPost.comments, newCommentObj]
            });
        }

        setNewComment('');
        showToast('ความคิดเห็นถูกเพิ่มแล้ว', 'success');
    };

    // ฟังก์ชันลบคอมเมนต์
    const handleDeleteComment = (postId: string, commentId: string) => {
        // อัพเดทข้อมูลใน posts
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.filter(comment => comment.id !== commentId)
                };
            }
            return post;
        }));

        // อัพเดท selectedPost ถ้ามีการเปิดโมดัลอยู่
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost({
                ...selectedPost,
                comments: selectedPost.comments.filter(comment => comment.id !== commentId)
            });
        }

        showToast('ความคิดเห็นถูกลบแล้ว', 'success');
    };

    // เพิ่มฟังก์ชันสำหรับแสดงรูปภาพแบบเต็มจอ
    const handleImageClick = (imageUrl: string) => {
        setFullscreenImage(imageUrl);
    };

    const [editingPost, setEditingPost] = useState<string | null>(null);
    const [editContent, setEditContent] = useState('');
    const [showMenu, setShowMenu] = useState<string | null>(null);

    const handleEditPost = (postId: string) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            setEditContent(post.content);
            setEditingPost(postId);
        }
        setShowMenu(null);
    };

    const handleSaveEdit = (postId: string) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    content: editContent
                };
            }
            return post;
        }));
        setEditingPost(null);
        setEditContent('');
        showToast('โพสต์ถูกแก้ไขแล้ว', 'success');
    };

    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const handleDeletePost = (postId: string) => {
        setShowDeleteConfirm(postId);
        setShowMenu(null);
    };

    // ฟังก์ชันตรวจสอบว่าผู้ใช้สามารถลบคอมเมนต์ได้หรือไม่
    const canDeleteComment = (postUserId: string, commentUserId: string) => {
        const currentUserId = 'user123'; // ID ของผู้ใช้ปัจจุบัน
        return postUserId === currentUserId || commentUserId === currentUserId;
    };

    return (
        <div className="support-container">
            <div className="support-header">
                <h1>ติดต่อผู้ดูแลระบบ</h1>
                <div className="admin-contacts">
                    <div className="admin-contact">
                        <Mail className="icon" />
                        <span>shdms.6a@gmail.com</span>
                    </div>
                    <div className="admin-contact">
                        <Phone className="icon" />
                        <span>011-111-1111</span>
                    </div>
                </div>
            </div>

            <div className="post-form">
                <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="เขียนข้อความของคุณที่นี่..."
                />
                <div className="post-actions">
                    <div className="file-input">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            ref={fileInputRef}
                            hidden
                        />
                        <button
                            className="btn btn-secondary"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Image size={18} />
                            เพิ่มรูปภาพ
                        </button>
                        {selectedImage && (
                            <span className="file-name">{selectedImage.name}</span>
                        )}
                    </div>
                    <button className="btn btn-primary" onClick={handlePost}>
                        <Send size={18} />
                        โพสต์
                    </button>
                </div>
            </div>

            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post-card" onClick={() => setSelectedPost(post)}>
                        <div className="post-header">
                            <div className="post-user-info">
                                <span className="username">{post.userName}</span>
                                <span className="timestamp">{post.createdAt}</span>
                            </div>
                            <div className="post-menu">
                                <button
                                    className="btn-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMenu(showMenu === post.id ? null : post.id);
                                    }}
                                >
                                    <MoreVertical size={20} />
                                </button>
                                {showMenu === post.id && (
                                    <div className="menu-dropdown">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditPost(post.id);
                                        }}>
                                            <Edit2 size={16} />
                                            แก้ไข
                                        </button>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeletePost(post.id);
                                        }}>
                                            <Trash2 size={16} />
                                            ลบ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {editingPost === post.id ? (
                            <div className="edit-form" onClick={e => e.stopPropagation()}>
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="แก้ไขข้อความ..."
                                />
                                <div className="edit-actions">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setEditingPost(null)}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleSaveEdit(post.id)}
                                    >
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="post-content">{post.content}</p>
                                {post.image && (
                                    <div className="post-image-container">
                                        <img
                                            src={post.image}
                                            alt="Post attachment"
                                            className="post-image"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        <div className="post-footer">
                            <button
                                className={`btn-stat ${post.liked ? 'liked' : ''}`}
                                onClick={(e) => handleLike(post.id, e)}
                            >
                                <ThumbsUp size={16} />
                                <span>{post.likes}</span>
                            </button>
                            <button
                                className="btn-stat"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPost(post);
                                }}
                            >
                                <MessageSquare size={16} />
                                <span>{post.comments.length}</span>
                            </button>
                            <button
                                className="btn-stat"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPost(post);
                                }}
                            >
                                <ExternalLink size={16} />
                                <span>ดูเพิ่มเติม</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPost && (
                <div className="sp-modal-overlay" onClick={() => setSelectedPost(null)}>
                    <div className="post-modal" onClick={e => e.stopPropagation()}>
                        <div className="sp-modal-header">
                            <div className="post-user-info">
                                <span className="username">{selectedPost.userName}</span>
                                <span className="timestamp">{selectedPost.createdAt}</span>
                            </div>
                            <button
                                className="btn-icon"
                                onClick={() => setSelectedPost(null)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="sp-modal-content">
                            <p className="post-content">{selectedPost.content}</p>
                            {selectedPost.image && (
                                <div
                                    className="post-image-container"
                                    onClick={() => handleImageClick(selectedPost.image!)}
                                >
                                    <img
                                        src={fullscreenImage || selectedPost.image}
                                        alt="Post attachment"
                                        className="post-image"
                                    />
                                </div>
                            )}

                            <div className="post-stats">
                                <button
                                    className={`btn-stat ${selectedPost.liked ? 'liked' : ''}`}
                                    onClick={() => handleLike(selectedPost.id)}
                                >
                                    <ThumbsUp size={16} />
                                    <span>{selectedPost.likes}</span>
                                </button>
                                <div className="comments-count">
                                    <MessageSquare size={16} />
                                    <span>{selectedPost.comments.length} ความคิดเห็น</span>
                                </div>
                            </div>

                            {fullscreenImage && (
                                <div
                                    className="fullscreen-image-overlay"
                                    onClick={() => setFullscreenImage(null)}
                                >
                                    <img
                                        src={fullscreenImage}
                                        alt="Fullscreen view"
                                        className="fullscreen-image"
                                    />
                                </div>
                            )}

                            <div className="comments-section">
                                {selectedPost.comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <div className="comment-header">
                                            <div className="comment-user-info">
                                                <span className="username">{comment.userName}</span>
                                                <span className="timestamp">{comment.createdAt}</span>
                                            </div>
                                            {canDeleteComment(selectedPost.userId, comment.userId) && (
                                                <button
                                                    className="btn-icon delete-comment-btn"
                                                    onClick={() => handleDeleteComment(selectedPost.id, comment.id)}
                                                    title="ลบความคิดเห็น"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <p className="comment-content">{comment.content}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="comment-form">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="เขียนความคิดเห็น..."
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleComment(selectedPost.id)}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="sp-modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
                    <div className="confirm-modal" onClick={e => e.stopPropagation()}>
                        <div className="confirm-content">
                            <div className="confirm-icon">
                                <Trash2 size={40} />
                            </div>
                            <h2>ยืนยันการลบโพสต์</h2>
                            <p>คุณต้องการลบโพสต์นี้ใช่หรือไม่?</p>
                            <div className="confirm-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteConfirm(null)}
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setPosts(posts.filter(post => post.id !== showDeleteConfirm));
                                        setShowDeleteConfirm(null);
                                        showToast('โพสต์ถูกลบแล้ว', 'success');
                                    }}
                                >
                                    ลบโพสต์
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {toast.show && (
                <div className={`sp-toast ${toast.type === 'success' ? 'sp-toast-success' : 'sp-toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}