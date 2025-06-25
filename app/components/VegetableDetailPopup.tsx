import { VegetableCareDetail } from '../data/vegetableDetails';
import '../styles/popupdetail.css';

interface VegetableDetailPopupProps {
    vegetable: VegetableCareDetail;
    onClose: () => void;
}

export default function VegetableDetailPopup({ vegetable, onClose }: VegetableDetailPopupProps) {
    return (
        <div className="vd-popup-overlay" onClick={onClose}>
            <div className="vd-popup-content" onClick={e => e.stopPropagation()}>
                <button className="vd-close-button" onClick={onClose}>&times;</button>
                
                <div className="vd-popup-header">
                    <img src={vegetable.image} alt={vegetable.name} className="popup-image" />
                    <div className="popup-title">
                        <h2>{vegetable.name}</h2>
                        <p className="scientific-name">{vegetable.scientificName}</p>
                    </div>
                </div>

                <div className="vd-popup-details">
                    <div className="vd-detail-group">
                        <h3>ข้อมูลการปลูก</h3>
                        <div className="vd-detail-item">
                            <span>อัตราเมล็ดพันธุ์/ไร่:</span>
                            <span>{vegetable.seedRate}</span>
                        </div>
                        <div className="vd-detail-item">
                            <span>ระยะปลูก:</span>
                            <span>{vegetable.plantingSpace}</span>
                        </div>
                        <div className="vd-detail-item">
                            <span>อายุเก็บเกี่ยว:</span>
                            <span>{vegetable.harvestAge}</span>
                        </div>
                        <div className="vd-detail-item">
                            <span>ผลผลิต/ไร่:</span>
                            <span>{vegetable.yieldPerRai}</span>
                        </div>
                    </div>

                    <div className="vd-detail-group">
                        <h3>การใส่ปุ๋ย</h3>
                        <div className="fertilizer-timeline">
                            <div className="timeline-item">
                                <span className="timeline-label">ปุ๋ยรองพื้น</span>
                                <span className="timeline-content">{vegetable.fertilizing.base}</span>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-label">ครั้งที่ 1</span>
                                <span className="timeline-content">{vegetable.fertilizing.first}</span>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-label">ครั้งที่ 2</span>
                                <span className="timeline-content">{vegetable.fertilizing.second}</span>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-label">ครั้งที่ 3</span>
                                <span className="timeline-content">{vegetable.fertilizing.third}</span>
                            </div>
                            <div className="timeline-item">
                                <span className="timeline-label">ครั้งที่ 4</span>
                                <span className="timeline-content">{vegetable.fertilizing.fourth}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}