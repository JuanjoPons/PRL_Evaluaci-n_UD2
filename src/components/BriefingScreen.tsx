import React from 'react';
import { 
  Heart, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Flame
} from 'lucide-react';
import { StudentProfile } from '../types/game';

interface BriefingScreenProps {
  student: StudentProfile;
  onStartGame: () => void;
}

export const BriefingScreen: React.FC<BriefingScreenProps> = ({
  student,
  onStartGame
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-auto p-4">
      <div className="relative bg-[#0d1527]/90 border border-slate-700/80 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center space-x-3.5 mb-6 pb-5 border-b border-slate-800">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[11px] font-mono-retro font-semibold text-amber-400 uppercase tracking-widest">
              Protocolo de Evaluación
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 font-sans tracking-tight">
              Instrucciones de la Misión PRL
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Técnico asignado: <strong className="text-slate-200">{student.name}</strong> ({student.group})
            </p>
          </div>
        </div>

        {/* Rules Cards */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
          
          <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="p-2 rounded-xl bg-red-500/15 text-red-400 shrink-0 mt-0.5">
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </div>
            <div>
              <strong className="text-slate-100 block text-xs sm:text-sm font-bold">3 Vidas Iniciales & Oportunidad de Rescate</strong>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Si fallas un reto de nivel perderás 1 vida. El sistema activará una <span className="text-red-400 font-semibold">Pregunta de Rescate</span> para recuperarla inmediatamente si respondes con precisión.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <strong className="text-slate-100 block text-xs sm:text-sm font-bold">Escudo EPI (Superpoder Preventivo)</strong>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Inicias con tu Escudo de Protección Activo. Absorbe tu primer fallo sin restar vidas. Si se desgasta, podrás realizar un <span className="text-cyan-400 font-semibold">Reacondicionamiento de EPI</span> para restaurarlo.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0 mt-0.5">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <strong className="text-slate-100 block text-xs sm:text-sm font-bold">5 Niveles Progresivos Homologados</strong>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Desde conceptos normativos y EPIs básicos hasta análisis de accidentes y riesgo grave e inminente (Art. 21 LPRL).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0 mt-0.5">
              <Calculator className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <strong className="text-slate-100 block text-xs sm:text-sm font-bold">Calificación Oficial (0.0 a 10.0 pts)</strong>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Cada nivel superado otorga +2.0 puntos base. Cada error en ese nivel resta -0.2 puntos de penalización en la nota final.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80">
            <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400 shrink-0 mt-0.5">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <strong className="text-slate-100 block text-xs sm:text-sm font-bold">Racha de Aciertos Arcade (Streak)</strong>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Encadenar respuestas correctas consecutivas activa multiplicadores visuales y desbloquea menciones honoríficas en el informe docente.
              </p>
            </div>
          </div>

        </div>

        {/* Start Game Action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onStartGame}
            className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition transform active:scale-95 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>¡INICIAR NIVEL 1!</span>
            <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
