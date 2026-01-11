## ADDED Requirements

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
