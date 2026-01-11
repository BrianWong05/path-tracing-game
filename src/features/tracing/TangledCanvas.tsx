import React, { useRef, useEffect } from 'react';
import { useTangledTracing } from './useTangledTracing';
import type { PathDef } from './types';

// Dummy Data for Validation (Fallback)
const SAMPLE_PATHS: PathDef[] = [
  {
    id: 'cat',
    color: '#3b82f6', // blue
    d: 'M 100 100 C 400 100 400 500 900 500', 
    startNode: { x: 100, y: 100, icon: '🐱' },
    endNode: { x: 900, y: 500, icon: '🧶' },
  },
  {
    id: 'dog',
    color: '#ef4444', // red
    d: 'M 100 500 C 400 500 400 100 900 100', 
    startNode: { x: 100, y: 500, icon: '🐶' },
    endNode: { x: 900, y: 100, icon: '🦴' },
  },
  {
    id: 'bird',
    color: '#22c55e', // green
    d: 'M 100 300 C 300 300 700 300 900 300', 
    startNode: { x: 100, y: 300, icon: '🐦' },
    endNode: { x: 900, y: 300, icon: '🔔' },
  },
];

interface TangledCanvasProps {
  paths?: PathDef[];
  onAllCompleted?: () => void;
  onMistake?: () => void;
  onPathComplete?: () => void;
}

export const TangledCanvas: React.FC<TangledCanvasProps> = ({ paths = SAMPLE_PATHS, onAllCompleted, onMistake, onPathComplete }) => {
  const { pathStates, activePathId, startTracing, trace, stopTracing } = useTangledTracing(paths, 40, {
    onMistake,
    onPathComplete
  });
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
    stopTracing(); // Changed from stopDrawing() to stopTracing() to match existing hook function
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
            {/* 
                Use userSpaceOnUse to avoid clipping on horizontal lines (which have 0 height bounding boxes).
                We define a large region covering the whole viewBox + margin.
            */}
            <filter id="glow" filterUnits="userSpaceOnUse" x="-500" y="-500" width="2000" height="2000">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="6" markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
         </defs>

         {renderList.map((path) => {
            const state = pathStates[path.id];
            const isActive = path.id === activePathId;
            const isCompleted = state?.isCompleted;
            const isOffTrack = state?.isOffTrack;
            const isOtherActive = activePathId && !isActive;

            // Visual Style
            const opacity = isOtherActive ? 0.3 : 1;


            
            // Force re-render on completion to avoid stale state
            return (
              <g key={`${path.id}-${isCompleted ? 'done' : 'active'}`} style={{ opacity, transition: 'opacity 0.3s' }}>
                
                {/* 1. Background Guide (Dashed/Ghost) */}
                <path
                  d={path.d}
                  fill="none"
                  stroke={path.color}
                  strokeWidth={isCompleted ? 30 : 15} // Thicker backing when done
                  strokeDasharray="20,20" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={isCompleted ? 0.2 : 0.5} 
                />

                {/* 2. Ink Path - Render only if active or completed */}
                {(isActive || isCompleted) && (
                    <path
                        d={isCompleted ? path.d : (state?.drawingPath || '')}
                        fill="none"
                        stroke={isCompleted ? '#fbbf24' : (isOffTrack ? '#ef4444' : path.color)}
                        strokeWidth={30}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-200"
                        style={{ filter: 'url(#glow)' }}
                    />
                )}

                {/* 3. Start Node (Pure SVG to fix iPad dislocation) */}
                <g 
                    transform={`translate(${path.startNode.x}, ${path.startNode.y})`}
                    className="cursor-pointer"
                    onPointerDown={(e) => {
                       e.stopPropagation();
                       const svg = svgRef.current;
                       if (svg) {
                           svg.setPointerCapture(e.pointerId);
                           const { x, y } = getSVGPoint(e.clientX, e.clientY);
                           startTracing(x, y, path.id);
                       }
                    }}
                >
                    <g 
                        className={`transition-transform duration-300 ${isActive ? 'scale-125' : 'scale-100'}`}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                        <circle
                            r="40"
                            fill={isCompleted ? '#fff' : path.color}
                            stroke={isCompleted ? '#facc15' : 'none'}
                            strokeWidth={isCompleted ? 4 : 0}
                            style={{ filter: `drop-shadow(0 4px 6px ${path.color}66)` }}
                        />
                        <text
                            y="2"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="36"
                            fill="black"
                            className="pointer-events-none select-none"
                            style={{ fontVariantEmoji: 'emoji' }} // Ensure coloring
                        >
                            {path.startNode.icon}
                        </text>
                    </g>
                </g>

                {/* 4. End Node (Pure SVG) */}
                <g transform={`translate(${path.endNode.x}, ${path.endNode.y})`}>
                    <g
                        className={`transition-all duration-500 ${isCompleted ? 'scale-125 rotate-12' : ''}`}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                         <circle
                            r="40"
                            fill="white"
                            stroke={isCompleted ? '#fbbf24' : path.color}
                            strokeWidth="4"
                        />
                        <text
                            y="2"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="36"
                            fill="black"
                            className="pointer-events-none select-none"
                             style={{ fontVariantEmoji: 'emoji' }}
                        >
                            {path.endNode.icon}
                        </text>
                    </g>
                </g>
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
