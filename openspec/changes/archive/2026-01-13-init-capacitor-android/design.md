# Design: Capacitor Android Integration

## Technical Approach

### 1. Capacitor Integration
We will use `@capacitor/core`, `@capacitor/cli`, and `@capacitor/android`.
- **App ID**: \`com.happytracing.app\`
- **App Name**: "快樂運筆練習"
- **Web Dir**: \`dist\`

### 2. Routing Strategy
React Router's \`BrowserRouter\` relies on the History API and server-side handling of URL paths, which fails when served from the local file system (Capacitor's default mode on Android).
- **Solution**: Switch to \`HashRouter\` in \`src/main.tsx\` (or root router config). This uses the \`#\` portion of the URL to manage client-side routing, which is compatible with \`file://\` protocols.

### 3. Native Configuration (\`AndroidManifest.xml\`)
Modifications required in \`android/app/src/main/AndroidManifest.xml\`:
- **Permissions**: Add \`android.permission.RECORD_AUDIO\` for the voice recognition feature.
- **Orientation**: Set \`android:screenOrientation="sensorLandscape"\` in the \`<activity>\` tag to ensure the game remains in landscape mode.

### 4. Build Pipeline
The build process involves:
1.  \`npm run build\`: Generates the static files in \`dist/\`.
2.  \`npx cap sync\`: Copies \`dist/\` to the Android native project \`android/app/src/main/assets/public/\`.
3.  \`npx cap open android\`: Opens Android Studio for final build and code signing.

## Configuration Details

**\`capacitor.config.ts\`**:
\`\`\`typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.happytracing.app',
  appName: '快樂運筆練習',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
\`\`\`
