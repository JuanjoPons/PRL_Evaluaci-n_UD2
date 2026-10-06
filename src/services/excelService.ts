import * as XLSX from 'xlsx';
import { Question, SpecialtyCycle, QuestionType, QuestionDifficulty } from '../types/game';

export interface ValidationResult {
  valid: boolean;
  questions: Question[];
  errors: string[];
  totalRows: number;
}

export function downloadOfficialTemplate(): void {
  const templateRows = [
    {
      "ID": "Q101",
      "Nivel": 1,
      "Dificultad": "Básico",
      "Tipo": "TEST",
      "Categoría": "Normativa",
      "Ciclo": "GENERAL",
      "Pregunta/Prueba": "¿Cuál es la norma básica de seguridad y salud laboral en España?",
      "Opción A": "Ley 31/1995 de Prevención de Riesgos Laborales (LPRL)",
      "Opción B": "Código Civil Común",
      "Opción C": "Reglamento General de Tráfico",
      "Opción D": "Ley de Aguas de Cuenca",
      "Respuesta correcta": "A",
      "Explicación": "La Ley 31/1995 es el pilar legal básico de la prevención de riesgos laborales en España.",
      "Activa": "SI"
    },
    {
      "ID": "Q201",
      "Nivel": 2,
      "Dificultad": "Básico/Medio",
      "Tipo": "EPI_SELECT",
      "Categoría": "Equipos de Protección Individual",
      "Ciclo": "GENERAL",
      "Pregunta/Prueba": "¿Qué color identifica las señales de obligatoriedad según la normativa?",
      "Opción A": "Rojo con pictograma negro",
      "Opción B": "Azul con pictograma blanco",
      "Opción C": "Amarillo con banda negra",
      "Opción D": "Verde con pictograma blanco",
      "Respuesta correcta": "B",
      "Explicación": "Las señales de obligación son circulares con fondo azul y pictograma blanco en su interior.",
      "Activa": "SI"
    },
    {
      "ID": "Q301",
      "Nivel": 3,
      "Dificultad": "Medio",
      "Tipo": "TEST",
      "Categoría": "Primeros Auxilios",
      "Ciclo": "GENERAL",
      "Pregunta/Prueba": "¿Cuál es el protocolo de actuación ante una emergencia laboral según la conducta PAS?",
      "Opción A": "Proteger → Avisar → Socorrer",
      "Opción B": "Socorrer → Avisar → Proteger",
      "Opción C": "Avisar → Socorrer → Proteger",
      "Opción D": "Proteger → Socorrer → Avisar",
      "Respuesta correcta": "A",
      "Explicación": "La conducta PAS establece siempre el orden de prioridad: 1º Proteger el entorno, 2º Avisar a emergencias y 3º Socorrer.",
      "Activa": "SI"
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateRows);

  // Set explicit column widths for clarity
  worksheet['!cols'] = [
    { wch: 8 },  // ID
    { wch: 8 },  // Nivel
    { wch: 14 }, // Dificultad
    { wch: 12 }, // Tipo
    { wch: 22 }, // Categoría
    { wch: 16 }, // Ciclo
    { wch: 55 }, // Pregunta
    { wch: 35 }, // Opción A
    { wch: 35 }, // Opción B
    { wch: 35 }, // Opción C
    { wch: 35 }, // Opción D
    { wch: 18 }, // Respuesta correcta
    { wch: 45 }, // Explicación
    { wch: 8 },  // Activa
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'PlantillaPRL');
  XLSX.writeFile(workbook, 'Plantilla_Docente_PRL_Adventure.xlsx');
}

export async function parseExcelQuestions(file: File): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          resolve({
            valid: false,
            questions: [],
            errors: ['El archivo Excel no contiene ninguna hoja de cálculo visible.'],
            totalRows: 0
          });
          return;
        }

        const sheet = workbook.Sheets[firstSheetName];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawRows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (!rawRows || rawRows.length === 0) {
          resolve({
            valid: false,
            questions: [],
            errors: ['La hoja de cálculo está vacía o carece de filas de datos.'],
            totalRows: 0
          });
          return;
        }

        const errors: string[] = [];
        const validQuestions: Question[] = [];
        const seenIds = new Set<string>();

        rawRows.forEach((row, index) => {
          const rowNum = index + 2; // +2 considering header row

          const id = String(row['ID'] || row['id'] || '').trim();
          const nivel = parseInt(row['Nivel'] || row['nivel'] || row['Level'] || '0', 10);
          const pregunta = String(row['Pregunta/Prueba'] || row['Pregunta'] || row['pregunta'] || '').trim();
          const opA = String(row['Opción A'] || row['Opcion A'] || row['opcion_a'] || '').trim();
          const opB = String(row['Opción B'] || row['Opcion B'] || row['opcion_b'] || '').trim();
          const opC = String(row['Opción C'] || row['Opcion C'] || row['opcion_c'] || '').trim();
          const opD = String(row['Opción D'] || row['Opcion D'] || row['opcion_d'] || '').trim();
          const correctaRaw = String(row['Respuesta correcta'] || row['Respuesta'] || row['correcta'] || '').toUpperCase().trim();
          const categoria = String(row['Categoría'] || row['Categoria'] || 'General').trim();
          const cicloRaw = String(row['Ciclo'] || 'GENERAL').toUpperCase().trim();
          const dificultad = String(row['Dificultad'] || 'Medio').trim() as QuestionDifficulty;
          const tipo = (String(row['Tipo'] || 'TEST').trim().toUpperCase() as QuestionType) || 'TEST';
          const activaRaw = String(row['Activa'] || 'SI').toUpperCase().trim();

          // Validation rules
          if (!id) {
            errors.push(`Fila ${rowNum}: El identificador (ID) no puede estar vacío.`);
          } else if (seenIds.has(id)) {
            errors.push(`Fila ${rowNum}: ID duplicado '${id}'. Cada pregunta debe poseer un ID único.`);
          } else {
            seenIds.add(id);
          }

          if (isNaN(nivel) || nivel < 1 || nivel > 5) {
            errors.push(`Fila ${rowNum} (${id || 'Sin ID'}): El nivel debe ser un número entero entre 1 y 5.`);
          }

          if (!pregunta) {
            errors.push(`Fila ${rowNum} (${id || 'Sin ID'}): Enunciado de 'Pregunta/Prueba' faltante.`);
          }

          if (!opA || !opB) {
            errors.push(`Fila ${rowNum} (${id || 'Sin ID'}): Se requieren obligatoriamente al menos las opciones A y B.`);
          }

          if (!['A', 'B', 'C', 'D'].includes(correctaRaw)) {
            errors.push(`Fila ${rowNum} (${id || 'Sin ID'}): 'Respuesta correcta' inválida ('${correctaRaw}'). Debe ser A, B, C o D.`);
          }

          if (errors.length === 0) {
            const mappedCycle: SpecialtyCycle | 'ALL' = 
              ['ELECTRICIDAD', 'MECANICA', 'EMBARCACIONES', 'ADMINISTRACION'].includes(cicloRaw)
                ? (cicloRaw as SpecialtyCycle)
                : 'GENERAL';

            validQuestions.push({
              id,
              level: nivel,
              difficulty: dificultad,
              type: ['TEST', 'EPI_SELECT', 'ORDERING', 'CASE_STUDY'].includes(tipo) ? tipo : 'TEST',
              category: categoria,
              cycle: mappedCycle,
              question: pregunta,
              options: {
                A: opA,
                B: opB,
                ...(opC ? { C: opC } : {}),
                ...(opD ? { D: opD } : {})
              },
              correct: correctaRaw as 'A' | 'B' | 'C' | 'D',
              explanation: String(row['Explicación'] || row['Explicacion'] || 'Medida preventiva fundamental estipulada en la normativa de PRL.').trim(),
              active: activaRaw.startsWith('S') || activaRaw === 'TRUE' || activaRaw === '1'
            });
          }
        });

        resolve({
          valid: errors.length === 0 && validQuestions.length > 0,
          questions: validQuestions,
          errors,
          totalRows: rawRows.length
        });
      } catch (err) {
        resolve({
          valid: false,
          questions: [],
          errors: [`Error crítico al leer el archivo Excel: ${(err as Error).message}`],
          totalRows: 0
        });
      }
    };

    reader.onerror = () => {
      resolve({
        valid: false,
        questions: [],
        errors: ['Error en la lectura física del archivo proporcionado.'],
        totalRows: 0
      });
    };

    reader.readAsArrayBuffer(file);
  });
}
