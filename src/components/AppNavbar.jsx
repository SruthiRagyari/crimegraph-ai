import React from 'react'

export default function AppNavbar({ role, nodeCount, edgeCount, onBack, onReset, onExport, sidebarOpen, onToggleSidebar }) {
  const isInvestigator = role === 'investigator'

  return (
    <nav className="app-nav">
      <div className="app-nav-left">
        <button className="nav-icon-btn" onClick={onBack} title="Back to Home">←</button>
        <button className="nav-icon-btn" onClick={onToggleSidebar} title="Toggle sidebar">☰</button>
        <div className="app-logo">
          <span className="app-logo-icon">🕸️</span>
          <div className="app-logo-text">
            <span className="app-logo-name">CrimeGraph <b>AI</b></span>
            <span className="app-logo-role" style={{ color: isInvestigator ? '#ff4757' : '#00d4ff' }}>
              {isInvestigator ? '🔴 Investigator' : '🔵 Demo Mode'}
            </span>
          </div>
        </div>
      </div>

      <div className="app-nav-center">
        <StatPill label="Nodes" value={nodeCount} color="#00d4ff" />
        <StatPill label="Links" value={edgeCount} color="#a55eea" />
      </div>

      <div className="app-nav-right">
        {isInvestigator && onExport && (
          <button className="btn btn-ghost nav-btn" onClick={onExport}>📤 Export</button>
        )}
        {isInvestigator && onReset && (
          <button className="btn btn-danger nav-btn" onClick={onReset}>🔄 Reset</button>
        )}
        <div className="nav-status">● Online</div>
      </div>
    </nav>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div className="stat-pill">
      <span className="stat-pill-label">{label}</span>
      <span className="stat-pill-val" style={{ color }}>{value}</span>
    </div>
  )
}
