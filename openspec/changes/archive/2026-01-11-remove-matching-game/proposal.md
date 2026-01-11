# Proposal: Remove Matching Game Feature

The user has decided to remove the "Matching Game" feature (including the Animals/Colors/Shapes levels) to focus on the "Tracing Path" feature.

## Changes

### 1. Code Deletion
- **Delete Directory**: `src/features/game/`
    - Contains: `Game.tsx`, `GameCanvas.tsx`, `MatchingItem.tsx`, `useGameLogic.ts`, `data.ts`
- **Clean**: `src/utils/pathGenerator.ts` (if only used by Matching Game, otherwise keep if shared)
    - Checked: `pathGenerator` was created specifically for the refactor. Likely safe to delete if not used by `TracingGame`.

### 2. UI Updates
- **`App.tsx`**: Remove `Game` route and state management for `currentLevel`.
- **`Home/index.tsx`**: Remove the 3 category buttons. Retain the "Tracing Practice" (Purple button) entry point.

## Spec Updates
- **`game-mechanics`**: Remove "Matching" requirements.
- **`ui-ux`**: Remove requirements related to Matching Game UI.
