# Spec Delta: Tracing UI

## ADDED Requirements

### Requirement: Tracing Visuals
The UI MUST visually guide the user.
#### Scenario: Guide Path
GIVEN a tracing level is active
THEN a thick, gray, dashed line connects the start and end items

#### Scenario: Start Indicator
GIVEN the game is waiting for input
THEN the start item pulses or has a "Start" token to attract attention

### Requirement: Traditional Chinese Content
All text MUST be in Traditional Chinese.
#### Scenario: Game Title
GIVEN the Tracing Game home screen
THEN the title reads "快樂運筆練習"
AND the button reads "下一關" (Next Level)
