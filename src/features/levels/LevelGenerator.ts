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
// Easy: Shallow curves/arches, no overlaps
// Medium: Deep waves, moderate overlaps
// Hard: Loops/knots, complex overlaps
export const generateBezierPath = (start: Point, end: Point, tier: DifficultyTier): string => {
  const midX = (start.x + end.x) / 2;
  const dist = Math.abs(end.x - start.x);
  
  // Helper to clamp values to screen bounds
  const clampY = (y: number) => Math.max(50, Math.min(550, y));

  // Small random jitter for "hand-drawn" feel
  const randomCurveOffset = () => random(-15, 15);

  if (tier === 'easy') {
    // Easy: Rainbow or Shallow S (20-30% offset)
    // We force a minimum offset to ensure it's NEVER a straight line
    const minOffset = dist * 0.2;
    const maxOffset = dist * 0.3;
    
    // Choose between Rainbow (same direction) or shallow S (opposite directions)
    const isRainbow = Math.random() > 0.5;
    const sign1 = Math.random() > 0.5 ? 1 : -1;
    const sign2 = isRainbow ? sign1 : -sign1;

    const cp1 = { 
      x: start.x + dist * 0.33, 
      y: clampY(start.y + sign1 * random(minOffset, maxOffset) + randomCurveOffset()) 
    };
    const cp2 = { 
      x: end.x - dist * 0.33, 
      y: clampY(end.y + sign2 * random(minOffset, maxOffset) + randomCurveOffset()) 
    };
    
    return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  } 
  
  if (tier === 'medium') {
     // Medium: Deep Sine Wave or Deep S (50-80% offset)
     const minOffset = dist * 0.5;
     const maxOffset = dist * 0.8;
     
     const sign1 = Math.random() > 0.5 ? 1 : -1;
     const sign2 = Math.random() > 0.5 ? 1 : -1; // Often S-shape if signs differ

     const cp1 = { 
       x: start.x + dist * 0.25 + random(-50, 50), 
       y: clampY(start.y + sign1 * random(minOffset, maxOffset) + randomCurveOffset()) 
     };
     const cp2 = { 
       x: end.x - dist * 0.25 + random(-50, 50), 
       y: clampY(end.y + sign2 * random(minOffset, maxOffset) + randomCurveOffset()) 
     };
     
     return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
  }

  // Hard: Multi-segment high complexity (Loops/Knots)
  const variance = 350;
  
  const midPoint = {
      x: midX + random(-150, 150),
      y: clampY((start.y + end.y) / 2 + random(-250, 250) + randomCurveOffset())
  };

  // Segment 1: Start -> Mid
  const cpA1 = { x: start.x + random(50, 250), y: clampY(start.y + random(-variance, variance) + randomCurveOffset()) };
  const cpA2 = { x: midPoint.x - random(50, 250), y: clampY(midPoint.y + random(-variance, variance) + randomCurveOffset()) };

  // Segment 2: Mid -> End
  const cpB1 = { x: midPoint.x + random(50, 250), y: clampY(midPoint.y + random(-variance, variance) + randomCurveOffset()) };
  const cpB2 = { x: end.x - random(50, 250), y: clampY(end.y + random(-variance, variance) + randomCurveOffset()) };

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
