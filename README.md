# 🕸️ CrimeGraph AI — Criminal Network Visualizer

<div align="center">

![CrimeGraph AI](https://img.shields.io/badge/CrimeGraph-AI-00d4ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPvCfla48L3RleHQ+PC9zdmc+)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![vis-network](https://img.shields.io/badge/vis--network-9.1-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**An AI-powered criminal network visualization tool for law enforcement intelligence analysis.**

[🔴 Live Demo](https://crimegraph-ai.vercel.app) · [📋 Report Bug](https://github.com/yourusername/crimegraph-ai/issues) · [💡 Request Feature](https://github.com/yourusername/crimegraph-ai/issues)

</div>

---

## 📖 About The Project

**CrimeGraph AI** is an interactive criminal network visualizer designed to help law enforcement analysts **map, explore, and understand complex relationships** between suspects, crimes, locations, vehicles, and communication devices.

This project was built as part of the **AI4 Andhra Pradesh Police Internship Initiative**, filling a critical gap in their existing toolkit — while they have AI tools for document analysis and petition management, there was no interactive **visual link analysis** layer for investigators.

### 🎯 Problem It Solves

Traditional investigation methods require manually cross-referencing CDR data, bank statements, and witness reports. CrimeGraph AI brings all entities into a single **interactive knowledge graph**, allowing investigators to:

- Spot hidden connections at a glance
- Understand criminal hierarchies (who reports to whom)
- Track suspects across multiple cases
- Identify common meeting locations

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔴 **Multi-type Nodes** | Suspects, Crimes, Locations, Phones, Vehicles |
| 🔗 **Relationship Mapping** | 12+ relationship types (Accused, Mastermind, Financier, etc.) |
| 🔍 **Real-time Search** | Search across all nodes instantly |
| 🎛️ **Filter by Type** | Isolate suspects, crimes, or locations |
| 🖱️ **Click to Inspect** | Click any node to see full details & status |
| 📤 **Export PNG** | Download the network graph as an image |
| ➕ **Add Nodes/Links** | Extend the graph with new entities |
| 🗑️ **Remove Entities** | Clean up the graph dynamically |
| 🔄 **Reset Demo** | Restore the pre-loaded AP crime scenario |
| ⊡ **Fit/Zoom controls** | Navigate large networks easily |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ — [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/crimegraph-ai.git

# 2. Navigate to the project folder
cd crimegraph-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 + Vite | UI & fast dev server |
| **Graph Engine** | vis-network 9.1 | Interactive network visualization |
| **Icons** | Lucide React | Clean SVG icons |
| **Fonts** | Inter + JetBrains Mono | Professional typography |
| **Styling** | Vanilla CSS | Dark glassmorphism theme |
| **Deployment** | Vercel | Free, instant deployment |

---

## 🧠 How It Works

```
User opens app
    │
    ▼
Pre-loaded demo crime network (15 nodes, 22 links)
    │
    ▼
vis-network renders interactive force-directed graph
    │
    ├─► Click node → InfoPanel shows full details
    ├─► Search → Filters matching nodes
    ├─► Add Node → New entity joins the graph
    ├─► Add Link → New connection drawn
    └─► Export → Downloads as PNG
```

The graph uses **force-directed physics** (Barnes-Hut algorithm) to automatically position nodes — connected nodes cluster together, revealing natural sub-networks.

---

## 📁 Project Structure

```
crimegraph-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── GraphCanvas.jsx    # vis-network graph engine
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   ├── Sidebar.jsx        # Left panel (stats, search, forms)
│   │   ├── InfoPanel.jsx      # Node/edge detail panel
│   │   ├── NodeForm.jsx       # Add new node form
│   │   ├── EdgeForm.jsx       # Add new connection form
│   │   └── Legend.jsx         # Node type legend
│   ├── data/
│   │   └── demoData.js        # Demo crime network data
│   ├── App.jsx                # Root component & state management
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & design tokens
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy your own instance:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repo
4. Click **Deploy** — that's it!

---

## 🔮 Roadmap

- [ ] **Backend API** — FastAPI backend with persistent storage
- [ ] **CDR Import** — Parse real CDR CSV files into the graph
- [ ] **Shortest Path** — Find the link between any two suspects
- [ ] **Temporal View** — Animate connections over time
- [ ] **Telugu UI** — Localized interface for AP Police officers
- [ ] **Role-based Access** — Multi-user with RBAC

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [vis-network](https://visjs.github.io/vis-network/docs/network/) — The incredible graph visualization library
- [AI4AP Police Initiative](https://interns.appolice.gov.in/) — For inspiring this project
- [Andhra Pradesh Police Department](https://appolice.gov.in/) — For their commitment to technology-driven policing

---

<div align="center">
  Made with ❤️ for the <strong>AI4 Andhra Pradesh Police Internship Initiative</strong>
</div>
