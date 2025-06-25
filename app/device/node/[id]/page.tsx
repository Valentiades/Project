'use client';
import { useEffect, useState } from 'react';
import {
    Thermometer, Droplets, Activity, FlaskRound,
    Sprout, Atom, Cherry, Search, Settings,
    Bell, Sun, Calendar, Router,
    HardDrive, ThermometerSnowflake,
    Zap, ArrowLeft, Cloud, CloudRain, CloudSun, Check, X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import '../../../styles/node.css';
import axios from 'axios';

interface SensorData {
    node_id: string,
    temperature: number,
    moisture: number,
    ph: number,
    ec: number,
    nitrogen: number,
    phosphorus: number,
    potassium: number
}

export default function NodePage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedSensors, setSelectedSensors] = useState<string[]>([]);
    const [hourlyData, setHourlyData] = useState<any[]>([]);

    const [sensorData, setSensorData] = useState<SensorData>();
    const [nodeId, setNodeId] = useState("");

    const handleSubmit = async () => {
        const payload = {
            id: nodeId
        }
        const res = await axios.post("/api/node",payload)
        if (res.data.status === 1){
            setSensorData(res.data.data);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const generateHourlyData = () => {
            const daysDiff = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
            const dataPoints = daysDiff * 24;

            return Array.from({ length: dataPoints }, (_, i) => {
                const currentHour = i % 24;
                const currentDay = Math.floor(i / 24);
                const date = new Date(startDate);
                date.setDate(date.getDate() + currentDay);
                date.setHours(currentHour, 0, 0, 0);

                const basePhosphorus = 45;
                const variation = 15;

                return {
                    timestamp: date.getTime(),
                    hour: currentHour,
                    day: currentDay,
                    date: `${date.getDate()}/${date.getMonth() + 1}`,
                    fullDate: date.toLocaleDateString('th-TH'),
                    temperature: (25 + Math.random() * 5).toFixed(2), // 25-30°C
                    humidity: (60 + Math.random() * 20).toFixed(2), // 60-80%
                    ec: (1.0 + Math.random() * 0.5).toFixed(2), // 1.0-1.5 mS/m
                    pH: (6.5 + Math.random() * 1.0).toFixed(2), // 6.5-7.5
                    nitrogen: (120 + Math.random() * 40).toFixed(2), // 120-160 mg/kg
                    phosphorus: (basePhosphorus + (Math.random() * variation * 2 - variation)).toFixed(2), // 30-60 mg/kg
                    potassium: (150 + Math.random() * 50).toFixed(2), // 150-200 mg/kg
                };
            });
        };

        setHourlyData(generateHourlyData());
    }, [startDate, endDate]);

    const formatThaiDate = (date: Date) => {
        const thaiMonths = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
            'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
            'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
    }

    const formatThaiTime = (date: Date) => {
        return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
    }

    const parameterConfig = {
        temperature: { name: 'อุณหภูมิ', color: '#FF7B54', unit: '°C' },
        humidity: { name: 'ความชื้น', color: '#4EA8DE', unit: '%' },
        ec: { name: 'EC', color: '#4ADE80', unit: 'mS/m' },
        pH: { name: 'pH', color: '#FFB26B', unit: '' },
        nitrogen: { name: 'ไนโตรเจน', color: '#5D9C59', unit: 'mg/kg' },
        phosphorus: { name: 'ฟอสฟอรัส', color: '#7B66FF', unit: 'mg/kg' },
        potassium: { name: 'โพแทสเซียม', color: '#FF9BD2', unit: 'mg/kg' }
    };

    const toggleSensor = (sensor: string) => {
        setSelectedSensors(prev => {
            if (prev.includes(sensor)) {
                return prev.filter(s => s !== sensor);
            } else {
                return [...prev, sensor];
            }
        });
    };

    const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;

            return (
                <div className="custom-tooltip">
                    <p className="tooltip-time">{`${dataPoint.fullDate} ${dataPoint.hour}:00 น.`}</p>
                    <div className="tooltip-values">
                        {payload.map((entry: any, index: number) => {
                            const sensorKey = entry.dataKey as keyof typeof parameterConfig;
                            const config = parameterConfig[sensorKey];
                            return (
                                <p key={index} className="tooltip-value" style={{ color: entry.color }}>
                                    {config.name}: {parseFloat(entry.value).toFixed(2)} {config.unit}
                                </p>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    };

    // const WeatherWidget = () => {
    //     return (
    //         <div className="weather-container">
    //             <h3 className="weather-title">สภาพอากาศ</h3>
    //             <div className="weather-locations">
    //                 {weatherData.map((item, index) => (
    //                     <div key={index} className="weather-item">
    //                         {item.condition === 'sunny' && <Sun size={24} color="#FFB26B" />}
    //                         {item.condition === 'cloudy' && <CloudSun size={24} color="#4EA8DE" />}
    //                         {item.condition === 'rainy' && <CloudRain size={24} color="#7B66FF" />}
    //                         <div className="weather-info">
    //                             <span className="location">{item.location}</span>
    //                             <span className="temperature">{item.temperature}°C</span>
    //                         </div>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // };

    interface ParameterCardProps {
        icon: React.ReactNode;
        title: string;
        value: number;
        unit: string;
        color: string;
    }

    const ParameterCard = ({ icon, title, value, unit, color }: ParameterCardProps) => {
        return (
            <div className="parameter-card" style={{ borderLeftColor: color }}>
                <div className="parameter-icon" style={{ backgroundColor: color }}>
                    {icon}
                </div>
                <div className="parameter-details">
                    <div className="parameter-title">{title}</div>
                    <div className="parameter-value">
                        {typeof value === 'number' ? value.toFixed(2) : value} <span className="parameter-unit">{unit}</span>
                    </div>
                </div>
            </div>
        );
    };

    const SensorGraph = () => {
        return (
            <div className="graph-container">
                <div className="graph-header">
                    <h3 className="graph-title">ข้อมูลเซ็นเซอร์รายชั่วโมง</h3>
                    <div className="graph-controls">
                        <div className="date-range-selector">
                            <div className="date-selector">
                                <label>วันที่เริ่มต้น:</label>
                                <input
                                    type="date"
                                    value={startDate.toISOString().split('T')[0]}
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                    className="date-input"
                                />
                            </div>
                            <div className="date-selector">
                                <label>วันที่สิ้นสุด:</label>
                                <input
                                    type="date"
                                    value={endDate.toISOString().split('T')[0]}
                                    onChange={(e) => setEndDate(new Date(e.target.value))}
                                    className="date-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sensor-checkboxes">
                    {Object.entries(parameterConfig).map(([key, config]) => (
                        <div key={key} className="sensor-checkbox">
                            <button
                                className={`checkbox-button ${selectedSensors.includes(key) ? 'selected' : ''}`}
                                onClick={() => toggleSensor(key)}
                            >
                                {selectedSensors.includes(key) ?
                                    <Check size={16} color="#fff" /> :
                                    <X size={16} color="#6b7280" />}
                            </button>
                            <span style={{ color: config.color }}>{config.name}</span>
                        </div>
                    ))}
                </div>

                <div className="graph-body">
                    <ResponsiveContainer width="100%" height={600}>
                        <LineChart
                            data={hourlyData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#e5e7eb"
                            />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={(timestamp) => {
                                    const date = new Date(timestamp);
                                    return `${date.getDate()}/${date.getMonth() + 1} ${String(date.getHours()).padStart(2, '0')}:00`;
                                }}
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#d1d5db' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={{ stroke: '#d1d5db' }}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                            />
                            {selectedSensors.map((sensor) => (
                                <Line
                                    key={sensor}
                                    type="monotone"
                                    dataKey={sensor}
                                    name={parameterConfig[sensor as keyof typeof parameterConfig].name}
                                    stroke={parameterConfig[sensor as keyof typeof parameterConfig].color}
                                    strokeWidth={2}
                                    dot={{ r: 2, fill: parameterConfig[sensor as keyof typeof parameterConfig].color }}
                                    activeDot={{
                                        r: 6,
                                        stroke: '#fff',
                                        strokeWidth: 2,
                                        fill: parameterConfig[sensor as keyof typeof parameterConfig].color
                                    }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };


    return (
        <div className="node-container">
            {/* <input type="text" onChange={(e) => setNodeId(e.target.value)}/>
            <button type="button" onClick={handleSubmit}>Submit</button> */}
            <div className="node-header">
                <button className="back-button" onClick={() => window.history.back()}>
                    <ArrowLeft size={20} />
                    กลับ
                </button>
                <div className="date">
                    <div className="node-title">
                        <span>Node : 1</span>
                    </div>
                    <div className="date-display">
                        <div className="date-calendar">
                            <Calendar size={20} className="calendar-icon" />
                            <span>{formatThaiDate(currentTime)}</span>
                        </div>
                        <div className="date-divider"></div>
                        <div className="date-time">
                            <span>{formatThaiTime(currentTime)}</span>
                        </div>
                    </div>
                </div>
                <div className="node-header-actions">
                    <div className="node-search-box">
                        <Search size={18} />
                        <input type="text" placeholder="ค้นหา..." />
                    </div>
                </div>
            </div>

            <div className="parameters-container">
                <ParameterCard
                    icon={<Thermometer size={24} color="#fff" />}
                    title="Temperature"
                    value={sensorData?.temperature || 0}
                    unit="°C"
                    color="#FF7B54"
                />
                <ParameterCard
                    icon={<Droplets size={24} color="#fff" />}
                    title="Humidity"
                    value={sensorData?.moisture || 0}
                    unit="%"
                    color="#4EA8DE"
                />
                <ParameterCard
                    icon={<Zap size={24} color="#fff" />}
                    title="EC"
                    value={sensorData?.ec || 0}
                    unit="mS/m"
                    color="#4ADE80"
                />
                <ParameterCard
                    icon={<FlaskRound size={24} color="#fff" />}
                    title="pH"
                    value={sensorData?.ph || 0}
                    unit=""
                    color="#FFB26B"
                />
                <ParameterCard
                    icon={<div style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>N</div>}
                    title="Nitrogen"
                    value={sensorData?.nitrogen || 0}
                    unit=""
                    color="#5D9C59"
                />
                <ParameterCard
                    icon={<div style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>P</div>}
                    title="Phosphorus"
                    value={sensorData?.phosphorus || 0}
                    unit=""
                    color="#7B66FF"
                />
                <ParameterCard
                    icon={<div style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>K</div>}
                    title="Potassium"
                    value={sensorData?.potassium || 0}
                    unit=""
                    color="#FF9BD2"
                />
            </div>

            <div className="content-section">
                <SensorGraph />
            </div>
        </div>
    );
}