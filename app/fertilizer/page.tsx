'use client';
import { useState } from 'react';
import '../styles/fertilizer.css';
import {
    Search
} from 'lucide-react';
import { vegetableDetails } from '../data/vegetableDetails';
import VegetableDetailPopup from '../components/VegetableDetailPopup';

export default function VegetableFertilizerGuide() {
    const [activeTab, setActiveTab] = useState('leafy');
    const [selectedVegetable, setSelectedVegetable] = useState<string | null>(null);

    const handleVegetableClick = (vegetableName: string) => {
        setSelectedVegetable(vegetableName);
    };

    const vegetableCategories = [
        // 
        {
            id: 'leafy',
            name: 'ผักใบ',
            description: 'ผักที่เรารับประทานใบเป็นหลัก ต้องการไนโตรเจนสูงเพื่อช่วยในการเจริญเติบโตของใบ',
            fertilizer: 'ปุ๋ยไนโตรเจนสูง (เช่น ยูเรีย, ปุ๋ยสูตร 21-0-0 หรือ 25-7-7) ช่วยให้ใบเขียว โตเร็ว',
            examples: [
                { name: 'ผักบุ้ง', image: '/vegetables/leafy/ผักบุ้ง.webp' },
                { name: 'คะน้า', image: '/vegetables/leafy/คะน้า.jpg' },
                { name: 'ผักกาด', image: '/vegetables/leafy/ผักกาด.jpg' },
                { name: 'ผักชี', image: '/vegetables/leafy/ผักชี.jpg' },
                { name: 'ผักสลัด', image: '/vegetables/leafy/ผักสลัด.jpg' },
                { name: 'ผักโขม', image: '/vegetables/leafy/ผักโขม.webp' },
                { name: 'ผักกวางตุ้ง', image: '/vegetables/leafy/กวางตุ้ง.jpg' },
                { name: 'กะหล่ำปลี', image: '/vegetables/leafy/กะหล่ำปลี.jpg' },
                { name: 'ผักเคล', image: '/vegetables/leafy/ผักเคล.png' }
            ],
            tips: [
                'ควรแบ่งใส่ปุ๋ย 2-3 ครั้งต่อรอบการปลูก',
                'ใส่ปุ๋ยเมื่อผักมีใบจริง 2-3 ใบ',
                'หลีกเลี่ยงการให้ปุ๋ยมากเกินไปเพราะอาจทำให้ผักอ่อนแอและเป็นโรคได้ง่าย'
            ]
        },
        {
            id: 'fruit',
            name: 'ผักผล',
            description: 'ผักที่เรารับประทานผลเป็นหลัก ต้องการปุ๋ยที่มีธาตุอาหารสมดุลในช่วงแรก และโพแทสเซียมสูงในช่วงออกดอกติดผล',
            fertilizer: 'ปุ๋ยสูตรเสมอ (15-15-15) ช่วงต้น และสูตร 12-24-12 หรือ 13-13-21 ช่วงออกดอกติดผล',
            examples: [
                { name: 'มะเขือเทศ', image: '/vegetables/fruit/มะเขือเทศ.webp' },
                { name: 'พริก', image: '/vegetables/fruit/พริก.jpg' },
                { name: 'แตงกวา', image: '/vegetables/fruit/แตงกวา.jpg' },
                { name: 'ฟักทอง', image: '/vegetables/fruit/ฟักทอง.jpg' },
                { name: 'มะเขือยาว', image: '/vegetables/fruit/มะเขือยาว.jpg' },
                { name: 'มะเขือเปราะ', image: '/vegetables/fruit/มะเขือเปราะ.webp' },
                { name: 'มะระ', image: '/vegetables/fruit/มะระ.jpg' },
                { name: 'บวบ', image: '/vegetables/fruit/บวบ.jpg' },
                { name: 'ถั่วฝักยาว', image: '/vegetables/fruit/ถั่วฝักยาว.jpg' },
                { name: 'ถั่วลันเตา', image: '/vegetables/fruit/ถั่วลันเตา.jpg' }
            ],
            tips: [
                'แบ่งใส่ปุ๋ยตามระยะการเจริญเติบโต',
                'ช่วงเริ่มปลูกใช้ปุ๋ยสูตรเสมอเพื่อการเจริญเติบโต',
                'เมื่อเริ่มออกดอก เปลี่ยนมาใช้ปุ๋ยสูตรที่มีฟอสฟอรัสและโพแทสเซียมสูง'
            ]
        },
        {
            id: 'root',
            name: 'ผักราก',
            description: 'ผักที่เรารับประทานรากหรือหัวเป็นหลัก ต้องการฟอสฟอรัสสูงเพื่อส่งเสริมการพัฒนาของรากและหัว',
            fertilizer: 'ปุ๋ยฟอสฟอรัสสูง (สูตร 8-24-24 หรือ 12-24-12) ช่วยเร่งรากและหัว',
            examples: [
                { name: 'แครอท', image: '/vegetables/root/แครอท.jpg' },
                { name: 'หัวไชเท้า', image: '/vegetables/root/หัวไชเท้า.jpg' },
                { name: 'หอมใหญ่', image: '/vegetables/root/หอมหัวใหญ่.jpg' },
                { name: 'กระเทียม', image: '/vegetables/root/กระเทียม.jpg' },
                { name: 'มันเทศ', image: '/vegetables/root/มันเทศ.jpg' },
                { name: 'เผือก', image: '/vegetables/root/เผือก.jpg' },
                { name: 'มันฝรั่ง', image: '/vegetables/root/มันฝรั่ง.jpg' },
                { name: 'บีทรูท', image: '/vegetables/root/บีทรูท.jpg' },
                { name: 'แรดิช', image: '/vegetables/root/แรดิช.jpg' }
            ],
            tips: [
                'ใส่ปุ๋ยรองพื้นก่อนปลูก',
                'ควรให้ปุ๋ยในปริมาณที่พอเหมาะ การให้ไนโตรเจนมากเกินไปจะทำให้มีการเจริญเติบโตทางใบมากกว่าราก',
                'ดินควรร่วนซุย ไม่อัดแน่น เพื่อให้รากเจริญเติบโตได้ดี'
            ]
        },
        {
            id: 'flower',
            name: 'ผักดอก',
            description: 'ผักที่เรารับประทานดอกเป็นหลัก ต้องการฟอสฟอรัสสูงเพื่อกระตุ้นการออกดอก',
            fertilizer: 'ปุ๋ยสูตร 15-30-15 หรือ 12-24-12 ช่วยกระตุ้นการออกดอก',
            examples: [
                { name: 'ดอกกะหล่ำ', image: '/vegetables/flower/กะหล่ำ.jpg' },
                { name: 'บร็อคโคลี่', image: '/vegetables/flower/บล็อคโคลี่.jpg' },
                { name: 'อาร์ติโชค', image: '/vegetables/flower/อาร์ติโชค.jpg' },
                { name: 'ดอกแค', image: '/vegetables/flower/ดอกแค.jpg' },
                { name: 'ดอกขจร', image: '/vegetables/flower/ดอกขจร.jpg' },
                { name: 'ดอกโสน', image: '/vegetables/flower/ดอกโสน.jpg' },
                { name: 'ดอกกุยช่าย', image: '/vegetables/flower/ดอกกุยช่าย.jpg' },
                { name: 'ดอกกระเจียว', image: '/vegetables/flower/ดอกกระเจียว.jpg' }
            ],
            tips: [
                'เริ่มใส่ปุ๋ยฟอสฟอรัสสูงเมื่อต้นเริ่มแข็งแรง',
                'หลีกเลี่ยงการให้ไนโตรเจนมากเกินไปซึ่งจะทำให้เจริญเติบโตทางใบมากกว่าดอก',
                'ควบคุมอุณหภูมิให้เหมาะสมเพื่อส่งเสริมการออกดอก'
            ]
        },
        {
            id: 'stem',
            name: 'ผักลำต้น',
            description: 'ผักที่เรารับประทานลำต้นเป็นหลัก ต้องการปุ๋ยสมดุลเพื่อส่งเสริมการเจริญเติบโตของลำต้น',
            fertilizer: 'ปุ๋ยสูตร 16-16-16 หรือ 25-7-7 ช่วยเร่งลำต้นโต',
            examples: [
                { name: 'ต้นหอม', image: '/vegetables/stem/ต้นหอม.jpg' },
                { name: 'ขึ้นฉ่าย', image: '/vegetables/stem/ขึ้นฉ่าย.jpg' },
                { name: 'เซเลอรี่', image: '/vegetables/stem/เซเลอรี่.jpg' },
                { name: 'กระเทียมต้น', image: '/vegetables/stem/กระเทียมต้น.jpg' },
                { name: 'ชะอม', image: '/vegetables/stem/ชะอม.jpg' },
                { name: 'หน่อไม้ฝรั่ง', image: '/vegetables/stem/หน่อไม้ฝรั่ง.jpg' },
                { name: 'เฟนเนล', image: '/vegetables/stem/เฟนเนล.jpg' },
                { name: 'หน่อไม้', image: '/vegetables/stem/หน่อไม้.jpg' }
            ],
            tips: [
                'ให้ปุ๋ยสม่ำเสมอตลอดช่วงการเจริญเติบโต',
                'ควรให้น้ำเพียงพอเพื่อให้ลำต้นอวบน้ำ',
                'การพรวนดินรอบโคนต้นช่วยให้ต้นแข็งแรง'
            ]
        }
    ];

    return (
        <div className="fertilizer-container">
            <div className="fertilizer-header">
                <div className="fertilizer-title">
                    <h1>แนะนำหารใช้ปุ๋ย</h1>
                </div>
                <div className="fertilizer-header-actions">
                    <div className="fertilizer-search-box">
                        <Search size={18} />
                        <input type="text" placeholder="ค้นหา..." />
                    </div>
                </div>
            </div>

            <div className="tab-nav">
                {vegetableCategories.map((category) => (
                    <button
                        key={category.id}
                        className={`fertilizer-tab-button ${activeTab === category.id ? 'fertilizer-active-tab' : ''}`}
                        onClick={() => setActiveTab(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            {vegetableCategories.map((category) => (
                <div
                    key={category.id}
                    className={`content-area ${activeTab === category.id ? 'active-content' : 'hidden-content'}`}
                >
                    <div className="fertilizer-card">
                        <div className="fertilizer-card-header">
                            <h2 className="fertilizer-card-title">{category.name} </h2>
                            <p className="fertilizer-card-description">{category.description}</p>
                        </div>

                        {/* Category Content */}
                        <div className="fertilizer-card-content">
                            <div className="fertilizer-box">
                                <h3 className="section-title">ปุ๋ยที่แนะนำ</h3>
                                <p className="fertilizer-text">{category.fertilizer}</p>
                            </div>

                            {/* Vegetable Examples */}
                            <h3 className="section-title">ตัวอย่างผัก</h3>
                            <div className="vegetable-grid">
                                {category.examples.map((vegetable, index) => (
                                    <div
                                        key={index}
                                        className="vegetable-item"
                                        onClick={() => handleVegetableClick(vegetable.name)}
                                    >
                                        <img
                                            src={vegetable.image}
                                            alt={vegetable.name}
                                            className="vegetable-image"
                                        />
                                        <p className="vegetable-name">{vegetable.name}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Tips */}
                            <div className="tips-box">
                                <h3 className="section-title">คำแนะนำในการใช้ปุ๋ย</h3>
                                <ul className="tips-list">
                                    {category.tips.map((tip, index) => (
                                        <li key={index} className="tip-item">{tip}</li>
                                    ))}
                                </ul>
                            </div>


                            {/* Popup */}
                            {selectedVegetable && vegetableDetails[selectedVegetable] && (
                                <VegetableDetailPopup
                                    vegetable={vegetableDetails[selectedVegetable]}
                                    onClose={() => setSelectedVegetable(null)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}