import React, { useEffect, useRef } from 'react'
import { Network, DataSet } from 'vis-network/standalone'
import { NODE_TYPES } from '../data/demoData'

function buildVisNode(n) {
    const cfg = NODE_TYPES[n.type] || NODE_TYPES.suspect
    return {
        id: n.id,
        label: n.label,
        color: {
            background: cfg.color + '22',
            border: cfg.color,
            highlight: { background: cfg.color + '55', border: cfg.color },
            hover: { background: cfg.color + '44', border: cfg.color },
        },
        font: { color: '#e8f4ff', size: 13, face: 'Inter' },
        borderWidth: 2,
        borderWidthSelected: 3,
        size: n.type === 'suspect' ? 28 : n.type === 'crime' ? 26 : 20,
        shape: shapeFor(n.type),
        shadow: { enabled: true, color: cfg.color + '60', size: 8, x: 0, y: 0 },
    }
}

function shapeFor(type) {
    const shapes = { suspect: 'dot', crime: 'diamond', location: 'triangle', phone: 'square', vehicle: 'star' }
    return shapes[type] || 'dot'
}

function buildVisEdge(e, id) {
    return {
        id,
        from: e.from,
        to: e.to,
        label: e.label || '',
        arrows: 'to',
        dashes: e.dashes || false,
        color: { color: 'rgba(0,212,255,0.4)', highlight: '#00d4ff', hover: '#00d4ff' },
        font: { color: 'rgba(0,212,255,0.8)', size: 10, face: 'Inter', strokeWidth: 0 },
        smooth: { type: 'curvedCW', roundness: 0.1 },
        width: 1.5,
        hoverWidth: 3,
    }
}

const NETWORK_OPTIONS = {
    physics: {
        enabled: true,
        barnesHut: {
            gravitationalConstant: -5000,
            springConstant: 0.04,
            springLength: 160,
            damping: 0.3,
        },
        stabilization: { iterations: 300, updateInterval: 30 },
    },
    interaction: { hover: true, tooltipDelay: 300, zoomView: true, dragView: true },
    nodes: { margin: 10 },
    edges: { selectionWidth: 3 },
}

export default function GraphCanvas({ nodes, edges, filterType, searchQuery, onNodeClick, onEdgeClick, networkRef }) {
    const containerRef = useRef(null)
    const nodesDS = useRef(null)
    const edgesDS = useRef(null)
    // Use refs for callbacks to avoid stale closure in vis-network event listener
    const onNodeClickRef = useRef(onNodeClick)
    const onEdgeClickRef = useRef(onEdgeClick)

    // Keep refs up to date
    useEffect(() => { onNodeClickRef.current = onNodeClick }, [onNodeClick])
    useEffect(() => { onEdgeClickRef.current = onEdgeClick }, [onEdgeClick])

    // Initialize network once
    useEffect(() => {
        if (!containerRef.current) return

        nodesDS.current = new DataSet([])
        edgesDS.current = new DataSet([])

        const net = new Network(
            containerRef.current,
            { nodes: nodesDS.current, edges: edgesDS.current },
            NETWORK_OPTIONS
        )
        networkRef.current = net

        // Use ref so we always call the latest handler
        net.on('click', (params) => {
            if (params.nodes.length > 0) {
                onNodeClickRef.current(params.nodes[0])
            } else if (params.edges.length > 0) {
                onEdgeClickRef.current(params.edges[0])
            } else {
                onNodeClickRef.current(null)
            }
        })

        net.on('stabilized', () => {
            net.fit({ animation: { duration: 700, easingFunction: 'easeInOutQuad' } })
        })

        return () => {
            net.destroy()
            networkRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Sync nodes
    useEffect(() => {
        if (!nodesDS.current) return
        const filtered = nodes.filter(n => {
            const matchType = filterType === 'all' || n.type === filterType
            const matchSearch = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase())
            return matchType && matchSearch
        })
        const visNodes = filtered.map(buildVisNode)
        const existing = nodesDS.current.getIds()
        const incoming = new Set(visNodes.map(v => v.id))
        nodesDS.current.remove(existing.filter(id => !incoming.has(id)))
        visNodes.forEach(vn => {
            if (nodesDS.current.get(vn.id)) nodesDS.current.update(vn)
            else nodesDS.current.add(vn)
        })
    }, [nodes, filterType, searchQuery])

    // Sync edges
    useEffect(() => {
        if (!edgesDS.current) return
        const available = new Set(nodes.map(n => n.id))
        const valid = edges.filter(e => available.has(e.from) && available.has(e.to))
        edgesDS.current.clear()
        edgesDS.current.add(valid.map((e, i) => buildVisEdge(e, `e${i}`)))
    }, [edges, nodes])

    return (
        <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
            {/* Grid background */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
            }} />
            <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: -80, right: -80, width: 300, height: 300, background: 'radial-gradient(circle, rgba(165,94,234,0.06), transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

            {/* vis-network — positioned to fill parent */}
            <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }} />

            {/* Zoom controls */}
            <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                <OverlayBtn title="Fit to screen" onClick={() => networkRef.current?.fit({ animation: true })}>⊡</OverlayBtn>
                <OverlayBtn title="Zoom In" onClick={() => { const s = networkRef.current?.getScale() || 1; networkRef.current?.moveTo({ scale: s * 1.3 }) }}>+</OverlayBtn>
                <OverlayBtn title="Zoom Out" onClick={() => { const s = networkRef.current?.getScale() || 1; networkRef.current?.moveTo({ scale: s * 0.75 }) }}>−</OverlayBtn>
            </div>

            {/* Empty state */}
            {nodes.length === 0 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, pointerEvents: 'none' }}>
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 12 }}>🕸️</div>
                        <div style={{ fontSize: '16px', fontWeight: 600 }}>Network is empty</div>
                        <div style={{ fontSize: '13px', marginTop: 6 }}>Add nodes from the sidebar</div>
                    </div>
                </div>
            )}
        </div>
    )
}

function OverlayBtn({ children, onClick, title }) {
    return (
        <button title={title} onClick={onClick} style={{
            width: 36, height: 36,
            background: 'rgba(13,21,38,0.9)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
            fontFamily: 'var(--mono)',
        }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)' }}
        >
            {children}
        </button>
    )
}
