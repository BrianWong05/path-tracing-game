import React, { useRef, useEffect } from 'react';
import { useTangledTracing } from './useTangledTracing';
import type { PathDef } from './types';
import { AnimalNode } from './AnimalNode';
import { useCantoneseSpeech } from './useCantoneseSpeech';
import { Mic, MicOff } from 'lucide-react';

// Dummy Data for Validation (Fallback)
const SAMPLE_PATHS: PathDef[] = [
  {
    id: 'cat',
    color: '#3b82f6', // blue
    d: 'M 100 100 C 400 100 400 500 900 500', 
    startNode: { x: 100, y: 100, icon: '🐱' },
    endNode: { x: 900, y: 500, icon: '🧶' },
    label: '貓'
  },
  {
    id: 'dog',
    color: '#ef4444', // red
    d: 'M 100 500 C 400 500 400 100 900 100', 
    startNode: { x: 100, y: 500, icon: '🐶' },
    endNode: { x: 900, y: 100, icon: '🦴' },
    label: '狗'
  },
  {
    id: 'bird',
    color: '#22c55e', // green
    d: 'M 100 300 C 300 300 700 300 900 300', 
    startNode: { x: 100, y: 300, icon: '🐦' },
    endNode: { x: 900, y: 300, icon: '🔔' },
    label: '雀仔'
  },
];

interface TangledCanvasProps {
  paths?: PathDef[];
  onAllCompleted?: () => void;
  onMistake?: () => void;
  onPathComplete?: () => void;
  onVoiceMatch?: () => void;
}

export const TangledCanvas: React.FC<TangledCanvasProps> = ({ paths = SAMPLE_PATHS, onAllCompleted, onMistake, onPathComplete, onVoiceMatch }) => {
  const { pathStates, activePathId, startTracing, trace, stopTracing } = useTangledTracing(paths, 40, {
    onMistake,
    onPathComplete
  });
  
  // Voice Control
  const keywords = React.useMemo(() => paths.map(p => p.label).filter(Boolean), [paths]);
  const { isListening, matchedKeyword, startListening, stopListening, error: voiceError } = useCantoneseSpeech(keywords);

  // Auto-start listening on mount only
  const hasStartedRef = useRef(false);
  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startListening();
    }
  }, [startListening]);

  // Play sound on voice match
  useEffect(() => {
    if (matchedKeyword) {
      onVoiceMatch?.();
    }
  }, [matchedKeyword, onVoiceMatch]);

  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number, y: number } | null>(null);

  // Check for full victory
  useEffect(() => {
    // Check if ALL paths are completed
    const allDone = paths.every(p => pathStates[p.id]?.isCompleted);
    if (allDone && paths.length > 0) {
        onAllCompleted?.();
    }
  }, [pathStates, paths, onAllCompleted]);


  const getSVGPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    
    // Transform to SVG space
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = getSVGPoint(e.clientX, e.clientY);
    startTracing(x, y);
  };
  
  const onMove = (e: React.PointerEvent) => {
    if (rafRef.current) return;

    const { x, y } = getSVGPoint(e.clientX, e.clientY);
    lastPosRef.current = { x, y };

    rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (lastPosRef.current) {
            trace(lastPosRef.current.x, lastPosRef.current.y);
        }
    });
  };
  
  const onUp = (e: React.PointerEvent) => {
    if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
    stopTracing(); 
  };

  // Z-Index Sorting
  const renderList = [...paths].sort((a, b) => {
    // Active path always on top (last)
    if (a.id === activePathId) return 1;
    if (b.id === activePathId) return -1;
    return 0; // Default order for others
  });

  return (
    <div className="w-full h-full relative bg-slate-50 rounded-3xl overflow-hidden shadow-xl touch-none select-none">
       {/* Microphone Toggle Button */}
       <button 
          onClick={() => isListening ? stopListening() : startListening()}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white/90 p-3 rounded-full shadow-md backdrop-blur-sm border border-slate-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer"
          title={isListening ? '關閉語音 (Mute)' : '開啟語音 (Unmute)'}
       >
          {voiceError ? (
              <MicOff className="w-8 h-8 text-red-400" />
          ) : isListening ? (
              <Mic className="w-8 h-8 text-green-500 animate-pulse" />
          ) : (
              <MicOff className="w-8 h-8 text-slate-400" />
          )}
       </button>

       <svg 
         ref={svgRef}
         viewBox="0 0 1000 600"
         className="w-full h-full"
         onPointerDown={onDown}
         onPointerMove={onMove}
         onPointerUp={onUp}
         onPointerCancel={onUp}
       >
         <defs>
            <filter id="glow" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
         </defs>

         {renderList.map((path) => {
            const state = pathStates[path.id];
            const isActive = path.id === activePathId;
            const isCompleted = state?.isCompleted;
            const isOffTrack = state?.isOffTrack;
            const isOtherActive = activePathId && !isActive;

            // Visual Style
            const opacity = isOtherActive ? 0.3 : 1;

            return (
              <g key={`${path.id}-${isCompleted ? 'done' : 'active'}`} style={{ opacity, transition: 'opacity 0.3s' }}>
                
                {/* 1. Background Guide (Dashed/Ghost) */}
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.color}
                  strokeWidth={isCompleted ? 30 : 15}
                  strokeDasharray="20,20" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={isCompleted ? 0.2 : 0.5} 
                />

                {/* 2. Ink Path */}
                {(isActive || isCompleted) && (
                    <path
                        d={isCompleted ? path.d : (state?.drawingPath || '')}
                        fill="none"
                        stroke={isCompleted ? path.color : (isOffTrack ? '#ef4444' : path.color)}
                        strokeWidth={30}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-200"
                        style={{ filter: 'url(#glow)' }}
                    />
                )}

                {/* 3. Start Node - Animal */}
                <AnimalNode
                    x={path.startNode.x}
                    y={path.startNode.y}
                    icon={path.startNode.icon}
                    color={path.color}
                    isCompleted={!!isCompleted}
                    isActive={isActive}
                    isMatched={matchedKeyword === path.label}
                    onPointerDown={(e) => {
                       e.stopPropagation();
                       const svg = svgRef.current;
                       if (svg) {
                           svg.setPointerCapture(e.pointerId);
                           const { x, y } = getSVGPoint(e.clientX, e.clientY);
                           startTracing(x, y, path.id);
                       }
                    }}
                />

                {/* 4. End Node - Item */}
                <AnimalNode
                    x={path.endNode.x}
                    y={path.endNode.y}
                    icon={path.endNode.icon}
                    color={path.color}
                    isCompleted={!!isCompleted}
                    isActive={isActive && !!isCompleted}
                    isMatched={false} // Only start node reacts to voice
                />
              </g>
            );
         })}
       </svg>

       {/* Debug / UI Overlay */}
       {activePathId && pathStates[activePathId]?.isOffTrack && (
           <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
              ❌ Too Far! (太遠了)
           </div>
       )}
    </div>
  );
};
