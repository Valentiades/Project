'use client';

import { use, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit2, HardDrive, ArrowLeft, X, Thermometer, Droplet, Activity, Zap, Leaf, Feather, Aperture, Clock, Search, Settings, Bell, Trash2, ChartArea, Calendar, Filter, Icon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import '../../../styles/station.css';

interface NodeData {
    id: string;
    name: string;
    area: string;
    status: 'online' | 'offline';
    lastMeasurement: {
        timestamp: string;
        temperature: number;
        humidity: number;
        ec: number;
        ph: number;
        nitrogen: number;
        phosphorus: number;
        potassium: number;
    };
}

interface GraphData {
    date: string;
    [key: string]: any;
}

const sensorIconMap: Record<string, any> = {
    temperature: Thermometer,
    humidity: Droplet,
    ec: Zap,
    ph: Activity,
    nitrogen: Leaf,
    phosphorus: Feather,
    potassium: Aperture
}

const CustomDot = ({ cx, cy, sensor, color }: any) => {
    if (typeof cx !== 'number' || typeof cy !== 'number') return null;

    const Icon = sensorIconMap[sensor];
    if (!Icon) return null;

    return (
        <foreignObject x={cx - 8} y={cy - 8} width={16} height={16}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color }}>
                <Icon size={16} />
            </div>
        </foreignObject>
    );
};

const sensorOptions = [
    { key: 'temperature', label: 'อุณหภูมิ (°C)', icon: Thermometer },
    { key: 'humidity', label: 'ความชื้น (%)', icon: Droplet },
    { key: 'ph', label: 'ph', icon: Activity },
    { key: 'ec', label: 'ค่าการนำไฟฟ้า (µS/cm)', icon: Zap },
    { key: 'nitrogen', label: 'ไนโตรเจน (N) mg/kg', icon: Leaf },
    { key: 'phosphorus', label: 'ฟอสฟอรัส (P) mg/kg', icon: Feather },
    { key: 'potassium', label: 'โพแทสเซียม (K) mg/kg', icon: Aperture }
];

const nodeColors = [
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#6366F1', // Indigo
    '#D97706', // Amber
    '#22D3EE', // Sky
];

