# Requirement: Visual Feedback & Interaction

## ADDED Requirements

### Requirement: Visual States & Z-Index
Paths MUST visually indicate their state (idle vs active) through opacity, z-index, and stroke style.
#### Scenario: Idle State
- **Given** no path is active
- **Then** all paths are displayed as semi-transparent, dashed lines.
- **And** all Start/End nodes are visible.

#### Scenario: Active State Visuals
- **Given** a path is Activated (locked)
- **Then** the active path becomes Solid, Fully Opaque, and Thicker.
- **And** it moves to the top visual layer (rendered last).
- **And** other paths fade to lower opacity to reduce noise.
- **And** a "Glow" effect follows the drawing tip.

#### Scenario: Off-Track Feedback
- **Given** the user drags outside the tolerance zone of the Locked Path
- **Then** the path glowing progress "snaps back" to the last valid point.
- **And** an error sound or visual pulse is triggered.
