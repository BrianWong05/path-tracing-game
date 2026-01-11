# Design: Voice Control Architecture

## 1. Data Model
Update `PathDef` to include the Cantonese label.

```typescript
// src/features/tracing/types.ts
export interface PathDef {
  // ... existing fields
  label: string; // e.g., '貓', '狗'
}
```

## 2. Speech Hook (`useCantoneseSpeech`)
A resilient hook that wraps `SpeechRecognition`.

```typescript
interface UseCantoneseSpeechProps {
  keywords: string[]; // List of active animal names to listen for
}

interface UseCantoneseSpeechResult {
  isListening: boolean;
  error: string | null;
  matchedKeyword: string | null; // The keyword that was just spoken
}
```

*   **Configuration**:
    *   `lang: 'zh-HK'`
    *   `continuous: true`
    *   `interimResults: false`
*   **Lifecycle**: Auto-start when component mounts (or via explicit toggle), stop on unmount. Auto-restart on 'end' event if meant to be continuous.

## 3. UI Component Structure

```mermaid
graph TD
    GameContainer --> TangledCanvas
    TangledCanvas --> useCantoneseSpeech
    TangledCanvas --> AnimalNode (Start)
    TangledCanvas --> AnimalNode (End)
    
    subgraph TangledCanvas
        MicIndicator
    end
```

### `AnimalNode` (New Component)
*   **Props**: `x`, `y`, `icon`, `color`, `label`, `isCompleted`, `isMatched` (New).
*   **Behavior**:
    *   If `isMatched` becomes true -> Trigger Animation (Scale 1.5x, Rotate 360, Gold Ring).
    *   If `isCompleted` -> Show Checkmark/Star (Existing logic).
