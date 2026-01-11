import type { PathDef } from './types';

export interface TracingLevel {
  id: string;
  title: string;
  description: string;
  paths: PathDef[];
  tolerance: number; 
  themeColor: string;
}

export const tracingLevels: TracingLevel[] = [
  // --- Original Basic Levels (Restored & Adapted) ---
  {
    id: 'wave',
    title: '波浪線 (Wave)',
    description: 'Basic tracing practice',
    tolerance: 30,
    themeColor: 'bg-green-50',
    paths: [{
        id: 'wave-path',
        color: '#22c55e',
        // Shifted Y by +150 to center in 600px height (Original 150 -> 300)
        // Refined to use Quadratic Beziers (Q/T) for perfect sine wave shape (Hump/Valley)
        // 6 segments of 150px each. Amplitude +/- 100 (Control +/- 200)
        d: "M 50 300 Q 125 100, 200 300 T 350 300 T 500 300 T 650 300 T 800 300 T 950 300", 
        startNode: { x: 50, y: 300, icon: '🐶' },
        endNode: { x: 950, y: 300, icon: '🏠' },
        label: '狗'
    }]
  },
  {
    id: 'zigzag',
    title: '閃電線 (Zigzag)', 
    description: 'Sharp turns practice',
    tolerance: 30,
    themeColor: 'bg-yellow-50',
    paths: [{
        id: 'zigzag-path',
        color: '#eab308',
        // Shifted Y by +150 (Original 150->300, 50->200, 250->400)
        d: "M 50 300 L 200 200 L 350 400 L 500 200 L 650 400 L 800 200 L 950 300",
        startNode: { x: 50, y: 300, icon: '🐱' },
        endNode: { x: 950, y: 300, icon: '🐟' },
        label: '貓'
    }]
  },
  {
    id: 'loop',
    title: '繞圈圈 (Loop)',
    description: 'Continuous motion practice',
    tolerance: 30,
    themeColor: 'bg-pink-50',
    paths: [{
        id: 'loop-path',
        color: '#ec4899',
        // Shifted Y by +150
        d: "M 50 300 C 200 300, 200 200, 350 200 C 500 200, 500 400, 650 400 C 800 400, 800 300, 950 300",
        startNode: { x: 50, y: 300, icon: '🐝' },
        endNode: { x: 950, y: 300, icon: '🌸' },
        label: '蜜蜂'
    }]
  },

  // --- New Advanced Tangled Levels ---
  {
    id: 'tangled-1',
    title: '迷宮運筆 Level 1',
    description: 'Help the animals find their toys!',
    tolerance: 40,
    themeColor: 'bg-blue-50',
    paths: [
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
            // Added +/- 1px variation to Control Points (299, 301) to prevent "Zero Height Bounding Box" bug
            // which causes SVG Filters to disappear on perfectly horizontal lines.
            d: 'M 100 300 C 300 299 700 301 900 300', 
            startNode: { x: 100, y: 300, icon: '🐦' },
            endNode: { x: 900, y: 300, icon: '🔔' },
            label: '雀仔'
        },
    ]
  },
  {
    id: 'tangled-2',
    title: '迷宮運筆 Level 2',
    description: 'More complex tangles!',
    tolerance: 35,
    themeColor: 'bg-purple-50',
    paths: [
        // Crossing X shape
        {
            id: 'bee',
            color: '#eab308', // yellow
            d: 'M 100 100 C 500 100 500 500 900 500', 
            startNode: { x: 100, y: 100, icon: '🐝' },
            endNode: { x: 900, y: 500, icon: '🌸' },
            label: '蜜蜂'
        },
        {
            id: 'butterfly',
            color: '#ec4899', // pink
            d: 'M 100 500 C 500 500 500 100 900 100', 
            startNode: { x: 100, y: 500, icon: '🦋' },
            endNode: { x: 900, y: 100, icon: '🌺' },
            label: '蝴蝶'
        },
        // Loop in middle
        {
            id: 'ant',
            color: '#a855f7', // purple
            d: 'M 100 300 C 400 300 400 100 500 100 C 600 100 600 500 500 500 C 400 500 400 300 900 300', 
            startNode: { x: 100, y: 300, icon: '🐜' },
            endNode: { x: 900, y: 300, icon: '🍭' },
            label: '螞蟻'
        }
    ]
  }
];
