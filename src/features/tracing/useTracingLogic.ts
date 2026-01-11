import { useState, useRef, useEffect } from 'react';

// Helper to calculate distance from a point to an SVG path
// Since getPointAtLength is expensive to run in loop, we'll cache points
export const useTracingLogic = (pathData: string, tolerance: number) => {
  const [currentPath, setCurrentPath] = useState<string>(''); // The User's drawn path
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1 scaling (appx)
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOffTrack, setIsOffTrack] = useState(false);

  const pathRef = useRef<SVGPathElement>(document.createElementNS("http://www.w3.org/2000/svg", "path"));
  const lengthRef = useRef(0);
  const sampledPointsRef = useRef<{x: number, y: number, l: number}[]>([]);
  
  // Initialize virtual path for math
  useEffect(() => {
    pathRef.current.setAttribute('d', pathData);
    const totalLen = pathRef.current.getTotalLength();
    lengthRef.current = totalLen;

    // Pre-sample points every 5px for performance
    const samples = [];
    for (let l = 0; l <= totalLen; l += 5) {
      const p = pathRef.current.getPointAtLength(l);
      samples.push({ x: p.x, y: p.y, l });
    }
    sampledPointsRef.current = samples;

    setCurrentPath('');
    setProgress(0);
    setIsCompleted(false);
    setIsOffTrack(false);
  }, [pathData]);

  // Handle Pointer Move
  const handlePointerMove = (x: number, y: number) => {
    if (!isDrawing || isCompleted || isOffTrack) return;
    
    // Check distance to path using pre-sampled points
    let minDist = Infinity;
    let closestLen = 0;
    
    const samples = sampledPointsRef.current;
    for (let i = 0; i < samples.length; i++) {
       const p = samples[i];
       const dx = x - p.x;
       const dy = y - p.y;
       // Use squared distance for faster comparison
       const distSq = dx*dx + dy*dy;
       if (distSq < minDist) {
         minDist = distSq;
         closestLen = p.l;
       }
    }
    
    const actualDist = Math.sqrt(minDist);
    if (actualDist > tolerance) {
       // Off track!
       setIsOffTrack(true);
       return;
    }

    // Valid point
    // Update visual path
    const newPt = `L ${x} ${y}`;
    setCurrentPath(prev => prev ? `${prev} ${newPt}` : `M ${x} ${y}`);
    
    // Check progress
    const totalLen = lengthRef.current;
    const percent = closestLen / totalLen;
    if (percent > progress) {
        setProgress(percent);
    }
    
    if (percent > 0.95) {
       setIsCompleted(true);
    }
  };

  const startDrawing = (x: number, y: number) => {
    setIsOffTrack(false);
    setIsDrawing(true);
    setCurrentPath(`M ${x} ${y}`);
    handlePointerMove(x, y); // Check immediate validity
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (!isCompleted) {
        // If stopped before completion, maybe reset or keep partial?
        // Requirement: "stops or gently fades" -> "Try again from last valid"
        // For simplicity: If not complete, we reset for now, or just leave it.
        // User likely lifts finger to rest.
        // Let's keep it but stop adding.
        if (isOffTrack) {
           // Reset if off track
           setTimeout(() => {
             setCurrentPath('');
             setIsOffTrack(false);
             setProgress(0);
           }, 500);
        }
    }
  };

  return {
    currentPath,
    isDrawing,
    isOffTrack,
    isCompleted,
    progress,
    startDrawing,
    handlePointerMove,
    stopDrawing
  };
};
