# Spec Delta: Tracing Mechanics

## REMOVED Requirements
### Free Form Drawing
- The user can drag freely from any point to any point.

## ADDED Requirements

### Requirement: Guide Path Display
The system MUST display a dashed guide path between all correct pairs.
#### Scenario: Initial Load
GIVEN a matching level is loaded
THEN all correct pairs are connected by a gray dashed line
AND the lines are curved (not straight)

### Requirement: Path Tracing interaction
The user MUST trace the specific guide path to complete a match.
#### Scenario: Tracing
GIVEN the user touches a start item
WHEN they drag along the guide path
THEN a solid color fills the path behind their finger

#### Scenario: Completion
GIVEN the user traces the path to the end item
WHEN they release their finger
THEN the matching logic triggers (success animation)
