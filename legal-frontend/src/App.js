import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ClientRegister from "./pages/ClientRegister";
import LawyerRegister from "./pages/LawyerRegister";
import ClientLogin from "./pages/ClientLogin";
import LawyerLogin from "./pages/LawyerLogin";
import ClientDashboard from "./pages/ClientDashboard";
import LawyerDashboard from "./pages/LawyerDashboard";
import CaseRoom from "./pages/CaseRoom";
import ClientHome from "./pages/ClientHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/client-register" element={<ClientRegister />} />
        <Route path="/lawyer-register" element={<LawyerRegister />} />

        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/lawyer-login" element={<LawyerLogin />} />

        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />

        <Route path="/case-room" element={<CaseRoom />} />
        <Route path="/client-home" element={<ClientHome />} />
      </Routes>
    </Router>
  );
}

export default App;