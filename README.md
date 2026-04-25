# 🕸️ CrimeGraph AI — Criminal Network Visualizer

<div align="center">

![CrimeGraph AI](https://img.shields.io/badge/CrimeGraph-AI-00d4ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPvCfla48L3RleHQ+PC9zdmc+)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-6-ca4245?style=for-the-badge&logo=reactrouter)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![vis-network](https://img.shields.io/badge/vis--network-9.1-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

**An AI-powered criminal network visualization tool for law enforcement intelligence analysis.**

[🌐 Live App](https://crimegraph-ai.vercel.app) · [🔴 Investigator Mode](https://crimegraph-ai.vercel.app/investigator) · [🔵 Demo Mode](https://crimegraph-ai.vercel.app/demo) · [📂 GitHub](https://github.com/SruthiRagyari/crimegraph-ai)

</div>

---

## 📖 About The Project

**CrimeGraph AI** is an interactive criminal network visualizer designed to help law enforcement analysts **map, explore, and understand complex relationships** between suspects, crimes, locations, vehicles, and communication devices.

This project was built for the **AI4 Andhra Pradesh Police Internship Initiative**, filling a critical gap — while AP Police already has AI tools for document analysis (PoliceLLM) and petition management (CognitiveNetAI), there was no interactive **visual link-analysis layer** for field investigators.

### 🎯 Problem It Solves

Traditional investigations require manually cross-referencing CDR data, bank statements, and witness reports. CrimeGraph AI brings all entities into a single **interactive knowledge graph**, allowing investigators to:

- Spot hidden connections at a glance
- Understand criminal hierarchies (who reports to whom)
- Track suspects across multiple cases and locations
- Identify shared phones, vehicles, and meeting points

---

## 🗂️ Pages & Access Levels

CrimeGraph AI has **3 separate pages** for different users:

| Page | URL | Who | Access |
|------|-----|-----|--------|
| 🏠 **Landing** | `/` | Everyone | Home, features, how-to guide |
| 🔴 **Investigator** | `/investigator` | Police officers | Full — add, edit, delete, export |
| 🔵 **Demo** | `/demo` | Public / Reviewers | Read-only — view, search, filter |

---

## ✨ Features

| Feature | Investigator | Demo |
|---------|:---:|:---:|
| 🕸️ Interactive force-directed graph | ✅ | ✅ |
| 🔍 Real-time search | ✅ | ✅ |
| 🎛️ Filter by entity type | ✅ | ✅ |
| 🖱️ Click to inspect full details | ✅ | ✅ |
| ⊡ Zoom & pan controls | ✅ | ✅ |
| ➕ Add new nodes & connections | ✅ | ❌ |
| 🗑️ Delete nodes & links | ✅ | ❌ |
| 📤 Export graph as PNG | ✅ | ❌ |
| 🔄 Reset to demo data | ✅ | ❌ |

---

## 🧩 Node Types

| Shape | Color | Type |
|-------|-------|------|
| ● Circle | 🔴 Red | Suspect |
| ◆ Diamond | 🟠 Orange | Crime / Case |
| ▲ Triangle | 🟢 Green | Location |
| ■ Square | 🟡 Yellow | Phone / Device |
| ★ Star | 🟣 Purple | Vehicle |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ — [Download here](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SruthiRagyari/crimegraph-ai.git

# 2. Navigate to the project folder
cd crimegraph-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser at **http://localhost:5173** — you'll see the landing page.

- Go to `/investigator` for full access
- Go to `/demo` for read-only mode

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------| 
| **Frontend** | React 18 + Vite | UI & fast dev server |
| **Routing** | React Router v6 | Multi-page navigation |
| **Graph Engine** | vis-network 9.1 | Force-directed graph |
| **Styling** | Vanilla CSS | Responsive dark theme |
| **Fonts** | Inter + JetBrains Mono | Professional typography |
| **Deployment** | Vercel | Free, instant CI/CD |

---

## 🧠 How It Works

```
User visits / (Landing Page)
    │
    ├─► "Enter as Investigator" → /investigator
    │       Full access: add, edit, delete, export
    │
    └─► "View Demo" → /demo
            Read-only: view, search, filter

Both pages:
    ├─► Pre-loaded demo: 15 nodes, 22 connections
    ├─► vis-network renders force-directed graph
    ├─► Click node → InfoPanel shows case details
    ├─► Search → Filters matching entities in real-time
    └─► Physics engine: Barnes-Hut algorithm clusters nodes
```

---

## 📁 Project Structure

```
crimegraph-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AppNavbar.jsx      # App navbar (back, role badge, stats)
│   │   ├── GraphCanvas.jsx    # vis-network graph engine
│   │   ├── Sidebar.jsx        # Search, filter, add forms (role-aware)
│   │   ├── InfoPanel.jsx      # Node/edge detail panel (role-aware)
│   │   ├── NodeForm.jsx       # Add new node form
│   │   ├── EdgeForm.jsx       # Add new connection form
│   │   ├── Legend.jsx         # Node type colour legend
│   │   └── Navbar.jsx         # (legacy, replaced by AppNavbar)
│   ├── pages/
│   │   ├── Landing.jsx        # Home page: hero, features, how-to, roles
│   │   ├── InvestigatorApp.jsx # Full-access graph app
│   │   └── DemoApp.jsx        # Read-only graph app
│   ├── data/
│   │   └── demoData.js        # Demo AP crime network (15 nodes, 22 edges)
│   ├── App.jsx                # React Router — 3 routes
│   ├── main.jsx               # React entry point
│   └── index.css              # All styles + responsive breakpoints
├── index.html
├── vite.config.js
├── vercel.json                # Vercel SPA routing config
└── package.json
```

---

## 📱 Responsive Design

| Screen | Behaviour |
|--------|----------|
| Desktop (>1024px) | Full sidebar + graph side by side |
| Tablet (768–1024px) | Collapsible sidebar with toggle button |
| Mobile (<768px) | Sidebar opens as overlay drawer |

---

## 🌐 Deployment

This project auto-deploys to Vercel on every `git push`:

1. Push to `main` branch on GitHub
2. Vercel detects the change and rebuilds automatically
3. New version is live within ~1 minute

To deploy your own instance:
```bash
# Install Vercel CLI (optional)
npm i -g vercel
vercel
```

Or simply connect your GitHub repo at [vercel.com](https://vercel.com).

---

## 🔮 Roadmap

- [x] ~~Interactive force-directed graph~~
- [x] ~~Multi-type nodes & relationship edges~~
- [x] ~~Landing page with role selection~~
- [x] ~~Responsive design (mobile + tablet + desktop)~~
- [x] ~~Role-based access (Investigator vs Demo)~~
- [ ] **Backend API** — FastAPI + persistent database
- [ ] **CDR Import** — Parse real CDR CSV files
- [ ] **Shortest Path** — Dijkstra between two suspects
- [ ] **Temporal View** — Animate connections over time
- [ ] **Telugu UI** — Localized for AP Police officers
- [ ] **Authentication** — Secure login for investigators

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---

## 🙏 Acknowledgements

- [vis-network](https://visjs.github.io/vis-network/docs/network/) — The graph visualization library
- [AI4AP Police Initiative](https://interns.appolice.gov.in/) — For inspiring this project
- [Andhra Pradesh Police](https://appolice.gov.in/) — For their commitment to technology-driven policing
- [React Router](https://reactrouter.com/) — Multi-page navigation

---

<div align="center">
  Made with ❤️ by <strong>Sruthi Ragyari</strong> for the <strong>AI4 Andhra Pradesh Police Internship Initiative</strong><br/>
  <a href="https://crimegraph-ai.vercel.app">🌐 Live App</a> · 
  <a href="https://github.com/SruthiRagyari/crimegraph-ai">📂 GitHub</a> · 
  <a href="https://www.linkedin.com/in/sruthi-ragyari-260b80345">💼 LinkedIn</a>
</div>
