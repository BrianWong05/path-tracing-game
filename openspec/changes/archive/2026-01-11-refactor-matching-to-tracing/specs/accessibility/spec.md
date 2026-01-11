# Spec Delta: Tolerance

## ADDED Requirements

### Requirement: Tracing Tolerance
The system MUST allow for deviation from the exact path center.
#### Scenario: Buffer Zone
GIVEN the guide path is thin
WHEN the user traces with a thick finger
THEN the input is accepted if it stays within 30px of the path center

### Requirement: Snap Back
The system MUST provide feedback when deviation is too high.
#### Scenario: Off-Track
GIVEN the user drags too far away (>30px)
THEN the drawing stops or snaps back to the last valid point
AND a visual cue (e.g., fade out) indicates the error
