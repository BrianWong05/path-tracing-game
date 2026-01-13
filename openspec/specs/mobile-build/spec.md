# mobile-build Specification

## Purpose
TBD - created by archiving change init-capacitor-android. Update Purpose after archive.
## Requirements
### Requirement: Native Android Runtime
The application MUST operate as a native Android app using Capacitor, allowing it to be installed and run on Android devices.
#### Scenario: Open in Android Studio
- **Given** I have synchronized the web assets using \`npx cap sync\`
- **When** I run \`npx cap open android\`
- **Then** the project should open in Android Studio with App ID "com.happytracing.app"

### Requirement: Hash-based Routing
The application MUST use Hash-based routing (\`HashRouter\`) to support navigation within the \`file://\` protocol environment of the Android webview.
#### Scenario: Home Screen Load
- **Given** I am running the app on an Android emulator
- **When** the app launches
- **Then** I should see the home screen instead of a white screen
#### Scenario: Navigation
- **Given** I am on the home screen
- **When** I tap "Start Game"
- **Then** I should navigate to the game screen without errors

### Requirement: Microphone Permissions
The application MUST request the \`RECORD_AUDIO\` permission to enable voice control features on the device.
#### Scenario: Voice Mode Activation
- **Given** I am in the level selection or game screen
- **When** the voice control feature is activated
- **Then** the Android system should prompt for microphone permission if not granted

### Requirement: Landscape Orientation
The application MUST be locked to landscape orientation to ensure the game board layout remains usable.
#### Scenario: Rotation
- **Given** I am running the app on a tablet
- **When** I rotate the device to portrait mode
- **Then** the interface should remain in landscape mode

### Requirement: Build Synchronization
The build pipeline MUST provide a mechanism to synchronize the latest React build artifacts to the native Android container.
#### Scenario: Sync Command
- **Given** I have made changes to the React code
- **When** I run \`npm run build\` followed by \`npx cap sync\`
- **Then** the updates should be reflected in the \`android/app/src/main/assets/public\` directory

