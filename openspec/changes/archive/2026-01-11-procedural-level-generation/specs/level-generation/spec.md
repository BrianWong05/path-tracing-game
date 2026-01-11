# Spec: Level Generation Strategy

## ADDED Requirements

### Requirement: Difficulty-Based Generation
The system MUST generate distinct path patterns based on the selected difficulty tier.

#### Scenario: Easy Mode Generation
GIVEN the difficulty is 'easy'
WHEN `generateLevel` is called
THEN it generates 3 path pairs
AND paths have visible curvature (no straight lines, offset > 20px)
AND paths are vertically spaced without intentional tangling
AND Start/End nodes are aligned or slightly offset but generally predictable.

#### Scenario: Medium Mode Generation
GIVEN the difficulty is 'medium'
WHEN `generateLevel` is called
THEN it generates 4 path pairs
AND paths involve "S" curves (inflection points)
AND Start and End Y positions are randomized to force path crossing.

#### Scenario: Hard Mode Generation
GIVEN the difficulty is 'hard'
WHEN `generateLevel` is called
THEN it generates 5 path pairs
AND control points have extreme offsets to create loops or knots
AND paths cross multiple times ("spaghetti" pattern).

### Requirement: Collision Prevention
The generator MUST prevent visual overlap of interactive elements to maintain usability.

#### Scenario: Start Node Spacing
WHEN generating start positions
THEN there must be at least 80px vertical spacing between any two start nodes
TO ensure buttons are clickable and distinct.

### Requirement: User Interface
The application SHALL provide user controls to trigger level regeneration.

#### Scenario: Re-generation
GIVEN a level is active
WHEN the user clicks "Generate New Level"
THEN the canvas immediately re-renders with a completely new set of random paths
AND the current difficulty setting is preserved.
