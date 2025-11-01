import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "parent",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }

      setSuccess("✅ Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-page relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Soft gradient glow blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[480px] h-[480px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 rounded-full blur-[160px] opacity-30 animate-pulse"></div>

      {/* Floating particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-[25%] left-[40%] blur-sm animate-bounce"></div>
        <div className="absolute w-2 h-2 bg-pink-500 rounded-full top-[60%] left-[60%] blur-sm animate-ping"></div>
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full top-[45%] left-[75%] blur-sm animate-bounce"></div>
      </motion.div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <Card className="w-[90vw] max-w-md bg-white/60 border border-white/40 backdrop-blur-2xl shadow-[0_8px_40px_rgba(37,99,235,0.2)] rounded-3xl relative overflow-hidden">
          {/* Gradient Accent Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 via-purple-300/10 to-pink-300/10 rounded-3xl blur-2xl"></div>

          <CardContent className="relative p-8 z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative">
                <ShieldCheck className="w-14 h-14 text-blue-700 drop-shadow-md mb-2" />
                <motion.span
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-14 h-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1 }}
                ></motion.span>
              </div>
              <h2 className="text-3xl font-extrabold mt-3 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Create Your SafeTrack Account
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Stay connected, stay protected — your child’s safety starts here.
              </p>
            </div>

            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-100 text-red-700 p-2 rounded-md text-sm mb-4 text-center"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-green-100 text-green-700 p-2 rounded-md text-sm mb-4 text-center"
              >
                {success}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "your name" },
                { label: "Email Address", name: "email", type: "email", placeholder: "you@example.com" },
                { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 bg-white/70 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/70 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                >
                  <option value="parent">Parent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-blue-300/40 transition-all"
                >
                  Sign Up
                </Button>
              </motion.div>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-700 font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* footer */}
      <p className="absolute bottom-3 text-xs text-gray-500 tracking-wide">
        © {new Date().getFullYear()} SafeTrack. All rights reserved.
      </p>
    </div>
  );
}

