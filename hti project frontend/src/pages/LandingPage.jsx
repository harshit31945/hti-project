import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Real-Time GPS Tracking",
      desc: "Track your child’s live location with instant updates and smart alerts.",
      icon: "📍",
      color: "from-blue-100 to-blue-200",
    },
    {
      title: "Emergency SOS System",
      desc: "Children can trigger emergency alerts directly to parents and nearby responders.",
      icon: "🚨",
      color: "from-red-100 to-red-200",
    },
    {
      title: "AI-Powered Safety Zones",
      desc: "Get predictive insights on safe and unsafe areas powered by AI analysis.",
      icon: "🤖",
      color: "from-purple-100 to-purple-200",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-4 leading-tight"
        >
          🛡️ Smart Child Safety <span className="text-blue-600">Tracker</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8"
        >
          Empower parents and schools with real-time monitoring, emergency alerts, and AI-driven safety intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => navigate("/signup")}
            className="bg-blue-700 hover:bg-blue-800 text-white text-lg px-8 py-4 rounded-xl shadow-md"
          >
            Get Started for Free
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-24">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className={`bg-gradient-to-br ${f.color} border-0 shadow-lg rounded-2xl hover:scale-[1.03] transition`}>
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-700 to-blue-600 text-white text-center py-20 px-6"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Join Thousands of Parents Using SafeTrack
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
          Start tracking your child’s safety today with smart technology and instant alerts.
        </p>
        <Button
          onClick={() => navigate("/signup")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-lg px-8 py-3 rounded-xl font-semibold shadow-md"
        >
          Create Free Account
        </Button>
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 text-center py-6 text-sm">
        © {new Date().getFullYear()} SafeTrack — All rights reserved.
      </footer>
    </div>
  );
}
