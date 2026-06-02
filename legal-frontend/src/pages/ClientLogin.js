import React, { useState } from "react";
import bgImage from "../assets/client-bg.jpg";
import { useNavigate } from "react-router-dom";

function ClientLogin() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login Successful");
      navigate("/client-home");
      console.log(data.user);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{ ...container, backgroundImage: `url(${bgImage})` }}>
      <div style={overlay}>
        <div style={card}>
          <h2 style={title}>Client Login</h2>

          <form onSubmit={handleSubmit}>
            <input
              style={input}
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              style={input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button style={btn}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* same styling as before */

const container = {
  height: "100vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Segoe UI"
};

const overlay = {
  backgroundColor: "rgba(0,0,0,0.85)",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const card = {
  backgroundColor: "#1f1b2e",
  padding: "40px",
  borderRadius: "12px",
  width: "350px",
  color: "white",
  boxShadow: "0 5px 20px rgba(0,0,0,0.6)"
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#c084fc"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none"
};

const btn = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#9333ea",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

export default ClientLogin;