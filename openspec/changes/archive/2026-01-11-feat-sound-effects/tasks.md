# Tasks

1. [ ] **Scaffold Sound System**
   - Create `src/features/audio` directory.
   - Implement `useGameSound` hook using `AudioContext`.
   - create `playTone`, `playSuccess`, `playError`, `playWin` functions.
   - <!-- validation: Execute a test script that triggers the hook's methods and verifies AudioContext creation (mocked). -->

2. [ ] **Integrate Sound with Tracing Logic**
   - Modify `useTangledTracing.ts` to accept `onMistake` and `onPathComplete` callbacks.
   - Trigger `onMistake` when `isOffTrack` becomes true.
   - Trigger `onPathComplete` when `isNowCompleted` becomes true.
   - <!-- validation: Run unit tests for useTangledTracing to verify callbacks are fired. -->

3. [ ] **Wire Interface to Audio**
   - Update `TracingGame.tsx` to instantiate `useGameSound`.
   - Update `TangledCanvas.tsx` to accept the callbacks and pass them to the hook.
   - Pass `playError` to `onMistake`.
   - Pass `playSuccess` to `onPathComplete`.
   - Call `playWin` in `handleLevelComplete` inside `TracingGame.tsx`.
   - <!-- validation: Manual verification of sounds during gameplay. -->

4. [ ] **Refine Audio Design**
   - Tune the oscillator frequencies and envelopes for "pleasant" vs "unpleasant" feedback.
   - Ensure AudioContext resumes on first interaction.
   - <!-- validation: Manual playtesting. -->
