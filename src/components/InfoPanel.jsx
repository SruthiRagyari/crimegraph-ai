import React from 'react'
import { NODE_TYPES } from '../data/demoData'

export default function InfoPanel({ node, edge, onClose, onDelete }) {
    if (!node && !edge) return null

    const isNode = !!node
    const item = node || edge

    return (
        <div className="glass-card fade-in" style={{
            position: 'absolute', top: 20, right: 20,
            width: 280, zIndex: 20,
            border: '1px solid var(--border-bright)',
        }}>
            {/* Header */}
            <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
                <div style={{ flex: 1 }}>
                    {isNode && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <div style={{
                                width: 10, height: 10, borderRadius: '50%',
                                background: NODE_TYPES[node.type]?.color || '#00d4ff',
                                boxShadow: `0 0 6px ${NODE_TYPES[node.type]?.color || '#00d4ff'}`,
                            }} />
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
                                {node.type}
                            </span>
                        </div>
                    )}
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                        {isNode ? node.label.replace('\n', ' ') : `${edge.from} → ${edge.to}`}
                    </div>
                    {!isNode && (
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>{edge.label}</div>
                    )}
                </div>
                <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '18px', padding: '0 0 0 8px' }}>×</button>
            </div>

            {/* Details */}
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isNode && node.details && Object.entries(node.details).map(([key, value]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize', fontWeight: 600, flexShrink: 0 }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'right', fontFamily: typeof value === 'number' ? 'var(--mono)' : 'inherit' }}>
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                        </span>
                    </div>
                ))}

                {/* Status badge for suspects */}
                {isNode && node.details?.status && (
                    <div style={{ marginTop: 4 }}>
                        <StatusBadge status={node.details.status} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
                <button className="btn btn-danger" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '6px' }} onClick={() => onDelete(item, isNode ? 'node' : 'edge')}>
                    🗑️ Remove
                </button>
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '12px', padding: '6px' }} onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

function StatusBadge({ status }) {
    const colors = {
        'Arrested': { bg: 'rgba(46, 213, 115, 0.15)', color: '#2ed573', border: 'rgba(46, 213, 115, 0.3)' },
        'Wanted': { bg: 'rgba(255, 71, 87, 0.15)', color: '#ff4757', border: 'rgba(255, 71, 87, 0.3)' },
        'Absconding': { bg: 'rgba(255, 165, 2, 0.15)', color: '#ffa502', border: 'rgba(255, 165, 2, 0.3)' },
        'Under Investigation': { bg: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: 'rgba(0, 212, 255, 0.3)' },
    }
    const style = colors[status] || { bg: 'rgba(255,255,255,0.1)', color: '#fff', border: 'rgba(255,255,255,0.2)' }
    return (
        <div className="badge" style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}`, fontSize: '10px' }}>
            ● {status}
        </div>
    )
}
