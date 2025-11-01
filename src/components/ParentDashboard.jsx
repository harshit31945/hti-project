import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Bell, Shield, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 👧 Mock data
  const children = [
    {
      id: 1,
      name: "Aarav Sharma",
      age: 8,
      lastSeen: "2 mins ago",
      device: "HTI-2025A",
      status: "Active",
      location: [12.9716, 77.5946],
    },
    {
      id: 2,
      name: "Isha Patel",
      age: 10,
      lastSeen: "10 mins ago",
      device: "HTI-2025B",
      status: "Inactive",
      location: [12.972, 77.6],
    },
  ];

  const hazards = [
    { id: 1, type: "Electric Pole", location: [12.9705, 77.595] },
    { id: 2, type: "Solar Fence", location: [12.973, 77.593] },
  ];

  const alerts = [
    {
      id: 1,
      type: "Danger Zone",
      child: "Aarav Sharma",
      message: "Entered restricted area near solar fence",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "Low Battery",
      child: "Isha Patel",
      message: "Device battery below 20%",
      time: "10 mins ago",
    },
    {
      id: 3,
      type: "Inactivity",
      child: "Aarav Sharma",
      message: "No movement detected for 15 minutes",
      time: "25 mins ago",
    },
  ];

  const stats = [
    { title: "Total Children", value: children.length },
    { title: "Active Devices", value: 1 },
    { title: "Alerts This Week", value: alerts.length },
    { title: "Safe Zone %", value: "92%" },
  ];

  const activityData = [
    { day: "Mon", activity: 2 },
    { day: "Tue", activity: 3 },
    { day: "Wed", activity: 4 },
    { day: "Thu", activity: 1 },
    { day: "Fri", activity: 5 },
    { day: "Sat", activity: 2 },
    { day: "Sun", activity: 3 },
  ];

  const alertData = [
    { day: "Mon", alerts: 1 },
    { day: "Tue", alerts: 0 },
    { day: "Wed", alerts: 2 },
    { day: "Thu", alerts: 1 },
    { day: "Fri", alerts: 0 },
    { day: "Sat", alerts: 1 },
    { day: "Sun", alerts: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 space-y-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-md sticky top-0 z-10"
      >
        <div className="flex items-center gap-2">
          <Shield className="text-blue-600 w-7 h-7" />
          <h1 className="text-2xl font-extrabold text-blue-700">
            SafeTrack Parent Dashboard
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowAlerts(true)}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center gap-2 shadow-md hover:shadow-red-300/40 transition"
          >
            <Bell size={18} /> Alerts
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md hover:shadow-gray-400/40"
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <Card
            key={i}
            className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-md rounded-2xl hover:-translate-y-1 hover:shadow-lg transition"
          >
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md border border-white/30">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <Activity className="text-blue-500" /> Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "#2563eb", fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md border border-white/30">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <Bell className="text-red-500" /> Alert Frequency
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={alertData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Children List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {children.map((child) => (
          <Card
            key={child.id}
            onClick={() => setSelectedChild(child)}
            className="cursor-pointer bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition"
          >
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                👦 {child.name}
              </h3>
              <p className="text-sm text-gray-600">Age: {child.age}</p>
              <p className="text-sm text-gray-600">Device: {child.device}</p>
              <p className="text-sm text-gray-600">Last Seen: {child.lastSeen}</p>
              <p
                className={`text-sm font-medium ${
                  child.status === "Active" ? "text-green-600" : "text-red-500"
                }`}
              >
                {child.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Map Popup */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black/80 flex flex-col z-50">
          <div className="relative bg-white p-4 rounded-t-2xl shadow-lg">
            <button
              onClick={() => setSelectedChild(null)}
              className="absolute top-3 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md transition"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedChild.name}
            </h2>
            <p className="text-gray-600 text-sm">
              Age: {selectedChild.age} | Device: {selectedChild.device} | Last
              Seen: {selectedChild.lastSeen}
            </p>
          </div>
          <div className="flex-1">
            <MapContainer
              center={selectedChild.location}
              zoom={16}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={selectedChild.location}>
                <Popup>{selectedChild.name}</Popup>
              </Marker>
              {hazards.map((hz) => (
                <Marker key={hz.id} position={hz.location}>
                  <Popup>{hz.type}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      )}

      {/* Alerts Modal */}
      <AnimatePresence>
        {showAlerts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setShowAlerts(false)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="text-red-500" /> Recent Alerts
              </h2>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {alerts.map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: a.id * 0.1 }}
                    className="p-3 rounded-xl border-l-4 border-red-500 bg-red-50 shadow-sm"
                  >
                    <p className="font-semibold text-gray-800">{a.type}</p>
                    <p className="text-sm text-gray-600">{a.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      👦 {a.child} • {a.time}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentDashboard;
