import type { PathDef } from '../tracing/types';

export type DifficultyTier = 'easy' | 'medium' | 'hard';

const COLORS = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#22c55e', // Green
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
];

const ICONS_START = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'];
const ICONS_END = ['🦴', '🧶', '🧀', '🌻', '🥕', '🍗'];
const LABELS_HK = ['狗', '貓', '老鼠', '倉鼠', '兔仔', '狐狸'];

// Helper to get random number in range
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const clampY = (y: number) => Math.max(50, Math.min(550, y));

interface Point {
    x: number;
    y: number;
}

export const generateBezierPath = (start: Point, end: Point, tier: DifficultyTier): string => {
    const dist = Math.abs(end.x - start.x);
    const midX = (start.x + end.x) / 2;

    // Small random jitter for "hand-drawn" feel
    const randomCurveOffset = () => random(-15, 15);

    if (tier === 'easy') {
        // Easy: Gentle Curves (Rainbow or Shallow S)
        // Ensure minimal offset to avoid straight lines as per requirement
        const minOffset = dist * 0.2;
        const maxOffset = dist * 0.35;
        
        // Randomize direction and shape
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
        // Medium: Tangled Waves ("S" shapes)
        // Control Point 1 pulls Up/Down, Control Point 2 pulls Opposite
        const offsetAmount = random(dist * 0.4, dist * 0.7);
        const sign1 = Math.random() > 0.5 ? 1 : -1;
        
        // Force S-shape often
        const cp1 = {
            x: start.x + dist * 0.25 + random(-30, 30),
            y: clampY(start.y + sign1 * offsetAmount)
        };
        const cp2 = {
            x: end.x - dist * 0.25 + random(-30, 30),
            y: clampY(end.y - sign1 * offsetAmount) // Opposite sign for S-curve
        };

        return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    }

    // Hard: Complex Knots / Loops
    const variance = 350;
    const midPoint = {
        x: midX + random(-100, 100),
        y: clampY((start.y + end.y) / 2 + random(-200, 200))
    };

    // Double Cubic Bezier for segments to create loops
    const cpA1 = { x: start.x + random(50, 200), y: clampY(start.y + random(-variance, variance)) };
    const cpA2 = { x: midPoint.x - random(50, 200), y: clampY(midPoint.y + random(-variance, variance)) };

    const cpB1 = { x: midPoint.x + random(50, 200), y: clampY(midPoint.y + random(-variance, variance)) };
    const cpB2 = { x: end.x - random(50, 200), y: clampY(end.y + random(-variance, variance)) };

    return `M ${start.x} ${start.y} 
            C ${cpA1.x} ${cpA1.y}, ${cpA2.x} ${cpA2.y}, ${midPoint.x} ${midPoint.y}
            C ${cpB1.x} ${cpB1.y}, ${cpB2.x} ${cpB2.y}, ${end.x} ${end.y}`;
};

export const generateLevel = (difficulty: DifficultyTier): PathDef[] => {
    let pathCount = 3;
    if (difficulty === 'medium') pathCount = 4;
    if (difficulty === 'hard') pathCount = 5;

    // Grid / Layout config
    const startX = 100;
    const endX = 900;
    const canvasHeight = 600;
    const marginY = 80; // Top/Bottom margin
    const availableHeight = canvasHeight - (marginY * 2);

    // Generate Start Positions (evenly spaced to satisfy >80px collision requirement)
    // Using slots guarantees spacing
    const slotHeight = availableHeight / (pathCount - 1 || 1);
    
    // Create base positions
    let startYPositions = Array.from({length: pathCount}, (_, i) => marginY + i * slotHeight);
    
    // Add small jitter to Start Y, but ensure 80px spacing
    // Since slotHeight for 5 items in 500px is ~100px, jitter should be small (<10px) to maintain 80px gap
    startYPositions = startYPositions.map(y => y + random(-10, 10));

    // End Positions
    let endYPositions = [...startYPositions];
    
    // Shuffle End Positions based on difficulty
    if (difficulty !== 'easy') {
        // Shuffle ends to force crossings
        for (let i = endYPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [endYPositions[i], endYPositions[j]] = [endYPositions[j], endYPositions[i]];
        }
        
        // Add more jitter to ends in Hard mode
        if (difficulty === 'hard') {
            endYPositions = endYPositions.map(y => clampY(y + random(-30, 30)));
        }
    }

    // Assign Icons and Colors
    // Shuffle icons so we don't always get Dog/Cat first
    const shuffledIndices = Array.from({length: ICONS_START.length}, (_, i) => i)
                                .sort(() => Math.random() - 0.5);

    return startYPositions.map((startY, i) => {
        const endY = endYPositions[i];
        const pathData = generateBezierPath(
            {x: startX, y: startY}, 
            {x: endX, y: endY}, 
            difficulty
        );

        const iconIndex = shuffledIndices[i % shuffledIndices.length];
        
        return {
            id: `path-${Date.now()}-${i}`, // Unique ID
            color: COLORS[i % COLORS.length],
            d: pathData,
            startNode: {
                x: startX,
                y: startY,
                icon: ICONS_START[iconIndex]
            },
            endNode: {
                x: endX,
                y: endY,
                icon: ICONS_END[iconIndex]
            },
            label: LABELS_HK[iconIndex]
        };
    });
};
