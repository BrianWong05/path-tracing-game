# Enable Offline PWA Mode

## Goal Description
Convert the existing React + Vite application into a fully functional Progressive Web App (PWA) that works offline. This involves configuring `vite-plugin-pwa` for caching strategies, generating a manifest for installing the app, and handling offline states in the UI, particularly gracefully degrading features like Voice Control.

## User Review Required
> [!IMPORTANT]
> **Asset Availability**: The proposal assumes critical assets (animal sounds/images) are in `public/`. Current directory listing showed only `vite.svg`. Please ensure assets are placed in `public/` or `src/assets` (and moved to `public` or imported) before final verification.

## Proposed Changes

### Configuration
#### [MODIFY] [vite.config.ts](file:///Users/brianwong/Project/react/matching-game/vite.config.ts)
- Add `vite-plugin-pwa`.
- Configure `VitePWA` plugin:
    - `registerType: 'autoUpdate'`
    - `workbox`:
        - `globPatterns`: `['**/*.{js,css,html,ico,png,svg,mp3}']`
        - `runtimeCaching`: Cache First strategy.
    - `includeAssets`: `['*.mp3', '*.svg', '*.png']`.
    - `manifest`: Full Traditional Chinese metadata.

### UI/UX Components
#### [NEW] [NetworkStatus.tsx](file:///Users/brianwong/Project/react/matching-game/src/components/NetworkStatus.tsx)
- Monitors `window.navigator.onLine`.
- Shows "Offline Mode" icon/text when offline.

#### [NEW] [InstallPrompt.tsx](file:///Users/brianwong/Project/react/matching-game/src/components/InstallPrompt.tsx)
- Listens for `beforeinstallprompt`.
- Renders "Install App" button.

### Feature Integration
#### [MODIFY] [useCantoneseSpeech.ts](file:///Users/brianwong/Project/react/matching-game/src/features/tracing/useCantoneseSpeech.ts)
- Check network status.
- Disable microphone if offline.
