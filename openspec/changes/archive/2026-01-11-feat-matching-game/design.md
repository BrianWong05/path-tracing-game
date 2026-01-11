# Design: Matching Game Architecture

## Architecture Overview
The application will use a modular React architecture with a clear separation between the game logic, rendering layer, and UI components.

### Core Components

1.  **GameCanvas (Canvas Layer)**
    *   **Responsibility**: Handles the SVG overlay for line drawing.
    *   **Logic**: Tracks pointer events (`onPointerDown`, `onPointerMove`, `onPointerUp`) to render a path from the start node to the current pointer position. If dropped on a target, validates the match.
    *   **State**: Managed via a custom hook `useGameLogic` to track connected pairs and the currently active line.

2.  **GameBoard (Layout)**
    *   **Responsibility**: Renders the Left (Source) and Right (Target) columns.
    *   **Layout**: Flexbox or Grid with ample spacing.
    *   **Items**: `MatchingItem` components that act as anchors for the lines.

3.  **GameManager (State)**
    *   **Responsibility**: Manages current level, score, and victory state.
    *   **Data**: Stores level data (Animals, Colors, Shapes) as static configurations.

### Data Structures

\`\`\`typescript
interface MatchingItem {
  id: string;
  type: string; // e.g., 'animal', 'color'
  content: string; // Label or Image URL
  value: string; // The matching key (e.g., 'rabbit')
}

interface LevelConfig {
  id: string;
  title: string;
  pairs: { source: MatchingItem; target: MatchingItem }[];
}
\`\`\`

### Interaction Model
-   **Pointer Events**: Used instead of standard Drag & Drop API to allow for drawing a visible SVG trail.
-   **Validation**:
    *   On `pointerup`, check if the cursor is over a valid target.
    *   Match: Lock line, play sound.
    *   Mismatch: Animate line disappearing (snap back).

### Accessibility & UI
-   **Stroke Width**: 6px-8px for lines.
-   **Colors**: Distinct, high-contrast palettes for each category.
-   **Audio**: `useSound` or native Audio API for feedback.
