# Happy Tracing / 快樂運筆練習 ✍️✨

**快樂運筆練習 (Happy Tracing)** 是一款專為特殊教育需求（SEN/Exceptional children）兒童開發的網頁版運筆遊戲。核心目標不僅僅是簡單的「連線」，而是透過在觸控螢幕上描繪複雜且多變的曲線路徑，訓練兒童的小肌肉控制能力及手眼協調性（Graphomotor skills）。

[English Version (README.md)](./README.md)

## 🌟 創作動機

在特殊教育領域，訓練小肌肉控制與手眼協調是極其重要的一環。**快樂運筆練習** 的誕生是為了：
- **提升運筆技巧 (Graphomotor Skills)**：透過描繪貝茲曲線產生的路徑，訓練孩子精準控制手部肌肉。
- **無障礙優先**：針對不同需要的兒童，提供簡潔、高對比度且直覺的操作介面。
- **粵語文化認同**：結合母語（粵語）詞彙與發音，讓學習變得更有趣且具親切感。

## 🚀 核心功能

- **🎨 動態關卡生成**：
  - 每一關都是獨一無二的！利用**貝茲曲線 (Bezier curves)** 邏輯，系統會自動生成流暢的曲線路徑，比單調的直線更能有效挑戰肌肉控制力。
  - 提供 **簡單 (Easy)**、**中等 (Medium)** 及 **困難 (Hard)** 三種難度。
- **🎙️ 粵語優先 (Cantonese First)**：
  - 內建原生 **zh-HK** 文字轉語音 (TTS) 功能。
  - 詞彙選取以香港粵語為準（例如使用「兔仔」而非「兔子」）。
- **🔊 語音互動**：
  - 利用 **Web Speech API** 偵測孩子的發音。
  - 語音辨識成功後會給予豐富的動畫獎勵，鼓勵孩子在訓練肌肉的同時也發聲練習。
- **📶 離線支援 (PWA)**：
  - 完整的漸進式網頁應用 (PWA) 支援。
  - 安裝後可 100% 離線運行，非常適合在沒有網絡的教室或治療室環境下使用。
- **📱 跨平台支援**：
  - 使用 **Capacitor** 技術，可輕鬆轉換為 Android APK，在平板電腦上提供更穩定的原生物理體驗。

## 🛠️ 技術棧

- **框架**: [React 19](https://react.dev/)
- **構建工具**: [Vite](https://vite.dev/)
- **樣式**: [Vanilla CSS / Tailwind CSS](https://tailwindcss.com/)
- **動畫**: [Framer Motion](https://www.framer.com/motion/)
- **原生橋接**: [Capacitor](https://capacitorjs.com/)
- **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

## 📦 快速開始

### 前置要求
- [Node.js](https://nodejs.org/) (建議使用最新 LTS 版本)
- npm 或 pnpm

### 安裝步驟
```bash
git clone https://github.com/BrianWong05/path-tracing-game.git
cd path-tracing-game
npm install
```

### 開發模式
```bash
npm run dev
```

### 構建與部署
```bash
# 生產環境構建
npm run build

# 與 Capacitor 同步 (Android/iOS)
npm run cap:sync

# 部署至 GitHub Pages
npm run deploy
```

## 🌐 項目部署
本項目已部署至 GitHub Pages，您可以透過以下連結即時試玩：[https://brianwong05.github.io/path-tracing-game/](https://brianwong05.github.io/path-tracing-game/)

## 📜 授權協議
本項目採用 MIT 授權協議。
