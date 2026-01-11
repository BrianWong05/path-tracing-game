# Proposal: Path Tracing Game (Happy Tracing Practice)

## Why
Children with special needs often require focused training on fine motor skills and hand-eye coordination. While the matching game addresses point-to-point connections, a "Path Tracing" game offers a different challenge: continuous control along a defined curve. This "Happy Tracing Practice" (快樂運筆練習) will help improved pen control and visual tracking.

## What Changes
We will introduce a new game mode separate from the Matching Game.
1.  **New Game Feature**: "Path Tracing" (運筆練習) where items are already paired but connected by a dashed guide path.
2.  **Interaction**: User must trace along the guide path with tolerance logic. Deviating too far breaks the line.
3.  **Content**: 3 levels of difficulty (Waves, Zig-zags, Loops/Spirals) with the theme "Help the animal get home".
4.  **UI Updates**: A new entry point or toggle in the Home screen to select this mode (or a new set of levels). *Decision: We will add a "Tracing Mode" toggle or separate section on the Home screen.*

## Risks
*   **Touch/Pointer Events**: Calculating distance from a complex SVG path (Bezier curve) in real-time for hit-testing might be computationally intensive or tricky to get right on all devices.
*   **SVG Coordinate Mapping**: Ensuring the pointer coordinates match the SVG coordinate system exactly is crucial for the tolerance check.
