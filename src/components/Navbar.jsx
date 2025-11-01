import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-800/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-white hover:text-yellow-300 transition-all"
        >
          <Shield className="w-7 h-7 text-yellow-400" />
          <span>SafeTrack</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {!user && (
            <>
              <Link
                to="/login"
                className={`relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-400 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all ${
                  location.pathname === "/login" ? "text-yellow-300" : "text-white"
                }`}
              >
                Login
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-yellow-200 transition-all"
              >
                Sign Up
              </motion.button>
            </>
          )}

          {user && (
            <div className="flex items-center gap-4">
              <span className="text-yellow-200 text-sm italic">
                Hi, {user.name} ({user.role})
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium shadow-md"
              >
                Logout
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
