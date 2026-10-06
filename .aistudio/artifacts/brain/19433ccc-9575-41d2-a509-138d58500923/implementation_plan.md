# PRL Adventure 2.0 — Rediseño Arcade Retro-Moderno

Transformación completa de la experiencia de **PRL Adventure** en una aplicación web interactiva de alto impacto pedagógico construida con **React, TypeScript, Tailwind CSS, Lucide Icons, Motion y Web Audio API**. El rediseño combina una estética arcade retro-moderna con iluminación neón calibrada, animaciones fluidas en tiempo real, efectos de sonido sintetizados, medidor de vida dinámico, sistema de rachas de aciertos y logros desbloqueables, manteniendo intacto el rigor académico de Formación Profesional (FP) y todas las herramientas docentes (importación/exportación Excel y generación de informes oficiales para el profesor).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones de diseño y producto confirmadas en la fase de clarificación con el usuario:
> - **Dirección Artística**: Arcade retro-moderno con toques de neón ámbar/esmeralda/cian sobre fondo carbón profundo (`#0B0F19`), tipografía monospace con toques pixel y legible display (`Plus Jakarta Sans` + `Press Start 2P / JetBrains Mono`).
> - **Dinamismo e Interactividad**: Animaciones vivas con Motion, barra de vida segmentada con efectos de latido/impacto de daño, microinteracciones en opciones de respuesta y visualizador dinámico de escenario de riesgo.
> - **Mecánicas de Juego**: Conservar el flujo oficial de 5 niveles académicos con rescates (vidas y escudo EPI) enriquecido con multiplicador de racha de combos (*Streak*), insignias de logros por destreza preventiva y feedback pedagógico con citas normativas (LPRL 31/1995, INSST).

- **Confirmado**: Sistema de sonido arcade sintetizado configurable (conmutador mute on/off accesible en todo momento mediante Web Audio API, sin dependencias externas pesadas).
- **Confirmado**: Mantenimiento al 100% de la compatibilidad con plantillas Excel (`.xlsx`) y envío de informe de evaluación por correo a `jpons@centredelamar.com` junto con la vista de impresión en PDF.

---

## 1. Overview & Core Concept

- **Qué hace**: Un videojuego evaluativo serio y gamificado para estudiantes de Formación Profesional en España. Evalúa competencias clave de Prevención de Riesgos Laborales mediante 5 niveles progresivos (desde conceptos y EPIs hasta análisis de riesgos graves e inminentes).
- **Público Objetivo**: Alumnado de FP (Electricidad, Mecánica, Embarcaciones, Sanidad, Administración y General) y profesorado de FOL / IPE / PRL.
- **Valor Principal**: Transforma un test formativo árido en una aventura atractiva con progresión tangible, motivación por maestría y un informe técnico detallado con diagnóstico de áreas de mejora.

---

## 2. User Experience & Visual Design

### Flujo de Usuario

1. **Pantalla de Inicio / Registro**:
   - Cabecera estilizada con insignia animada de Técnico Prevencionista.
   - Formulario pulido con validación de nombre, grupo y selección de especialidad formativa.
   - Acceso directo al Centro Docente Excel (descarga de plantilla oficial y carga de batería personalizada).
2. **Briefing de Misión & Reglas**:
   - Resumen visual con tarjetas holográficas: 3 vidas, 5 niveles, puntuación máxima 10.0 pts (-0.2 por fallo) y Escudo EPI.
3. **Escenario de Juego en Vivo (HUD & Stage)**:
   - **HUD Superior**: Perfil del estudiante, contador de nivel (1/5), corazones pulsantes con indicador de absorción EPI, puntuación flotante en tiempo real y contador de racha (Combo x2, x3...).
   - **Visualizador de Riesgo (Arena)**: Sprite interactivo del técnico frente al peligro específico del nivel (riesgo eléctrico, corte, caída en altura, espacios confinados, etc.) con transiciones de reacción al acertar o fallar.
   - **Caja de Reto & Opciones**: Botones de respuesta táctiles con letras destacadas, hover reactivo y atajos de teclado (teclas 1-4 o A-D).
   - **Modal de Rescate**: Secuencia de emergencia cuando se pierde una vida o el escudo para ofrecer una pregunta de rescate.
4. **Pantalla de Informe de Evaluación y Diploma**:
   - Banner de Victoria / Derrota con calificación sobre 10.0.
   - Diagnóstico automático por categorías de fallo recomendando refuerzos específicos.
   - Tabla de auditoría desglosada con respuestas dadas y correctas.
   - Botón directo para Imprimir / Guardar en PDF y botón para enviar por email al docente.

