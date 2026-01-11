# Requirement: Game Mechanics for Matching Game

## ADDED Requirements

### Requirement: Drag-to-Draw Interaction
The core game mechanic MUST be drawing a continuous line from a source item to a target item.
#### Scenario: Successful Match
- Given the user touches a Source Item
- When they drag their finger across the screen to the correct Target Item
- And release the finger
- Then a line should remain visible connecting the two items
- And the line color should turn green
- And a success sound should play.

#### Scenario: Mismatch
- Given the user drags a line from a Source Item
- When they release on an incorrect Target Item or empty space
- Then the line should disappear (snap back)
- And the Source Item should remain available for matching.

### Requirement: Level System
The game MUST support defined levels with specific categories.
#### Scenario: Level Completion
- Given the user is on the "Animals" level
- When all pairs are correctly matched
- Then a "Great Job!" (做得好！) modal should appear
- And a confetti animation should trigger.

#### Scenario: Level Selection
- Given the user is on the Home Screen
- When they select "Colors" (顏色)
- Then the game board should load with color matching pairs.
