import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/background.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ ...container, backgroundImage: `url(${bgImage})` }}>
      <div style={overlay}>
        <div style={contentWrapper}>

          {/* LEFT SECTION */}
          <div style={leftSection}>
            <h1 style={title}>⚖ Legal Management System</h1>
            <p style={subtitle}>
              A Smart Platform Connecting Clients with Verified Legal Experts
            </p>

            <div style={buttonGroup}>
              {/* REGISTER BUTTONS */}
              <button
                style={primaryBtn}
                onClick={() => navigate("/client-register")}
              >
                Client Register
              </button>

              <button
                style={outlineBtn}
                onClick={() => navigate("/lawyer-register")}
              >
                Lawyer Register
              </button>

              {/* LOGIN BUTTONS (Same Style) */}
              <button
                style={primaryBtn}
                onClick={() => navigate("/client-login")}
              >
                Client Login
              </button>

              <button
                style={outlineBtn}
                onClick={() => navigate("/lawyer-login")}
              >
                Lawyer Login
              </button>
            </div>

            <p style={disclaimer}>
              Disclaimer: This platform is developed for academic project demonstration purposes only.
            </p>
          </div>

          {/* RIGHT INFO BOXES */}
          <div style={rightSection}>
            <div style={infoBox}>
              <h3>🔐 Secure Authentication</h3>
              <p>Separate login system for Clients and Lawyers with secure database storage.</p>
            </div>

            <div style={infoBox}>
              <h3>⚖ Smart Lawyer Matching</h3>
              <p>Clients can choose lawyers based on specialization and expertise.</p>
            </div>

            <div style={infoBox}>
              <h3>📩 Lawyer Information</h3>
              <p>Get connected with your Lawyer personally after request acceptance.</p>
            </div>

            <div style={infoBox}>
              <h3>💾 Database Integration</h3>
              <p>Built using React, Node.js, Express & MySQL for dynamic functionality.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  fontFamily: "Segoe UI"
};

const overlay = {
  backgroundColor: "rgba(0,0,0,0.85)",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const contentWrapper = {
  display: "flex",
  width: "85%",
  justifyContent: "space-between",
  alignItems: "center"
};

const leftSection = {
  width: "45%",
  color: "white"
};

const rightSection = {
  width: "40%",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const title = {
  fontSize: "36px",
  color: "#c084fc",
  marginBottom: "15px"
};

const subtitle = {
  color: "#ccc",
  marginBottom: "25px"
};

const buttonGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginBottom: "20px"
};

const primaryBtn = {
  padding: "10px 20px",
  backgroundColor: "#9333ea",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const outlineBtn = {
  padding: "10px 20px",
  backgroundColor: "transparent",
  border: "1px solid #9333ea",
  borderRadius: "6px",
  color: "#9333ea",
  cursor: "pointer"
};

const infoBox = {
  backgroundColor: "#1f1b2e",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  boxShadow: "0 5px 15px rgba(0,0,0,0.5)"
};

const disclaimer = {
  fontSize: "12px",
  color: "#aaa",
  marginTop: "10px"
};

export default Home;