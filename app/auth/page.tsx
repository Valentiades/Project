'use client';
import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AtSign, RefreshCw, Check, User } from 'lucide-react';
import '../styles/auth.css';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showOtpVerification, setShowOtpVerification] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [resetPasswordEmail, setResetPasswordEmail] = useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
    const [resetPasswordOtpStep, setResetPasswordOtpStep] = useState(false);
    const [resetPasswordFormStep, setResetPasswordFormStep] = useState(false);
    const [resetOtpValues, setResetOtpValues] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const resetOtpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const registerFormRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [toast, setToast] = useState<{ show: boolean, message: string, type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if ((showOtpVerification || resetPasswordSuccess || resetPasswordOtpStep) && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [showOtpVerification, resetPasswordSuccess, resetPasswordOtpStep, countdown]);

    const handleOtpChange = (index: number, value: string, isReset = false) => {
        if (value.length <= 1) {
            if (isReset) {
                const newOtpValues = [...resetOtpValues];
                newOtpValues[index] = value;
                setResetOtpValues(newOtpValues);

                if (value && index < 5) {
                    resetOtpRefs.current[index + 1]?.focus();
                }
            } else {
                const newOtpValues = [...otpValues];
                newOtpValues[index] = value;
                setOtpValues(newOtpValues);

                if (value && index < 5) {
                    otpRefs.current[index + 1]?.focus();
                }
            }
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>, isReset = false) => {
        if (e.key === 'Backspace') {
            if (isReset) {
                if (!resetOtpValues[index] && index > 0) {
                    resetOtpRefs.current[index - 1]?.focus();
                }
            } else {
                if (!otpValues[index] && index > 0) {
                    otpRefs.current[index - 1]?.focus();
                }
            }
        }
    };

    {/* สมัครสมาชิก */ }
    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const firstName = form.querySelector('input[placeholder="ชื่อ"]') as HTMLInputElement;
        const lastName = form.querySelector('input[placeholder="นามสกุล"]') as HTMLInputElement;
        const email = form.querySelector('input[placeholder="อีเมล"]') as HTMLInputElement;
        const password = form.querySelector('input[placeholder="รหัสผ่าน"]') as HTMLInputElement;
        const confirmPassword = form.querySelector('input[placeholder="ยืนยันรหัสผ่าน"]') as HTMLInputElement;
        const termsCheckbox = form.querySelector('#terms') as HTMLInputElement;

        if (!firstName.value || !lastName.value || !email.value || !password.value || !confirmPassword.value) {
            showToast("กรุณากรอกข้อมูลให้ครบถ้วน", 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showToast("รูปแบบอีเมลไม่ถูกต้อง", 'error');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            showToast("รหัสผ่านต้องมีอย่างน้อย 8 ตัว และมีตัวอักษรอังกฤษอย่างน้อย 1 ตัว", 'error');
            return;
        }

        if (password.value !== confirmPassword.value) {
            showToast("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน", 'error');
            return;
        }

        if (!termsCheckbox.checked) {
            showToast("กรุณายอมรับข้อตกลงและเงื่อนไขการใช้บริการ", 'error');
            return;
        }

        showToast("สมัครสมาชิกสำเร็จ!", 'success');
        setShowOtpVerification(true);

        registerFormRef.current?.reset();
    };

    {/* เข้าสู่ระบบ */ }
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.querySelector('input[placeholder="อีเมล"]') as HTMLInputElement)?.value.trim();
        const password = (form.querySelector('input[placeholder="รหัสผ่าน"]') as HTMLInputElement)?.value;

        if (!email || !password) {
            showToast("กรุณากรอกอีเมลและรหัสผ่าน", 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast("รูปแบบอีเมลไม่ถูกต้อง", 'error');
            return;
        }

        // เก็บข้อมูลว่าผู้ใช้ได้ login แล้ว
        localStorage.setItem('isLoggedIn', 'true');
        // เช็คว่าผู้ใช้มี station token หรือยัง
        const hasStationToken = localStorage.getItem('stationToken');

        showToast("เข้าสู่ระบบสำเร็จ!", 'success');
        router.push('/dashboard');
    };

    {/* รีเซ็ตรหัสผ่าน */ }
    const handleResetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!resetPasswordEmail.trim()) {
            showToast("กรุณากรอกอีเมลของคุณ", 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(resetPasswordEmail)) {
            showToast("รูปแบบอีเมลไม่ถูกต้อง", 'error');
            return;
        }

        // ส่งไปที่ขั้นตอน OTP แทนที่จะเป็น success
        setResetPasswordSuccess(false);
        setResetPasswordOtpStep(true);
        setCountdown(60);
        showToast("ส่งรหัส OTP ไปยังอีเมลของคุณแล้ว", 'success');
    };

    // ตรวจสอบOTP สำหรับรีเซ็ตรหัสผ่าน
    const handleVerifyResetOtp = () => {
        const otpCode = resetOtpValues.join('');
        if (otpCode.length !== 6) {
            showToast("กรุณากรอก OTP ให้ครบ 6 หลัก", 'error');
            return;
        }

        // สมมติว่าตรวจสอบ OTP สำเร็จ
        setResetPasswordOtpStep(false);
        setResetPasswordFormStep(true);
        showToast("ยืนยัน OTP สำเร็จ", 'success');
    };

    // การตั้งรหัสผ่านใหม่
    const handleSetNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newPassword || !confirmNewPassword) {
            showToast("กรุณากรอกรหัสผ่านใหม่และยืนยันรหัสผ่าน", 'error');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            showToast("รหัสผ่านต้องมีอย่างน้อย 8 ตัว และมีตัวอักษรอังกฤษอย่างน้อย 1 ตัว", 'error');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            showToast("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน", 'error');
            return;
        }

        // เสร็จสิ้นการรีเซ็ตรหัสผ่าน
        closeResetPassword();
        showToast("ตั้งรหัสผ่านใหม่สำเร็จ", 'success');
        setIsLogin(true);
    };

    const closeResetPassword = () => {
        setShowPasswordReset(false);
        setResetPasswordSuccess(false);
        setResetPasswordOtpStep(false);
        setResetPasswordFormStep(false);
        setResetPasswordEmail('');
        setResetOtpValues(['', '', '', '', '', '']);
        setNewPassword('');
        setConfirmNewPassword('');
    };

    {/* เปิด/ปิดการมองเห็นรหัสผ่าน */ }
    const togglePasswordVisibility = (field: string) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        } else if (field === 'newPassword') {
            setShowNewPassword(!showNewPassword);
        } else if (field === 'confirmNewPassword') {
            setShowConfirmNewPassword(!showConfirmNewPassword);
        }
    };

    // รีเซ็ต OTP ใหม่
    const handleResendOtp = (isResetPassword = false) => {
        setCountdown(60);
        if (isResetPassword) {
            showToast("ส่งรหัส OTP ใหม่สำหรับรีเซ็ตรหัสผ่านแล้ว");
        } else {
            showToast("ส่งรหัส OTP ใหม่สำหรับการสมัครสมาชิกแล้ว");
        }
    };

    return (
        <>
            <div className="container">
                <div className="auth-container">
                    <div className="logo-section">
                        <img src="/logo-png/white.png" alt="logo-white" className='logo-circle' />
                        <h1>ยินดีต้อนรับ</h1>
                        <p className="system-name">ระบบเก็บข้อมูลสุขภาพดิน</p>
                        <p className="system-desc">สำหรับเกษตรกรการปลูกพืชผัก</p>
                    </div>

                    <div className="form-section">
                        {/* Login */}
                        <div className={`form-container ${isLogin ? 'active' : 'inactive'}`}>
                            <h2>เข้าสู่ระบบ</h2>
                            <form onSubmit={handleLoginSubmit} noValidate>
                                <div className="input-group">
                                    <AtSign className="icon" size={20} />
                                    <input type="text" placeholder="อีเมล" />
                                </div>

                                <div className="input-group">
                                    <Lock className="icon" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="รหัสผ่าน"
                                    />
                                    <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('password')}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <div className="forgot-password">
                                    <button type="button" className="forgot-btn" onClick={() => setShowPasswordReset(true)}>
                                        ลืมรหัสผ่าน?
                                    </button>
                                </div>

                                <button type="submit" className="submit-btn">เข้าสู่ระบบ</button>

                                <p className="switch-form">
                                    ยังไม่มีบัญชีผู้ใช้?
                                    <button type="button" className="link-btn" onClick={() => setIsLogin(false)}>
                                        สมัครสมาชิกที่นี่
                                    </button>
                                </p>
                            </form>
                        </div>

                        {/* Register */}
                        <div className={`form-container ${!isLogin ? 'active' : 'inactive'}`}>
                            <div className="header-with-back">
                                <button type="button" className="back-btn" onClick={() => setIsLogin(true)}>
                                    <ArrowLeft size={20} />
                                </button>
                                <h2>สมัครสมาชิก</h2>
                            </div>

                            <form onSubmit={handleRegisterSubmit} ref={registerFormRef} noValidate>
                                <div className="name-group">
                                    <div className="input-group half">
                                        <User className="icon" size={20} />
                                        <input type="text" placeholder="ชื่อ" />
                                    </div>
                                    <div className="input-group half">
                                        <User className="icon" size={20} />
                                        <input type="text" placeholder="นามสกุล" />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <Mail className="icon" size={20} />
                                    <input type="text" placeholder="อีเมล" />
                                </div>

                                <div className="input-group">
                                    <Lock className="icon" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="รหัสผ่าน"
                                    />
                                    <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('password')}>
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <p className='directed'>* มีอย่างน้อย 8 ตัว <br/>* มีตัวอักษรอังกฤษอย่างน้อย 1 ตัว</p>

                                <div className="input-group">
                                    <Lock className="icon" size={20} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="ยืนยันรหัสผ่าน"
                                    />
                                    <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('confirmPassword')}>
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <div className="checkbox-group">
                                    <input type="checkbox" id="terms" />
                                    <label htmlFor="terms">
                                        ยอมรับข้อตกลงและเงื่อนไขการใช้บริการและนโยบายความเป็นส่วนตัว
                                    </label>
                                </div>

                                <button type="submit" className="submit-btn">ยืนยันการสมัครสมาชิก</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* OTP Verification Modal */}
                {showOtpVerification && (
                    <div className="otp-modal-backdrop">
                        <div className="otp-modal">
                            <h3>ยืนยันอีเมล</h3>
                            <p>ส่งรหัส OTP ไปยังอีเมลของคุณแล้ว <br /> admin@gmail.com</p>

                            {countdown > 0 ? (
                                <p className="countdown">หมดเวลาอีก {countdown} วินาที</p>
                            ) : (
                                <button className="resend-otp" onClick={() => handleResendOtp()}>
                                    ส่งรหัส OTP ใหม่
                                </button>
                            )}

                            <div className="otp-inputs">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={otpValues[index]}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    />
                                ))}
                            </div>

                            <button className="submit-btn" onClick={() => {
                                setShowOtpVerification(false);
                                setIsLogin(true);
                            }}>
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                )}

                {/* Password Reset Modal */}
                {showPasswordReset && (
                    <div className="otp-modal-backdrop">
                        <div className="reset-password-modal">
                            <button className="close-modal" onClick={closeResetPassword}>×</button>

                            {!resetPasswordSuccess && !resetPasswordOtpStep && !resetPasswordFormStep ? (
                                <>
                                    <div className="reset-icon">
                                        <RefreshCw size={28} />
                                    </div>
                                    <h3>รีเซ็ตรหัสผ่าน</h3>
                                    <p>กรุณากรอกอีเมลของคุณเพื่อรับรหัส OTP สำหรับรีเซ็ตรหัสผ่าน</p>
                                    <form onSubmit={handleResetPasswordSubmit} noValidate>
                                        <div className="input-group">
                                            <Mail className="icon" size={20} />
                                            <input
                                                type="text"
                                                placeholder="อีเมล"
                                                value={resetPasswordEmail}
                                                onChange={(e) => setResetPasswordEmail(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="submit-btn">ส่งรหัส OTP</button>
                                    </form>
                                </>
                            ) : resetPasswordOtpStep ? (
                                <>
                                    <h3>ยืนยันรหัส OTP</h3>
                                    <p>ส่งรหัส OTP ไปยังอีเมลของคุณแล้ว <br /> <strong>{resetPasswordEmail}</strong></p>

                                    {countdown > 0 ? (
                                        <p className="countdown">หมดเวลาอีก {countdown} วินาที</p>
                                    ) : (
                                        <button className="resend-otp" onClick={() => handleResendOtp(true)}>
                                            ส่งรหัส OTP ใหม่
                                        </button>
                                    )}

                                    <div className="otp-inputs">
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index}
                                                ref={(el) => { resetOtpRefs.current[index] = el; }}
                                                type="text"
                                                maxLength={1}
                                                value={resetOtpValues[index]}
                                                onChange={(e) => handleOtpChange(index, e.target.value, true)}
                                                onKeyDown={(e) => handleOtpKeyDown(index, e, true)}
                                            />
                                        ))}
                                    </div>

                                    <button className="submit-btn" onClick={handleVerifyResetOtp}>
                                        ยืนยัน
                                    </button>
                                </>
                            ) : resetPasswordFormStep ? (
                                <>
                                    <h3>ตั้งรหัสผ่านใหม่</h3>
                                    <p>กรุณากำหนดรหัสผ่านใหม่ของคุณ</p>
                                    <form onSubmit={handleSetNewPassword} noValidate>
                                        <div className="input-group">
                                            <Lock className="icon" size={20} />
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="รหัสผ่านใหม่"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password"
                                                onClick={() => togglePasswordVisibility('newPassword')}
                                            >
                                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        <div className="input-group">
                                            <Lock className="icon" size={20} />
                                            <input
                                                type={showConfirmNewPassword ? "text" : "password"}
                                                placeholder="ยืนยันรหัสผ่านใหม่"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="toggle-password"
                                                onClick={() => togglePasswordVisibility('confirmNewPassword')}
                                            >
                                                {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>

                                        <button type="submit" className="submit-btn">บันทึกรหัสผ่านใหม่</button>
                                    </form>
                                </>
                            ) : (
                                <div className="reset-success">
                                    <div className="success-icon">
                                        <Check size={32} />
                                    </div>
                                    <h3>ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว</h3>
                                    <p>ส่งไปยังอีเมล<br /><strong>{resetPasswordEmail}</strong><br />{countdown > 0 ? ` (${countdown})` : ''}</p>
                                    <button className="back-to-login" onClick={closeResetPassword}>
                                        กลับไปหน้าเข้าสู่ระบบ
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <img src="/logo-png/green.png" alt="logo-green" className='backdrop-logo' />
            {/* Toast Notification */}
            {toast.show && (
                <div className={`au-toast ${toast.type === 'success' ? 'au-toast-success' : 'au-toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </>
    );
}