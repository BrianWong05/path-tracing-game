import React, { useState, useMemo } from 'react';
import { LEVELS as ALL_LEVELS } from './LevelData';
import type { DifficultyTier } from './LevelGenerator';

interface LevelSelectorProps {
  maxUnlockedLevel: number;
  onLevelSelect: (levelId: number) => void;
}

const TIERS: { id: DifficultyTier; label: string; color: string }[] = [
  { id: 'easy', label: '簡單 Easy', color: 'bg-green-500' },
  { id: 'medium', label: '中等 Medium', color: 'bg-blue-500' },
  { id: 'hard', label: '困難 Hard', color: 'bg-red-500' },
];

export const LevelSelector: React.FC<LevelSelectorProps> = ({ maxUnlockedLevel, onLevelSelect }) => {
  const [selectedTier, setSelectedTier] = useState<DifficultyTier>('easy');

  const filteredLevels = useMemo(() => {
    return ALL_LEVELS.filter(l => l.tier === selectedTier);
  }, [selectedTier]);

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-slate-800">Select Difficulty</h1>

      {/* Tier Tabs */}
      <div className="flex gap-4 mb-8">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`px-6 py-3 rounded-full text-xl font-bold transition-all transform hover:scale-105 ${
              selectedTier === tier.id 
                ? `${tier.color} text-white shadow-lg ring-4 ring-offset-2 ring-${tier.color}`
                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
            }`}
          >
            {tier.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
        {filteredLevels.map((level) => {
          const isLocked = level.id > maxUnlockedLevel;
          return (
            <button
              key={level.id}
              disabled={isLocked}
              onClick={() => onLevelSelect(level.id)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center text-2xl font-bold
                transition-all duration-300
                ${isLocked 
                   ? 'bg-slate-100 text-slate-300 cursor-not-allowed border-2 border-slate-200' 
                   : 'bg-white text-slate-800 shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-slate-50 border-2 border-slate-200'
                }
              `}
            >
              <span className="text-3xl mb-1">{isLocked ? '🔒' : (level.id /* Or just index+1 in tier? */)}</span>
              {!isLocked && <span className="text-xs text-slate-400 font-normal">Level {level.id}</span>}
            </button>
          );
        })}
      </div>
      
      <div className="mt-12 text-slate-400 text-sm">
         Progress: Level {maxUnlockedLevel} / 30
      </div>
    </div>
  );
};
