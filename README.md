# 🚀 AbComebackHogaya

> A comprehensive learning tracker for mastering JavaScript, Node.js, Express, SQL, DSA, and System Architecture

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://gaurav-pasi.github.io/AbComebackHogaya/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

### 📚 **Comprehensive Learning Tracking**
- **230+ Concepts** across 6 domains:
  - JavaScript (65 concepts)
  - Node.js (45 concepts)
  - Express (32 concepts)
  - SQL/PostgreSQL (52 concepts)
  - Data Structures & Algorithms (40 patterns)
  - System Architecture (96 topics)

### 💻 **DSA Problem Solving**
- **60 Curated Problems** with difficulty levels
- **Built-in Code Editor** (Monaco Editor - VS Code in browser)
- **Test Cases** and progressive hints
- **Multiple Languages** support (JavaScript, Python, Java)
- **Pattern-based organization** (Two Pointers, Sliding Window, etc.)
- **Company tags** (Google, Amazon, Microsoft, etc.)

### 📝 **Interview Questions Bank**
- **Unlimited Questions** across categories
- **Practice Mode** with spaced repetition
- **Flashcard Mode** for quick revision
- **Tag System** for organization
- **Import/Export** (CSV, JSON)

### 🎯 **Portfolio Projects**
- **9 Guided Projects** with requirements
- **Tech Stack** recommendations
- **Progress Tracking** (0-100%)
- **GitHub Integration** (link repositories)

### 📊 **Advanced Analytics**
- **Interactive Dashboard** with real-time stats
- **Progress Charts** (line, bar, pie charts)
- **Activity Heatmap** (GitHub-style contribution graph)
- **Streak Tracking** (current & longest streaks)
- **Time Tracking** per concept/problem
- **Weak Areas** identification

### 🎨 **Modern UI/UX**
- **Dark Mode** support
- **Responsive Design** (mobile-first)
- **Smooth Animations** (Framer Motion)
- **Keyboard Shortcuts**
- **PWA Support** (installable, works offline)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Gaurav-pasi/AbComebackHogaya.git

# Navigate to project directory
cd AbComebackHogaya

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage Guide

### 1️⃣ **Getting Started**
- On first launch, seed data (230+ concepts, 60 problems) loads automatically
- All data stored in browser's localStorage (private & secure)
- Navigate using sidebar or search

### 2️⃣ **Track Concepts**
- Browse concepts by category (JavaScript, Node.js, Express, SQL, DSA, Architecture)
- Mark progress: Not Started → In Progress → Completed → Mastered
- Rate confidence (1-5 stars)
- Add personal notes
- Track time spent
- Get spaced repetition reminders

### 3️⃣ **Solve DSA Problems**
- Filter by difficulty, pattern, or company
- Read problem description
- Use built-in code editor (syntax highlighting)
- Run test cases
- Get progressive hints
- Save solutions (stored in IndexedDB)
- Track attempts and completion time

### 4️⃣ **Manage Interview Questions**
- Add questions you encounter
- Organize with tags and categories
- Use Practice Mode (random questions)
- Use Flashcard Mode (flip to reveal answers)
- Track confidence level
- Import/Export for backup

### 5️⃣ **Track Portfolio Projects**
- View 9 guided projects
- Mark progress (0-100%)
- Link GitHub repository
- Link live demo
- Add implementation notes

### 6️⃣ **View Analytics**
- Dashboard shows overall progress
- Charts visualize trends over time
- Heatmap shows daily activity
- Streak tracking motivates consistency
- Weak areas help focus learning

### 7️⃣ **Export/Import Data**
- Settings → Data Management
- Export all data as JSON (backup)
- Import data from backup
- Reset all data (fresh start)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animations

### Code Editor
- **Monaco Editor** - VS Code editor in browser
- **Syntax Highlighting** for JavaScript, Python, Java

### Charts & Visualization
- **Recharts** - React charting library
- **Custom heatmap** component

### Data Persistence
- **localStorage** - Main data storage
- **IndexedDB (Dexie)** - Large data (code solutions)

### Icons & UI
- **Lucide React** - Icon library
- **Custom components** - Built with accessibility

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite PWA** - Progressive Web App support

---

## 📁 Project Structure

```
AbComebackHogaya/
├── public/
│   ├── data/                  # Seed data (JSON files)
│   │   ├── javascript_concepts.json
│   │   ├── nodejs_concepts.json
│   │   ├── dsa_problems.json
│   │   └── ...
│   └── manifest.json
│
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   ├── layout/            # Layout components
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── concepts/          # Concept management
│   │   ├── dsa/               # DSA problem solving
│   │   ├── questions/         # Interview questions
│   │   ├── projects/          # Portfolio projects
│   │   └── analytics/         # Analytics & charts
│   │
│   ├── pages/                 # Route pages
│   ├── store/                 # Zustand store & slices
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── lib/                   # External libraries config
│   ├── styles/                # Global styles
│   │
│   ├── App.jsx                # Main App component
│   ├── main.jsx               # Entry point
│   └── routes.jsx             # Route definitions
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎯 Roadmap

### ✅ Phase 1: Core Features (Completed)
- [x] Concept tracking system
- [x] DSA problem solver
- [x] Interview questions bank
- [x] Portfolio projects
- [x] Analytics dashboard
- [x] Streak tracking

### 🚧 Phase 2: Enhancements (In Progress)
- [ ] Spaced repetition algorithm
- [ ] Advanced search & filters
- [ ] Achievements & badges
- [ ] Social features (share progress)
- [ ] Mobile app (React Native)

### 📅 Phase 3: Advanced Features (Planned)
- [ ] AI-powered hints (OpenAI integration)
- [ ] Mock interview simulator
- [ ] Peer code review
- [ ] Study groups
- [ ] Gamification

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by [GoalAchiever](https://github.com/Gaurav-pasi/GoalAchiever)
- Icons by [Lucide](https://lucide.dev/)
- Code editor by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- Charts by [Recharts](https://recharts.org/)

---

## 📞 Contact

**Gaurav Pasi**
- GitHub: [@Gaurav-pasi](https://github.com/Gaurav-pasi)
- Project Link: [https://github.com/Gaurav-pasi/AbComebackHogaya](https://github.com/Gaurav-pasi/AbComebackHogaya)

---

## ⭐ Show Your Support

If this project helped you, give it a ⭐️!

---

**Built with ❤️ by Gaurav Pasi**
