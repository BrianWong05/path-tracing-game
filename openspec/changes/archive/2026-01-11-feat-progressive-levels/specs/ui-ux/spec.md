## ADDED Requirements

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
