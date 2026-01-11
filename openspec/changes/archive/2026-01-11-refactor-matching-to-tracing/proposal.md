# Proposal: Refactor Matching Game to Path Tracing Game

## Why
The current "Matching Game" focuses on cognitive matching (finding A and B). For exceptional children, hand muscle training (tracing) is a higher priority. By converting the matching game to use visible guide paths, we shift the focus from "guessing" to "tracing", providing essential fine motor skill practice while keeping the fun animal/object context.

## What Changes

### 1. From "Hidden" to "Visible" Connections
- **Current**: No lines shown. User drags from A to B freely.
- **New**: **Curved guide lines** (dashed, gray) permanently connect all correct pairs (e.g., Dog <--> Bone).

### 2. Interaction Model
- **Current**: Drag anywhere. Match validated on drop.
- **New**: **Strict Path Following**. The user must drag *along* the specific guide curve.
    - **Tolerance**: The finger must stay within ~30px of the curve.
    - **Snap/Stop**: If the finger deviates too far, drawing stops.

### 3. Visual Feedback
- **Idle**: Dashed gray line.
- **Active**: Solid color fills the line as the user traces it (like a progress bar).
- **Complete**: Success sound + Animation.

## Risks
- **Complexity**: Calculating distance-to-curve for arbitrary SVG paths (Bezier curves) in real-time.
- **Clutter**: Showing 3 criss-crossing paths might be visually confusing if not styled carefully.
