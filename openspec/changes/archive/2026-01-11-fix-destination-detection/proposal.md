# Fix Destination Detection Sensitivity

## Goal Description
The current destination detection is too sensitive, marking paths as complete when the user's finger is still significantly far from the target node. This change aims to improve the precision of the destination detection mechanism to ensure a more satisfactory and accurate user experience.

## User Review Required
> [!IMPORTANT]
> This change will require user validation to ensure the new sensitivity feels "right". We are tightening the completion radius and progress threshold.

## Proposed Changes
### Game Mechanics
#### [MODIFY] [useTangledTracing.ts](file:///Users/brianwong/Project/react/matching-game/src/features/tracing/useTangledTracing.ts)
- Reduce the "hit radius" for the end node from `60px` to `45px` (or a value closer to the visual node size).
- Increase the progress completion threshold from `0.90` (90%) to `0.98` (98%).
- Possibly require *both* high progress and proximity, or at least significantly tighten the "OR" condition.

## Verification Plan
### Automated Tests
- We can write a unit test for `useTangledTracing` (if possible to test hooks easily) or rely on manual verification since this is highly dependent on "feel".
- Since there are no existing tests, we will rely on manual verification.

### Manual Verification
1. Open the game on a device (or simulator).
2. Start tracing a path.
3. Stop tracing when the finger is near but not touching the destination (e.g., 50px away).
4. Verify that the path does NOT snap to complete.
5. Move the finger to touch the destination.
6. Verify that the path snaps to complete.
