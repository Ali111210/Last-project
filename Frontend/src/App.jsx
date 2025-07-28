import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
  