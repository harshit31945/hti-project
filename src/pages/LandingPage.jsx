import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Bot, Shield, Sparkles } from "lucide-react";
import "./LandingPage.css";
import familyImg from "../assets/family.png"; // ✅ your local image

export default function LandingPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // 🌌 PARTICLE BACKGROUND EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59,130,246,0.7)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      // ✨ Connect lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168,85,247,${1 - dist / 150})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // 🌈 FEATURES LIST
  const features = [
    {
      icon: <MapPin />,
      title: "Real-Time GPS Tracking",
      desc: "Stay connected with live location updates and instant alerts.",
    },
    {
      icon: <AlertTriangle />,
      title: "Emergency SOS System",
      desc: "Instant emergency alerts for immediate parental response.",
    },
    {
      icon: <Bot />,
      title: "AI Safety Zones",
      desc: "Predictive AI detects unsafe regions before risk arises.",
    },
  ];

  return (
    <div className="landing-page">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-title"
          >
            <Shield className="hero-icon" />
            SafeTrack <span>AI Guardian</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="hero-subtitle"
          >
            Intelligent child safety powered by real-time tracking, instant alerts, 
            and predictive AI protection.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="hero-btn"
            onClick={() => navigate("/signup")}
          >
            Get Started for Free
          </motion.button>
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hero-illustration"
        >
          <img
            src={familyImg}
            alt="SafeTrack Family"
            className="glow-image"
          />
          <div className="floating-icons">
            <MapPin className="float-icon cyan" />
            <Bot className="float-icon violet" />
            <AlertTriangle className="float-icon pink" />
            <Sparkles className="float-icon yellow" />
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="feature-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2>Experience Next-Gen Safety Today 🚀</h2>
        <p>
          Protect your loved ones with real-time tracking and AI-powered awareness.
        </p>
        <button onClick={() => navigate("/signup")} className="cta-btn">
          Join Safe Families
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © {new Date().getFullYear()} SafeTrack — Powered by AI.
      </footer>
    </div>
  );
}
