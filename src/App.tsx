/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  GameScreen, 
  QuestionContext, 
  NextAction, 
  StudentProfile, 
  LevelProgress, 
  AuditEntry, 
  Question 
} from './types/game';
import { DEFAULT_QUESTION_BANK } from './data/defaultQuestions';
import { soundManager } from './services/soundEffects';
import { HeaderHUD } from './components/HeaderHUD';
import { RegistrationScreen } from './components/RegistrationScreen';
import { BriefingScreen } from './components/BriefingScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { ReportScreen } from './components/ReportScreen';
import { AdminExcelModal } from './components/AdminExcelModal';

export default function App() {
  // Screen management
  const [screen, setScreen] = useState<GameScreen>('REGISTRATION');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  // Question bank repository
  const [questionBank, setQuestionBank] = useState<Question[]>(() => {
    const saved = localStorage.getItem('prl_custom_bank');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_QUESTION_BANK;
      }
    }
    return DEFAULT_QUESTION_BANK;
  });

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>({
    name: '',
    group: '',
    course: '',
    selectedCycle: 'GENERAL'
  });

  // Gameplay State
  const [currentLevel, setCurrentLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const maxLives = 3;
  const [powerUpActive, setPowerUpActive] = useState(true);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [livesLost, setLivesLost] = useState(0);
  const [livesRecovered, setLivesRecovered] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isVictory, setIsVictory] = useState(false);

  // Level Progression data
  const initialLevels: LevelProgress[] = [
    { level: 1, name: 'Nivel 1 — Conceptos Básicos', difficulty: 'Básico', basePoints: 2.0, errors: 0, finalScore: 2.0 },
    { level: 2, name: 'Nivel 2 — Riesgos & EPIs', difficulty: 'Básico/Medio', basePoints: 2.0, errors: 0, finalScore: 2.0 },
    { level: 3, name: 'Nivel 3 — Medidas & PAS', difficulty: 'Medio', basePoints: 2.0, errors: 0, finalScore: 2.0 },
    { level: 4, name: 'Nivel 4 — Casos & Emergencias', difficulty: 'Medio/Alto', basePoints: 2.0, errors: 0, finalScore: 2.0 },
    { level: 5, name: 'Nivel 5 — Análisis Crítico', difficulty: 'Alto', basePoints: 2.0, errors: 0, finalScore: 2.0 },
  ];
  const [levels, setLevels] = useState<LevelProgress[]>(initialLevels);

  // Active question & evaluation state
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set());
  const [activeQuestion, setActiveQuestion] = useState<Question>(DEFAULT_QUESTION_BANK[0]);
  const [questionContext, setQuestionContext] = useState<QuestionContext>('LEVEL_PASS');
  const [nextAction, setNextAction] = useState<NextAction>('NEXT_LEVEL');
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>([]);

  // Calculate live score
  const calculateTotalScore = (levelState: LevelProgress[]): number => {
    const total = levelState.reduce((acc, lvl) => {
      const penalty = lvl.errors * 0.2;
      const score = Math.max(0, lvl.basePoints - penalty);
      return acc + score;
    }, 0);
    return Math.min(10.0, Math.max(0, total));
  };

  const currentScore = calculateTotalScore(levels);

  // Sound mute toggle
  const handleToggleMute = () => {
    const updated = soundManager.toggleMute();
    setIsMuted(updated);
  };

  // Start registration -> briefing
  const handleRegistrationComplete = (profile: StudentProfile) => {
    setStudent(profile);
    soundManager.playClick();
    setScreen('BRIEFING');
  };

  // Select a question for a level
  const pickNextLevelQuestion = (lvl: number, currentAnswered: Set<string>): Question => {
    // 1. Try questions matching both level and student specialty
    let candidates = questionBank.filter(
      (q) => q.active && q.level === lvl && !currentAnswered.has(q.id) && (q.cycle === student.selectedCycle || q.cycle === 'GENERAL' || q.cycle === 'ALL')
    );

    // 2. If exhausted, try any matching level
    if (candidates.length === 0) {
      candidates = questionBank.filter((q) => q.active && q.level === lvl && !currentAnswered.has(q.id));
    }

    // 3. If still empty, allow repeating within same level
    if (candidates.length === 0) {
      candidates = questionBank.filter((q) => q.active && q.level === lvl);
    }

    // 4. Universal fallback
    if (candidates.length === 0) {
      candidates = DEFAULT_QUESTION_BANK.filter((q) => q.level === lvl);
    }

    return candidates[Math.floor(Math.random() * candidates.length)] || DEFAULT_QUESTION_BANK[0];
  };

  // Start gameplay
  const handleStartGameplay = () => {
    const freshAnswered = new Set<string>();
    setAnsweredIds(freshAnswered);
    setCurrentLevel(1);
    setLives(3);
    setPowerUpActive(true);
    setStreak(0);
    setBestStreak(0);
    setLivesLost(0);
    setLivesRecovered(0);
    setLevels(initialLevels);
    setAuditTrail([]);
    setStartTime(new Date());
    setEndTime(null);

    const firstQ = pickNextLevelQuestion(1, freshAnswered);
    setActiveQuestion(firstQ);
    setQuestionContext('LEVEL_PASS');
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setFeedbackText('');

    soundManager.playClick();
    setScreen('GAMEPLAY');
  };

  // User selects an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;

    setSelectedOption(key);
    setIsAnswerSubmitted(true);

    const isCorrect = key === activeQuestion.correct;
    setIsAnswerCorrect(isCorrect);

    // Mark as answered
    const updatedAnswered = new Set(answeredIds);
    updatedAnswered.add(activeQuestion.id);
    setAnsweredIds(updatedAnswered);

    // Record audit trail
    const auditItem: AuditEntry = {
      questionId: activeQuestion.id,
      level: currentLevel,
      context: questionContext,
      type: activeQuestion.type,
      questionText: activeQuestion.question,
      category: activeQuestion.category,
      userAnswer: `${key}: ${activeQuestion.options[key] || ''}`,
      correctAnswer: `${activeQuestion.correct}: ${activeQuestion.options[activeQuestion.correct] || ''}`,
      isCorrect,
      explanation: activeQuestion.explanation,
      timestamp: new Date().toLocaleTimeString()
    };
    setAuditTrail((prev) => [...prev, auditItem]);

    if (isCorrect) {
      soundManager.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (questionContext === 'LEVEL_PASS') {
        setFeedbackText('¡Excelente análisis! Has aplicado con rigor las medidas preventivas exigidas.');
        setNextAction('NEXT_LEVEL');
      } else if (questionContext === 'RECOVERY_LIFE') {
        soundManager.playLifeGain();
        setLives((l) => Math.min(maxLives, l + 1));
        setLivesRecovered((r) => r + 1);
        setFeedbackText('¡Reto de rescate superado con éxito! Has recuperado +1 VIDA.');
        setNextAction('RESUME_LEVEL');
      } else if (questionContext === 'RECOVERY_POWERUP') {
        soundManager.playShieldRestore();
        setPowerUpActive(true);
        setFeedbackText('¡Excelente maniobra! Has reacondicionado con éxito tu Escudo de Protección EPI.');
        setNextAction('RESUME_LEVEL');
      }
    } else {
      soundManager.playWrong();
      setStreak(0);

      if (questionContext === 'LEVEL_PASS') {
        // Penalty on this level
        setLevels((prev) =>
          prev.map((l) => (l.level === currentLevel ? { ...l, errors: l.errors + 1 } : l))
        );

        if (powerUpActive) {
          soundManager.playShieldBlock();
          setPowerUpActive(false);
          setFeedbackText('Respuesta incorrecta. Tu Escudo EPI ha absorbido el impacto y se ha desgastado.');
          setNextAction('OFFER_POWERUP_RECOVERY');
        } else {
          const remainingLives = lives - 1;
          setLives(remainingLives);
          setLivesLost((l) => l + 1);

          if (remainingLives <= 0) {
            setFeedbackText('Has perdido tu última vida en el nivel. No quedan oportunidades de rescate.');
            setNextAction('GAME_OVER_DEFEAT');
          } else {
            setFeedbackText('Respuesta incorrecta. Has perdido 1 vida. Se habilitará una prueba de rescate.');
            setNextAction('OFFER_LIFE_RECOVERY');
          }
        }
      } else {
        // Failed recovery question
        setFeedbackText('La prueba de rescate ha fallado. La penalización se mantiene.');
        if (lives <= 0) {
          setNextAction('GAME_OVER_DEFEAT');
        } else {
          setNextAction('RESUME_LEVEL');
        }
      }
    }
  };

  // Continue to next question or screen
  const handleAdvance = () => {
    soundManager.playClick();

    if (nextAction === 'NEXT_LEVEL') {
      if (currentLevel >= 5) {
        // Victory! Superados todos los niveles
        finishGame(true);
      } else {
        const nextLvl = currentLevel + 1;
        setCurrentLevel(nextLvl);
        const nextQ = pickNextLevelQuestion(nextLvl, answeredIds);
        loadQuestionState(nextQ, 'LEVEL_PASS');
      }
    } else if (nextAction === 'OFFER_LIFE_RECOVERY') {
      // Pick rescue question
      const rescueQ = pickRescueQuestion();
      loadQuestionState(rescueQ, 'RECOVERY_LIFE');
    } else if (nextAction === 'OFFER_POWERUP_RECOVERY') {
      // Pick powerup refurbish question
      const powerupQ = pickRescueQuestion();
      loadQuestionState(powerupQ, 'RECOVERY_POWERUP');
    } else if (nextAction === 'RESUME_LEVEL') {
      const nextQ = pickNextLevelQuestion(currentLevel, answeredIds);
      loadQuestionState(nextQ, 'LEVEL_PASS');
    } else if (nextAction === 'GAME_OVER_DEFEAT') {
      finishGame(false);
    }
  };

  const pickRescueQuestion = (): Question => {
    let pool = questionBank.filter((q) => q.active && !answeredIds.has(q.id));
    if (pool.length === 0) pool = questionBank.filter((q) => q.active);
    return pool[Math.floor(Math.random() * pool.length)] || DEFAULT_QUESTION_BANK[0];
  };

  const loadQuestionState = (q: Question, ctx: QuestionContext) => {
    setActiveQuestion(q);
    setQuestionContext(ctx);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setFeedbackText('');
  };

  const finishGame = (victory: boolean) => {
    setEndTime(new Date());
    setIsVictory(victory);
    if (victory) {
      soundManager.playVictory();
    } else {
      soundManager.playGameOver();
    }
    setScreen('REPORT');
  };

  const handleResetGame = () => {
    soundManager.playClick();
    setScreen('REGISTRATION');
  };

  // Bank update from Excel
  const handleUpdateBank = (newBank: Question[]) => {
    setQuestionBank(newBank);
    localStorage.setItem('prl_custom_bank', JSON.stringify(newBank));
  };

  const handleRestoreDefaultBank = () => {
    setQuestionBank(DEFAULT_QUESTION_BANK);
    localStorage.removeItem('prl_custom_bank');
    soundManager.playClick();
  };

  // Safe exit confirmation
  const handleExitConfirm = () => {
    setIsExitConfirmOpen(false);
    setScreen('REGISTRATION');
  };

  // Calculate elapsed time
  const durationSec = 
    startTime && endTime 
      ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) 
      : 0;

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* HUD Bar (only visible during GAMEPLAY) */}
      {screen === 'GAMEPLAY' && (
        <HeaderHUD
          student={student}
          currentLevel={currentLevel}
          lives={lives}
          maxLives={maxLives}
          powerUpActive={powerUpActive}
          score={currentScore}
          streak={streak}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onExitGame={() => setIsExitConfirmOpen(true)}
        />
      )}

      {/* Main View Container */}
      <main className="flex-1 flex flex-col justify-center items-center py-4 sm:py-8 px-2 sm:px-4 w-full">
        {screen === 'REGISTRATION' && (
          <RegistrationScreen
            onStart={handleRegistrationComplete}
            onOpenAdmin={() => setIsAdminOpen(true)}
            bankCount={questionBank.length}
          />
        )}

        {screen === 'BRIEFING' && (
          <BriefingScreen
            student={student}
            onStartGame={handleStartGameplay}
          />
        )}

        {screen === 'GAMEPLAY' && (
          <GameplayScreen
            currentLevel={currentLevel}
            levelInfo={levels[currentLevel - 1]}
            question={activeQuestion}
            context={questionContext}
            selectedOption={selectedOption}
            isAnswerSubmitted={isAnswerSubmitted}
            isAnswerCorrect={isAnswerCorrect}
            feedbackText={feedbackText}
            onSelectOption={handleSelectOption}
            onAdvance={handleAdvance}
            powerUpActive={powerUpActive}
            lives={lives}
            streak={streak}
          />
        )}

        {screen === 'REPORT' && (
          <ReportScreen
            student={student}
            isVictory={isVictory}
            score={currentScore}
            durationSec={durationSec}
            levels={levels}
            auditTrail={auditTrail}
            livesLost={livesLost}
            livesRecovered={livesRecovered}
            bestStreak={bestStreak}
            onResetGame={handleResetGame}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print py-3 border-t border-slate-900 bg-[#060a14] text-center text-[11px] text-slate-500 font-mono-retro">
        PRL Adventure 2.0 &copy; 2026 — Formación Profesional y Prevención de Riesgos Laborales
      </footer>

      {/* Admin Excel Modal */}
      <AdminExcelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentBank={questionBank}
        onUpdateBank={handleUpdateBank}
        onRestoreDefault={handleRestoreDefaultBank}
      />

      {/* Exit Game Confirmation Modal */}
      {isExitConfirmOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e172a] border border-slate-700/80 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <h4 className="text-base font-bold text-slate-100 font-sans mb-2">
              ¿Abandonar la partida en curso?
            </h4>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              Si sales ahora se perderá el progreso de los niveles completados y no se emitirá el informe de evaluación.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsExitConfirmOpen(false)}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Continuar Jugando
              </button>
              <button
                onClick={handleExitConfirm}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Salir al Inicio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
