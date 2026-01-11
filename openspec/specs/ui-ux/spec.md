# ui-ux Specification

## Purpose
TBD - created by archiving change feat-matching-game. Update Purpose after archive.
## Requirements
### Requirement: Visual Design
The interface MUST use a bright, high-contrast color scheme suitable for children.
#### Scenario: Line Appearance
- Given the user is drawing a line
- Then the line must be an SVG stroke
- And the stroke width must be at least 6px
- And the line caps must be rounded.

### Requirement: Language support
All text MUST be in Traditional Chinese.
#### Scenario: Home Screen Text
- Given the application loads
- Then the title "快樂小手連連看" should be displayed prominently.

#### Scenario: Victory Message
- Given a level is completed
- Then the modal should display "做得好！" (Great Job!).

### Requirement: Tracing Visuals
The UI MUST visually guide the user.
#### Scenario: Guide Path
GIVEN a tracing level is active
THEN a thick, gray, dashed line connects the start and end items

#### Scenario: Start Indicator
GIVEN the game is waiting for input
THEN the start item pulses or has a "Start" token to attract attention

### Requirement: Traditional Chinese Content
All text MUST be in Traditional Chinese.
#### Scenario: Game Title
GIVEN the Tracing Game home screen
THEN the title reads "快樂運筆練習"
AND the button reads "下一關" (Next Level)

### Requirement: Progress Visualization
The UI MUST show progress as a solid stroke over the dashed line.
#### Scenario: Filling
GIVEN the user has traced 50% of the path
THEN the path is 50% solid color and 50% dashed gray

### Requirement: Multi-Path Clarity
The UI MUST clearly distinguish overlapping paths.
#### Scenario: Overlap
GIVEN two paths cross each other
THEN the active path (being traced) is rendered on top (higher z-index)

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

### Requirement: Screen Layout
The application MUST provide a dedicated screen to view all available game levels.
#### Scenario: Grid Display
- **Given** the user navigates to "Level Select"
- **Then** all 5 levels (Wave, Zigzag, Loop, Tangled 1, Tangled 2) are displayed in a responsive grid.
- **And** each card shows the Level Title and Description.

### Requirement: Interaction
The user MUST be able to start the game from any selected level.
#### Scenario: Choosing a Level
- **Given** the Level Select screen is open
- **When** the user clicks on "Tangled Level 1"
- **Then** the Game Screen loads immediately with "Tangled Level 1".

### Requirement: Navigation Flow
The system MUST support hierarchical navigation from Game back to Level Select.
#### Scenario: Back to Levels
- **Given** the user is inside a Game
- **When** they click "Back" (Arrow Left)
- **Then** they should return to the Level Select screen (not Home).

### Requirement: Level Selection Screen

The application SHALL provide a main menu that allows the user to select one of 3 difficulty tiers and any unlocked level within that tier.

#### Scenario: Difficulty Selection
GIVEN the user opens the application
THEN they should see a "Select Difficulty" screen
AND they should see buttons for "Simple" (簡單), "Medium" (中等), and "Hard" (困難).

#### Scenario: Level Grid
GIVEN the user selects a difficulty (e.g., Simple)
THEN they should see a grid of 10 Levels (1-10)
AND levels that are not yet unlocked should be visually distinct (locked).

### Requirement: Game Loop Includes Progression

The game loop SHALL seamlessly transition the user to the next level's content upon completion of the current level.

#### Scenario: Next Level Transition
GIVEN the user completes a level
WHEN the "Success" modal appears
THEN a "Next Level" (下一關) button should be available
AND clicking it should immediately load the next level's data without returning to the menu.

