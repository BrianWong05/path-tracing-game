import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { generateLevel } from './PathGenerator';
import { getLevelById } from './LevelData';
import { TangledCanvas } from '../tracing/TangledCanvas';
import { VictoryModal } from '../tracing/VictoryModal';
import { useGameSound } from '../audio/useGameSound';
import type { PathDef } from '../tracing/types';

interface LevelGameContainerProps {
  levelId: number;
  onBack: () => void;
  onNextLevel: () => void;
}

export const LevelGameContainer: React.FC<LevelGameContainerProps> = ({ levelId, onBack, onNextLevel }) => {
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [key, setKey] = useState(0); // Force reset on restart
  const [paths, setPaths] = useState<PathDef[]>([]);
  const { playSuccess, playMistake, playStageComplete, playVoiceMatch } = useGameSound();

  // Load Level Config
  const levelConfig = useMemo(() => getLevelById(levelId), [levelId]);
  
  // Initialize or Regenerate Level
  useEffect(() => {
    if (levelConfig) {
        setPaths(generateLevel(levelConfig.tier));
        setKey(prev => prev + 1); // Reset canvas
        setIsVictoryOpen(false);
    }
  }, [levelId, levelConfig]);

  const handleRegenerate = () => {
    if (levelConfig) {
      setPaths(generateLevel(levelConfig.tier));
      setKey(prev => prev + 1); // Force canvas remount/reset
      setIsVictoryOpen(false);
    }
  };
  
  if (!levelConfig) {
      return <div>Error: Level not found</div>;
  }

  const handleAllCompleted = () => {
      // Delay slightly for effect?
      playStageComplete();
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
            <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-slate-700 flex items-center gap-3">
                <span>Level {levelId} <span className="text-slate-400 font-normal mx-2">|</span> {levelConfig.tier.toUpperCase()}</span>
            </div>
            
            <button
                onClick={handleRegenerate}
                className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-slate-50 transition-colors flex items-center gap-2 text-slate-700 font-medium"
            >
                <RotateCcw size={18} />
                Generate New Level (產生新關卡)
            </button>
        </div>

        {/* Game Canvas */}
        <div className="flex-1 p-4 md:p-8">
            <TangledCanvas 
                key={`${levelId}-${key}`} // Force remount on level change or restart
                paths={paths}
                onAllCompleted={handleAllCompleted}
                onMistake={playMistake}
                onPathComplete={playSuccess}
                onVoiceMatch={playVoiceMatch}
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
