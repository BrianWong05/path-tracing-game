import { useState, useRef, useEffect } from 'react';
import type { PathDef } from './types';

interface PathState {
  progress: number;
  drawingPath: string; // The "ink" drawn by user
  isCompleted: boolean;
  isOffTrack: boolean;
}

export const useTangledTracing = (paths: PathDef[], tolerance: number = 40, callbacks?: { onMistake?: () => void, onPathComplete?: () => void }) => {
  // State per path ID
  const [pathStates, setPathStates] = useState<Record<string, PathState>>({});
  const [activePathId, setActivePathId] = useState<string | null>(null);

  // Cache path elements for math
  const pathElementsRef = useRef<Record<string, SVGPathElement>>({});
  const pathLengthsRef = useRef<Record<string, number>>({});
  const sampledPathsRef = useRef<Record<string, {x: number, y: number, l: number}[]>>({});

  // Initialize refs and state
  useEffect(() => {
    setPathStates(prev => {
      const newPathStates: Record<string, PathState> = { ...prev };
      let hasChanges = false;

      paths.forEach(p => {
        // Create hidden path element for calculations if missing
        if (!pathElementsRef.current[p.id]) {
            const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
            el.setAttribute('d', p.d);
            pathElementsRef.current[p.id] = el;
            const totalLen = el.getTotalLength();
            pathLengthsRef.current[p.id] = totalLen;

            // Pre-sample points every 5px
            const samples = [];
            for (let l = 0; l <= totalLen; l += 5) {
                const pt = el.getPointAtLength(l);
                samples.push({ x: pt.x, y: pt.y, l });
            }
            sampledPathsRef.current[p.id] = samples;
        }

        // Init state only if missing
        if (!newPathStates[p.id]) {
            newPathStates[p.id] = {
                progress: 0,
                drawingPath: '',
                isCompleted: false,
                isOffTrack: false
            };
            hasChanges = true;
        }
      });
      
      return hasChanges ? newPathStates : prev;
    });
  }, [paths]);

  // Helper to get distance to a specific path
  const getDistanceToPath = (pathId: string, x: number, y: number) => {
    const samples = sampledPathsRef.current[pathId];
    if (!samples) return { dist: Infinity, closestLen: 0 };

    let minDistSq = Infinity;
    let closestLen = 0;
    
    for (let i = 0; i < samples.length; i++) {
       const p = samples[i];
       const dx = x - p.x;
       const dy = y - p.y;
       const distSq = dx*dx + dy*dy;
       if (distSq < minDistSq) {
         minDistSq = distSq;
         closestLen = p.l;
       }
    }
    return { dist: Math.sqrt(minDistSq), closestLen };
  };

  const startTracing = (x: number, y: number, pathId?: string) => {
    let targetPathId = pathId;

    // If no specific ID provided, find closest start node
    if (!targetPathId) {
        let minStartDist = Infinity;
        paths.forEach(p => {
            const dx = x - p.startNode.x;
            const dy = y - p.startNode.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist <= 60) { // Hit radius for start node
                if (dist < minStartDist) {
                    minStartDist = dist;
                    targetPathId = p.id;
                }
            }
        });
    }

    if (targetPathId) {
        // LOCK ON
        if (!pathStates[targetPathId]?.isCompleted) {
            setActivePathId(targetPathId);
            
            // Start exactly at the new point
             setPathStates(prev => ({
                ...prev,
                [targetPathId!]: {
                    ...prev[targetPathId!],
                    isOffTrack: false,
                    // Visual optimization: Start either at touch or at node center? 
                    // Let's start at touch x,y for continuity, but maybe prepend Move to node center?
                    // For now, M x y is safe.
                    drawingPath: `M ${x} ${y}`
                }
            }));
        }
    }
  };

  const trace = (x: number, y: number) => {
    if (!activePathId) return;

    const currentPathState = pathStates[activePathId];
    if (currentPathState.isCompleted || currentPathState.isOffTrack) return;

    // 2. Calculate Distance STRICTLY against Active Path
    const { dist, closestLen } = getDistanceToPath(activePathId, x, y);

    // 3. Check Tolerance
    if (dist > tolerance) {
        // FAIL / SNAP BACK
        setPathStates(prev => ({
            ...prev,
            [activePathId]: {
                ...prev[activePathId],
                isOffTrack: true
            }
        }));
        
        // Trigger Mistake Callback
        callbacks?.onMistake?.();
        // Auto-reset off-track after delay?
        setTimeout(() => {
             setPathStates(prev => ({
                ...prev,
                [activePathId]: {
                    ...prev[activePathId],
                    isOffTrack: false,
                    drawingPath: '' // Clear ink
                }
            }));
            setActivePathId(null); // Force lift finger
        }, 500);
        return;
    }

    // 4. Success: Update Progress
    const totalLen = pathLengthsRef.current[activePathId];
    const percent = closestLen / totalLen;
    
    // Append to drawing path
    const newPathStr = `${currentPathState.drawingPath} L ${x} ${y}`;
    
    // Check completion via Progress OR Proximity to End Node
    const pathDef = paths.find(p => p.id === activePathId);
    let isAtEndNode = false;
    if (pathDef) {
        const dx = x - pathDef.endNode.x;
        const dy = y - pathDef.endNode.y;
        if (Math.sqrt(dx*dx + dy*dy) < 45) { // 45px hit radius (reduced from 60)
            isAtEndNode = true;
        }
    }

    const isNowCompleted = percent >= 0.98 || isAtEndNode;
    
    // If completed, snap drawingPath to full original path for perfect visuals
    const finalDrawingPath = isNowCompleted 
        ? (paths.find(p => p.id === activePathId)?.d || newPathStr)
        : newPathStr;

    setPathStates(prev => ({
        ...prev,
        [activePathId]: {
            ...prev[activePathId],
            drawingPath: finalDrawingPath,
            progress: Math.max(prev[activePathId].progress, percent),
            isCompleted: isNowCompleted
        }
    }));

    if (isNowCompleted) {
        setActivePathId(null); // Release lock on completion
        // Sound effect trigger
        callbacks?.onPathComplete?.();
    }
  };

  const stopTracing = () => {
    setActivePathId(null);
  };

  return {
    pathStates,
    activePathId,
    startTracing,
    trace,
    stopTracing
  };
};
