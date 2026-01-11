import type { LevelConfig } from './LevelGenerator';

const generateLevelConfigs = (): LevelConfig[] => {
  const levels: LevelConfig[] = [];

  // 1. Easy Levels (1-10)
  for (let i = 1; i <= 10; i++) {
    levels.push({
      id: i,
      tier: 'easy',
      pathCount: 3, // Keep it simple
      tolerance: 40 // Forgiving
    });
  }

  // 2. Medium Levels (11-20)
  for (let i = 11; i <= 20; i++) {
    levels.push({
      id: i,
      tier: 'medium',
      pathCount: 3, // Still 3, but more tangled
      tolerance: 30
    });
  }

  // 3. Hard Levels (21-30)
  for (let i = 21; i <= 30; i++) {
    levels.push({
      id: i,
      tier: 'hard',
      pathCount: 4, // Increase chaos
      tolerance: 20 // Strict
    });
  }

  return levels;
};

export const LEVELS = generateLevelConfigs();

export const getLevelById = (id: number): LevelConfig | undefined => {
  return LEVELS.find(l => l.id === id);
};
