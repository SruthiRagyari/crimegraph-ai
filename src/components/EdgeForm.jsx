import React, { useState } from 'react'

const EDGE_TYPES = [
    'Accused', 'Accomplice', 'Associate', 'Reports To', 'Financier',
    'Mastermind', 'Spotted At', 'Uses', 'Called', 'Found At', 'Linked To', 'Known Contact',
]

export default function EdgeForm({ nodes, onAdd, onCancel }) {
    const [form, setForm] = useState({ from: '', to: '', label: 'Associate' })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.from || !form.to || form.from === form.to) return
        onAdd({ from: parseInt(form.from), to: parseInt(form.to), label: form.label, arrows: 'to' })
        setForm({ from: '', to: '', label: 'Associate' })
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
                <label>From Node</label>
                <select value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} required>
                    <option value="">— Select —</option>
                    {nodes.map(n => <option key={n.id} value={n.id}>{n.label.replace('\n', ' ')}</option>)}
                </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: 'var(--accent)' }}>→</div>

            <div className="form-group">
                <label>To Node</label>
                <select value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} required>
                    <option value="">— Select —</option>
                    {nodes.filter(n => n.id !== parseInt(form.from)).map(n => (
                        <option key={n.id} value={n.id}>{n.label.replace('\n', ' ')}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Relationship Type</label>
                <select value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}>
                    {EDGE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>+ Add Link</button>
                <button type="button" className="btn btn-ghost" onClick={onCancel} style={{ padding: '8px 12px' }}>×</button>
            </div>
        </form>
    )
}
