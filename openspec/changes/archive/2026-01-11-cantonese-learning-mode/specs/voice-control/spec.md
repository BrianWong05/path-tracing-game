# Voice Control Specifications

## ADDED Requirements

### Requirement: Speech Recognition Engine
The system MUST listen to user voice input strictly in Cantonese.

#### Scenario: User speaks correct animal name
- **Given** the user is in a level with a "Cat" (貓) icon.
- **When** the user says "貓" or a sentence containing "貓".
- **Then** the system detects the match.
- **And** the "Cat" node triggers a success animation.

#### Scenario: User speaks unrelated words
- **Given** the user says "Hello" or "Apple".
- **Then** the system ignores the input.
- **And** no animation is triggered.

#### Scenario: Browser Permission Denied
- **Given** the browser prompts for microphone permission.
- **When** the user clicks "Block".
- **Then** the microphone indicator shows a "Disabled/Red" state.
- **And** the game continues to function (tracing only).

### Requirement: Visual Feedback
The system MUST provide visual cues for microphone status and successful matching.

#### Scenario: Microphone Active
- **Given** permissions are granted.
- **Then** a microphone icon is visible in the UI (Green/Active).

#### Scenario: Voice Success Animation
- **When** a match is detected.
- **Then** the targeted animal icon scales up to 1.5x.
- **And** rotates 360 degrees.
- **And** emits a gold ring effect.
