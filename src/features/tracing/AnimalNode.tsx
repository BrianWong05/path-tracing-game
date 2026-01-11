import React from 'react';
import { motion } from 'framer-motion';

interface AnimalNodeProps {
  x: number;
  y: number;
  icon: string;
  color: string;
  isCompleted: boolean;
  isActive: boolean;
  isMatched: boolean; // Voice match trigger
  onPointerDown?: (e: React.PointerEvent) => void;
}

export const AnimalNode: React.FC<AnimalNodeProps> = ({
  x,
  y,
  icon,
  color,
  isCompleted,
  isActive,
  isMatched,
  onPointerDown
}) => {
  return (
    <g transform={`translate(${x}, ${y})`} onPointerDown={onPointerDown} className={onPointerDown ? "cursor-pointer" : ""}>
      <motion.g
        initial={false}
        animate={{
          scale: isMatched ? 1.5 : (isActive ? 1.25 : 1),
          rotate: isMatched ? 360 : 0,
        }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
      >
         {/* Gold Ring Effect for Voice Match */}
         {isMatched && (
            <motion.circle
                r="60"
                fill="none"
                stroke="#fbbf24" // Amber-400
                strokeWidth="4"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
            />
         )}

        <circle
          r="50"
          fill={isCompleted ? '#fff' : color}
          stroke={isCompleted ? color : 'none'}
          strokeWidth={isCompleted ? 4 : 0}
          style={{ filter: `drop-shadow(0 4px 6px ${color}66)` }}
        />
        <text
          y="4"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="65"
          fill="black"
          className="pointer-events-none select-none"
          style={{ fontVariantEmoji: 'emoji' }}
        >
          {icon}
        </text>
      </motion.g>
    </g>
  );
};
