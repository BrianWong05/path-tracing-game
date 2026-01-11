# Proposal: Level Selection Screen

## Goal
Implement a "Level Selection" screen that displays all available tracing levels (Wave, Zigzag, Loop, Tangled Level 1, Tangled Level 2) as clickable cards. This gives users the freedom to choose their preferred difficulty or pattern.

## Objectives
- Create a `LevelSelect` component.
- Display a grid of level cards with Title, Description, and a mini preview (optional icon).
- Update app navigation: Home -> Level Select -> Tracing Game (Specific Level).

## Scope
- **Frontend**: 
  - New `src/features/tracing/LevelSelect.tsx`.
  - Modify `src/features/tracing/TracingGame.tsx` to accept an `initialLevelIndex`.
  - Modify `src/App.tsx` or `Home.tsx` to route to Level Select first.
- **Assets**: Use existing icons/colors from `data.ts`.

## Implementation Strategy
1.  **Refactor Navigation**:
    - Introduce a discrete "view" state in App: `HOME` | `LEVEL_SELECT` | `GAME`.
2.  **Create Level Select**:
    - Iterate over `tracingLevels` from `data.ts`.
    - Render cards with `themeColor` background.
3.  **Update Game**:
    - Allow entering `TracingGame` with a specific index.
    - "Next Level" logic remains, or returns to Level Select? (Let's keep "Next Level" but maybe change "Home" button to "Levels").

## Why
Currently, the game forces a linear progression from Level 1. Users (especially children/therapists) need random access to specific exercises (e.g., just practicing loops).
