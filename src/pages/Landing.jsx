import React from 'react'
import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🕸️',
    title: 'Visual Network Mapping',
    desc: 'Map connections between suspects, crimes, locations, vehicles and devices on an interactive force-directed graph.',
  },
  {
    icon: '🔍',
    title: 'Instant Search & Filter',
    desc: 'Search across all entities in real time. Filter by type — suspects, crimes, locations, phones or vehicles.',
  },
  {
    icon: '📋',
    title: 'Click-to-Inspect Details',
    desc: 'Click any node to view case numbers, IPC/BNS sections, suspect status, and investigation metadata instantly.',
  },
  {
    icon: '➕',
    title: 'Dynamic Case Building',
    desc: 'Add new suspects, cases, locations and connections dynamically as investigations evolve.',
  },
  {
    icon: '📤',
    title: 'Export as PNG',
    desc: 'Download the full network graph as a PNG image for reports and case documentation.',
  },
  {
    icon: '🛡️',
    title: 'Built for AP Police',
    desc: 'Designed to complement AI4AP Police\'s PoliceLLM & CognitiveNetAI pipeline as a visual intelligence layer.',
  },
]

const STEPS = [
  { num: '01', title: 'View the Network', desc: 'The graph auto-loads a criminal network. Nodes are color-coded by type. Drag and scroll to explore.' },
  { num: '02', title: 'Click Any Node', desc: 'Click a red circle (suspect), orange diamond (crime), green triangle (location) to see full details.' },
  { num: '03', title: 'Search & Filter', desc: 'Use the sidebar search to find a name. Click filter buttons to isolate suspects, crimes, or locations.' },
  { num: '04', title: 'Add New Entities', desc: 'Investigators: use "Add Node" to add a new suspect, and "Add Link" to connect them to a crime or location.' },
  { num: '05', title: 'Export the Graph', desc: 'Click "Export PNG" in the top bar to download the network map for your case report.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-root">
      {/* ── NAV ── */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="landing-logo-icon">🕸️</span>
            <span className="landing-logo-text">CrimeGraph <span style={{ color: '#fff' }}>AI</span></span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#how-to-use">How to Use</a>
            <a href="https://github.com/SruthiRagyari/crimegraph-ai" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-badge">🛡️ AI4 Andhra Pradesh Police Initiative</div>
        <h1 className="hero-title">
          Criminal Network<br />
          <span className="hero-accent">Visualizer</span>
        </h1>
        <p className="hero-subtitle">
          An interactive visual link-analysis platform for law enforcement. Map suspects,
          crimes, locations, vehicles and devices — and uncover hidden connections instantly.
        </p>
        <div className="hero-cta">
          <button className="btn-hero-primary" onClick={() => navigate('/investigator')}>
            🔴 Enter as Investigator
            <span className="btn-sub">Full access — add &amp; edit</span>
          </button>
          <button className="btn-hero-secondary" onClick={() => navigate('/demo')}>
            🔵 View Demo
            <span className="btn-sub">Read-only · No login needed</span>
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">15+</span><span className="stat-label">Network Entities</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">22+</span><span className="stat-label">Relationships</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">5</span><span className="stat-label">Entity Types</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">Live</span><span className="stat-label">on Vercel</span></div>
        </div>
      </section>

      {/* ── NODE TYPES LEGEND ── */}
      <section className="legend-strip">
        <div className="legend-strip-inner">
          {[
            { color: '#ff4757', shape: '●', label: 'Suspect' },
            { color: '#ffa502', shape: '◆', label: 'Crime / Case' },
            { color: '#2ed573', shape: '▲', label: 'Location' },
            { color: '#eccc68', shape: '■', label: 'Phone / Device' },
            { color: '#a55eea', shape: '★', label: 'Vehicle' },
          ].map(t => (
            <div key={t.label} className="legend-pill">
              <span style={{ color: t.color, fontSize: '18px' }}>{t.shape}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-wrap" id="features">
        <div className="section-label">What It Does</div>
        <h2 className="section-title">Everything an investigator needs</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-name">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="section-wrap alt-bg" id="how-to-use">
        <div className="section-label">Guide</div>
        <h2 className="section-title">How to use CrimeGraph AI</h2>
        <div className="steps-grid">
          {STEPS.map(s => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="section-wrap" id="access">
        <div className="section-label">Access</div>
        <h2 className="section-title">Choose your access level</h2>
        <div className="roles-grid">
          <div className="role-card role-investigator">
            <div className="role-icon">🔴</div>
            <h3 className="role-name">Investigator</h3>
            <ul className="role-features">
              <li>✅ View full criminal network</li>
              <li>✅ Add new suspects &amp; cases</li>
              <li>✅ Create connections between entities</li>
              <li>✅ Delete nodes &amp; links</li>
              <li>✅ Export graph as PNG</li>
              <li>✅ Search &amp; filter all entities</li>
            </ul>
            <button className="btn-role btn-role-primary" onClick={() => navigate('/investigator')}>
              Enter as Investigator →
            </button>
          </div>

          <div className="role-card role-demo">
            <div className="role-icon">🔵</div>
            <h3 className="role-name">Demo / Public</h3>
            <ul className="role-features">
              <li>✅ View full criminal network</li>
              <li>✅ Click nodes to see details</li>
              <li>✅ Search &amp; filter</li>
              <li>✅ Zoom &amp; explore</li>
              <li>🔒 Cannot add or delete</li>
              <li>🔒 Cannot modify data</li>
            </ul>
            <button className="btn-role btn-role-secondary" onClick={() => navigate('/demo')}>
              View Demo →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="landing-logo-icon">🕸️</span>
            <span style={{ fontWeight: 700, color: '#00d4ff' }}>CrimeGraph AI</span>
          </div>
          <p className="footer-text">
            Built for the <strong>AI4 Andhra Pradesh Police Internship Initiative</strong> · 
            <a href="https://github.com/SruthiRagyari/crimegraph-ai" target="_blank" rel="noreferrer"> GitHub</a> · 
            <a href="https://interns.appolice.gov.in" target="_blank" rel="noreferrer"> AI4AP Police</a>
          </p>
          <p className="footer-copy">© 2025 Sruthi Ragyari · MIT License</p>
        </div>
      </footer>
    </div>
  )
}