### Sistema Visual (Paleta & Tipografía)
- **Fondo Base (60%)**: `#0A0E17` (Slate Ultra Dark / Carbono Espacial) con sutil cuadrícula técnica milimétrica.
- **Estructura y Paneles (30%)**: `#131C2E` y `#1E293B` con bordes finos de 1px (`#334155 / rgba(255,255,255,0.08)`).
- **Acentos Funcionales (10%)**:
  - *Ámbar Advertencia PRL*: `#F59E0B` (Primario para elementos de seguridad y progreso).
  - *Esmeralda Victoria / Acierto*: `#10B981` (Confirmaciones y puntuación).
  - *Cian Escudo EPI*: `#06B6D4` (Superpoder y absorción).
  - *Carmesí Peligro*: `#EF4444` (Vidas perdidas y alertas de riesgo).
- **Tipografía**: `Plus Jakarta Sans` para toda la lectura cómoda de preguntas y opciones; acentos numéricos y títulos retro con monospace estilizado / tabular figures.

---

## 3. Key Product Decisions & Trade-Offs

- **Migración a React 19 + TypeScript**:
  - *Por qué*: El código original era un único archivo HTML con scripts dispersos. La arquitectura en componentes modulares React permite desacoplar el motor de juego (`useGameState`), el sintetizador de audio (`audioSynth`), la lógica de Excel (`excelParser`) y las pantallas visuales, haciendo la app indestructible ante fallos de renderizado.
- **Sintetizador Web Audio API puro**:
  - *Por qué*: Cero dependencias de archivos MP3 externos que puedan fallar en la red; audio instantáneo generado por osciladores matemáticos (chime de acierto, alarma de error, fanfarria de nivel completado, tono de escudo). Incluye botón de silencio persistente en localStorage.
- **Soporte Excel XLSX nativo con previsualización**:
  - *Por qué*: Permite al profesorado cargar preguntas desde Excel sin tocar una sola línea de código, con validación de columnas en tiempo real y reporte de errores fila por fila.

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PRL Adventure 2.0                             │
│                      (React 19 + TypeScript)                           │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Game Engine    │      │    Sound FX      │      │ Question Manager │
│   & State Hook   │      │ (Web Audio API)  │      │  & Excel Parser  │
│  (Lives, Score,  │      │ (Bleeps, Chimes, │      │ (Default Banks + │
│ Streak, Levels)  │      │ Fanfare, Mute)   │      │ Custom .xlsx)    │
└────────┬─────────┘      └──────────────────┘      └────────┬─────────┘
         │                                                   │
         ├─────────────────────────┬─────────────────────────┤
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   ScreenViews    │      │ Interactive HUD  │      │  Report & Export │
│ - Registration   │      │ - Dynamic Hearts │      │ - Grade on 10.0  │
│ - Briefing       │      │ - EPI Shield Bar │      │ - Auto-Diagnose  │
│ - Challenge Arena│      │ - Streak Combo   │      │ - PDF Print A4   │
│ - Rescue Modals  │      │ - Live Progress  │      │ - Mailto Docente │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

### Componentes Principales
1. `src/types/game.ts`: Tipos estrictos para preguntas, niveles, estados de partida, auditoría de fallos y configuración de alumnos.
2. `src/services/soundEffects.ts`: Generador de audio procedural con Web Audio (acierto, fallo, rescate, game over, fanfarria).
3. `src/data/defaultQuestions.ts`: Banco enriquecido con más de 25 preguntas clasificadas por especialidad (General, Electricidad, Mecánica, Embarcaciones, Oficina).
4. `src/services/excelService.ts`: Generador de plantilla `.xlsx` y validador de archivos subidos por el profesor.
5. `src/components/Navbar.tsx`: Barra de control con selector de volumen/mute, información del alumno y botón de abandono seguro.
6. `src/components/ChallengeArena.tsx`: Escenario animado con sprite de prevención e iconos dinámicos según el tipo de riesgo.
7. `src/components/FinalReport.tsx`: Hoja académica homologada con estilos CSS listos para imprimir en A4 / PDF.
8. `src/App.tsx`: Orquestador principal de estado y transiciones.

---

## Plan de Verificación

1. **Instalación de paquetes requeridos**: Instalar `xlsx` para soportar la importación/exportación de hojas de cálculo sin fallos de CDN.
2. **Compilación de TypeScript**: Verificar que no existan errores de tipado con `npm run lint` / `compile_applet`.
3. **Flujo completo de juego**:
   - Registro con selección de ciclo.
   - Avance por los 5 niveles acumulando puntos y multiplicadores.
   - Prueba del sistema de rescate ante errores (pérdida de vida vs escudo EPI).
   - Generación del informe final, diagnóstico de áreas de mejora y prueba de descarga de Excel y plantilla.
   - Verificación de diseño responsive en móvil y escritorio.
