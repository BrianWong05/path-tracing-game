# Project Context

## Purpose
Create a web-based "Matching Game" (連連看) specifically designed for exceptional children to train their hand muscles and fine motor skills. The application must be in Traditional Chinese (繁體中文).

## Tech Stack
- React (Vite)
- Tailwind CSS
- Framer Motion (Animation)
- Lucide React (Icons)
- canvas-confetti (Celebration)

## Project Conventions

### Code Style
- **One Component Per File**: Each component must have its own file.
- **Page-per-Folder**: Pages must be in their own directories (e.g., `src/pages/Home/index.tsx`).
- **Absolute Imports**: Use `@/` for imports. No relative imports outside of sibling files.
- **Modularity**: Separate Game Board, Line Drawer, and Menu components.

### Architecture Patterns
- Feature-based structure (e.g., `src/features/game`, `src/features/ui`).
- Atomic JSX: Break down large components into sub-components.

## Domain Context
- **Target Audience**: Children with special needs.
- **UI/UX**: Large elements, high contrast, forgiving interactions, Traditional Chinese text.
- **Interaction**: Drag-and-drop line drawing is the core training mechanic.
