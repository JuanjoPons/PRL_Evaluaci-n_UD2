export type SpecialtyCycle = 
  | 'GENERAL' 
  | 'ELECTRICIDAD' 
  | 'MECANICA' 
  | 'EMBARCACIONES' 
  | 'ADMINISTRACION';

export type QuestionType = 'TEST' | 'EPI_SELECT' | 'ORDERING' | 'CASE_STUDY';

export type QuestionDifficulty = 'Básico' | 'Básico/Medio' | 'Medio' | 'Medio/Alto' | 'Alto';

export interface Question {
  id: string;
  level: number; // 1 to 5
  difficulty: QuestionDifficulty;
  type: QuestionType;
  category: string;
  cycle: SpecialtyCycle | 'ALL';
  question: string;
  options: {
    A: string;
    B: string;
    C?: string;
    D?: string;
  };
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  active: boolean;
}

export interface StudentProfile {
  name: string;
  group: string;
  course: string;
  selectedCycle: SpecialtyCycle;
}

export interface LevelProgress {
  level: number;
  name: string;
  difficulty: QuestionDifficulty;
  basePoints: number;
  errors: number;
  finalScore: number;
}

export interface AuditEntry {
  questionId: string;
  level: number;
  context: 'LEVEL_PASS' | 'RECOVERY_LIFE' | 'RECOVERY_POWERUP';
  type: QuestionType;
  questionText: string;
  category: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export type GameScreen = 'REGISTRATION' | 'BRIEFING' | 'GAMEPLAY' | 'REPORT';
export type QuestionContext = 'LEVEL_PASS' | 'RECOVERY_LIFE' | 'RECOVERY_POWERUP';
export type NextAction = 
  | 'NEXT_LEVEL' 
  | 'OFFER_LIFE_RECOVERY' 
  | 'OFFER_POWERUP_RECOVERY' 
  | 'RESUME_LEVEL' 
  | 'GAME_OVER_DEFEAT';
