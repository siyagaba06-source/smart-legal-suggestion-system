import React, { useState } from "react";
import bgImage from "../assets/lawyer-bg.jpg";
import { useNavigate } from "react-router-dom";

function LawyerRegister() {

const [form,setForm] = useState({
name:"",
email:"",
password:"",
phone:"",
specialization:"",
city:"",
charges:"",
experience:"",
total_cases:"",
cases_won:"",
about:""
});

const navigate = useNavigate(); // 🔥 IMPORTANT

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:5000/register-lawyer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(form)
  });

  await response.text();

  alert("🎉 Lawyer Registered Successfully!");

  navigate("/"); // ✅ FIXED
};

return (
  <div style={{ ...container, backgroundImage: `url(${bgImage})` }}>
    <div style={overlay}>
      <div style={card}>
        <h2 style={title}>Lawyer Registration</h2>

        <form onSubmit={handleSubmit}>

          <input style={input} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />

          <input style={input} type="email" name="email" placeholder="Email" onChange={handleChange} required />

          <input style={input} type="password" name="password" placeholder="Create Password" onChange={handleChange} required />

          <input style={input} type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />

          <select name="specialization" onChange={handleChange} style={input} required>
            <option value="">Select Specialization</option>
            <option>Criminal Law</option>
            <option>Civil Law</option>
            <option>Family Law</option>
            <option>Property Dispute</option>
            <option>Divorce Case</option>
            <option>Corporate Law</option>
            <option>Cyber Crime</option>
            <option>Consumer Court</option>
            <option>Tax Law</option>
            <option>Labour Law</option>
          </select>

          <input name="city" placeholder="City" onChange={handleChange} style={input} />

          <input name="experience" placeholder="Experience (Years)" onChange={handleChange} style={input} />

          <input name="total_cases" placeholder="Total Cases Handled" onChange={handleChange} style={input} />

          <input name="cases_won" placeholder="Cases Won" onChange={handleChange} style={input} />

          <textarea name="about" placeholder="About Lawyer" onChange={handleChange} style={textarea} />

          <input type="number" name="charges" placeholder="Case Charge (₹)" onChange={handleChange} style={input} />

          <button style={btn}>Register</button>

        </form>
      </div>
    </div>
  </div>
);
}

/* STYLES */

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

const textarea = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"8px",
  border:"none",
  height:"80px"
};

export default LawyerRegister;