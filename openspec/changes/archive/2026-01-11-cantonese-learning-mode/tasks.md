# Tasks

- [x] Update `PathDef` interface in `src/features/tracing/types.ts` to include `label: string`.
- [x] Update `PathGenerator.ts` to assign Cantonese labels ('貓', '狗', etc.) to generated paths.
- [x] Create `useCantoneseSpeech.ts` hook in `src/features/tracing/`.
- [x] Extract `AnimalNode` into `src/features/tracing/AnimalNode.tsx` (using Framer Motion).
- [x] Modify `TangledCanvas.tsx` to:
    - [x] Integrate `useCantoneseSpeech`.
    - [x] Replace inline nodes with `AnimalNode`.
    - [x] Pass `isMatched` state to the correct `AnimalNode`.
    - [x] Add Microphone Icon UI.
- [x] Verify functionality:
    - [x] Test with simulated speech events (since we can't speak to the agent).
    - [x] Ensure animations trigger correctly.
    - [x] Ensure game still works for tracing.
