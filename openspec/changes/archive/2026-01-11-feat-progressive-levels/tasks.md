# Tasks: Progressive Level System

1.  **Core Logic: Level Generator**
    - [ ] Create `src/features/levels/LevelGenerator.ts`.
    - [ ] Implement `generateBezierPath(start, end, difficulty)` with tiered control point logic.
    - [ ] Create `LevelData.ts` with configurations for 30 levels (10 per tier).

2.  **UI Components: Level Selector**
    - [ ] Create `src/features/levels/LevelSelector.tsx`.
    - [ ] Implement Tabs for Easy/Medium/Hard.
    - [ ] Implement Grid of 10 levels/buttons.
    - [ ] Add lock/unlock logic (mocked or simple state).

3.  **Game Engine Integration**
    - [ ] Refactor `TracingCanvas` to accept dynamic paths from props (it already does, but ensure types align).
    - [ ] Create `LevelGameContainer.tsx` (or update `TracingGame`) to:
        - [ ] Accept `levelId`.
        - [ ] Generate paths on mount.
        - [ ] Handle "Level Complete" -> Show "Next Level" button.

4.  **Integration & Polish**
    - [ ] Add `LevelSelector` to the main app flow (App.tsx).
    - [ ] Verify paths generate correctly for all 3 tiers.
    - [ ] Adjust difficulty parameters (tolerance/variance) based on testing.
