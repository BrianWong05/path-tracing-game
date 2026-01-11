# Design: Tracing Refactor

## Architecture

### 1. Path Generation (`PathGenerator`)
We need a way to generate "nice" curved paths between two points (Start: x1,y1 -> End: x2,y2).
- **Logic**: Use Cubic Bezier curves (`C`).
- **Control Points**: varying control points to create Waves, ZigZags (via `L` commands), or Loops.
- **Output**: SVG `d` string.

### 2. Hit Testing (`usePathTracing`)
Instead of simple `start` vs `end` rect collision, we need **Point-to-Path Distance**.
- **Optimization**: Pre-calculate ~100 points along each path when the level loads.
- **Runtime**: Find the closest pre-calculated point to the user's cursor.
- **Tolerance**: Check if `dist(cursor, closestPoint) < 30px`.

### 3. Component Structure
Refactor `GameCanvas` to render:
- **Guide Layer**: All dashed paths for the level.
- **Active Layer**: The currently responding path (z-index boosted).
- **Progress Layer**: The colorful stroke that follows the user's progress.

### 4. Data Structure Update
Update `Level` data to include:
- `curveType`: 'wave' | 'zigzag' | 'loop' (applied to generated paths).
- `pairs`: Unchanged, but rendered with lines.
