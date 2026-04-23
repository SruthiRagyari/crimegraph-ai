import React, { useState } from 'react'
import { NODE_TYPES } from '../data/demoData'

export default function NodeForm({ onAdd, onCancel }) {
    const [form, setForm] = useState({ label: '', type: 'suspect', detail1: '', detail2: '' })

    const placeholders = {
        suspect: { label: 'e.g. Ramesh Kumar', d1: 'Role (e.g. Accused)', d2: 'Location (e.g. Vijayawada)' },
        crime: { label: 'e.g. Fraud Case #001', d1: 'Case No (e.g. #2024-001)', d2: 'Legal Section (e.g. IPC 420)' },
        location: { label: 'e.g. Guntur Bus Stand', d1: 'District', d2: 'Significance' },
        phone: { label: 'e.g. +91-98***-0000', d1: 'Type (Burner/Registered)', d2: 'No. of Calls' },
        vehicle: { label: 'e.g. AP-16-ZZ-9999', d1: 'Make/Model', d2: 'Status (Stolen/Seized)' },
    }

    const ph = placeholders[form.type]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.label.trim()) return
        onAdd({
            label: form.label,
            type: form.type,
            details: { info1: form.detail1 || '—', info2: form.detail2 || '—' }
        })
        setForm({ label: '', type: 'suspect', detail1: '', detail2: '' })
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
                <label>Node Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    {Object.entries(NODE_TYPES).map(([t, cfg]) => (
                        <option key={t} value={t}>{cfg.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Name / Label</label>
                <input
                    value={form.label}
                    onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                    placeholder={ph.label}
                    required
                />
            </div>

            <div className="form-group">
                <label>Detail 1</label>
                <input value={form.detail1} onChange={e => setForm(f => ({ ...f, detail1: e.target.value }))} placeholder={ph.d1} />
            </div>

            <div className="form-group">
                <label>Detail 2</label>
                <input value={form.detail2} onChange={e => setForm(f => ({ ...f, detail2: e.target.value }))} placeholder={ph.d2} />
            </div>

            {/* Color preview */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: NODE_TYPES[form.type].color, boxShadow: `0 0 8px ${NODE_TYPES[form.type].color}` }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Will appear as <strong style={{ color: NODE_TYPES[form.type].color }}>{form.type}</strong></span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>+ Add Node</button>
                <button type="button" className="btn btn-ghost" onClick={onCancel} style={{ padding: '8px 12px' }}>×</button>
            </div>
        </form>
    )
}