export default function StationPage({ params }: { params: Promise<{ id: string }> }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGraphModal, setShowGraphModal] = useState(false);
    const [editingNode, setEditingNode] = useState<NodeData | null>(null);
    const [nodeName, setNodeName] = useState('');
    const [nodeArea, setNodeArea] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 3000);
    }

    // Graph comparison states
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [selectedSensors, setSelectedSensors] = useState<string[]>([]);
    const [timeInterval, setTimeInterval] = useState<'hourly' | 'daily'>('hourly');
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const router = useRouter();
    const { id } = use(params);

    const [nodes, setNodes] = useState<NodeData[]>([
        {
            id: 'Node001',
            name: 'Node 1',
            area: 'แปลง A',
            status: 'online',
            lastMeasurement: {
                timestamp: '14:30:00 น.',
                temperature: 28.5,
                humidity: 65,
                ec: 450,
                ph: 6.8,
                nitrogen: 120,
                phosphorus: 45,
                potassium: 80
            }
        },
        {
            id: 'Node002',
            name: 'Node 2',
            area: 'แปลง B',
            status: 'online',
            lastMeasurement: {
                timestamp: '13:15:00 น.',
                temperature: 29.2,
                humidity: 62,
                ec: 420,
                ph: 7.1,
                nitrogen: 110,
                phosphorus: 40,
                potassium: 75
            }
        },
        {
            id: 'Node003',
            name: 'Node 3',
            area: 'แปลง C',
            status: 'offline',
            lastMeasurement: {
                timestamp: '18:45:00 น.',
                temperature: 27.8,
                humidity: 70,
                ec: 380,
                ph: 6.5,
                nitrogen: 95,
                phosphorus: 35,
                potassium: 65
            }
        },
        {
            id: 'Node004',
            name: 'Node 4',
            area: 'แปลง D',
            status: 'online',
            lastMeasurement: {
                timestamp: '12:00:00 น.',
                temperature: 30.0,
                humidity: 60,
                ec: 400,
                ph: 7.0,
                nitrogen: 105,
                phosphorus: 42,
                potassium: 78
            }
        },
        {
            id: 'Node005',
            name: 'Node 5',
            area: 'แปลง E',
            status: 'online',
            lastMeasurement: {
                timestamp: '10:30:00 น.',
                temperature: 28.8,
                humidity: 64,
                ec: 430,
                ph: 6.9,
                nitrogen: 115,
                phosphorus: 38,
                potassium: 72
            }
        },
        {
            id: 'Node006',
            name: 'Node 6',
            area: 'แปลง F',
            status: 'offline',
            lastMeasurement: {
                timestamp: '20:00:00 น.',
                temperature: 26.5,
                humidity: 68,
                ec: 360,
                ph: 6.7,
                nitrogen: 90,
                phosphorus: 30,
                potassium: 60
            }
        },
        {
            id: 'Node007',
            name: 'Node 7',
            area: 'แปลง G',
            status: 'online',
            lastMeasurement: {
                timestamp: '15:45:00 น.',
                temperature: 29.5,
                humidity: 63,
                ec: 410,
                ph: 7.2,
                nitrogen: 125,
                phosphorus: 50,
                potassium: 85
            }
        },
        {
            id: 'Node008',
            name: 'Node 8',
            area: 'แปลง H',
            status: 'online',
            lastMeasurement: {
                timestamp: '11:20:00 น.',
                temperature: 27.0,
                humidity: 66,
                ec: 390,
                ph: 6.6,
                nitrogen: 100,
                phosphorus: 37,
                potassium: 70
            }
        }
    ]);

    const handleSelectAllSensors = () => {
        if (selectedSensors.length === sensorOptions.length) {
            setSelectedSensors([]);
        } else {
            setSelectedSensors(sensorOptions.map(sensor => sensor.key));
        }
    };

    // Generate mock data for graph
    const generateMockData = (): GraphData[] => {
        const data: GraphData[] = [];
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        const useHourlyData = timeInterval === 'hourly' || daysDiff <= 1;

        if (useHourlyData) {
            const current = new Date(start);
            current.setHours(0, 0, 0, 0); // เริ่มที่ 00:00 ของวันเริ่มต้น

            // วนลูปจนถึง 23:00 ของวันสิ้นสุด
            const endDate = new Date(end);
            endDate.setHours(23, 0, 0, 0); // ให้ครอบคลุมถึง 23:00 ของวันสุดท้าย

            while (current <= endDate) {
                const dataPoint: GraphData = {
                    date: current.toLocaleString('th-TH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                };

                selectedNodes.forEach(nodeId => {
                    const node = nodes.find(n => n.id === nodeId);
                    if (node) {
                        selectedSensors.forEach(sensor => {
                            const baseValue = node.lastMeasurement[sensor as keyof typeof node.lastMeasurement] as number;
                            const hour = current.getHours();
                            const timeVariation = Math.sin((hour / 24) * 2 * Math.PI) * (baseValue * 0.1);
                            const randomVariation = (Math.random() - 0.5) * (baseValue * 0.15);
                            const finalValue = baseValue + timeVariation + randomVariation;
                            dataPoint[`${nodeId}_${sensor}`] = Number(finalValue.toFixed(1));
                        });
                    }
                });

                data.push(dataPoint);
                current.setHours(current.getHours() + 1); // เพิ่มทีละ 1 ชั่วโมง
            }
        } else {
            for (let i = 0; i <= daysDiff; i++) {
                const currentDate = new Date(start);
                currentDate.setDate(start.getDate() + i);

                const dataPoint: GraphData = {
                    date: currentDate.toLocaleDateString('th-TH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit'
                    })
                };

                selectedNodes.forEach(nodeId => {
                    const node = nodes.find(n => n.id === nodeId);
                    if (node) {
                        selectedSensors.forEach(sensor => {
                            const baseValue = node.lastMeasurement[sensor as keyof typeof node.lastMeasurement] as number;
                            const variation = (Math.random() - 0.5) * (baseValue * 0.2);
                            dataPoint[`${nodeId}_${sensor}`] = Number((baseValue + variation).toFixed(1));
                        });
                    }
                });

                data.push(dataPoint);
            }
        }

        return data;
    };

    const CustomLegendHorizontal = ({ payload }: any) => {
        if (!payload || payload.length === 0) return null;

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                padding: '12px',
                marginTop: '12px',
            }}>
                {payload.map((item: any, index: number) => {
                    const key = item.dataKey as string;
                    const [nodeId, sensorKey] = key.split('_');
                    const sensorInfo = sensorOptions.find(s => s.key === sensorKey);
                    const SensorIcon = sensorInfo?.icon;
                    const nodeName = nodes.find(n => n.id === nodeId)?.name || nodeId;

                    return (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            backgroundColor: `${item.color}10`,
                            border: `1px solid ${item.color}30`,
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#374151'
                        }}>
                            {/* Sensor Icon */}
                            {SensorIcon && (
                                <SensorIcon
                                    size={14}
                                    style={{ color: item.color }}
                                />
                            )}

                            {/* Color dot */}
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: item.color
                            }} />

                            {/* Label */}
                            <span>
                                {nodeName} - {sensorInfo?.key.toUpperCase()}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };


    const graphData = useMemo(() => {
        if (selectedNodes.length > 0 && selectedSensors.length > 0) {
            return generateMockData();
        }
        return [];
    }, [selectedNodes, selectedSensors, dateRange, nodes]);

    const filteredNodes = useMemo(() => {
        if (!searchQuery.trim()) {
            return nodes;
        }

        const query = searchQuery.toLowerCase().trim();
        return nodes.filter(node =>
            node.name.toLowerCase().includes(query) ||
            node.area.toLowerCase().includes(query) ||
            node.id.toLowerCase().includes(query)
        );
    }, [nodes, searchQuery]);

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>, node: NodeData) => {
        e.stopPropagation();
        setEditingNode(node);
        setNodeName(node.name);
        setNodeArea(node.area);
        setShowEditModal(true);
    };

    const handleAdd = () => {
        setEditingNode(null);
        setNodeName('');
        setNodeArea('');
        setShowAddModal(true);
    };

    const handleSave = () => {
        if (editingNode) {
            setNodes(nodes.map(node =>
                node.id === editingNode.id
                    ? { ...node, name: nodeName, area: nodeArea }
                    : node
            ));
            setShowEditModal(false);
            showToast('บันทึกข้อมูล Node เรียบร้อยแล้ว', 'success');
        } else {
            const newNode: NodeData = {
                id: `NODE${String(nodes.length + 1).padStart(3, '0')}`,
                name: nodeName,
                area: nodeArea,
                status: 'online',
                lastMeasurement: {
                    timestamp: new Date().toLocaleString(),
                    temperature: 28.0,
                    humidity: 65,
                    ec: 400,
                    ph: 7.0,
                    nitrogen: 100,
                    phosphorus: 40,
                    potassium: 70
                }
            };
            setNodes([...nodes, newNode]);
            setShowAddModal(false);
            showToast('เพิ่ม Node ใหม่เรียบร้อยแล้ว', 'success');
        }
        setEditingNode(null);
        setNodeName('');
        setNodeArea('');
    };

    const handleNodeClick = (nodeId: string) => {
        router.push(`/device/node/${nodeId}`);
    };

    const handleDeleteNode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (editingNode) {
            setNodes(nodes.filter(node => node.id !== editingNode.id));
        }
        setShowEditModal(false);
        setEditingNode(null);
        showToast('ลบ Node เรียบร้อยแล้ว', 'success');
    };

    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleGraphCompare = () => {
        setSelectedNodes([]);
        setSelectedSensors([]);
        setShowGraphModal(true);
    };

    const handleNodeSelection = (nodeId: string) => {
        setSelectedNodes(prev =>
            prev.includes(nodeId)
                ? prev.filter(id => id !== nodeId)
                : [...prev, nodeId]
        );
    };

    const handleSensorSelection = (sensorKey: string) => {
        setSelectedSensors(prev =>
            prev.includes(sensorKey)
                ? prev.filter(key => key !== sensorKey)
                : [...prev, sensorKey]
        );
    };

    const getNodeColor = (nodeId: string, sensorKey: string) => {
        const nodeIndex = nodes.findIndex(node => node.id === nodeId);
        const sensorIndex = selectedSensors.indexOf(sensorKey);
        const colorIndex = (nodeIndex * selectedSensors.length + sensorIndex) % nodeColors.length;
        return nodeColors[nodeIndex % nodeColors.length];
    };

    const renderLines = () => {
        const lines: React.ReactNode[] = [];
        selectedNodes.forEach(nodeId => {
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                selectedSensors.forEach(sensor => {
                    const key = `${nodeId}_${sensor}`;
                    const color = getNodeColor(nodeId, sensor);
                    const sensorLabel = sensorOptions.find(s => s.key === sensor)?.label || sensor;

                    const isEC = sensor.toLowerCase().includes("ec");

                    lines.push(
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={color}
                            strokeWidth={2}
                            dot={<CustomDot sensor={sensor} color={color} />}
                            activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                            name={`${node.name} - ${sensorLabel}`}
                            yAxisId={isEC ? 'right' : 'left'} // ใช้แกนที่ต่างกัน
                        />
                    );
                });
            }
        });
        return lines;
    };



    const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    color: '#333',
                    minWidth: '200px'
                }}>
                    <div style={{
                        fontWeight: 600,
                        fontSize: '15px',
                        marginBottom: '8px',
                        borderBottom: '1px solid #eaeaea',
                        paddingBottom: '4px'
                    }}>
                        {label}
                    </div>

                    {[...payload]
                        .sort((a, b) => {
                            // key format: node1_temperature
                            const [nodeA, sensorA] = typeof a.dataKey === 'string' ? a.dataKey.split('_')[1] : '';
                            const [nodeB, sensorB] = typeof b.dataKey === 'string' ? b.dataKey.split('_')[1] : '';
                            if (sensorA < sensorB) return -1;
                            if (sensorA > sensorB) return 1;
                            if (nodeA < nodeB) return -1;
                            if (nodeA > nodeB) return 1;

                            return 0;
                        })
                        .map((entry, index) => {
                            const key = entry.dataKey as string;
                            const sensorKey = key.split('_')[1];
                            const Icon = sensorIconMap[sensorKey];

                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '6px',
                                        gap: '8px',
                                        color: entry.color,
                                    }}
                                >
                                    {Icon && <Icon size={18} />}
                                    <span style={{ flex: 1 }}>{entry.name}</span>
                                    <span style={{ fontWeight: 500 }}>{entry.value}</span>
                                </div>
                            );
                        })}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="station-container">
            <div className="station-header">
                <button className="back-button" onClick={() => window.history.back()}>
                    <ArrowLeft size={20} />
                    กลับ
                </button>

                <div className="station-header-actions">
                    <div className="station-search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="ค้นหา Node..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className="clear-search-btn"
                                onClick={handleClearSearch}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="section-node">
                <h2>Station {id}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className='compare-button' onClick={handleGraphCompare}>
                        <ChartArea size={20} />
                        เปรียบเทียบกราฟ
                    </button>
                    <button className="add-button" onClick={handleAdd}>
                        <PlusCircle size={20} />
                        <span>เพิ่ม Node</span>
                    </button>
                </div>
            </div>

            <div className="nodes-grid">
                {filteredNodes.length > 0 ? (
                    filteredNodes.map((node) => (
                        <div
                            key={node.id}
                            className={`node-card ${node.status}`}
                            onClick={() => handleNodeClick(node.id)}
                        >
                            <div className="node-card-header">
                                <div>
                                    <div className="node-card-title">{node.name}</div>
                                    <div className="node-area">{node.area}</div>
                                </div>
                                <div className="node-card-actions">
                                    <button className="edit-btn" onClick={(e) => handleEditClick(e, node)}>
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="node-metrics">
                                <div className="metric metric-temperature">
                                    <span className="metric-label"><Thermometer size={14} /> อุณหภูมิ</span>
                                    <span className="metric-value">{node.lastMeasurement.temperature}°C</span>
                                </div>
                                <div className="metric metric-humidity">
                                    <span className="metric-label"><Droplet size={14} /> ความชื้น</span>
                                    <span className="metric-value">{node.lastMeasurement.humidity}%</span>
                                </div>
                                <div className="metric metric-ph">
                                    <span className="metric-label"><Activity size={14} /> ph</span>
                                    <span className="metric-value">{node.lastMeasurement.ph}</span>
                                </div>
                                <div className="metric metric-ec">
                                    <span className="metric-label"><Zap size={14} /> ค่าการนำไฟฟ้า</span>
                                    <span className="metric-value">{node.lastMeasurement.ec} µS/cm</span>
                                </div>
                                <div className="metric metric-nitrogen">
                                    <span className="metric-label"><Leaf size={14} /> ไนโตรเจน (N)</span>
                                    <span className="metric-value">{node.lastMeasurement.nitrogen} mg/kg</span>
                                </div>
                                <div className="metric metric-phosphorus">
                                    <span className="metric-label"><Feather size={14} /> ฟอสฟอรัส (P)</span>
                                    <span className="metric-value">{node.lastMeasurement.phosphorus} mg/kg</span>
                                </div>
                                <div className="metric metric-potassium">
                                    <span className="metric-label"><Aperture size={14} /> โพแทสเซียม (K)</span>
                                    <span className="metric-value">{node.lastMeasurement.potassium} mg/kg</span>
                                </div>
                            </div>

                            <div className="node-details">
                                <div className="detail-item">
                                    <span className="detail-label">สถานะ:</span>
                                    <span className={`detail-value ${node.status === 'online' ? 'success' :
                                        'offline'}`}>
                                        {node.status === 'online' ? 'ออนไลน์' :
                                            'ออฟไลน์'}
                                    </span>
                                </div>
                            </div>

                            <div className="node-footer">
                                <div className="update-time">อัพเดทล่าสุด: {node.lastMeasurement.timestamp}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        padding: '40px',
                        color: '#666',
                        fontSize: '16px'
                    }}>
                        {searchQuery ?
                            `ไม่พบ Node ที่ตรงกับ "${searchQuery}"` :
                            'ไม่มี Node ใน Station นี้'
                        }
                    </div>
                )}
            </div>

            {/* Graph Comparison Modal */}
            {showGraphModal && (
                <div className="st-graph-modal-overlay" onClick={() => setShowGraphModal(false)}>
                    <div className="st-graph-modal" onClick={e => e.stopPropagation()}>
                        <div className="st-graph-modal-header">
                            <h2><ChartArea size={24} /> เปรียบเทียบกราฟข้อมูลเซ็นเซอร์</h2>
                            <button className="close-btn" onClick={() => setShowGraphModal(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="st-graph-modal-content">
                            <div className="st-graph-controls">
                                <div className="st-control-section">
                                    <h3><Filter size={18} /> เลือก Node</h3>
                                    <div className="st-node-selection-grid">
                                        {nodes.map((node, index) => (
                                            <label key={node.id} className="st-node-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedNodes.includes(node.id)}
                                                    onChange={() => handleNodeSelection(node.id)}
                                                />
                                                <span className="st-checkmark" style={{
                                                    backgroundColor: selectedNodes.includes(node.id) ? nodeColors[index % nodeColors.length] : 'transparent',
                                                    borderColor: nodeColors[index % nodeColors.length]
                                                }}></span>
                                                <span className="st-node-info">
                                                    <span className="st-node-name">{node.name}</span>
                                                    <span className="st-node-area">{node.area}</span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="st-control-section">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3><Settings size={18} /> เลือกเซ็นเซอร์</h3>
                                        <button
                                            onClick={handleSelectAllSensors}
                                            style={{
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                background: selectedSensors.length === sensorOptions.length ? '#4ADE80' : '#e0e0e0',
                                                color: selectedSensors.length === sensorOptions.length ? 'white' : '#666',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {selectedSensors.length === sensorOptions.length ? 'ยกเลิกการเลือกทั้งหมด' : 'เลือกทั้งหมด'}
                                        </button>
                                    </div>
                                    <div className="st-sensor-selection-grid">
                                        {sensorOptions.map((sensor) => {
                                            const Icon = sensor.icon;
                                            return (
                                                <label key={sensor.key} className="st-sensor-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSensors.includes(sensor.key)}
                                                        onChange={() => handleSensorSelection(sensor.key)}
                                                    />
                                                    <span className="st-checkmark"></span>
                                                    <Icon size={16} />
                                                    <span>{sensor.label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="st-control-section">
                                    <h3><Clock size={18} /> ช่วงเวลา</h3>
                                    <div className="st-time-interval">
                                        <label className="st-interval-radio">
                                            <input
                                                type="radio"
                                                value="hourly"
                                                checked={timeInterval === 'hourly'}
                                                onChange={(e) => setTimeInterval(e.target.value as 'hourly' | 'daily')}
                                            />
                                            <span>รายชั่วโมง</span>
                                        </label>
                                        <label className="st-interval-radio">
                                            <input
                                                type="radio"
                                                value="daily"
                                                checked={timeInterval === 'daily'}
                                                onChange={(e) => setTimeInterval(e.target.value as 'hourly' | 'daily')}
                                            />
                                            <span>รายวัน</span>
                                        </label>
                                    </div>
                                    <h3><Calendar size={18} /> ช่วงวันที่</h3>
                                    <div className="st-date-range">
                                        <div className="st-date-input-group">
                                            <label>วันที่เริ่มต้น</label>
                                            <input
                                                type="date"
                                                value={dateRange.startDate}
                                                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                                            />
                                        </div>
                                        <div className="st-date-input-group">
                                            <label>วันที่สิ้นสุด</label>
                                            <input
                                                type="date"
                                                value={dateRange.endDate}
                                                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '12px',
                                        color: '#666',
                                        marginTop: '8px',
                                        padding: '8px',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '4px'
                                    }}>
                                        <strong>หมายเหตุ:</strong> เลือกวันเดียวกันเพื่อดูข้อมูลรายชั่วโมง (00:00-23:59)
                                        หรือเลือกหลายวันเพื่อดูข้อมูลรายวัน
                                    </div>
                                </div>
                            </div>

                            <div className="st-graph-container">
                                {selectedNodes.length > 0 && selectedSensors.length > 0 ? (
                                    <div>
                                        {/* Legend ด้านบน */}
                                        <CustomLegendHorizontal payload={
                                            selectedNodes.flatMap(nodeId =>
                                                selectedSensors.map(sensor => {
                                                    const node = nodes.find(n => n.id === nodeId);
                                                    const color = getNodeColor(nodeId, sensor);
                                                    const sensorLabel = sensorOptions.find(s => s.key === sensor)?.label || sensor;

                                                    return {
                                                        dataKey: `${nodeId}_${sensor}`,
                                                        color: color,
                                                        value: `${node?.name} - ${sensorLabel}`
                                                    };
                                                })
                                            )
                                        } />

                                        {/* Chart */}
                                        <ResponsiveContainer width="100%" height={400}>
                                            <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                                <XAxis
                                                    dataKey="date"
                                                    stroke="#666"
                                                    fontSize={12}
                                                    angle={-45}
                                                    textAnchor="end"
                                                    height={60}
                                                    interval={1}
                                                />
                                                <YAxis yAxisId="left" stroke="#666" fontSize={12} />
                                                <YAxis
                                                    yAxisId="right"
                                                    orientation="right"
                                                    stroke="#8884d8"
                                                    fontSize={12}
                                                    label={{ value: 'EC (µS/cm)', angle: -90, position: 'insideRight' }}
                                                />
                                                <Tooltip content={<CustomTooltip />} />
                                                {/* ไม่ต้องมี Legend ตรงนี้ */}
                                                {renderLines()}
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div className="st-graph-placeholder">
                                        <ChartArea size={48} />
                                        <p>กรุณาเลือก Node และเซ็นเซอร์เพื่อแสดงกราฟ</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal - keeping existing modals */}
            {showEditModal && (
                <div className="edit-modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="edit-modal-header">
                            <h2>แก้ไขข้อมูล Node</h2>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="edit-modal-content">
                            <div className="form-group">
                                <label>ชื่อ Node</label>
                                <input
                                    type="text"
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                    placeholder="ระบุชื่อ Node"
                                />
                            </div>
                            <div className="form-group">
                                <label>ชื่อพื้นที่</label>
                                <input
                                    type="text"
                                    value={nodeArea}
                                    onChange={(e) => setNodeArea(e.target.value)}
                                    placeholder="ระบุชื่อพื้นที่"
                                />
                            </div>
                            <div className="Node-edit-modal-actions">
                                <button className="delete-btn" onClick={handleDeleteNode}>
                                    <Trash2 size={20} />
                                    ลบ Node
                                </button>
                                <div>
                                    <button className="cancel-btn" onClick={() => setShowEditModal(false)}>ยกเลิก</button>
                                    <button className="save-btn" onClick={handleSave}>บันทึก</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {showAddModal && (
                <div className="edit-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="edit-modal" onClick={e => e.stopPropagation()}>
                        <div className="edit-modal-header">
                            <h2>เพิ่ม Node ใหม่</h2>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="edit-modal-content">
                            <div className="form-group">
                                <label>ชื่อ Node</label>
                                <input
                                    type="text"
                                    value={nodeName}
                                    onChange={(e) => setNodeName(e.target.value)}
                                    placeholder="ระบุชื่อ Node"
                                />
                            </div>
                            <div className="form-group">
                                <label>ชื่อพื้นที่</label>
                                <input
                                    type="text"
                                    value={nodeArea}
                                    onChange={(e) => setNodeArea(e.target.value)}
                                    placeholder="ระบุชื่อพื้นที่"
                                />
                            </div>
                            <div className="Node-edit-modal-actions">
                                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>ยกเลิก</button>
                                <button className="save-btn" onClick={handleSave}>บันทึก</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Toast Notification */}
            {toast.show && (
                <div className={`st-toast ${toast.type === 'success' ? 'st-toast-success' : 'st-toast-error'}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
