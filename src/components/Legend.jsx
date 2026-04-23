import React from 'react'
import { NODE_TYPES } from '../data/demoData'

export default function Legend() {
    return (
        <div className="glass-card" style={{
            position: 'absolute', bottom: 20, left: 20,
            padding: '12px 16px', zIndex: 10,
            animation: 'fadeIn 0.4s ease',
        }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Node Legend
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {Object.entries(NODE_TYPES).map(([type, cfg]) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 6px ${cfg.color}80`, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{cfg.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
