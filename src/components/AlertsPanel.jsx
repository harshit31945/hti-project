import React from "react";
import { FaBell, FaExclamationTriangle } from "react-icons/fa";

export default function AlertsPanel() {
  const alerts = [
    { type: "danger", msg: "Child moved outside safe zone." },
    { type: "sos", msg: "SOS triggered near Gate 3." },
    { type: "safe", msg: "Child returned to school premises." },
  ];

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-3 flex items-center">
        <FaBell className="text-yellow-500 mr-2" /> Recent Alerts
      </h2>
      <ul className="space-y-2">
        {alerts.map((a, i) => (
          <li
            key={i}
            className={`p-3 rounded-lg ${
              a.type === "danger"
                ? "bg-red-100 text-red-700"
                : a.type === "sos"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {a.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
