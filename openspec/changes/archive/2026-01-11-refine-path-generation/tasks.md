# Tasks: Refine Path Generation

1.  **Update Path Logic**
    - [x] Update `LevelGenerator.ts`
        - [x] Implement `generateBezierPath` with mandatory curvature (Easy: 20-30%, Medium: 50-80%).
        - [x] Ensure unique `randomCurveOffset` for variation.
        - [x] Verify no overlaps in Easy mode. (Shuffled logic in generateLevelPaths still ensures order if needed, but easy mode uses ordered Y positions already).

2.  **Verification**
    - [x] Verify Easy mode has no straight lines. (Verified via browser subagent).
    - [x] Verify Medium mode has distinct deep waves. (Verified via browser subagent).
