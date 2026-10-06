import React from 'react';
import { 
  Trophy, 
  AlertOctagon, 
  Printer, 
  Mail, 
  RotateCcw, 
  Calendar, 
  User, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  BrainCircuit, 
  Flame
} from 'lucide-react';
import { StudentProfile, LevelProgress, AuditEntry } from '../types/game';

interface ReportScreenProps {
  student: StudentProfile;
  isVictory: boolean;
  score: number;
  durationSec: number;
  levels: LevelProgress[];
  auditTrail: AuditEntry[];
  livesLost: number;
  livesRecovered: number;
  bestStreak: number;
  onResetGame: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  student,
  isVictory,
  score,
  durationSec,
  levels,
  auditTrail,
  livesLost,
  livesRecovered,
  bestStreak,
  onResetGame
}) => {
  const teacherEmail = 'jpons@centredelamar.com';

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const totalAttempted = auditTrail.length;
  const totalCorrect = auditTrail.filter((a) => a.isCorrect).length;
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const completedLevels = isVictory ? 5 : levels.filter((l) => l.errors === 0 || l.finalScore > 0).length;

  // Categorize errors for teacher diagnosis
  const failedItems = auditTrail.filter((a) => !a.isCorrect);
  const failureCategoryMap: Record<string, number> = {};
  failedItems.forEach((item) => {
    const cat = item.category || 'General';
    failureCategoryMap[cat] = (failureCategoryMap[cat] || 0) + 1;
  });

  const sendEmailToTeacher = () => {
    const subject = encodeURIComponent(
      `[INFORME PRL] Evaluación Gamificada - ${student.name} (${student.group})`
    );

    let body = `INFORME ACADÉMICO DE EVALUACIÓN GAMIFICADA EN PRL\n`;
    body += `==============================================\n\n`;
    body += `Alumno/a: ${student.name}\n`;
    body += `Grupo/Clase: ${student.group}\n`;
    body += `Ciclo/Centro: ${student.course}\n`;
    body += `Especialidad: ${student.selectedCycle}\n`;
    body += `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    body += `Tiempo Total de Evaluación: ${formatDuration(durationSec)}\n\n`;
    body += `RESULTADO: ${isVictory ? 'VICTORIA (5 Niveles Superados)' : 'DERROTA (Vidas Agotadas)'}\n`;
    body += `NOTA FINAL: ${score.toFixed(1)} / 10.0\n`;
    body += `Porcentaje de Aciertos: ${accuracy}% (${totalCorrect} de ${totalAttempted})\n`;
    body += `Mejor Racha de Combos: x${bestStreak}\n`;
    body += `Vidas Perdidas: ${livesLost} | Vidas Recuperadas en Rescate: ${livesRecovered}\n\n`;
    body += `DESGLOSE POR NIVELES:\n`;
    levels.forEach((lvl) => {
      body += `- ${lvl.name} (${lvl.difficulty}): Puntos: ${lvl.finalScore.toFixed(1)}/2.0 (Errores: ${lvl.errors})\n`;
    });

    if (Object.keys(failureCategoryMap).length > 0) {
      body += `\nÁREAS DE REFUERZO DETECTADAS:\n`;
      Object.entries(failureCategoryMap).forEach(([cat, count]) => {
        body += `- ${cat}: ${count} error(es)\n`;
      });
    }

    body += `\nGenerado de forma automática por la plataforma web PRL Adventure.`;

    window.location.href = `mailto:${teacherEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      
      {/* Result Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-xl ${
        isVictory 
          ? 'bg-gradient-to-r from-emerald-950/80 via-[#0d1c24] to-slate-900 border-emerald-500/40 text-slate-100'
          : 'bg-gradient-to-r from-red-950/80 via-[#1c0f14] to-slate-900 border-red-500/40 text-slate-100'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl ${
              isVictory 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 glow-emerald'
                : 'bg-red-500/20 text-red-400 border border-red-500/40 glow-red'
            }`}>
              {isVictory ? <Trophy className="w-9 h-9" /> : <AlertOctagon className="w-9 h-9" />}
            </div>

            <div>
              <span className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider font-mono-retro ${
                isVictory ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {isVictory ? 'FINAL ACREDITADO — VICTORIA ACADÉMICA' : 'EVALUACIÓN CONCLUIDA — DERROTA POR VIDAS'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1 font-sans">
                {isVictory ? '¡Superación Total de Retos PRL!' : 'Prueba No Superada'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {isVictory 
                  ? 'Has demostrado destrezas y criterios normativos sólidos en seguridad laboral.'
                  : 'Se agotaron las vidas en los retos de rescate. Revisa los contenidos recomendados y vuelve a intentarlo.'}
              </p>
            </div>
          </div>

          {/* Final Score Card */}
          <div className="bg-slate-950/90 border border-slate-700/80 rounded-2xl p-4 text-center min-w-[140px] shadow-lg">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono-retro">
              Calificación Final
            </span>
            <span className={`text-3xl sm:text-4xl font-black font-pixel block my-1 ${
              score >= 5 ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {score.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-semibold block font-mono-retro">
              sobre 10.0 pts
            </span>
          </div>
        </div>
      </div>

      {/* Student Session Data Card */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center font-mono-retro">
          <GraduationCap className="w-4 h-4 mr-2" />
          Ficha del Alumno y Metadatos de la Sesión
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono-retro flex items-center">
              <User className="w-3 h-3 mr-1 text-slate-500" /> Alumno/a:
            </span>
            <strong className="text-slate-100 font-bold text-sm truncate block mt-0.5">
              {student.name || '--'}
            </strong>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono-retro flex items-center">
              <Users className="w-3 h-3 mr-1 text-slate-500" /> Grupo / Clase:
            </span>
            <strong className="text-slate-100 font-bold text-sm truncate block mt-0.5">
              {student.group || '--'}
            </strong>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono-retro flex items-center">
              <GraduationCap className="w-3 h-3 mr-1 text-slate-500" /> Ciclo / Perfil:
            </span>
            <strong className="text-slate-100 font-bold text-sm truncate block mt-0.5">
              {student.selectedCycle}
            </strong>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-mono-retro flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-slate-500" /> Fecha y Duración:
            </span>
            <strong className="text-slate-100 font-bold text-xs block mt-0.5 font-mono-retro">
              {new Date().toLocaleDateString()} · {formatDuration(durationSec)}
            </strong>
          </div>
        </div>
      </div>

      {/* Global Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#0d1527]/90 border border-slate-700/80 p-3.5 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono-retro">Preguntas</span>
          <strong className="text-xl font-bold text-slate-100 font-mono-retro">{totalAttempted}</strong>
        </div>

        <div className="bg-[#0d1527]/90 border border-slate-700/80 p-3.5 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono-retro">Aciertos</span>
          <strong className="text-xl font-bold text-emerald-400 font-mono-retro">
            {totalCorrect} <span className="text-xs text-emerald-500 font-normal">({accuracy}%)</span>
          </strong>
        </div>

        <div className="bg-[#0d1527]/90 border border-slate-700/80 p-3.5 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono-retro">Vidas Perd./Rec.</span>
          <strong className="text-xl font-bold text-amber-400 font-mono-retro">
            {livesLost} / {livesRecovered}
          </strong>
        </div>

        <div className="bg-[#0d1527]/90 border border-slate-700/80 p-3.5 rounded-xl text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono-retro">Niveles Superados</span>
          <strong className="text-xl font-bold text-cyan-400 font-mono-retro">
            {completedLevels} / 5
          </strong>
        </div>

        <div className="bg-[#0d1527]/90 border border-slate-700/80 p-3.5 rounded-xl text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold block font-mono-retro flex items-center justify-center">
            <Flame className="w-3 h-3 text-orange-400 mr-1" /> Racha Máxima
          </span>
          <strong className="text-xl font-black text-orange-400 font-pixel">
            x{bestStreak}
          </strong>
        </div>
      </div>

      {/* Level Breakdown Table */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl overflow-hidden">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center font-mono-retro">
          Desglose Académico de Puntuación por Nivel
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800 font-mono-retro">
                <th className="p-2.5">Nivel</th>
                <th className="p-2.5">Dificultad</th>
                <th className="p-2.5 text-center">Puntos Base</th>
                <th className="p-2.5 text-center">Errores</th>
                <th className="p-2.5 text-center">Penalización</th>
                <th className="p-2.5 text-right">Puntuación Obtenida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {levels.map((lvl) => {
                const penalty = (lvl.errors * 0.2).toFixed(1);
                return (
                  <tr key={lvl.level} className="hover:bg-slate-900/40">
                    <td className="p-2.5 font-bold text-slate-100">{lvl.name}</td>
                    <td className="p-2.5 text-slate-400">{lvl.difficulty}</td>
                    <td className="p-2.5 text-center font-mono-retro">2.0</td>
                    <td className="p-2.5 text-center font-mono-retro text-red-400">{lvl.errors}</td>
                    <td className="p-2.5 text-center font-mono-retro text-red-400">- {penalty}</td>
                    <td className="p-2.5 text-right font-black font-mono-retro text-emerald-400">
                      {lvl.finalScore.toFixed(1)} / 2.0
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pedagogical Teacher Diagnostic */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center font-mono-retro">
          <BrainCircuit className="w-4 h-4 mr-2" />
          Informe Docente: Diagnóstico Pedagógico y Áreas de Mejora
        </h3>
        <div className="text-xs text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 leading-relaxed font-sans">
          {Object.keys(failureCategoryMap).length === 0 ? (
            <div className="flex items-center text-emerald-400 font-semibold space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                ¡Rendimiento impecable! No se detectaron fallos significativos. El alumno muestra un dominio excelente de los principios de PRL.
              </span>
            </div>
          ) : (
            <div>
              <p className="font-bold text-amber-400 mb-2 flex items-center">
                Se recomienda incidir en las siguientes materias preventivas para consolidar competencias:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                {Object.entries(failureCategoryMap).map(([category, count]) => (
                  <li key={category}>
                    <strong className="text-slate-100">{category}:</strong> {count} error(es) registrado(s). Conviene revisar los procedimientos técnicos y la normativa INSST asociada.
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Question Audit Log */}
      <div className="bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-xl overflow-hidden">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center font-mono-retro">
          Registro de Auditoría de Preguntas Respondidas
        </h3>
        <div className="overflow-x-auto max-h-80 overflow-y-auto">
          <table className="w-full text-left text-[11px] border-collapse font-sans">
            <thead className="sticky top-0 bg-slate-950 text-slate-400 border-b border-slate-800 font-mono-retro">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Nivel</th>
                <th className="p-2">Pregunta</th>
                <th className="p-2">Respuesta del Alumno</th>
                <th className="p-2">Respuesta Correcta</th>
                <th className="p-2 text-center">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {auditTrail.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/30">
                  <td className="p-2 font-mono-retro text-slate-500">{idx + 1}</td>
                  <td className="p-2 font-semibold">Nivel {item.level}</td>
                  <td className="p-2 max-w-xs truncate text-slate-200" title={item.questionText}>
                    {item.questionText}
                  </td>
                  <td className="p-2 max-w-xs truncate text-slate-300">
                    {item.userAnswer}
                  </td>
                  <td className="p-2 max-w-xs truncate text-slate-400">
                    {item.correctAnswer}
                  </td>
                  <td className="p-2 text-center">
                    {item.isCorrect ? (
                      <span className="inline-flex items-center text-emerald-400 font-bold space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Acierto</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-400 font-bold space-x-1">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Fallo</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export & Action Buttons Panel */}
      <div className="no-print bg-[#0d1527]/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
        <button
          onClick={() => window.print()}
          className="py-3 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>IMPRIMIR / GUARDAR EN PDF</span>
        </button>

        <button
          onClick={sendEmailToTeacher}
          className="py-3 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center space-x-2 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>ENVIAR AL DOCENTE ({teacherEmail})</span>
        </button>

        <button
          onClick={onResetGame}
          className="py-3 px-5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl transition flex items-center space-x-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>NUEVA PARTIDA</span>
        </button>
      </div>

    </div>
  );
};
