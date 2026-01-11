import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onHome: () => void;
  onNext?: () => void;
  homeLabel?: string;
  nextLabel?: string;
}

export const VictoryModal = ({ 
  isOpen, 
  onRestart, 
  onHome, 
  onNext,
  homeLabel = "回到選單", 
  nextLabel = "下一關"
}: VictoryModalProps) => {
  React.useEffect(() => {
    if (isOpen) {
      const audio = new Audio('/sounds/victory.mp3'); 
      audio.play().catch(() => {});
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="bg-white rounded-3xl p-8 shadow-2xl relative z-10 w-full max-w-md text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="bg-yellow-100 p-6 rounded-full">
                <Trophy size={64} className="text-yellow-500" />
              </div>
            </div>
            
            <h2 className="text-4xl font-black text-slate-700 mb-2">
              太棒了！
            </h2>
            <p className="text-xl text-slate-500 mb-8 font-medium">
              你完成了這一關！
            </p>

            <div className="flex flex-col gap-4">
              {onNext && (
                <button
                    onClick={onNext}
                    className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 text-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg hover:-translate-y-1"
                >
                    <Trophy size={24} />
                    {nextLabel}
                </button>
              )}

              <div className="flex gap-4">
                <button
                    onClick={onHome}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl p-4 text-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <Home size={20} />
                    {homeLabel}
                </button>
                
                <button
                    onClick={onRestart}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl p-4 text-lg font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <RotateCcw size={20} />
                    再玩一次
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
