import React, { useState } from 'react';
import { 
  Shield, 
  Play, 
  FileSpreadsheet, 
  User, 
  Users, 
  GraduationCap, 
  Zap, 
  Wrench, 
  Ship, 
  Briefcase, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { StudentProfile, SpecialtyCycle } from '../types/game';

interface RegistrationScreenProps {
  onStart: (profile: StudentProfile) => void;
  onOpenAdmin: () => void;
  bankCount: number;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  onStart,
  onOpenAdmin,
  bankCount
}) => {
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [course, setCourse] = useState('');
  const [selectedCycle, setSelectedCycle] = useState<SpecialtyCycle>('GENERAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !group.trim()) return;

    onStart({
      name: name.trim(),
      group: group.trim(),
      course: course.trim() || 'Formación Profesional',
      selectedCycle
    });
  };

  const cycles = [
    { id: 'GENERAL', label: 'PRL Transversal / FP Común', icon: Shield, desc: 'Normativa LPRL, señalización, EPIs y primeros auxilios PAS' },
    { id: 'ELECTRICIDAD', label: 'Electricidad y Electrónica', icon: Zap, desc: '5 Reglas de Oro, baja y alta tensión, trabajos en proximidad' },
    { id: 'MECANICA', label: 'Mecánica y Fabricación', icon: Wrench, desc: 'Seguridad en máquinas RD 1215, torno, fresadora y resguardos' },
    { id: 'EMBARCACIONES', label: 'Mantenimiento de Barcos', icon: Ship, desc: 'Trabajos en altura en varaderos, borda y espacios portuarios' },
    { id: 'ADMINISTRACION', label: 'Administración y Oficina', icon: Briefcase, desc: 'Ergonomía en PVD, postura, iluminación y fatiga visual' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-auto p-4">
      <div className="relative bg-[#0d1527]/90 border border-slate-700/80 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Hero header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 text-slate-950 text-3xl font-black mb-4 shadow-xl shadow-amber-500/25 ring-4 ring-amber-500/20 transform hover:scale-105 transition-transform duration-300">
            <Shield className="w-10 h-10 stroke-[2.2]" />
          </div>

          <div className="flex items-center justify-center space-x-2 mb-1">
            <span className="text-[11px] font-mono-retro font-bold uppercase tracking-widest text-amber-400">
              Evaluación Interactiva FP
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] font-mono-retro text-slate-400">
              Banco Activo: <strong className="text-emerald-400">{bankCount}</strong> preguntas
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-pixel leading-tight">
            PRL ADVENTURE
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto font-sans leading-relaxed">
            Plataforma gamificada para la acreditación y evaluación de competencias en Prevención de Riesgos Laborales.
          </p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Student Name */}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Nombre y Apellidos <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Laura Morales Gómez"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

            {/* Class Group */}
            <div>
              <label htmlFor="reg-group" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Grupo / Clase <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Users className="w-4 h-4" />
                </span>
                <input
                  id="reg-group"
                  type="text"
                  required
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  placeholder="Ej. 1º Grado Superior A"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>
            </div>

          </div>

          {/* Vocational course profile */}
          <div>
            <label htmlFor="reg-course" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Ciclo Formativo o Instituto (Opcional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <GraduationCap className="w-4 h-4" />
              </span>
              <input
                id="reg-course"
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Ej. CIFP Centre de la Mar / IES Tecnológico"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 transition"
              />
            </div>
          </div>

          {/* Specialty Selector Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Especialidad Profesional <span className="text-amber-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cycles.map((c) => {
                const Icon = c.icon;
                const isSelected = selectedCycle === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCycle(c.id as SpecialtyCycle)}
                    className={`p-3 rounded-xl border text-left transition flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-white shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate leading-tight">{c.label}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 leading-snug">{c.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 transition transform active:scale-[0.98] flex items-center justify-center space-x-2.5 group cursor-pointer"
            >
              <span>COMENZAR LA AVENTURA</span>
              <Play className="w-4 h-4 fill-slate-950 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenAdmin}
              className="py-3.5 px-5 bg-slate-900 border border-slate-700 hover:border-emerald-500/60 text-slate-200 font-bold text-sm rounded-xl transition flex items-center justify-center space-x-2 hover:bg-slate-800/80 active:scale-[0.98] cursor-pointer"
              title="Personalizar banco de preguntas con Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Excel Docente</span>
            </button>
          </div>
        </form>

        {/* Feature summary footer pill-less cards */}
        <div className="mt-7 pt-5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
          <div className="flex flex-col items-center">
            <Sparkles className="w-4 h-4 text-amber-400 mb-1" />
            <span className="font-semibold text-slate-300">5 Niveles</span>
            <span className="text-[10px] text-slate-500">Dificultad adaptativa</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="font-semibold text-slate-300">Escudo EPI</span>
            <span className="text-[10px] text-slate-500">Absorción y rescate</span>
          </div>
          <div className="flex flex-col items-center">
            <Trophy className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-semibold text-slate-300">Informe Oficial</span>
            <span className="text-[10px] text-slate-500">PDF y envío a docente</span>
          </div>
        </div>

      </div>
    </div>
  );
};
