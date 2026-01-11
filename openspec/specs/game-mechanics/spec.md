# game-mechanics Specification

## Purpose
TBD - created by archiving change feat-matching-game. Update Purpose after archive.
## Requirements
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

### Requirement: Path Tracing Interaction
The user MUST be able to trace a specific path from a start point to an end point with high responsiveness.
#### Scenario: Drawing follows finger smoothly on iPad
- **Given** I am on an iPad or a device with a high-refresh-rate screen.
- **When** I trace a path with my finger quickly.
- **Then** the visual path should follow my finger with minimal lag (< 16ms delay).
- **And** the UI should remain responsive and not drop frames.

### Requirement: Path Variations
The game MUST support non-straight paths.
#### Scenario: Curve Level
GIVEN Level 1 is selected
THEN the path displayed is a gentle wave/curve

#### Scenario: ZigZag Level
GIVEN Level 2 is selected
THEN the path displayed has sharp turns (Zig-Zag)

### Requirement: Guide Path Display
The system MUST display a dashed guide path between all correct pairs.
#### Scenario: Initial Load
GIVEN a matching level is loaded
THEN all correct pairs are connected by a gray dashed line
AND the lines are curved (not straight)

### Requirement: Path Tracing interaction
The user MUST trace the specific guide path to complete a match accurately.

#### Scenario: Accurate Endpoint Detection
- **Given** the user is tracing a path
- **When** the user's finger is near the destination node
- **Then** the completion should only trigger if the finger is within **45px** of the center of the destination node OR if the path progress is > **98%**.
- **And** it should NOT trigger if the finger is simply "kind of close" (e.g., > 45px away).

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

### Requirement: Path Completion Sound
The system MUST play a distinct, positive sound effect when a user successfully completes a single path tracing.

#### Scenario: Successful Trace
User finishes drawing the "Cat" path from start to end.
**Expected Result:** A "chime" or "ding" sound plays immediately.

#### Scenario: Incomplete Trace
User stops drawing 99% of the way (not complete).
**Expected Result:** No sound plays.

### Requirement: Path Failure Sound
The system MUST play a distinct, negative/alert sound effect when a user's drawing deviates too far from the path (triggering the "off-track" state).

#### Scenario: Off Track
User draws a line that wanders >40px away from the guide.
**Expected Result:** A "buzz" or "error" sound plays, and the line resets.

### Requirement: Stage Completion Sound
The system MUST play a celebratory sound sequence when ALL paths in the current level are completed.

#### Scenario: All Paths Done
User finishes the last remaining path on the screen.
**Expected Result:** A "victory" fanfare plays alongside the Victory Modal appearing.

### Requirement: Progressive Difficulty Tiers

The level generation system SHALL support 3 distinct difficulty tiers (Easy, Medium, Hard) that determine path complexity, intersection frequency, and tracing tolerance.

#### Scenario: Easy Mode Generation
GIVEN the user selects "Easy" difficulty
WHEN a level is loaded
THEN the paths should be simple curves (Quadratic Bezier)
AND paths should NOT overlap
AND the tolerance for tracing should be HIGH (forgiving).

#### Scenario: Medium Mode Generation
GIVEN the user selects "Medium" difficulty
WHEN a level is loaded
THEN the paths should contain S-curves (Cubic Bezier with 2-3 CPs)
AND paths MAY cross each other (simple intersections)
AND the tolerance should be MODERATE.

#### Scenario: Hard Mode Generation
GIVEN the user selects "Hard" difficulty
WHEN a level is loaded
THEN the paths should contain complex loops or "knots"
AND paths should heavily overlap or weave
AND the tolerance should be LOW (strict).

### Requirement: Level Progression

The game SHALL allow users to unlock subsequent levels upon completing the current level.

#### Scenario: Unlocking Levels
GIVEN the user is on Level N
WHEN the user successfully traces all paths
THEN a "Success" modal should appear
AND the "Next Level" button should unlock Level N+1.

