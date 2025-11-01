import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-12">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>
          © {new Date().getFullYear()} SafeTrack — Designed for Child Safety in
          Schools & Communities
        </p>
        <p className="text-blue-200 mt-1">
          Contact: support@safetrack.ai | +91 99999 99999
        </p>
      </div>
    </footer>
  );
}
