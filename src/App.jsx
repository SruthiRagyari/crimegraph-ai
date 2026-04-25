import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import InvestigatorApp from './pages/InvestigatorApp'
import DemoApp from './pages/DemoApp'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/investigator" element={<InvestigatorApp />} />
        <Route path="/demo" element={<DemoApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
