import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  Layers
} from 'lucide-react';
import { Question } from '../types/game';
import { downloadOfficialTemplate, parseExcelQuestions, ValidationResult } from '../services/excelService';

interface AdminExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBank: Question[];
  onUpdateBank: (newBank: Question[]) => void;
  onRestoreDefault: () => void;
}

export const AdminExcelModal: React.FC<AdminExcelModalProps> = ({
  isOpen,
  onClose,
  currentBank,
  onUpdateBank,
  onRestoreDefault
}) => {
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setValidation(null);

    const result = await parseExcelQuestions(file);
    setIsProcessing(false);
    setValidation(result);

    if (result.valid && result.questions.length > 0) {
      onUpdateBank(result.questions);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0e172a] border border-slate-700/80 rounded-3xl w-full max-w-3xl p-6 sm:p-7 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-sans">
                Centro Docente: Gestión de Batería Excel
              </h3>
              <p className="text-xs text-slate-400">
                Personaliza o amplía las preguntas de evaluación sin modificar código (.xlsx).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="space-y-4 overflow-y-auto pr-1 text-xs text-slate-300 flex-1">
          
          {/* Action cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={downloadOfficialTemplate}
              className="p-3.5 bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl flex items-center space-x-3.5 transition text-left group cursor-pointer"
            >
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-105 transition-transform">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-100 block text-xs sm:text-sm font-bold">
                  Descargar Plantilla Oficial (.xlsx)
                </strong>
                <span className="text-[11px] text-slate-400">
                  Estructura oficial documentada con 14 columnas.
                </span>
              </div>
            </button>

            <label className="p-3.5 bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-2xl flex items-center space-x-3.5 transition text-left group cursor-pointer">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-105 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-100 block text-xs sm:text-sm font-bold">
                  Cargar Batería desde Excel
                </strong>
                <span className="text-[11px] text-slate-400">
                  Valida y activa al instante tus preguntas personalizadas.
                </span>
              </div>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
            </label>
          </div>

          {/* Real-time Validation Feedback Alert */}
          {validation && (
            <div className={`p-4 rounded-2xl border transition-all ${
              validation.valid
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                : 'bg-red-950/50 border-red-500/40 text-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                {validation.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="font-bold text-sm">
                    {validation.valid ? '¡Validación de Excel Exitosa!' : 'Se Detectaron Errores en el Archivo'}
                  </h4>
                  <p className="text-xs mt-0.5 text-slate-300">
                    {validation.valid
                      ? `Se han importado y activado ${validation.questions.length} preguntas en el banco de memoria.`
                      : `No se pudieron cargar las preguntas debido a ${validation.errors.length} error(es) de formato:`}
                  </p>

                  {!validation.valid && (
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-[11px] text-red-300 max-h-36 overflow-y-auto">
                      {validation.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Current bank live preview */}
          <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950/60">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-slate-200 text-xs font-mono-retro">
                  Preguntas Activas en Memoria
                </h4>
              </div>
              <span className="text-amber-400 font-mono-retro font-bold text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {currentBank.length} preguntas
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto text-[11px] font-sans">
              {currentBank.map((q) => (
                <div 
                  key={q.id}
                  className="p-2 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition"
                >
                  <div className="truncate flex-1 pr-3">
                    <span className="text-amber-400 font-mono-retro font-bold mr-1.5">
                      [Nivel {q.level}] {q.id}:
                    </span>
                    <span className="text-slate-200">{q.question}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md font-mono-retro shrink-0">
                    {q.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer controls */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onRestoreDefault();
              setValidation(null);
            }}
            className="text-slate-400 hover:text-amber-400 text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Banco Predeterminado</span>
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
