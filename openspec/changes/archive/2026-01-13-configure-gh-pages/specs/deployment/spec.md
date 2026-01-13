# Spec: GitHub Pages Deployment

## ADDED Requirements

### Requirement: Automated Deployment
The project MUST support single-command deployment to the `gh-pages` branch.
#### Scenario: Deploy to GitHub Pages
- **Given** the user is in the project root
- **When** they run `npm run deploy`
- **Then** the project should build successfully
- **And** the `dist` folder should be pushed to the `gh-pages` branch

### Requirement: Client-Side Routing Support
The application MUST handle client-side routing correctly when hosted on a static path.
#### Scenario: Static Routing
- **Given** the application is deployed to a subdirectory (e.g., `/path-tracing-game/`)
- **When** the user navigates between pages
- **Then** the routing should work correctly without 404 errors (using HashRouter)

### Requirement: Build Configuration
The build configuration `base` path MUST match the deployment repository name.
#### Scenario: Base Path Configuration
- **Given** `vite.config.ts`
- **Then** `base` property should be set to the repository name (e.g., `/path-tracing-game/`) to ensure assets load correctly.
