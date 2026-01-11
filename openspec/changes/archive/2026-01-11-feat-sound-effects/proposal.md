# Sound Effects for Gameplay Feedback

## Summary
Implement a synthesized sound effects system using the Web Audio API to provide immediate auditory feedback for key game events: path completion, path failure (off-track), and stage completion. This enhances the sensory experience and reinforcement learning for the target audience.

## Problem Statement
The current game relies solely on visual cues (color changes, text) for feedback. For the target audience (children with special needs), multi-sensory feedback is crucial for reinforcement and engagement. A lack of auditory cues makes the "success" and "error" states less impactful.

## Proposed Solution
Introduce a `useGameSound` hook that utilizes the browser's `Web Audio API` to synthesize sounds without requiring external assets. This ensures lightweight, instant feedback.
- **Success Chime**: Played when a single path is correctly traced.
- **Error Buzz**: Played when the user goes off-track or exceeds tolerance.
- **Stage Victory**: A celebratory sequence played when all paths are done.

## Impact
- **UX**: Significantly improved feedback loop.
- **Tech**: Zero asset footprint (no mp3/wav files), low latency.
