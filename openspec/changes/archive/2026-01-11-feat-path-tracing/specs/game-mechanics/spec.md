# Spec Delta: Tracing Mechanics

## ADDED Requirements

### Requirement: Path Tracing Interaction
The user MUST be able to trace a specific path from a start point to an end point.
#### Scenario: Successful Trace
GIVEN the user touches the start item
WHEN they drag their finger along the dashed guide line within the tolerance range
THEN a solid color line follows their finger
AND the progress continues until the end item is reached

#### Scenario: Deviating from Path
GIVEN the user is tracing the path
WHEN they drag their finger more than 30px away from the guide line
THEN the line stops drawing
AND visual feedback indicates they are off-track

### Requirement: Path Variations
The game MUST support non-straight paths.
#### Scenario: Curve Level
GIVEN Level 1 is selected
THEN the path displayed is a gentle wave/curve

#### Scenario: ZigZag Level
GIVEN Level 2 is selected
THEN the path displayed has sharp turns (Zig-Zag)
