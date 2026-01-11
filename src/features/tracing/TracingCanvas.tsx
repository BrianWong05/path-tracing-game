import React, { useRef } from 'react';
import { useTracingLogic } from './useTracingLogic';

interface TracingCanvasProps {
  pathData: string;
  tolerance: number;
  strokeColor: string;
  onComplete: () => void;
}

export const TracingCanvas = ({ pathData, tolerance, strokeColor, onComplete }: TracingCanvasProps) => {
  const { 
    currentPath, 
    isOffTrack, 
    isCompleted, 
    startDrawing, 
    handlePointerMove, 
    stopDrawing 
  } = useTracingLogic(pathData, tolerance);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number, y: number } | null>(null);

  // Notify parent
  React.useEffect(() => {
    if (isCompleted) {
        onComplete();
    }
  }, [isCompleted, onComplete]);

  
  // Convert visual event to SVG coordinates
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
    startDrawing(x, y);
  };
  
  const onMove = (e: React.PointerEvent) => {
    if (rafRef.current) return;

    // Capture position synchronously
    const { x, y } = getSVGPoint(e.clientX, e.clientY);
    lastPosRef.current = { x, y };

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (lastPosRef.current) {
        handlePointerMove(lastPosRef.current.x, lastPosRef.current.y);
      }
    });
  };
  
  const onUp = (e: React.PointerEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    e.currentTarget.releasePointerCapture(e.pointerId);
    stopDrawing();
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 bg-white/50 rounded-3xl shadow-inner relative">
      <svg 
         ref={svgRef}
         viewBox="0 0 1000 300" 
         className="w-full h-full touch-none select-none"
         onPointerDown={onDown}
         onPointerMove={onMove}
         onPointerUp={onUp}
         onPointerCancel={onUp}
      >
         {/* Background Guide - Dashed */}
         <path 
           d={pathData} 
           fill="none" 
           stroke="#e2e8f0" 
           strokeWidth="40" 
           strokeLinecap="round" 
           strokeLinejoin="round"
         />
         <path 
           d={pathData} 
           fill="none" 
           stroke="#94a3b8" 
           strokeWidth="4" 
           strokeDasharray="20,20"
           strokeLinecap="round" 
         />
         
         {/* Tolerance Visual Debug (Optional, can hide)
         <path 
           d={pathData} 
           fill="none" 
           stroke="rgba(255,0,0,0.1)" 
           strokeWidth={tolerance * 2} 
         /> 
         */}

         {/* Active Drawing */}
         <path 
           d={currentPath}
           fill="none"
           stroke={isOffTrack ? '#ef4444' : strokeColor}
           strokeWidth="30"
           strokeLinecap="round"
           strokeLinejoin="round"
           className="transition-colors duration-200"
         />
      </svg>
      
      {/* Messages */}
      {isOffTrack && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-100 text-red-600 px-4 py-2 rounded-full font-bold animate-pulse">
           喔喔！太遠了，再試一次 (Too far!)
        </div>
      )}
    </div>
  );
};
