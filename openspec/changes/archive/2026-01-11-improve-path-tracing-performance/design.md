# Design: Tracing Logic Optimization

## Architectural Reasoning

### Pre-sampling Path Points
The current bottleneck is `getPointAtLength`. By sampling the path into an array of `{x, y, l}` points (where `l` is length along path) during `useEffect`, we trade a small amount of memory for significantly faster distance checks. 
- **Interval**: A sample interval of 5-10px is sufficient for smooth tracing without excessive memory.
- **Complexity**: $O(N)$ distance check during move events, where $N$ is the number of samples. For a 1000px path, $N \approx 200$. This is extremely fast in Javascript.

### Throttling State Updates
React re-renders are expensive. We will use a `requestAnimationFrame` loop or a `throttle` wrapper (e.g., from `lodash` or a custom hook) to ensure state updates happen at most once per frame (16ms).
- **Ref-first approach**: We will store the pointer position in a Ref and only read it during the throttled logic execution.

### Localized Search (Future Optimization)
Wait, a localized search (searching around the last known progress) could further reduce complexity to $O(1)$ amortized, but given the target device and path lengths, $O(N)$ on a pre-sampled array is already a huge improvement and less prone to "getting stuck". We will stick to $O(N)$ sampling first.

## Components Affected
- `useTracingLogic.ts`: Core optimization for single path tracing.
- `useTangledTracing.ts`: Core optimization for multi-path tangled tracing.
- `TracingCanvas.tsx`: Throttling implementation.
- `TangledCanvas.tsx`: Throttling implementation.
