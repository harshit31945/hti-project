import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  Activity,
  Bell,
  Cpu,
  MapPin,
  Download,
  X,
} from "lucide-react";
import "./Dashboard.css";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockSummary = {
    totalMembers: 124,
    totalChildren: 60,
    totalParents: 58,
    devicesOnline: 48,
    hazardZones: 12,
    activeAlerts: 2,
  };

  const mockChildren = [
    {
      id: "C001",
      firstName: "Aarav",
      lastName: "Shah",
      age: 7,
      school: "Greenwood Intl",
      homeLocation: "Block A, Flat 12",
      deviceId: "D1001",
      lastGps: { timestamp: "2025-10-29T15:12:00Z" },
      lastAlert: null,
      parents: [
        {
          firstName: "Rohit",
          lastName: "Shah",
          email: "rohit@example.com",
          phone: "+91-9876543210",
          lastLoginAt: "2025-10-29T13:00:00Z",
        },
      ],
    },
    {
      id: "C002",
      firstName: "Maya",
      lastName: "Kumar",
      age: 8,
      school: "St Marys",
      homeLocation: "Block B, Flat 3",
      deviceId: "D1002",
      lastGps: { timestamp: "2025-10-30T07:45:00Z" },
      lastAlert: { message: "Near solar fence" },
      parents: [
        {
          firstName: "Neha",
          lastName: "Kumar",
          email: "neha@example.com",
          phone: "+91-9123456780",
          lastLoginAt: "2025-10-30T06:50:00Z",
        },
      ],
    },
  ];

  useEffect(() => {
    setSummary(mockSummary);
    setChildren(mockChildren);
    setLoading(false);
  }, []);

  function formatDate(iso) {
    return new Date(iso).toLocaleString();
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-left">
          <Shield size={26} />
          <h1>SafeTrack Admin Dashboard</h1>
        </div>
        <div className="header-right">
          <button className="btn btn-export">
            <Download size={18} /> Export CSV
          </button>
          <button className="btn btn-logout">Logout</button>
        </div>
      </header>

      <section className="stats-section">
        {[
          { title: "Total Members", value: summary?.totalMembers, icon: <Users /> },
          { title: "Children", value: summary?.totalChildren, icon: <Activity /> },
          { title: "Parents", value: summary?.totalParents, icon: <Users /> },
          { title: "Devices Online", value: summary?.devicesOnline, icon: <Cpu /> },
          { title: "Hazard Zones", value: summary?.hazardZones, icon: <MapPin /> },
          { title: "Active Alerts", value: summary?.activeAlerts, icon: <Bell /> },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="stat-icon">{item.icon}</div>
            <p className="stat-title">{item.title}</p>
            <p className="stat-value">{loading ? "…" : item.value}</p>
          </motion.div>
        ))}
      </section>

      <section className="table-section">
        <div className="table-header">
          <h2>Children Records</h2>
          <p>{children.length} records</p>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>School</th>
                <th>Home</th>
                <th>Device</th>
                <th>Last Seen</th>
                <th>Alert</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.id}>
                  <td>{child.id}</td>
                  <td>{child.firstName + " " + child.lastName}</td>
                  <td>{child.age}</td>
                  <td>{child.school}</td>
                  <td>{child.homeLocation}</td>
                  <td>{child.deviceId}</td>
                  <td>{formatDate(child.lastGps.timestamp)}</td>
                  <td className={child.lastAlert ? "alert-active" : "alert-none"}>
                    {child.lastAlert ? child.lastAlert.message : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
