import React, { useState } from 'react'
import NodeForm from './NodeForm'
import EdgeForm from './EdgeForm'
import { NODE_TYPES } from '../data/demoData'

export default function Sidebar({ nodes, onAddNode, onAddEdge, filterType, setFilterType, searchQuery, setSearchQuery, readOnly = false }) {
    const [activeTab, setActiveTab] = useState('add-node') // 'add-node' | 'add-edge' | 'filter'

    const suspectCount = nodes.filter(n => n.type === 'suspect').length
    const crimeCount = nodes.filter(n => n.type === 'crime').length

    return (
        <div className="glass-card" style={{
            width: 280, flexShrink: 0,
            display: 'flex', flexDirection: 'column',
            gap: 0, overflow: 'hidden',
            borderRadius: 0,
            borderTop: 'none', borderBottom: 'none', borderLeft: 'none',
        }}>
            {/* Summary Stats */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                    Network Summary
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <MiniStat label="Suspects" value={suspectCount} color="#ff4757" />
                    <MiniStat label="Crimes" value={crimeCount} color="#ffa502" />
                    <MiniStat label="Locations" value={nodes.filter(n => n.type === 'location').length} color="#2ed573" />
                    <MiniStat label="Vehicles" value={nodes.filter(n => n.type === 'vehicle').length} color="#a55eea" />
                </div>
            </div>

            {/* Search */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <div className="form-group" style={{ gap: 4 }}>
                    <label>Search Network</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '13px' }}>🔍</span>
                        <input
                            style={{ paddingLeft: 30 }}
                            placeholder="Name, case, location..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter by type */}
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Filter by Type</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <FilterChip label="All" active={filterType === 'all'} color="var(--accent)" onClick={() => setFilterType('all')} />
                    {Object.entries(NODE_TYPES).map(([type, cfg]) => (
                        <FilterChip key={type} label={type} active={filterType === type} color={cfg.color} onClick={() => setFilterType(type)} />
                    ))}
                </div>
            </div>

            {/* Tabs — only in investigator mode */}
            {!readOnly && (
                <>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                        <TabBtn label="Add Node" active={activeTab === 'add-node'} onClick={() => setActiveTab('add-node')} />
                        <TabBtn label="Add Link" active={activeTab === 'add-edge'} onClick={() => setActiveTab('add-edge')} />
                    </div>
                    <div style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>
                        {activeTab === 'add-node' && (
                            <NodeForm onAdd={onAddNode} onCancel={() => { }} />
                        )}
                        {activeTab === 'add-edge' && (
                            <EdgeForm nodes={nodes} onAdd={onAddEdge} onCancel={() => { }} />
                        )}
                    </div>
                </>
            )}
            {readOnly && (
                <div style={{ padding: '16px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                        <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔒</div>
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Demo Mode</div>
                        <div>Editing is disabled.<br/>Switch to Investigator for full access.</div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: '10px', color: 'var(--text-muted)', textAlign: 'center' }}>
                AP Police · AI4AP Initiative · CrimeGraph AI v1.0
            </div>
        </div>
    )
}

function MiniStat({ label, value, color }) {
    return (
        <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color, fontFamily: 'var(--mono)' }}>{value}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
        </div>
    )
}

function FilterChip({ label, active, color, onClick }) {
    return (
        <button onClick={onClick} style={{
            padding: '3px 10px', borderRadius: 20, border: `1px solid ${active ? color : 'var(--border)'}`,
            background: active ? `${color}20` : 'transparent',
            color: active ? color : 'var(--text-muted)',
            fontSize: '11px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.15s', textTransform: 'capitalize',
        }}>
            {label}
        </button>
    )
}

function TabBtn({ label, active, onClick }) {
    return (
        <button onClick={onClick} style={{
            flex: 1, padding: '10px', border: 'none', cursor: 'pointer',
            background: active ? 'var(--accent-dim)' : 'transparent',
            color: active ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
            fontSize: '12px', fontWeight: 600, transition: 'all 0.15s',
        }}>
            {label}
        </button>
    )
}
