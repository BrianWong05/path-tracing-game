## MODIFIED Requirements

### Requirement: Progressive Difficulty Tiers

The level generation system SHALL support 3 distinct difficulty tiers (Easy, Medium, Hard) that determine path complexity, intersection frequency, and tracing tolerance.

#### Scenario: Easy Mode Generation
GIVEN the user selects "Easy" difficulty
WHEN a level is loaded
THEN the paths should be "Rainbow" arches or shallow "S" waves (Cubic Bezier)
AND paths should NOT be straight lines
AND paths should NOT overlap
AND the tolerance for tracing should be HIGH (forgiving).

#### Scenario: Medium Mode Generation
GIVEN the user selects "Medium" difficulty
WHEN a level is loaded
THEN the paths should contain deep "Sine Wave" or "S" curves (50-80% offset)
AND paths MAY cross each other (simple intersections)
AND the tolerance should be MODERATE.

## ADDED Requirements

### Requirement: Organic Path Variation

The system SHALL introduce randomized offsets to path generation to ensure visual uniqueness.

#### Scenario: No Straight Lines
GIVEN any difficulty level
WHEN a path is generated
THEN it must have a non-zero control point offset to ensure curvature
AND it must look "hand-drawn" or organic rather than robotic.
