# Requirement: Level Selection Interface

## ADDED Requirements

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
