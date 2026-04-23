import React from 'react'

export default function Navbar({ nodeCount, edgeCount, onReset, onExport }) {
    return (
        <nav style={{
            height: '56px',
            background: 'rgba(7, 11, 20, 0.95)',
            borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            backdropFilter: 'blur(12px)',
            flexShrink: 0,
            zIndex: 100,
        }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                    width: 32, height: 32,
                    background: 'linear-gradient(135deg, #00d4ff, #0066ff)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', boxShadow: '0 0 12px rgba(0,212,255,0.4)'
                }}>🕸️</div>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#00d4ff', animation: 'glow 3s infinite', letterSpacing: '0.5px' }}>
                        CrimeGraph <span style={{ color: '#fff' }}>AI</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Criminal Network Visualizer
                    </div>
                </div>
            </div>

            {/* Stats pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <StatPill label="Nodes" value={nodeCount} color="#00d4ff" />
                <StatPill label="Links" value={edgeCount} color="#a55eea" />
                <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 4px' }} />
                <button className="btn btn-ghost" onClick={onExport} style={{ fontSize: '12px', padding: '6px 12px' }}>
                    📤 Export PNG
                </button>
                <button className="btn btn-danger" onClick={onReset} style={{ fontSize: '12px', padding: '6px 12px' }}>
                    🔄 Reset Demo
                </button>
            </div>

            {/* Branding */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>
                    <div>AI4AP Police Initiative</div>
                    <div style={{ color: '#2ed573' }}>● System Online</div>
                </div>
                <div style={{ fontSize: '22px' }}>🛡️</div>
            </div>
        </nav>
    )
}

function StatPill({ label, value, color }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${color}30`,
            borderRadius: '20px', padding: '4px 12px',
        }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</span>
            <span style={{ fontSize: '14px', fontWeight: 700, color, fontFamily: 'var(--mono)' }}>{value}</span>
        </div>
    )
}
