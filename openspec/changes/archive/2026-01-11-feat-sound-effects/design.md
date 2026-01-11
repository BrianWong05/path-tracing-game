# Sound System Design

## Architecture

### `useGameSound` Hook
A singleton-like hook (or context-based if needed, but simple hook works for local usage) that manages a `AudioContext`.

```typescript
export const useGameSound = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = () => {
       if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
       }
       if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
       }
    };

    const playTone = (freq: number, type: 'sine' | 'square', duration: number) => {
        // Oscillator logic with gain envelope
    };

    const playSuccess = () => {
        // Play Major Triad Arpeggio
    };

    const playError = () => {
        // Play Low Sawtooth Buzz
    };
    
    // ...
}
```

### Logic Integration
We decouple the "Logic" from the "Side Effects" (Audio).
`useTangledTracing` remains a pure logic hook but exposes "Event hooks" (callbacks).

`TangledCanvas` acts as the controller that binds the `Logic Events` to the `Audio Actions`.

## Audio Design
- **Success**: C5 (523.25Hz) -> E5 -> G5 (Fast Arpeggio). Sine wave for softness.
- **Fail**: A2 (110Hz) Sawtooth. Short 0.3s burst.
- **Win**: Sequence of major chords or a "glissando".
