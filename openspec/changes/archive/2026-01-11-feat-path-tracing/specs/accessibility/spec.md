# Spec Delta: Tracing Accessibility

## ADDED Requirements

### Requirement: Forgiving Input
The tracing mechanic MUST be forgiving to motor tremors.
#### Scenario: Tolerance Buffer
GIVEN a child with shaky hands
WHEN they trace roughly along the path
THEN the system accepts the input as valid if within the 30px buffer zone
