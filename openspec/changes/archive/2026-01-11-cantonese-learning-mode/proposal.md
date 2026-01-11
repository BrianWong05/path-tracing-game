# Proposal: Cantonese Voice Control & Learning Mode

## Goal
Implement a Voice User Interface (VUI) that enhances the game by allowing children to trigger animations by speaking the correct animal names in Cantonese. This adds a layer of language learning and oral motor training to the existing fine motor (tracing) training.

## Features
1.  **Speech Recognition**:
    *   Detects Cantonese ('zh-HK') speech using `window.SpeechRecognition`.
    *   Matches keywords (animal names) against user speech.
2.  **Visual Feedback**:
    *   Microphone status indicator (Active/Inactive).
    *   "Voice Success" animation on the matching animal node (Scale + Rotation + Glow).
3.  **Integration**:
    *   Seamlessly integrated into the game canvas.
    *   Works alongside the existing touch/drag tracing mechanic.

## Implementation Details
1.  **Custom Hook `useCantoneseSpeech`**:
    *   Manages the speech recognition lifecycle.
    *   Exposes `isListening`, `error`, and `matchedKeyword`.
    *   Handles permission denials gracefully.
2.  **Animal Node Refactor**:
    *   Extract the inline SVG node rendering in `TangledCanvas` to a dedicated `AnimalNode` component.
    *   Add Framer Motion for the "Voice Success" animation.
3.  **Data Update**:
    *   Update level generation to include Cantonese labels (e.g., '貓', '狗') alongside icons.

## Risk Assessment
*   **Browser Support**: Web Speech API is not supported in all browsers (Game primarily targets Chrome/Safari/Edge). Fallback: Hide feature if unsupported.
*   **Accuracy**: Child speech can be unclear. We will use fuzzy matching (searching for the keyword in the transcript) rather than exact string equality.
