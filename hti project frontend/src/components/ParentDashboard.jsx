import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Bell } from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import "leaflet/dist/leaflet.css"

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(null)
  const [showAlerts, setShowAlerts] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  // 👧 Mock data
  const children = [
    { id: 1, name: "Aarav Sharma", age: 8, lastSeen: "2 mins ago", device: "HTI-2025A", status: "Active", location: [12.9716, 77.5946] },
    { id: 2, name: "Isha Patel", age: 10, lastSeen: "10 mins ago", device: "HTI-2025B", status: "Inactive", location: [12.972, 77.6] }
  ]

  const hazards = [
    { id: 1, type: "Electric Pole", location: [12.9705, 77.595] },
    { id: 2, type: "Solar Fence", location: [12.973, 77.593] }
  ]

  const alerts = [
    { id: 1, type: "Danger Zone", child: "Aarav Sharma", message: "Entered restricted area near solar fence", time: "2 mins ago" },
    { id: 2, type: "Low Battery", child: "Isha Patel", message: "Device battery below 20%", time: "10 mins ago" },
    { id: 3, type: "Inactivity", child: "Aarav Sharma", message: "No movement detected for 15 minutes", time: "25 mins ago" }
  ]

  const stats = [
    { title: "Total Children", value: children.length },
    { title: "Active Devices", value: 1 },
    { title: "Alerts This Week", value: alerts.length },
    { title: "Safe Zone %", value: "92%" }
  ]

  const activityData = [
    { day: "Mon", activity: 2 },
    { day: "Tue", activity: 3 },
    { day: "Wed", activity: 4 },
    { day: "Thu", activity: 1 },
    { day: "Fri", activity: 5 },
    { day: "Sat", activity: 2 },
    { day: "Sun", activity: 3 }
  ]

  const alertData = [
    { day: "Mon", alerts: 1 },
    { day: "Tue", alerts: 0 },
    { day: "Wed", alerts: 2 },
    { day: "Thu", alerts: 1 },
    { day: "Fri", alerts: 0 },
    { day: "Sat", alerts: 1 },
    { day: "Sun", alerts: 0 }
  ]

  return (
    <div className="p-6 space-y-6 relative">
      {/* 🔹 Top Bar with Logout + Alerts */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md mb-4 sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-blue-700">👨‍👩‍👧 Parent Dashboard</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowAlerts(true)}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
          >
            <Bell size={18} /> Alerts
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 text-white"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="bg-white/70 backdrop-blur-lg shadow-md hover:shadow-lg transition rounded-2xl">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-500">{s.title}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="activity" stroke="#4f46e5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-lg shadow-md rounded-2xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Alert Frequency</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={alertData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#f43f5e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Children Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children.map((child) => (
          <Card key={child.id} onClick={() => setSelectedChild(child)} className="cursor-pointer hover:shadow-lg transition bg-white/70 backdrop-blur-lg rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{child.name}</h3>
              <p className="text-sm text-gray-500">Age: {child.age}</p>
              <p className="text-sm text-gray-500">Device: {child.device}</p>
              <p className="text-sm text-gray-500">Last Seen: {child.lastSeen}</p>
              <p className={`text-sm font-medium ${child.status === "Active" ? "text-green-600" : "text-red-500"}`}>{child.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🗺️ Child Map Popup */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black/80 flex flex-col z-50">
          <div className="relative bg-white p-4 rounded-t-2xl shadow-lg">
            <button onClick={() => setSelectedChild(null)} className="absolute top-3 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 shadow-md transition">
              <X className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">{selectedChild.name}</h2>
            <p className="text-gray-600 text-sm">Age: {selectedChild.age} | Device: {selectedChild.device} | Last Seen: {selectedChild.lastSeen}</p>
          </div>
          <div className="flex-1">
            <MapContainer center={selectedChild.location} zoom={16} style={{ height: "100%", width: "100%" }}>
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

      {/* 🔔 Alerts Modal */}
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
              className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative"
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
                  <div key={a.id} className="p-3 rounded-xl border-l-4 border-red-500 bg-red-50 shadow-sm">
                    <p className="font-semibold text-gray-800">{a.type}</p>
                    <p className="text-sm text-gray-600">{a.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      👦 {a.child} • {a.time}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ParentDashboard
