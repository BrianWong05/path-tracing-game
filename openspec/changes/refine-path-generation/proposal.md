# Proposal: Refine Path Generation Logic

## Why
User feedback indicates that "Easy Mode" is too generated with straight lines, which is less engaging and easier than intended. The goal is to enforce curvature across all difficulty levels to improve engagement and aesthetic appeal, while maintaining distinct difficulty tiers through curve complexity and overlaps.

## User Review Required
> [!IMPORTANT]
> This change strictly enforces **NO STRAIGHT LINES**. All paths, even in Easy mode, will be generated using Cubic Bezier curves with randomized offsets to create a "hand-drawn" or "organic" feel.

## What Changes

### Logic
*   **Update `generateBezierPath`**: Rewrite the generation logic to:
    *   **Easy**: Use "Rainbow" or "Shallow S" curves (20-30% offset). No overlaps.
    *   **Medium**: Use "Deep S" curves (50-80% offset). Moderate overlaps.
    *   **Hard**: Use loops and knots. Strict clamping remains.
*   **Randomization**: Introduce `randomCurveOffset` to ensure every line has a unique wiggle.

### Components
*   **`LevelGenerator.ts`**: The core logic update happens here. No UI changes required.

## Verification Plan

### Manual Verification
*   **Easy Mode**: Verify paths are gentle arches/waves and NOT straight lines. Verify no overlaps.
*   **Medium Mode**: Verify paths are deep waves with some crossing.
*   **Hard Mode**: Verify loops and tangles (existing logic with refinements).
