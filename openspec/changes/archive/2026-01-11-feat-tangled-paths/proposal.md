# Proposal: Advanced Tangled Paths Game (進階迷宮運筆)

## Goal
Upgrade the existing "Path Tracing Game" into a multi-path, overlapping "Tangled Paths" experience to challenge exceptional children with advanced fine motor and visual tracking tasks.

## Objectives
- Replace single-path mechanics with 3-4 simultaneous, overlapping paths.
- Implement "Path Locking" to handle intersections without confusing the logic.
- Enhance visuals with vibrant active states, distinct colors, and z-indexing.
- Provide clear audio-visual feedback (glow, snap-back, success sounds).

## Scope
- **Frontend**: `TangledGameCanvas` component, `useTangledTracing` hook.
- **State**: Multi-path tracking (active, completed, progress).
- **Assets**: Animal/Toy icons (using placeholders/lucide-react for now), sound effects (placeholder logic).
- **Accessibility**: High contrast options, strict tolerance handling for motor skill development.

## Implementation Strategy
We will refactor `src/features/tracing` to support multiple paths.
Dependencies: `framer-motion` for z-index/opacity transitions.
core math: Cubic Bezier distance calculation (likely reusing or enhancing existing utilities).
