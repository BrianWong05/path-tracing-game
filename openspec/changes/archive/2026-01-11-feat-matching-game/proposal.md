# Proposal: Matching Game (連連看)

## Summary
Implement a web-based "Matching Game" designed for children with special needs to train fine motor skills. The game focuses on drag-and-drop line drawing mechanics, high-contrast accessible UI, and positive reinforcement. The entire interface will be in Traditional Chinese.

## Problem Statement
Current educational games often lack specific accessibility features needed for children with muscle control challenges. Standard UI elements are too small, and failure states can be discouraging. We need a purpose-built tool that encourages continuous hand movement through line drawing.

## Solution
A React-based web application with:
1.  **Game Mechanics**: Drag-to-draw SVG lines between matching pairs.
2.  **Accessibility**: Large touch targets, high contrast, and forgiving snap logic.
3.  **Content**: Three levels (Animals, Colors, Shapes) in Traditional Chinese.
4.  **Feedback**: Audio-visual rewards (confetti, sounds) for success; gentle snap-back for errors.

## Risks
-   **Touch/Mouse Events**: Ensuring smooth line drawing across different devices (mouse vs. touch) requires careful event handling.
-   **Accessibility**: "High contrast" needs to be balanced with "friendly and colorful" to not look stark.
