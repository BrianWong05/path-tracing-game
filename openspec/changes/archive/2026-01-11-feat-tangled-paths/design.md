# Design: Advanced Tangled Paths Mechanics

## Architecture

### Component Structure
`TangledGameCanvas`
  - Container (`div` relative, rounded, shadow)
  - `svg` (overlay, full width/height)
    - `defs` (Gradients, filters for glow)
    - `Layer: Inactive/Completed Paths` (Rendered first)
    - `Layer: Active Path` (Rendered last for z-index top)
  - `nodes` (Start/End icons overlaid absolutely or within SVG foreignObject)

### State Management (`useTangledTracing`)
```typescript
interface TraversalState {
  activePathId: string | null; // The path currently being dragged
  completedPathIds: Set<string>; // Paths successfully finished
  progress: Map<string, number>; // Current progress (0-1) for each path
  drawingPath: Map<string, string>; // The actual SVG path string drawn by user per path
}
```

## Core Mechanics

### 1. Path Definition & Rendering
Each "Path" is defined by a cubic bezier curve (`C` command).
We must store the *mathematical definition* (points) separate from the *visual string* to allow for distance calculation.

### 2. The "Locking" Mechanism (Critical)
To handle the "Tangled Mess":
- **Hit Testing**: On `pointerDown`, we check collision against *all* Start Nodes.
  - If distinct: Lock `activePathId` to that animal.
- **Tracking**: On `pointerMove`:
  - If `activePathId` is null, ignore.
  - If locked, calculate distance *only* against the Curve defined for `activePathId`.
  - **Intersections**: Because we *only* check distance to the locked curve, crossing another curve (even if 0px away) is irrelevant. The algorithm simply does not "see" the other curves.

### 3. Off-Track Logic
- Calculate shortest distance from `currentPointerPos` to the `activePath` bezier curve.
- If `distance > tolerance`:
  - Trigger "Snap Back" or visual warning.
  - Do not update `progress`.
  - Optional: Reset progress to last valid checkpoint or 0 if strict.

### 4. Visual Layering (Z-Index)
SVG does not support CSS z-index for depth sorting elements *inside* the SVG.
**Solution**: Change the **render order**.
- Always render `activePathId` *last* in the SVG DOM order.
- This ensures it draws "on top" of the tangled inactive lines.

## UX Details
- **Fade Inactive**: When a path is active, set opacity of other paths to 0.3.
- **Glow**: Use SVG `<filter>` for the active path glow.
- **Victory**: When all pairs are in `completedPathIds`, trigger Full Victory animation.
