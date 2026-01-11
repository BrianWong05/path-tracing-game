import { useState } from 'react';
import { Home } from '@/pages/Home';
import { LevelSelector } from '@/features/levels/LevelSelector';
import { LevelGameContainer } from '@/features/levels/LevelGameContainer';

type CurrentView = 'home' | 'levels' | 'game';

function App() {
  const [view, setView] = useState<CurrentView>('home');
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(30);

  const handleStartLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setView('game');
  };

  const handleNextLevel = () => {
    const nextId = currentLevelId + 1;
    if (nextId > 30) {
        // Game Complete or Loop?
        setView('levels'); // Back to menu for now
        return;
    }
    
    // Unlock if new
    if (nextId > maxUnlockedLevel) {
        setMaxUnlockedLevel(nextId);
    }
    
    setCurrentLevelId(nextId);
  };

  return (
    <>
      {view === 'game' && (
         <LevelGameContainer 
            levelId={currentLevelId}
            onBack={() => setView('levels')}
            onNextLevel={handleNextLevel}
         />
      )}
      
      {view === 'levels' && (
        <LevelSelector 
            maxUnlockedLevel={maxUnlockedLevel}
            onLevelSelect={handleStartLevel}
        />
      )}

      {view === 'home' && (
        <Home 
          onSelectTracing={() => setView('levels')}
        />
      )}
    </>
  );
}

export default App;
