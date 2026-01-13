# Tasks: Init Capacitor Android

1.  [x] Install Capacitor dependencies: \`npm install @capacitor/core @capacitor/cli @capacitor/android\` <!-- type: setup -->
2.  [x] Initialize Capacitor: \`npx cap init "快樂運筆練習" com.happytracing.app --web-dir dist\` <!-- type: setup -->
3.  [x] Add Android platform: \`npx cap add android\` <!-- type: setup -->
4.  [x] Configure \`capacitor.config.ts\` with correct appId, appName, and webDir <!-- type: config -->
5.  [x] Refactor \`App.tsx\` or \`main.tsx\` to use \`HashRouter\` instead of \`BrowserRouter\` <!-- type: code -->
6.  [x] Build web assets: \`npm run build\` <!-- type: build -->
7.  [x] Sync assets to Android: \`npx cap sync\` <!-- type: build -->
8.  [x] Update \`android/app/src/main/AndroidManifest.xml\` to add \`RECORD_AUDIO\` permission <!-- type: native-config -->
9.  [x] Update \`android/app/src/main/AndroidManifest.xml\` to force \`screenOrientation="sensorLandscape"\` <!-- type: native-config -->
