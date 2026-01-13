import { useState, useEffect, useRef, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

export interface UseCantoneseSpeechResult {
  isListening: boolean;
  error: string | null;
  matchedKeyword: string | null;
  startListening: () => void;
  stopListening: () => void;
}

// Safe wrapper to get plugin - prevents crash if plugin fails to initialize
const getSpeechRecognition = () => {
  if (Capacitor.isNativePlatform()) {
    try {
      return SpeechRecognition;
    } catch (e) {
      console.warn('Speech recognition plugin not available:', e);
      return null;
    }
  }
  return null;
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

  // NATIVE IMPLEMENTATION - Setup result listener
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return; // Skip if web

    let partialListener: any;
    let isMounted = true;
    
    const setupListeners = async () => {
        try {
            const SR = getSpeechRecognition();
            if (!SR || !isMounted) return;
            
            // Check if plugin is available before adding listener
            const { available } = await SR.available();
            if (!available || !isMounted) return;
            
            partialListener = await SR.addListener('partialResults', (data: { matches: string[] }) => {
                const transcript = data.matches && data.matches.length > 0 ? data.matches[0] : '';
                if (transcript) checkKeywords(transcript);
            });
        } catch (e) {
            console.warn("Speech recognition listener setup skipped:", e);
        }
    };
    
    setupListeners();

    return () => {
        isMounted = false;
        if (partialListener) {
            try {
                partialListener.remove();
            } catch (e) {
                // Ignore cleanup errors
            }
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
    console.log('[Speech] Starting native recognition...');
    try {
        const SR = getSpeechRecognition();
        console.log('[Speech] Plugin loaded:', !!SR);
        
        if (!SR) {
            setError('Speech recognition not available');
            return;
        }

        const { available } = await SR.available();
        console.log('[Speech] Available:', available);
        
        if (!available) {
             setError('Speech recognition not available on this device');
             return;
        }
        
        const hasPermission = await SR.checkPermissions();
        console.log('[Speech] Current permissions:', JSON.stringify(hasPermission));
        
        if (hasPermission.speechRecognition !== 'granted') {
             console.log('[Speech] Requesting permissions...');
             const requested = await SR.requestPermissions();
             console.log('[Speech] Permission result:', JSON.stringify(requested));
             
             if (requested.speechRecognition !== 'granted') {
                 setError('Microphone permission denied');
                 return;
             }
        }

        setIsListening(true);
        setError(null);
        
        console.log('[Speech] Starting...');
        await SR.start({
            language: "zh-HK",
            maxResults: 2,
            prompt: "請說出指令...",
            partialResults: true,
            popup: false,
        });
        console.log('[Speech] Started successfully');
        
    } catch (e: any) {
        console.error('[Speech] Native speech error:', e);
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
          const SR = getSpeechRecognition();
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

