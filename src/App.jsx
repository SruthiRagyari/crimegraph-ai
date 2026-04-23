import React, { useState, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import GraphCanvas from './components/GraphCanvas'
import InfoPanel from './components/InfoPanel'
import Legend from './components/Legend'
import { demoNodes, demoEdges } from './data/demoData'

let nextId = Math.max(...demoNodes.map(n => n.id)) + 1

export default function App() {
    const [nodes, setNodes] = useState(demoNodes)
    const [edges, setEdges] = useState(demoEdges)
    const [selectedNode, setSelectedNode] = useState(null)
    const [selectedEdge, setSelectedEdge] = useState(null)
    const [filterType, setFilterType] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const networkRef = useRef(null)

    // === Node handlers ===
    const handleAddNode = useCallback((data) => {
        const newNode = { id: nextId++, ...data }
        setNodes(prev => [...prev, newNode])
    }, [])

    const handleNodeClick = useCallback((nodeId) => {
        if (nodeId === null) { setSelectedNode(null); setSelectedEdge(null); return }
        setSelectedEdge(null)
        const node = nodes.find(n => n.id === nodeId)
        setSelectedNode(node || null)
    }, [nodes])

    // === Edge handlers ===
    const handleAddEdge = useCallback((data) => {
        setEdges(prev => [...prev, data])
    }, [])

    const handleEdgeClick = useCallback((edgeId) => {
        setSelectedNode(null)
        // Find the edge — we stored them with index-based ids
        const idx = parseInt(String(edgeId).replace('e', ''))
        setSelectedEdge(edges[idx] || null)
    }, [edges])

    // === Delete ===
    const handleDelete = useCallback((item, kind) => {
        if (kind === 'node') {
            setNodes(prev => prev.filter(n => n.id !== item.id))
            setEdges(prev => prev.filter(e => e.from !== item.id && e.to !== item.id))
            setSelectedNode(null)
        } else {
            setEdges(prev => prev.filter(e => e !== item))
            setSelectedEdge(null)
        }
    }, [])

    // === Reset ===
    const handleReset = useCallback(() => {
        nextId = Math.max(...demoNodes.map(n => n.id)) + 1
        setNodes(demoNodes)
        setEdges(demoEdges)
        setSelectedNode(null)
        setSelectedEdge(null)
        setFilterType('all')
        setSearchQuery('')
        setTimeout(() => networkRef.current?.fit({ animation: { duration: 800, easingFunction: 'easeInOutCubic' } }), 300)
    }, [])

    // === Export as PNG ===
    const handleExport = useCallback(() => {
        const net = networkRef.current
        if (!net) return
        const canvas = net.canvas?.frame?.canvas
        if (!canvas) return alert('Could not export — try again after the graph loads.')
        const link = document.createElement('a')
        link.download = `crimegraph-${Date.now()}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Navbar
                nodeCount={nodes.length}
                edgeCount={edges.length}
                onReset={handleReset}
                onExport={handleExport}
            />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
                <Sidebar
                    nodes={nodes}
                    onAddNode={handleAddNode}
                    onAddEdge={handleAddEdge}
                    filterType={filterType}
                    setFilterType={setFilterType}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Graph area */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <GraphCanvas
                        nodes={nodes}
                        edges={edges}
                        filterType={filterType}
                        searchQuery={searchQuery}
                        onNodeClick={handleNodeClick}
                        onEdgeClick={handleEdgeClick}
                        networkRef={networkRef}
                    />
                    <Legend />
                    {(selectedNode || selectedEdge) && (
                        <InfoPanel
                            node={selectedNode}
                            edge={selectedEdge}
                            onClose={() => { setSelectedNode(null); setSelectedEdge(null) }}
                            onDelete={handleDelete}
                        />
                    )}

                    {/* Tip banner */}
                    <div style={{
                        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
                        background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
                        borderRadius: 20, padding: '5px 16px',
                        fontSize: '11px', color: 'rgba(0,212,255,0.7)', whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                    }}>
                        💡 Click any node or link to inspect · Drag to explore · Scroll to zoom
                    </div>
                </div>
            </div>
        </div>
    )
}
