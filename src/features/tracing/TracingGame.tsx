import { useState } from 'react';
import { TangledCanvas } from './TangledCanvas';
import { tracingLevels, type TracingLevel } from './data';
import { VictoryModal } from './VictoryModal';
import { ArrowLeft } from 'lucide-react';
import { useGameSound } from '../audio/useGameSound';

interface TracingGameProps {
  onBack: () => void;
  initialLevelIndex?: number;
}

export const TracingGame = ({ onBack, initialLevelIndex = 0 }: TracingGameProps) => {
  const [levelIndex, setLevelIndex] = useState(initialLevelIndex);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playSuccess, playMistake, playStageComplete } = useGameSound();
  
  const currentLevel: TracingLevel = tracingLevels[levelIndex];

  const handleLevelComplete = () => {
    setIsCompleted(true);
    // Sound handled inside modal or here
    playStageComplete();
  };

  const handleNextLevel = () => {
    setIsCompleted(false);
    if (levelIndex < tracingLevels.length - 1) {
        setLevelIndex(prev => prev + 1);
    } else {
        onBack();
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
  };

  return (
    <div className={`min-h-screen ${currentLevel.themeColor} flex flex-col items-center p-4 transition-colors duration-500`}>
       {/* Header */}
       <div className="w-full flex items-center justify-between mb-4">
         <button onClick={onBack} className="bg-white p-3 rounded-xl shadow text-slate-600 hover:scale-105 transition-transform">
           <ArrowLeft size={32} />
         </button>
         <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-700">{currentLevel.title}</h1>
            <p className="text-slate-500">{currentLevel.description}</p>
         </div>
         <div className="w-12"></div>
       </div>

       {/* Game Board */}
       <div className="flex-1 w-full max-w-6xl flex items-center justify-center relative p-4">
          <div className="w-full aspect-[16/9] shadow-2xl rounded-3xl bg-white/50 backdrop-blur-sm p-2">
             {/* Key ensures full reset on level change */}
             <TangledCanvas 
               key={currentLevel.id + (isCompleted ? '_done' : '')} 
               paths={currentLevel.paths}
               onAllCompleted={handleLevelComplete}
               onMistake={playMistake}
               onPathComplete={playSuccess}
             />
          </div>
       </div>

       <VictoryModal 
         isOpen={isCompleted}
         onRestart={handleRestart}
         onHome={handleNextLevel} 
         homeLabel={levelIndex < tracingLevels.length - 1 ? "下一關 (Next)" : "回到選單 (Levels)"}
       />
    </div>
  );
};
