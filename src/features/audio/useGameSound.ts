import { useRef, useEffect } from 'react';

export const useGameSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on mount, but it might be suspended until interaction
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioCtxRef.current = new AudioContext();
    }
    
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const ensureAudioResumed = async () => {
    if (audioCtxRef.current?.state === 'suspended') {
      try {
        await audioCtxRef.current.resume();
      } catch (e) {
        console.error("Failed to resume audio context", e);
      }
    }
  };

  const playTone = (freq: number, type: 'sine' | 'square' | 'sawtooth' | 'triangle', duration: number, startTime: number = 0) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime + startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  };

  const playSuccess = async () => {
    await ensureAudioResumed();
    // Major Triad Arpeggio (C5 - E5 - G5)
    // C5 = 523.25, E5 = 659.25, G5 = 783.99
    playTone(523.25, 'sine', 0.1, 0);
    playTone(659.25, 'sine', 0.1, 0.1);
    playTone(783.99, 'sine', 0.3, 0.2);
  };

  const playMistake = async () => {
    await ensureAudioResumed();
    // Low Sawtooth Buzz (A2 = 110Hz)
    playTone(110, 'sawtooth', 0.3, 0);
  };

  const playStageComplete = async () => {
    await ensureAudioResumed();
    // Victory Fanfare
    // C5, E5, G5, C6 (High C)
    const now = 0;
    playTone(523.25, 'triangle', 0.15, now);
    playTone(659.25, 'triangle', 0.15, now + 0.15);
    playTone(783.99, 'triangle', 0.15, now + 0.30);
    playTone(1046.50, 'triangle', 0.6, now + 0.45); // Sustain last note
  };

  const playVoiceMatch = async () => {
    await ensureAudioResumed();
    // Cheerful "ding-ding" chime for voice match
    // G5 -> B5 quick double chime
    playTone(783.99, 'sine', 0.12, 0);
    playTone(987.77, 'sine', 0.25, 0.1);
  };

  return {
    playSuccess,
    playMistake,
    playStageComplete,
    playVoiceMatch
  };
};
