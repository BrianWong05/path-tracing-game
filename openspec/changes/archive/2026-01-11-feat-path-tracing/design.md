# Design: Path Tracing Architecture

## Core Components

### `TracingCanvas`
A dedicated component for this game mode, distinct from `GameCanvas`.
*   **Responsibility**: Renders the SVG paths (Guide Path + Active Tracing Path).
*   **Props**: `pathData` (string), `tolerance` (number), `onComplete` (callback).
*   **State**: `drawPath` (array of points), `progress` (0-100%).

### `TracingLogic` (Hook)
*   **Distance Calculation**: We need a way to check if a point `(x, y)` is within `N` pixels of the SVG path.
    *   *Approach*: Since mathematical Bezier projection is complex, we can sample the path into a series of points (using `SVGPathElement.getPointAtLength`) at startup and store them in a spatial lookup (or just simple distance check against nearest segment).
    *   *Alternative*: For simple paths, checking distance to line segments is easier.
    *   *Selected Approach*: Pre-calculate ~100-200 points along the path. On pointer move, find the closest point. If distance < tolerance, append point to `drawPath`.

## Data Structure
```typescript
interface TracingLevel {
  id: string;
  title: string;
  startItem: { icon: string; label: string };
  endItem: { icon: string; label: string };
  pathData: string; // SVG d attribute
  difficulty: 'easy' | 'medium' | 'hard';
}
```

## Interaction Flow
1.  User touches `StartItem` (or start of path).
2.  `isDrawing` becomes true.
3.  On `pointermove`:
    *   Calculate distance to nearest point on `guidePath`.
    *   If `distance > tolerance` (e.g. 30px):
        *   Feedback: Shake effect or fade line?
        *   Constraint: Stop adding points or reset to last valid point.
    *   If `distance <= tolerance`:
        *   Add point to `currentStroke`.
        *   Check progress (are we near the end?).
4.  On reaching `EndItem` (distance < threshold):
    *   Trigger Success (Sound + Star).

## Integration
*   New Route: `/tracing` or integrated into `Home` as a new category set?
*   User request implies a separate "Game". We will likely add a top-level switcher on Home to choose "Matching" vs "Tracing".
