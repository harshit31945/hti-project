import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, LogIn } from "lucide-react";
import "./Login.css"; // add this line if not already imported

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      setSuccess(`✅ Logged in as ${data.role}`);
      setTimeout(() => {
        navigate(data.role === "admin" ? "/admin" : "/parent");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      {/* Floating glows & particles */}
      <div className="particle p1"></div>
      <div className="particle p2"></div>
      <div className="particle p3"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="login-card"
      >
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="flex justify-center items-center gap-2 text-blue-700">
            <Shield className="w-10 h-10 drop-shadow-md" />
            <h1 className="login-title">Welcome to SafeTrack</h1>
          </div>
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-24 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />
          <p className="login-subtext">Secure access to your child safety dashboard.</p>
        </div>

        {/* Alerts */}
        {error && <div className="alert-error">{error}</div>}
        {success && <div className="alert-success">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="login-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="login-input"
            />
          </div>

          {/* Forgot Password */}
          <motion.div
            className="text-right mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="forgot-password-link"
            >
              Forgot Password?
            </button>
          </motion.div>

          {/* Submit */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="login-btn flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" /> Login
            </Button>
          </motion.div>
        </form>

        {/* Footer */}
        <div className="login-footer mt-5">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-700 font-semibold hover:underline"
          >
            Sign up
          </button>
        </div>
      </motion.div>

      <p className="absolute bottom-3 text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} SafeTrack. All rights reserved.
      </p>
    </div>
  );
}

