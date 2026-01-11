import React, { useState, useEffect, useMemo } from 'react';
import { generateLevelPaths } from './LevelGenerator';
import { getLevelById } from './LevelData';
import { TangledCanvas } from '../tracing/TangledCanvas';
import { VictoryModal } from '../tracing/VictoryModal';
import { ArrowLeft } from 'lucide-react';

interface LevelGameContainerProps {
  levelId: number;
  onBack: () => void;
  onNextLevel: () => void;
}

export const LevelGameContainer: React.FC<LevelGameContainerProps> = ({ levelId, onBack, onNextLevel }) => {
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [key, setKey] = useState(0); // Force reset on restart

  // Load Level Config
  const levelConfig = useMemo(() => getLevelById(levelId), [levelId]);
  
  // Generate Paths
  const paths = useMemo(() => {
    if (!levelConfig) return [];
    return generateLevelPaths(levelConfig);
  }, [levelConfig]);

  // Reset state when level changes
  useEffect(() => {
    setIsVictoryOpen(false);
    setKey(prev => prev + 1);
  }, [levelId]);
  
  if (!levelConfig) {
      return <div>Error: Level not found</div>;
  }

  const handleAllCompleted = () => {
      // Delay slightly for effect?
      setTimeout(() => {
          setIsVictoryOpen(true);
      }, 500);
  };

  const handleRestart = () => {
      setIsVictoryOpen(false);
      setKey(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-screen bg-slate-100 flex flex-col">
        {/* Header / Info Bar */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
            <button 
                onClick={onBack}
                className="bg-white p-3 rounded-full shadow-md hover:bg-slate-50 transition-colors"
            >
                <ArrowLeft size={24} className="text-slate-600" />
            </button>
            <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-slate-700">
                Level {levelId} <span className="text-slate-400 font-normal mx-2">|</span> {levelConfig.tier.toUpperCase()}
            </div>
        </div>

        {/* Game Canvas */}
        <div className="flex-1 p-4 md:p-8">
            <TangledCanvas 
                key={`${levelId}-${key}`} // Force remount on level change or restart
                paths={paths}
                onAllCompleted={handleAllCompleted}
            />
        </div>

        {/* Victory Modal */}
        <VictoryModal
            isOpen={isVictoryOpen}
            onHome={onBack}
            onRestart={handleRestart}
            onNext={onNextLevel} // Enable Next Level flow
            homeLabel="回到選單"
            nextLabel="下一關"
        />
    </div>
  );
};
