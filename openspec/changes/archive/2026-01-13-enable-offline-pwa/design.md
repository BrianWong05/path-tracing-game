# PWA & Offline Mode Design

## Architecture

We use `vite-plugin-pwa` which uses Workbox under the hood. 
- **Strategy**: Cache First (Stale-While-Revalidate is default usually, but user requested Cache First for assets).
- **Update**: `autoUpdate` to simplify the process for this app target audience (simpler is better).

## Offline UX

1. **Global Indicator**: A non-intrusive indicator is crucial. We will use a small fixed element or a header icon.
2. **Feature Degradation**: Voice Recognition relies on cloud services in many browsers. We proactively disable it to prevent errors and bad UX.

## Install Prompt

Browser support for PWA installation varies. We use the `beforeinstallprompt` event which is primarily Chrome/Android. iOS requires manual "Add to Home Screen", so the button effectively only shows on supported platforms.
