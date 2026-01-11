# Requirement: Tangled Paths Gameplay

## ADDED Requirements

### Requirement: Overlapping Paths & Locking
The game MUST support multiple overlapping paths where users can lock onto one path at a time.
#### Scenario: Multi-Path Setup
- **Given** the game initializes
- **Then** 3 to 4 distinct Start/End pairs (e.g., Cat-Yarn, Dog-Bone) are generated.
- **And** the paths connecting them MUST overlap/cross near the center.
- **And** each path has a unique color theme.

#### Scenario: Path Locking
- **Given** the user touches the "Cat" start node
- **Then** the "Cat" path becomes the Locked Active Path.
- **And** dragging across the "Dog" path intersection does NOT switch focus or cause failure.
- **And** lifting the finger resets the active state (unless completed).

#### Scenario: Victory Condition
- **Given** the user completes a path
- **Then** it plays a specific sound (e.g., Meow).
- **And** the path enters a "Completed" visual state (Gold/Solid).
- **When** all paths are completed
- **Then** show the Victory Modal/Animation.
