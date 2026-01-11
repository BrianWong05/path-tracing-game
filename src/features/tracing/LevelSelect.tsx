import React from 'react';
import { tracingLevels } from './data';
import { ArrowLeft, Star } from 'lucide-react';

interface LevelSelectProps {
  onBack: () => void;
  onSelectLevel: (index: number) => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({ onBack, onSelectLevel }) => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <header className="flex items-center gap-4 mb-8">
        <button 
            onClick={onBack}
            className="p-3 bg-white rounded-xl shadow-sm text-slate-600 hover:scale-105 transition-transform"
        >
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-slate-800">Select a Level (選擇關卡)</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tracingLevels.map((level, index) => (
          <button
            key={level.id}
            onClick={() => onSelectLevel(index)}
            className={`
                group relative overflow-hidden rounded-3xl p-6 text-left shadow-lg hover:shadow-xl transition-all hover:-translate-y-1
                bg-white border-2 border-transparent hover:border-blue-400
            `}
          >
            {/* Background tint based on theme */}
            <div className={`absolute inset-0 opacity-20 ${level.themeColor}`} />

            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl">
                    {/* Use first start node icon as preview */}
                    {level.paths[0].startNode.icon}
                  </div>
                  {/* Logic for "stars" or completed status could go here later */}
                  <Star className="text-slate-300" size={24} />
               </div>

               <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                 {level.title}
               </h3>
               <p className="text-slate-500 text-sm">
                 {level.description}
               </p>

               <div className="mt-4 flex gap-2">
                 <span className="text-xs px-2 py-1 bg-white/50 rounded-full border border-slate-200 text-slate-500 font-medium">
                    {level.paths.length > 1 ? `${level.paths.length} Paths` : 'Single Path'}
                 </span>
               </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
