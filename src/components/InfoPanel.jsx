import React from 'react'
import { NODE_TYPES } from '../data/demoData'

const STATUS_COLORS = {
    'Arrested':            { bg: 'rgba(46,213,115,0.12)',  color: '#2ed573', border: 'rgba(46,213,115,0.3)'  },
    'Wanted':              { bg: 'rgba(255,71,87,0.12)',   color: '#ff4757', border: 'rgba(255,71,87,0.3)'   },
    'Absconding':          { bg: 'rgba(255,165,2,0.12)',   color: '#ffa502', border: 'rgba(255,165,2,0.3)'   },
    'Under Investigation': { bg: 'rgba(0,212,255,0.12)',   color: '#00d4ff', border: 'rgba(0,212,255,0.3)'   },
    'Active':              { bg: 'rgba(255,71,87,0.12)',   color: '#ff4757', border: 'rgba(255,71,87,0.3)'   },
    'Under Trial':         { bg: 'rgba(255,165,2,0.12)',   color: '#ffa502', border: 'rgba(255,165,2,0.3)'   },
    'Stolen':              { bg: 'rgba(255,71,87,0.12)',   color: '#ff4757', border: 'rgba(255,71,87,0.3)'   },
    'Seized':              { bg: 'rgba(46,213,115,0.12)',  color: '#2ed573', border: 'rgba(46,213,115,0.3)'  },
}

export default function InfoPanel({ node, edge, nodes = [], edges = [], onClose, onDelete, readOnly = false }) {
    if (!node && !edge) return null

    const isNode = !!node
    const cfg = isNode ? (NODE_TYPES[node.type] || NODE_TYPES.suspect) : null

    // ── Resolve edge from/to names ──
    const fromNode = !isNode ? nodes.find(n => n.id === edge.from) : null
    const toNode   = !isNode ? nodes.find(n => n.id === edge.to)   : null

    // ── Compute connections for selected node ──
    let connections = []
    if (isNode) {
        edges.forEach(e => {
            if (e.from === node.id) {
                const target = nodes.find(n => n.id === e.to)
                if (target) connections.push({ name: target.label, type: target.type, relation: e.label || '—', direction: 'out' })
            } else if (e.to === node.id) {
                const source = nodes.find(n => n.id === e.from)
                if (source) connections.push({ name: source.label, type: source.type, relation: e.label || '—', direction: 'in' })
            }
        })
    }

    return (
        <div className="info-panel fade-in">

            {/* ── HEADER ── */}
            <div className="info-header">
                <div className="info-header-left">
                    {isNode && (
                        <div className="info-type-badge"
                            style={{ background: cfg.color + '18', border: `1px solid ${cfg.color}40`, color: cfg.color }}>
                            <span>{cfg.icon}</span>
                            <span>{cfg.label}</span>
                        </div>
                    )}
                    {!isNode && (
                        <div className="info-type-badge"
                            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00d4ff' }}>
                            <span>🔗</span>
                            <span>Connection</span>
                        </div>
                    )}
                    <div className="info-title">
                        {isNode ? node.label : (edge.label || 'Link')}
                    </div>
                    {!isNode && (
                        <div className="info-edge-names">
                            <span className="info-edge-from">{fromNode?.label || `ID ${edge.from}`}</span>
                            <span className="info-edge-arrow">→</span>
                            <span className="info-edge-to">{toNode?.label || `ID ${edge.to}`}</span>
                        </div>
                    )}
                </div>
                <button className="info-close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="info-divider" style={{ background: isNode ? cfg.color + '40' : 'rgba(0,212,255,0.3)' }} />

            {/* ── NODE DETAILS ── */}
            {isNode && node.details && (
                <div className="info-body">
                    {Object.entries(node.details).map(([key, value]) => {
                        if (key === 'Status') return null
                        return (
                            <div key={key} className="info-row">
                                <span className="info-key">{key}</span>
                                <span className="info-val">{String(value)}</span>
                            </div>
                        )
                    })}

                    {/* Status badge */}
                    {node.details.Status && (() => {
                        const s = STATUS_COLORS[node.details.Status] || { bg: 'rgba(255,255,255,0.08)', color: '#aaa', border: 'rgba(255,255,255,0.15)' }
                        return (
                            <div className="info-status-row">
                                <span className="info-key">Status</span>
                                <span className="info-status-badge"
                                    style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                                    ● {node.details.Status}
                                </span>
                            </div>
                        )
                    })()}
                </div>
            )}

            {/* ── CONNECTIONS SECTION ── */}
            {isNode && connections.length > 0 && (
                <>
                    <div className="info-section-label">
                        <span>🔗 Connections</span>
                        <span className="info-conn-count">{connections.length}</span>
                    </div>
                    <div className="info-conn-list">
                        {connections.map((c, i) => {
                            const ccfg = NODE_TYPES[c.type] || NODE_TYPES.suspect
                            return (
                                <div key={i} className="info-conn-row">
                                    <div className="info-conn-left">
                                        <span className="info-conn-dot" style={{ background: ccfg.color }} />
                                        <span className="info-conn-name">{c.name}</span>
                                    </div>
                                    <div className="info-conn-right">
                                        <span className="info-conn-dir">{c.direction === 'out' ? '→' : '←'}</span>
                                        <span className="info-conn-rel">{c.relation}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}

            {/* ── EDGE DETAILS ── */}
            {!isNode && (
                <div className="info-body">
                    <div className="info-row">
                        <span className="info-key">From</span>
                        <span className="info-val">{fromNode?.label || `Node ${edge.from}`}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-key">Relationship</span>
                        <span className="info-val" style={{ color: '#00d4ff', fontWeight: 600 }}>{edge.label || '—'}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-key">To</span>
                        <span className="info-val">{toNode?.label || `Node ${edge.to}`}</span>
                    </div>
                    {fromNode && (
                        <div className="info-row">
                            <span className="info-key">From Type</span>
                            <span className="info-val" style={{ textTransform: 'capitalize' }}>{fromNode.type}</span>
                        </div>
                    )}
                    {toNode && (
                        <div className="info-row">
                            <span className="info-key">To Type</span>
                            <span className="info-val" style={{ textTransform: 'capitalize' }}>{toNode.type}</span>
                        </div>
                    )}
                </div>
            )}

            {/* ── ACTIONS ── */}
            <div className="info-actions">
                {!readOnly && (
                    <button className="info-btn info-btn-danger"
                        onClick={() => onDelete(isNode ? node : edge, isNode ? 'node' : 'edge')}>
                        🗑️ Remove
                    </button>
                )}
                <button className="info-btn info-btn-ghost" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
