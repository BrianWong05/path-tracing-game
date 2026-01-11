# Requirement: UI/UX for Matching Game

## ADDED Requirements

### Requirement: Visual Design
The interface MUST use a bright, high-contrast color scheme suitable for children.
#### Scenario: Line Appearance
- Given the user is drawing a line
- Then the line must be an SVG stroke
- And the stroke width must be at least 6px
- And the line caps must be rounded.

### Requirement: Language support
All text MUST be in Traditional Chinese.
#### Scenario: Home Screen Text
- Given the application loads
- Then the title "快樂小手連連看" should be displayed prominently.

#### Scenario: Victory Message
- Given a level is completed
- Then the modal should display "做得好！" (Great Job!).
