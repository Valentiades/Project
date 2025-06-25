'use client';

import React, { useState, useEffect } from 'react';
import '../styles/popup.css';
import { toast } from 'react-toastify';

function StationPopup({ onSubmit }: { onSubmit: (stationId: string) => void }) {
    const [stationId, setStationId] = useState('');
    const [generatedToken, setGeneratedToken] = useState('');
    const [showTokenDisplay, setShowTokenDisplay] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setIsGenerating(false);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const generateToken = () => {
        const newToken = Math.random().toString(36).substr(2, 10).toUpperCase();
        setGeneratedToken(newToken);
        setShowTokenDisplay(true);
        setCountdown(60);
        setIsGenerating(true);
    };

    const copyToClipboard = async () => {
        try {
            if (!generatedToken) {
                toast.error('ไม่มี Token ให้คัดลอก');
                return;
            }

            if (typeof navigator !== 'undefined' && navigator.clipboard) {
                await navigator.clipboard.writeText(generatedToken);
                toast.success('คัดลอก Token แล้ว!');
            } else {
                toast.error('Clipboard API ไม่รองรับบนเบราว์เซอร์นี้');
            }
        } catch (err) {
            console.error('Clipboard copy failed:', err);
            toast.error('คัดลอก Token ไม่สำเร็จ');
        }
    };



    const handleSubmit = () => {
        if (stationId.trim()) {
            onSubmit(stationId);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>กรอกเลขประจำตัว Station</h2>
                <div className="input-group">
                    <input
                        type="text"
                        value={stationId}
                        onChange={(e) => setStationId(e.target.value)}
                        placeholder="กรอกเลขประจำตัว Station"
                    />
                </div>
                <button
                    className={`generate-btn ${isGenerating ? 'disabled' : ''}`}
                    onClick={generateToken}
                    disabled={isGenerating}
                >
                    {isGenerating
                        ? `รอ ${countdown} วินาที`
                        : 'สร้างเลขประจำตัว Station'}
                </button>
                <div className={`token-display ${showTokenDisplay ? 'show' : ''}`}>
                    <div className="token-content">
                        <span>{generatedToken}</span>
                        <button className="copy-btn" onClick={copyToClipboard}>
                            คัดลอก
                        </button>
                    </div>
                </div>
                <button className="submit-btn" onClick={handleSubmit}>ส่งข้อมูล</button>
            </div>
        </div>
    );
}

export default StationPopup;