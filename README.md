# Happy Tracing / 快樂運筆練習 ✍️✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vite.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://web.dev/progressive-web-apps/)

**Happy Tracing** is a specialized web-based path tracing game designed specifically for exceptional children (special education). Unlike traditional "matching" games, this tool focuses on training fine motor skills and hand muscle control (Graphomotor skills) by requiring users to trace complex, curved paths on a touchscreen.

[繁體中文版 (README.zh-TW.md)](./README.zh-TW.md)

## 🌟 Motivation

In special education, developing hand-eye coordination and fine motor control is crucial. **Happy Tracing** exists to:
- **Enhance Graphomotor Skills**: Training children to control their hand muscles through deliberate tracing of curved and complex paths.
- **Accessibility First**: Simple, high-contrast, and intuitive interface designed for children with diverse needs.
- **Cultural & Linguistic Relevance**: A fun way to learn Cantonese vocabulary using native expressions and pronunciation.

## 🚀 Key Features

- **🎨 Procedural Level Generation**: 
  - Every level is unique! Using Bezier curve logic, the app generates smooth, curved paths that challenge motor skills far more effectively than simple straight lines.
  - Three difficulty levels: **Easy**, **Medium**, and **Hard**.
- **🎙️ Cantonese First**:
  - Native **zh-HK** Text-to-Speech (TTS) integration.
  - Localization focused on Hong Kong Cantonese vocabulary (e.g., using "兔仔" instead of "兔子").
- **🔊 Voice Interaction**:
  - Leverages the **Web Speech API** to listen for the child's pronunciation.
  - Correct pronunciation triggers celebratory rewards, encouraging vocalization alongside motor training.
- **📶 Offline Support (PWA)**:
  - Fully functional Progressive Web App. 
  - Works 100% offline once installed, making it perfect for classrooms or therapy sessions without reliable internet.
- **📱 Native Support**:
  - Built with **Capacitor**, allowing easy conversion to a native Android APK for a more robust tablet experience.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Native Bridge**: [Capacitor](https://capacitorjs.com/)
- **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm or pnpm

### Installation
```bash
git clone https://github.com/BrianWong05/path-tracing-game.git
cd path-tracing-game
npm install
```

### Development
```bash
npm run dev
```

### Build & Deploy
```bash
# Production build
npm run build

# Synchronize with Capacitor (Android/iOS)
npm run cap:sync

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Deployment
This project is automatically deployed to GitHub Pages. You can access the live version here: [https://brianwong05.github.io/path-tracing-game/](https://brianwong05.github.io/path-tracing-game/)

## 📜 License
This project is licensed under the MIT License.
