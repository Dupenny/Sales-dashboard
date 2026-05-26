import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/transactions" element={<ComingSoon />} />
        <Route path="/portfolio" element={<ComingSoon />} />
        <Route path="/clients" element={<ComingSoon />} />
        <Route path="/invoices" element={<ComingSoon />} />
        <Route path="/wallet" element={<ComingSoon />} />
        <Route path="/notifications" element={<ComingSoon />} />
        <Route path="/settings" element={<ComingSoon />} />
        <Route path="/help" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
