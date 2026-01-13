import { useState, useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

export interface UseCantoneseSpeechResult {
  isListening: boolean;
  error: string | null;
  matchedKeyword: string | null;
  startListening: () => void;
  stopListening: () => void;
}

// Lazy load the plugin to prevent crash on module init
let SpeechRecognitionPlugin: any = null;
const getSpeechRecognition = async () => {
  if (!SpeechRecognitionPlugin && Capacitor.isNativePlatform()) {
    try {
      const module = await import('@capacitor-community/speech-recognition');
      SpeechRecognitionPlugin = module.SpeechRecognition;
    } catch (e) {
      console.warn('Speech recognition plugin not available:', e);
    }
  }
  return SpeechRecognitionPlugin;
};

export const useCantoneseSpeech = (keywords: string[]): UseCantoneseSpeechResult => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedKeyword, setMatchedKeyword] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Helper to handle keyword matching
  const checkKeywords = useCallback((transcript: string) => {
    console.log('🎤 Speech:', transcript);
    const found = keywords.find(kw => transcript.includes(kw));
    if (found) {
      console.log('🎯 Matched Keyword:', found);
      setMatchedKeyword(found);
      setTimeout(() => setMatchedKeyword(null), 1500);
    }
  }, [keywords]);

  // WEB IMPLEMENTATION
  useEffect(() => {
    if (Capacitor.isNativePlatform()) return; // Skip if native

    // 0. Check Network Status
    if (!navigator.onLine) {
        setError('離線模式無法使用語音功能 (Offline Mode)');
        return;
    }

    // 1. Check Browser Support
    const SpeechRecognitionWeb = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionWeb) {
      setError('Browser does not support Speech Recognition');
      return;
    }

    // 2. Initialize Recognition
    const recognition = new SpeechRecognitionWeb();
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
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'aborted') return;
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
         setError('Microphone permission denied');
      }
    };

    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const transcript = lastResult[0].transcript;
      checkKeywords(transcript);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [keywords, checkKeywords]);

  const startListening = useCallback(async () => {
    // 1. WEB START
    if (!Capacitor.isNativePlatform()) {
        if (recognitionRef.current && !isListening) {
            if (!navigator.onLine) {
                 setError('離線模式無法使用語音功能 (Offline Mode)');
                 return;
            }
            try {
                recognitionRef.current.start();
            } catch(e: any) {
                if (e.name !== 'InvalidStateError') {
                     console.error('Failed to start recognition:', e);
                }
            }
        }
        return;
    }

    // 2. NATIVE START
    try {
        const SR = await getSpeechRecognition();
        if (!SR) {
            setError('Speech recognition not available');
            return;
        }

        const { available } = await SR.available();
        if (!available) {
             setError('Speech recognition not available on this device');
             return;
        }
        
        const hasPermission = await SR.checkPermissions();
        if (hasPermission.speechRecognition !== 'granted') {
             const requested = await SR.requestPermissions();
             if (requested.speechRecognition !== 'granted') {
                 setError('Microphone permission denied');
                 return;
             }
        }

        setIsListening(true);
        setError(null);
        
        await SR.start({
            language: "zh-HK",
            maxResults: 2,
            prompt: "請說出指令...",
            partialResults: true,
            popup: false,
        });
        
    } catch (e: any) {
        console.error('Native speech error:', e);
        setIsListening(false);
        setError('Speech recognition failed: ' + e.message);
    }

  }, [isListening]);

  const stopListening = useCallback(async () => {
      // 1. WEB STOP
      if (!Capacitor.isNativePlatform()) {
          if (recognitionRef.current) {
              recognitionRef.current.stop();
          }
          return;
      }

      // 2. NATIVE STOP
      try {
          const SR = await getSpeechRecognition();
          if (SR) {
              await SR.stop();
          }
          setIsListening(false);
      } catch (e) {
          console.error("Failed to stop", e);
      }
  }, []);

  return { isListening, error, matchedKeyword, startListening, stopListening };
};

