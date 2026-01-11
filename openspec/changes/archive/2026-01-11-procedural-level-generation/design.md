# Design: Procedural Level Generation

## Architecture

### PathGenerator.ts
A new utility module responsible for pure math logic.
*   **Coordinate System**: 800x600 canvas (normalized or scaled).
*   **Input**: `difficulty: 'easy' | 'medium' | 'hard'`.
*   **Output**: `PathDef[]` containing SVG path strings (`d`), colors, and icon positions.
*   **Collision Detection**: Ensure start nodes have minimum vertical spacing (e.g., 80px).

### Algorithms
*   **Easy**:
    *   Use Quadratic or Cubic Bezier with control points offset vertically (20-50px) to ensure curvature.
    *   Avoid crossing if possible (though random start/end might naturally cross, the requirement implies "Gentle Curves"). The constraints say "no straight lines".
*   **Medium**:
    *   Use Cubic Bezier with inflection (Control Point 1 Up, Control Point 2 Down) to create "S" shapes.
    *   Randomize Y-axis start/end to encourage crossing.
*   **Hard**:
    *   High variance Control Points to create loops.
    *   Maximal crossing and "spaghetti" visual.

### Integration
*   **LevelGameContainer**:
    *   Currently generates paths on mount/prop change.
    *   Will add a `handleRegenerate()` function that calls `generateLevel(currentDifficulty)` and updates the `paths` state.
    *   The "Generate New Level" button will trigger this function.

### Refactoring
*   Existing `LevelGenerator.ts` logic will be migrated to `PathGenerator.ts`.
*   `LevelGenerator.ts` may be removed or kept as a compatibility layer if other components rely on `LevelConfig`.
