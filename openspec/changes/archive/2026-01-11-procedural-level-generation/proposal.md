# Procedural Level Generation

## Goal
Implement a runtime procedural level generator for the Path Tracing Game. Instead of loading pre-set levels, the application should randomly generate unique paths in real-time based on the selected difficulty.

## Context
Currently, levels are generated via `LevelGenerator.ts` which uses `generateBezierPath`. The goal is to formalize this into a `PathGenerator.ts` utility that strictly adheres to specific difficulty constraints (Easy/Medium/Hard) and expose a "Generate New Level" feature in the UI.

## Change Overview
1.  **New Utility**: Create `PathGenerator.ts` with `generateLevel(difficulty)` logic.
2.  **Algorithm**: Implement distinct curve algorithms for:
    *   **Easy**: Gentle curves, no straight lines, 3 pairs.
    *   **Medium**: Tangled waves ("S" shapes), 4 pairs, forced crossing.
    *   **Hard**: Complex knots, 5 pairs, loops, chaos.
3.  **UI**: Add a "Generate New Level" button to the game container to re-roll the current level layout.
