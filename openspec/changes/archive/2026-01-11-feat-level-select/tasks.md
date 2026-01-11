# Tasks: Level Selection Implementation

1.  [x] **Create Level Select Component**
    - Create `src/features/tracing/LevelSelect.tsx`.
    - Import `tracingLevels`.
    - Render grid of cards using tailwind grid.
    - Validation: Visual check of 5 cards.

2.  [ ] **Update App Navigation State**
    - Refactor `App.tsx` state to support 3 views: `home`, `level-select`, `game`.
    - Pass `initialLevelIndex` state to Game.
    - Validation: Can navigate Home -> Levels.

3.  [x] **Connect Game to Selection**
    - Modify `TracingGame` props to accept `initialLevelIndex`.
    - Initialize `useState(initialLevelIndex)` instead of 0.
    - Update "Back" button to call `onBack` which now leads to Levels.
    - Validation: Clicking "Loop" card opens Loop level.

4.  [x] **Refine Victory Navigation**
    - Update `VictoryModal` "Home" button label/action to maybe say "Levels" or keep "Next".
    - Ensure "Next Level" still works correctly even if started in middle.
