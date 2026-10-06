import React, { useEffect, useCallback } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Zap, 
  Flame, 
  Skull, 
  Eye, 
  Wrench, 
  HeartHandshake
} from 'lucide-react';
import { Question, QuestionContext, LevelProgress } from '../types/game';

interface GameplayScreenProps {
  currentLevel: number;
  levelInfo: LevelProgress;
  question: Question;
  context: QuestionContext;
  selectedOption: string | null;
  isAnswerSubmitted: boolean;
  isAnswerCorrect: boolean | null;
  feedbackText: string;
  onSelectOption: (optionKey: 'A' | 'B' | 'C' | 'D') => void;
  onAdvance: () => void;
  powerUpActive: boolean;
  lives: number;
  streak: number;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  currentLevel,
  levelInfo,
  question,
  context,
  selectedOption,
  isAnswerSubmitted,
  isAnswerCorrect,
  feedbackText,
  onSelectOption,
  onAdvance,
  powerUpActive,
  streak
}) => {
  // Support keyboard shortcuts (A, B, C, D or 1, 2, 3, 4, Enter for Continue)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isAnswerSubmitted) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onAdvance();
      }
      return;
    }

    const key = e.key.toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(key)) {
      onSelectOption(key as 'A' | 'B' | 'C' | 'D');
    } else if (key === '1') {
      onSelectOption('A');
    } else if (key === '2') {
      onSelectOption('B');
    } else if (key === '3' && question.options.C) {
      onSelectOption('C');
    } else if (key === '4' && question.options.D) {
      onSelectOption('D');
    }
  }, [isAnswerSubmitted, onAdvance, onSelectOption, question.options]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Stage titles and hazard icon according to level
  const getHazardDetails = () => {
    switch (currentLevel) {
      case 1:
        return {
          title: 'Nivel 1: Inspección de Conceptos y Señalización',
          subtitle: 'Identifica los principios básicos de la LPRL y el código de colores preventivo.',
          icon: Eye,
          label: 'Riesgo Normativo',
          color: 'from-blue-500 to-indigo-600'
        };
      case 2:
        return {
          title: 'Nivel 2: Identificación de Riesgos y Dotación de EPIs',
          subtitle: 'Aplica la jerarquía preventiva, protecciones mecánicas y corte de tensión.',
          icon: Zap,
          label: 'Peligro Eléctrico & Corte',
          color: 'from-amber-500 to-yellow-600'
        };
      case 3:
        return {
          title: 'Nivel 3: Medidas Colectivas y Protocolo de Socorro',
          subtitle: 'Ergonomía de cargas y activación estricta de la conducta PAS (Proteger, Avisar, Socorrer).',
          icon: Wrench,
          label: 'Riesgo Físico & Caídas',
          color: 'from-orange-500 to-amber-600'
        };
      case 4:
        return {
          title: 'Nivel 4: Casos Prácticos y Gestión de Emergencias',
          subtitle: 'Resuelve rescates en espacios confinados y conatos de incendio con agentes dieléctricos.',
          icon: Flame,
          label: 'Conato & Atmósfera Tóxica',
          color: 'from-rose-500 to-red-600'
        };
      case 5:
      default:
        return {
          title: 'Nivel 5: Análisis de Riesgo Grave e Inminente',
          subtitle: 'Toma de decisiones normativas, paralización de trabajos e investigación de causas raíz.',
          icon: Skull,
          label: 'Riesgo Inminente Crítico',
          color: 'from-purple-600 to-red-600'
        };
    }
  };

  const hazard = getHazardDetails();
  const HazardIcon = hazard.icon;

  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col space-y-4 p-3 sm:p-4">
      
      {/* Dynamic Stage Header Card */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-amber-500/5 blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono-retro">
                {levelInfo.difficulty}
              </span>
              {streak > 1 && (
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 font-pixel animate-pulse">
                  x{streak} COMBO
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-100 mt-1 font-sans">
              {hazard.title}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-1 sm:line-clamp-none">
              {hazard.subtitle}
            </p>
          </div>

          {/* Progress bar gauge */}
          <div className="w-full sm:w-48">
            <div className="flex justify-between text-[10px] font-mono-retro text-slate-400 mb-1">
              <span>Progreso Nivel</span>
              <span className="text-amber-400 font-bold">{Math.round((currentLevel / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 via-orange-400 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${(currentLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Visual Arena: Player vs Hazard Stage */}
        <div className="mt-4 h-36 sm:h-44 bg-slate-950/90 rounded-xl border border-slate-800 relative flex items-center justify-around px-4 sm:px-12 overflow-hidden arcade-grid">
          
          {/* Laser beam / connector in center */}
          <div className="absolute inset-x-16 sm:inset-x-32 h-0.5 bg-gradient-to-r from-cyan-500/40 via-amber-500/50 to-red-500/40">
            <div className="h-full bg-amber-400 w-1/3 animate-pulse" />
          </div>

          {/* Player Avatar Sprite */}
          <div className="relative z-10 flex flex-col items-center">
            <div 
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 ${
                powerUpActive 
                  ? 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 ring-4 ring-cyan-500/20 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                  : 'bg-amber-500/20 border-2 border-amber-400 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              } ${isAnswerSubmitted && !isAnswerCorrect ? 'animate-bounce' : 'animate-float'}`}
            >
              <span className="select-none text-2xl sm:text-3xl">👷</span>
            </div>
            <div className="flex items-center space-x-1 mt-1.5">
              <span className="text-[10px] font-bold text-slate-300 font-mono-retro">
                Prevencionista
              </span>
              {powerUpActive && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" title="Escudo EPI Activo" />
              )}
            </div>
          </div>

          {/* VS Center Badge */}
          <div className="relative z-10 px-2 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-pixel text-amber-400 font-bold shadow-lg">
            VS
          </div>

          {/* Hazard Boss Sprite */}
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl border-2 shadow-lg transition-transform duration-300 ${
              isAnswerSubmitted && isAnswerCorrect 
                ? 'opacity-40 scale-90 bg-slate-900 border-slate-800 text-slate-600'
                : 'bg-red-500/20 border-red-500 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse'
            }`}>
              <HazardIcon className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>
            <span className="text-[10px] font-bold text-red-400 font-mono-retro mt-1.5 truncate max-w-[120px]">
              {hazard.label}
            </span>
          </div>

        </div>

      </div>

      {/* Challenge Card with Options & Feedback */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative">
        
        {/* Context badge row */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            {context === 'RECOVERY_LIFE' ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse font-mono-retro">
                <HeartHandshake className="w-3.5 h-3.5 mr-1" />
                <span>RETO DE RESCATE: RECUPERAR +1 VIDA</span>
              </span>
            ) : context === 'RECOVERY_POWERUP' ? (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse font-mono-retro">
                <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                <span>RETO DE RESCATE: REACONDICIONAR ESCUDO EPI</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono-retro">
                Prueba Oficial de Nivel
              </span>
            )}
            
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              · {question.category}
            </span>
          </div>

          <span className="text-[11px] text-slate-500 font-mono-retro font-bold">
            ID: {question.id}
          </span>
        </div>

        {/* Question text */}
        <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-5 leading-snug font-sans">
          {question.question}
        </h4>

        {/* Dynamic Answer Options (A, B, C, D) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {optionKeys.map((key) => {
            const optionText = question.options[key];
            if (!optionText) return null;

            const isSelected = selectedOption === key;
            const isCorrectOption = question.correct === key;

            let buttonStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-amber-400/80 hover:bg-slate-900/90';

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
              } else if (isSelected && !isAnswerCorrect) {
                buttonStyle = 'bg-red-950/70 border-red-500 text-red-200 ring-2 ring-red-500/30';
              } else {
                buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-500/20';
            }

            return (
              <button
                key={key}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => onSelectOption(key)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition flex items-start space-x-3 group relative cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg font-mono-retro font-black flex items-center justify-center text-xs shrink-0 transition-colors ${
                  isAnswerSubmitted && isCorrectOption 
                    ? 'bg-emerald-500 text-slate-950' 
                    : isAnswerSubmitted && isSelected && !isAnswerCorrect
                    ? 'bg-red-500 text-slate-950'
                    : 'bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950'
                }`}>
                  {key}
                </span>

                <span className="text-xs sm:text-sm leading-relaxed self-center flex-1">
                  {optionText}
                </span>

                {isAnswerSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 self-center animate-pulse" />
                )}
                {isAnswerSubmitted && isSelected && !isAnswerCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 self-center" />
                )}
              </button>
            );
          })}
        </div>

        {/* Pedagogical Feedback Panel (reveals on answer submit) */}
        {isAnswerSubmitted && (
          <div className={`mt-5 p-4 rounded-2xl border transition-all duration-300 ${
            isAnswerCorrect 
              ? 'bg-emerald-950/60 border-emerald-500/50 text-slate-100'
              : 'bg-red-950/60 border-red-500/50 text-slate-100'
          }`}>
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 shrink-0">
                {isAnswerCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                )}
              </div>
              <div className="flex-1">
                <h5 className={`text-sm font-bold font-sans ${isAnswerCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isAnswerCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                </h5>
                <p className="text-xs mt-1 text-slate-200 leading-relaxed font-sans">
                  {feedbackText}
                </p>
                <div className="mt-2 text-[11px] text-slate-400 font-mono-retro">
                  Fundamento normativo: <span className="text-slate-300">{question.explanation}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono-retro hidden sm:inline">
                Pulsa <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Enter</kbd> para continuar
              </span>

              <button
                type="button"
                onClick={onAdvance}
                className="w-full sm:w-auto py-2.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 ml-auto cursor-pointer"
              >
                <span>CONTINUAR</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
