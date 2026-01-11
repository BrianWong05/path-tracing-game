# Spec Delta: Visual Feeding

## ADDED Requirements

### Requirement: Progress Visualization
The UI MUST show progress as a solid stroke over the dashed line.
#### Scenario: Filling
GIVEN the user has traced 50% of the path
THEN the path is 50% solid color and 50% dashed gray

### Requirement: Multi-Path Clarity
The UI MUST clearly distinguish overlapping paths.
#### Scenario: Overlap
GIVEN two paths cross each other
THEN the active path (being traced) is rendered on top (higher z-index)
