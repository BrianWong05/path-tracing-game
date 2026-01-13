import { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { LevelSelector } from '@/features/levels/LevelSelector';
import { LevelGameContainer } from '@/features/levels/LevelGameContainer';
import { NetworkStatus } from '@/components/NetworkStatus';
import { InstallPrompt } from '@/components/InstallPrompt';

function GameWrapper({ onBack, onNextLevel }: { onBack: () => void, onNextLevel: (id: number) => void }) {
  const { levelId } = useParams();
  const currentId = parseInt(levelId || '1', 10);
  return (
    <LevelGameContainer 
      levelId={currentId}
      onBack={onBack}
      onNextLevel={() => onNextLevel(currentId)}
    />
  );
}

function App() {
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(30);
  const navigate = useNavigate();

  const handleStartLevel = (levelId: number) => {
    navigate(`/game/${levelId}`);
  };

  const handleNextLevel = (currentId: number) => {
    const nextId = currentId + 1;
    if (nextId > 30) {
        // Game Complete or Loop?
        navigate('/levels');
        return;
    }
    
    // Unlock if new
    if (nextId > maxUnlockedLevel) {
        setMaxUnlockedLevel(nextId);
    }
    
    navigate(`/game/${nextId}`);
  };

  return (
    <>
      <NetworkStatus />
      <InstallPrompt />
      
      <Routes>
        <Route path="/" element={
           <Home onSelectTracing={() => navigate('/levels')} />
        } />
        
        <Route path="/levels" element={
            <LevelSelector 
                maxUnlockedLevel={maxUnlockedLevel}
                onLevelSelect={handleStartLevel}
            />
        } />
        
        <Route path="/game/:levelId" element={
            <GameWrapper 
                onBack={() => navigate('/levels')}
                onNextLevel={handleNextLevel}
            />
        } />
      </Routes>
    </>
  );
}

export default App;
