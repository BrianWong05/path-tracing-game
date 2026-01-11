import type { PathDef } from '../tracing/types';

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface LevelConfig {
  id: number;
  tier: DifficultyTier;
  pathCount: number;
  tolerance: number;
}

interface Point {
  x: number;
  y: number;
}

const COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
];

const ICONS_START = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
const ICONS_END = ['🦴', '🧶', '🧀', 'seeds', '🥕', '🍗'];

// Helper to get random number in range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate a cubic bezier path string
// Easy: Standard C (2 control points) that gently curves
// Medium: More variance in control points
// Hard: Wild control points to create loops/knots
export const generateBezierPath = (start: Point, end: Point, tier: DifficultyTier): string => {
  const midX = (start.x + end.x) / 2;
  const dist = Math.abs(end.x - start.x);
  
  // Base Control Points (Standard S-curve)
  // CP1 pulls right from start, CP2 pulls left from end
  let cp1 = { x: start.x + dist * 0.5, y: start.y };
  let cp2 = { x: end.x - dist * 0.5, y: end.y };

  if (tier === 'easy') {
    // Easy: Gentle variations. Unlikely to cross own path, but might curve up/down.
    // Shift Y slightly to be less robotic
    const variance = 50;
    cp1.y += random(-variance, variance);
    cp2.y += random(-variance, variance);
    
    // Smooth simple curve
    return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  } 
  
  if (tier === 'medium') {
     // Medium: Wider variance, maybe simple loops or sharper turns
     const variance = 150;
     cp1.y += random(-variance, variance);
     cp2.y += random(-variance, variance);
     // Shift X to make it S-like
     cp1.x += random(-50, 50);
     cp2.x += random(-50, 50);
     
     return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  }

// Helper to clamp values
const clampY = (y: number) => Math.max(50, Math.min(550, y));

  // Hard: Multi-segment high complexity
  // We'll add an intermediate point to force more tangling
  const variance = 300;
  
  // Intermediate point somewhere in the middle band
  const midPoint = {
      x: midX + random(-100, 100),
      y: clampY((start.y + end.y) / 2 + random(-200, 200))
  };

  // Segment 1: Start -> Mid
  const cpA1 = { x: start.x + random(50, 200), y: clampY(start.y + random(-variance, variance)) };
  const cpA2 = { x: midPoint.x - random(50, 200), y: clampY(midPoint.y + random(-variance, variance)) };

  // Segment 2: Mid -> End
  const cpB1 = { x: midPoint.x + random(50, 200), y: clampY(midPoint.y + random(-variance, variance)) };
  const cpB2 = { x: end.x - random(50, 200), y: clampY(end.y + random(-variance, variance)) };

  return `M ${start.x} ${start.y} 
          C ${cpA1.x} ${cpA1.y}, ${cpA2.x} ${cpA2.y}, ${midPoint.x} ${midPoint.y}
          C ${cpB1.x} ${cpB1.y}, ${cpB2.x} ${cpB2.y}, ${end.x} ${end.y}`;
};

export const generateLevelPaths = (config: LevelConfig): PathDef[] => {
    const { pathCount, tier, id } = config;
    
    // Layout logic: Left column (start) -> Right column (end)
    const marginY = 100;
    const availHeight = 500; // 600 total - 100
    const step = availHeight / (pathCount + 1);

    // Generate slots
    const startYPositions = Array.from({length: pathCount}, (_, i) => marginY + (i + 1) * step);
    const endYPositions = [...startYPositions];

    if (tier !== 'easy') {
        // Shuffle ends for tangling
        for (let i = endYPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [endYPositions[i], endYPositions[j]] = [endYPositions[j], endYPositions[i]];
        }
    }

    const pairs = Array.from({length: pathCount}, (_, i) => i);
    const assignedEndY = [...endYPositions]; 
    
    return pairs.map(i => {
        const sx = 100;
        const sy = startYPositions[i];
        const ex = 900;
        const ey = assignedEndY[i]; 
        
        const pathData = generateBezierPath({x: sx, y: sy}, {x: ex, y: ey}, tier);
        
        return {
            id: `level-${id}-path-${i}`,
            color: COLORS[i % COLORS.length],
            d: pathData,
            startNode: {
                x: sx,
                y: sy,
                icon: ICONS_START[i % ICONS_START.length]
            },
            endNode: {
                x: ex,
                y: ey,
                icon: ICONS_END[i % ICONS_END.length] 
            }
        };
    });
};
