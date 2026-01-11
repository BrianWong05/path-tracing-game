# Proposal: Progressive Level System for Tangled Paths

## Why
Expand the current single-screen "Tangled Paths Game" into a complete scalable application with a progressive Level System. This involves implementing 3 Difficulty Tiers (Easy, Medium, Hard), a Level Generator for creating 30 distinct levels data-driven, and a full UI flow including Difficulty Selection and Level Grid.

## User Review Required
> [!IMPORTANT]
> This change introduces a **Level Generator** algorithm. Tuning the "difficulty" (curves vs. knots) will require iteration. The initial implementation will use algorithmic Bezier curve generation based on control points defined by the difficulty tier.

## What Changes

### Architecture
*   **Data-Driven Level Config**: `LevelData.ts` will hold configurations for 30 levels, but instead of hardcoding 90+ paths, we will use a generator helper.
*   **Path Generator**: A utility to generate SVG Bezier paths (`C` commands) based on start/end points and difficulty parameters (control point variance).

### Components
*   **`LevelSelector`**: A new main menu component to select Difficulty (Simple/Medium/Hard) and specific Levels (1-10).
*   **`GameEngine` (Updated)**: Refactor `TracingGame` or create `GameEngine` to accept a `levelID`, load specific paths, and handle "Next Level" progression.

### Logic
*   **Difficulty Tiers**:
    *   **Easy**: Simple curves, no overlaps.
    *   **Medium**: S-curves, moderate overlaps.
    *   **Hard**: Loops, complex tangles, strict tolerance.

## Verification Plan

### Automated Tests
*   Unit tests for `generateBezierPath` to ensure it produces valid SVG path strings.
*   Validation of `LevelData` ensuring all 30 levels have correct start/end nodes.

### Manual Verification
*   **Gameplay Loop**: Complete a level, verify "Success" modal, and click "Next Level".
*   **Difficulty Check**: Visually verify that "Easy" paths are simple and "Hard" paths are tangled.
*   **Responsiveness**: Ensure the Level Grid looks good on mobile/tablet.
