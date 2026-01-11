# Tasks: Advanced Tangled Paths Implementation

1.  [x] **Scaffold Tangled Canvas**
    - Create `TangledCanvas.tsx` structure.
    - Implement multi-layer SVG rendering (Inactive Group, Active Group).
    - Validation: Render 3 overlapping dummy paths.

2.  [x] **Implement Bezier Path Data**
    - Define 3-4 distinct cubic bezier curves (hardcoded or generated) that cross in the center.
    - Create `getPathPoint(progress, pathId)` utility based on existing logic.
    - Validation: Visual check of "Tangled" paths.

3.  [x] **Implement Path Locking State**
    - Create `useTangledTracing` hook.
    - Implement `pointerDown` hit testing against Start Nodes.
    - Set `activePathId` state.
    - Validation: Clicking Start Node logs "Locked [ID]".

4.  [x] **Implement Progress & Intersection Logic**
    - In `pointerMove`, calculate distance strictly against `activePathId`.
    - Update `progress` state if within tolerance.
    - Handle "Snap Back" if outside tolerance.
    - Validation: Trace one path through an intersection without selecting the other.

5.  [x] **Visual Polish**
    - Add Z-Index reordering (Active path moves to end of DOM).
    - Add Glow Filter.
    - Add Path Colors and Stroke Styles (Dashed vs Solid).
    - Validation: Active path looks "lifted".

6.  [x] **Game Loop Integration**
    - Integrate with `TracingGame` container.
    - Add Success/Victory state handling.
    - Add Sound Effects (use placeholders or `window.Audio`).
    - Validation: Complete all paths -> Win Modal.
