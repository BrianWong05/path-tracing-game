import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCantoneseSpeechResult {
  isListening: boolean;
  error: string | null;
  matchedKeyword: string | null;
  startListening: () => void;
  stopListening: () => void;
}

export const useCantoneseSpeech = (keywords: string[]): UseCantoneseSpeechResult => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedKeyword, setMatchedKeyword] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // 0. Check Network Status
    if (!navigator.onLine) {
        setError('離線模式無法使用語音功能 (Offline Mode)');
        return;
    }

    // 1. Check Browser Support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Browser does not support Speech Recognition');
      return;
    }

    // 2. Initialize Recognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-HK';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // 3. Event Handlers
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      // If we simply stopped, update state.
      // If we want it to be always-on, we'd restart here unless manually stopped.
      // For now, let's treat it as "stops when silence/error/manual stop".
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'aborted') {
        // Ignore aborted errors as they happen during cleanup
        return;
      }
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
         setError('Microphone permission denied');
      }
      // 'no-speech' is common, don't show error for it
    };

    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      
      console.log('🎤 Speech:', transcript, lastResult.isFinal ? '(Final)' : '(Interim)');

      // Match on BOTH interim and final for real-time response
      const found = keywords.find(kw => transcript.includes(kw));
      
      if (found) {
        console.log('🎯 Matched Keyword:', found);
        setMatchedKeyword(found);
        
        // Clear the match after a short duration so the same word can be triggered again
        setTimeout(() => setMatchedKeyword(null), 1500); 
      }
    };

    recognitionRef.current = recognition;

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort(); // abort is faster than stop
      }
    };
  }, [keywords]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
        if (!navigator.onLine) {
             setError('離線模式無法使用語音功能 (Offline Mode)');
             return;
        }
        try {
            recognitionRef.current.start();
        } catch(e: any) {
             // Ignore "already started" errors
            if (e.name !== 'InvalidStateError') {
                 console.error('Failed to start recognition:', e);
            }
        }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
      if (recognitionRef.current) {
          recognitionRef.current.stop();
      }
  }, []);

  return { isListening, error, matchedKeyword, startListening, stopListening };
};
