# Game Mechanics Spec Delta

## MODIFIED Requirements

### Requirement: Path Tracing interaction
The user MUST trace the specific guide path to complete a match accurately.

#### Scenario: Accurate Endpoint Detection
- **Given** the user is tracing a path
- **When** the user's finger is near the destination node
- **Then** the completion should only trigger if the finger is within **45px** of the center of the destination node OR if the path progress is > **98%**.
- **And** it should NOT trigger if the finger is simply "kind of close" (e.g., > 45px away).
