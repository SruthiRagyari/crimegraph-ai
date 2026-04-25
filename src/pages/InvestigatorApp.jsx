import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import Sidebar from '../components/Sidebar'
import GraphCanvas from '../components/GraphCanvas'
import InfoPanel from '../components/InfoPanel'
import Legend from '../components/Legend'
import { demoNodes, demoEdges } from '../data/demoData'

let nextId = Math.max(...demoNodes.map(n => n.id)) + 1

export default function InvestigatorApp() {
  const navigate = useNavigate()
  const [nodes, setNodes] = useState(demoNodes)
  const [edges, setEdges] = useState(demoEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const networkRef = useRef(null)

  const handleAddNode = useCallback((data) => {
    setNodes(prev => [...prev, { id: nextId++, ...data }])
  }, [])

  const handleNodeClick = useCallback((nodeId) => {
    if (nodeId === null) { setSelectedNode(null); setSelectedEdge(null); return }
    setSelectedEdge(null)
    setNodes(prev => {
      const node = prev.find(n => n.id === nodeId)
      setSelectedNode(node || null)
      return prev
    })
  }, [])

  const handleAddEdge = useCallback((data) => {
    setEdges(prev => [...prev, data])
  }, [])

  const handleEdgeClick = useCallback((edgeId) => {
    setSelectedNode(null)
    const idx = parseInt(String(edgeId).replace('e', ''))
    setEdges(prev => { setSelectedEdge(prev[idx] || null); return prev })
  }, [])

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

  const handleReset = useCallback(() => {
    nextId = Math.max(...demoNodes.map(n => n.id)) + 1
    setNodes(demoNodes); setEdges(demoEdges)
    setSelectedNode(null); setSelectedEdge(null)
    setFilterType('all'); setSearchQuery('')
    setTimeout(() => networkRef.current?.fit({ animation: true }), 300)
  }, [])

  const handleExport = useCallback(() => {
    const canvas = networkRef.current?.canvas?.frame?.canvas
    if (!canvas) return alert('Graph not ready — try again in a moment.')
    const link = document.createElement('a')
    link.download = `crimegraph-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [])

  return (
    <div className="app-root">
      <AppNavbar
        role="investigator"
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onReset={handleReset}
        onExport={handleExport}
        onBack={() => navigate('/')}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <div className="app-body">
        {sidebarOpen && (
          <Sidebar
            nodes={nodes}
            onAddNode={handleAddNode}
            onAddEdge={handleAddEdge}
            filterType={filterType}
            setFilterType={setFilterType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            readOnly={false}
          />
        )}
        <div className="graph-area">
          <GraphCanvas
            nodes={nodes} edges={edges}
            filterType={filterType} searchQuery={searchQuery}
            onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick}
            networkRef={networkRef}
          />
          <Legend />
          {(selectedNode || selectedEdge) && (
            <InfoPanel
              node={selectedNode} edge={selectedEdge}
              onClose={() => { setSelectedNode(null); setSelectedEdge(null) }}
              onDelete={handleDelete}
              readOnly={false}
            />
          )}
          <div className="tip-banner">💡 Click any node or link · Drag to explore · Scroll to zoom</div>
        </div>
      </div>
    </div>
  )
}
