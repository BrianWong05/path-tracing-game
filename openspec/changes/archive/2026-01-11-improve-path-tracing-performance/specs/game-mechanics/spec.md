# Spec Delta: Game Mechanics (Performance)

## MODIFIED Requirements

### Requirement: Path Tracing Interaction
The user MUST be able to trace a specific path from a start point to an end point with high responsiveness.
#### Scenario: Drawing follows finger smoothly on iPad
- **Given** I am on an iPad or a device with a high-refresh-rate screen.
- **When** I trace a path with my finger quickly.
- **Then** the visual path should follow my finger with minimal lag (< 16ms delay).
- **And** the UI should remain responsive and not drop frames.

### Requirement: Path Tracing interaction
The user MUST trace the specific guide path to complete a match accurately.
#### Scenario: Distance check remains accurate with pre-sampled points
- **Given** a complex curved path.
- **When** I trace the path.
- **Then** the logic should continue to correctly detect "off-track" states based on the configured tolerance.
- **And** the "completed" state should trigger reliably when reaching the end.
