'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/datatable.css';

const generateSampleData = () => {
  const data = [];
  const stations = ['Station A', 'Station B', 'Station C'];
  const areas = ['แปลงผักบุ้ง', 'แปลงผักกาด', 'แปลงผักคะน้า'];

  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - (30 * i));

    data.push({
      nodeId: `Node-${i}`,
      stationId: stations[Math.floor(Math.random() * stations.length)],
      area: areas[Math.floor(Math.random() * areas.length)],
      timestamp: date.toLocaleString('th-TH'),
      temperature: (20 + Math.random() * 15).toFixed(1),
      humidity: (60 + Math.random() * 30).toFixed(1),
      conductivity: (100 + Math.random() * 900).toFixed(0),
      pH: (5.5 + Math.random() * 3).toFixed(1),
      nitrogen: (50 + Math.random() * 150).toFixed(0),
      phosphorus: (20 + Math.random() * 80).toFixed(0),
      potassium: (100 + Math.random() * 200).toFixed(0)
    });
  }
  return data;
};

export default function DataTable() {
  const [data] = useState(generateSampleData());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 13;

  const filteredData = data.filter(item =>
    item.nodeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.stationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="dt-container">
      <div className="dt-header">
        <div className="dt-title">
          <h1>ตารางข้อมูล</h1>
        </div>
        <div className="dt-header-actions">
          <div className="dt-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="ค้นหาตาม Node, Station หรือพื้นที่"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="dt-table-container">
        <table className="dt-table">
          <thead>
            <tr>
              <th>Node ID</th>
              <th>Station</th>
              <th>พื้นที่</th>
              <th>เวลาล่าสุด</th>
              <th className="sensor temp">อุณหภูมิ (°C)</th>
              <th className="sensor humid">ความชื้น (%)</th>
              <th className="sensor cond">การนำไฟฟ้า (µS/cm)</th>
              <th className="sensor ph">pH</th>
              <th className="sensor n">ไนโตรเจน (mg/kg)</th>
              <th className="sensor p">ฟอสฟอรัส (mg/kg)</th>
              <th className="sensor k">โพแทสเซียม (mg/kg)</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.nodeId}</td>
                <td>{item.stationId}</td>
                <td>{item.area}</td>
                <td>{item.timestamp}</td>
                <td className="sensor temp">{item.temperature}</td>
                <td className="sensor humid">{item.humidity}</td>
                <td className="sensor cond">{item.conductivity}</td>
                <td className="sensor ph">{item.pH}</td>
                <td className="sensor n">{item.nitrogen}</td>
                <td className="sensor p">{item.phosphorus}</td>
                <td className="sensor k">{item.potassium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dt-pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="dt-page-button"
        >
          ก่อนหน้า
        </button>
        <span className="dt-page-info">
          หน้า {currentPage} จาก {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="dt-page-button"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
