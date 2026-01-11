# Proposal: Improve Path Tracing Performance

## Problem
The path tracing mechanic (both in `TracingCanvas` and `TangledCanvas`) is laggy on iPad. This is caused by:
1.  **Expensive Calculations**: Calling `SVGPathElement.getPointAtLength()` in a loop during every pointer move event to calculate distance to the path.
2.  **High-Frequency Re-renders**: Triggering React state updates on every pointer move event, causing the entire SVG to re-render up to 120 times per second.
3.  **Lack of Throttling**: No management of event frequency or rendering frame budget.

## Proposed Solution
Optimize the tracing logic to handle high-frequency events gracefully and reduce computational overhead:
1.  **Pre-sampling**: Sample path points once during initialization and store them in an array. Calculate distances against this array instead of the DOM.
2.  **Throttling**: Use `requestAnimationFrame` or a time-based throttle to limit state updates and re-renders.
3.  **Visual Optimization**: Only update the drawn path if the user has moved a significant distance, reducing the complexity of the SVG path string.

## Impact
- **Performance**: Smoother drawing experience on iPad and low-end devices.
- **Battery**: Reduced CPU/GPU usage during gameplay.
- **User Experience**: Immediate visual feedback without lag, which is critical for the target audience (children with special needs).
