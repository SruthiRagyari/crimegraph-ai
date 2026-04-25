import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import Sidebar from '../components/Sidebar'
import GraphCanvas from '../components/GraphCanvas'
import InfoPanel from '../components/InfoPanel'
import Legend from '../components/Legend'
import { demoNodes, demoEdges } from '../data/demoData'

export default function DemoApp() {
  const navigate = useNavigate()
  const [nodes] = useState(demoNodes)
  const [edges] = useState(demoEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const networkRef = useRef(null)

  const handleNodeClick = useCallback((nodeId) => {
    if (nodeId === null) { setSelectedNode(null); setSelectedEdge(null); return }
    setSelectedEdge(null)
    const node = nodes.find(n => n.id === nodeId)
    setSelectedNode(node || null)
  }, [nodes])

  const handleEdgeClick = useCallback((edgeId) => {
    setSelectedNode(null)
    const idx = parseInt(String(edgeId).replace('e', ''))
    setSelectedEdge(edges[idx] || null)
  }, [edges])

  return (
    <div className="app-root">
      <AppNavbar
        role="demo"
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onBack={() => navigate('/')}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
      />

      {/* Demo mode banner */}
      <div className="demo-banner">
        🔵 <strong>Demo Mode</strong> — You are viewing a read-only network. 
        <button onClick={() => navigate('/investigator')} className="demo-upgrade-btn">
          Switch to Investigator →
        </button>
      </div>

      <div className="app-body">
        {sidebarOpen && (
          <Sidebar
            nodes={nodes}
            filterType={filterType}
            setFilterType={setFilterType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            readOnly={true}
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
              readOnly={true}
            />
          )}
          <div className="tip-banner">💡 Click any node or link · Drag to explore · Scroll to zoom</div>
        </div>
      </div>
    </div>
  )
}
