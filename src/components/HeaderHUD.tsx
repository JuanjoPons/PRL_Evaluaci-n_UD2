import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  Flame, 
  Volume2, 
  VolumeX, 
  LogOut, 
  GraduationCap
} from 'lucide-react';
import { StudentProfile } from '../types/game';

interface HeaderHUDProps {
  student: StudentProfile;
  currentLevel: number;
  lives: number;
  maxLives: number;
  powerUpActive: boolean;
  score: number;
  streak: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onExitGame: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  student,
  currentLevel,
  lives,
  maxLives,
  powerUpActive,
  score,
  streak,
  isMuted,
  onToggleMute,
  onExitGame
}) => {
  return (
    <header className="no-print bg-[#0b1222]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Student identification badge */}
        <div className="flex items-center space-x-2.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-inner">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black flex items-center justify-center text-sm shadow">
            <GraduationCap className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-100 truncate max-w-[140px] sm:max-w-[200px]">
              {student.name || 'Alumno en evaluación'}
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] text-amber-400 font-mono-retro">
              <span className="font-semibold">{student.group || 'Grupo'}</span>
              <span>·</span>
              <span className="text-slate-400 truncate max-w-[100px]">{student.selectedCycle}</span>
            </div>
          </div>
        </div>

        {/* Level progress indicator */}
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Nivel</span>
          <span className="px-2 py-0.5 rounded-md text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 font-pixel">
            {currentLevel} / 5
          </span>
        </div>

        {/* Dynamic Hearts (Lives) */}
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 tracking-wider">Vidas</span>
          <div className="flex items-center space-x-1">
            {Array.from({ length: maxLives }).map((_, idx) => {
              const hasLife = idx < lives;
              return (
                <Heart
                  key={idx}
                  className={`w-4 h-4 transition-all duration-300 ${
                    hasLife 
                      ? 'text-red-500 fill-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' 
                      : 'text-slate-700 fill-slate-800 opacity-40'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Superpower Shield EPI */}
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Escudo EPI</span>
          <div className="flex items-center space-x-1.5 text-xs font-bold">
            {powerUpActive ? (
              <div className="flex items-center text-cyan-400 space-x-1 animate-pulse">
                <ShieldCheck className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-[11px] font-mono-retro font-semibold">Activo</span>
              </div>
            ) : (
              <div className="flex items-center text-slate-500 space-x-1">
                <ShieldAlert className="w-4 h-4 text-slate-500" />
                <span className="text-[11px] font-mono-retro">Agotado</span>
              </div>
            )}
          </div>
        </div>

        {/* Streak Multiplier */}
        {streak > 1 && (
          <div className="hidden md:flex items-center space-x-1.5 bg-orange-500/10 border border-orange-500/30 px-2.5 py-1.5 rounded-xl text-orange-400 text-xs font-black animate-bounce font-pixel">
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span>x{streak} COMBO</span>
          </div>
        )}

        {/* Score on 10.0 */}
        <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Puntos</span>
          <div className="flex items-baseline space-x-1 font-mono-retro">
            <span className="text-base font-black text-emerald-400 tracking-tight font-pixel">
              {score.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-500 font-bold">/ 10.0</span>
          </div>
        </div>

        {/* Action icons: Audio Synth Mute & Exit */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500/60 text-slate-300 hover:text-amber-400 transition"
            title={isMuted ? 'Activar sonido arcade' : 'Silenciar sonido arcade'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onExitGame}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-red-500/60 text-slate-400 hover:text-red-400 transition"
            title="Abandonar partida y volver al inicio"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
