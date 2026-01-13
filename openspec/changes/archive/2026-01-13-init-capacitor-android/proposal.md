# Proposal: Init Capacitor Android

## Goal
Convert the existing React + Vite web application into a native Android APK using Capacitor to support offline usage on Android tablets in classrooms.

## Context
The "Path Tracing Game" is functioning as a web app. To meet classroom requirements for offline availability and native tablet integration (locking orientation, microphone access), we need to wrap the app using Capacitor.

## Capabilities
1.  **Native Runtime**: Run the web app as a native Android application.
2.  **Offline Routing**: Support file-system based routing (HashRouter) to prevent "White Screen" navigation issues.
3.  **Hardware Permissions**: Grant access to Microphone for voice features and lock screen orientation to Landscape.
4.  **Distribution Pipeline**: Provide a consistent build process from source to APK.
