import { Question } from '../types/game';

export const DEFAULT_QUESTION_BANK: Question[] = [
  // ================= LEVEL 1: CONCEPTOS BÁSICOS & NORMATIVA (Básico) =================
  {
    id: 'Q101',
    level: 1,
    difficulty: 'Básico',
    type: 'TEST',
    category: 'Marco Normativo LPRL',
    cycle: 'GENERAL',
    question: '¿Cuál es el objetivo primordial de la Ley de Prevención de Riesgos Laborales (Ley 31/1995)?',
    options: {
      A: 'Sancionar de forma punitiva a las empresas ante cualquier incidencia menor.',
      B: 'Promover la seguridad y la salud de los trabajadores mediante la aplicación de medidas preventivas eficaces.',
      C: 'Exigir que cada trabajador financie sus propios equipos de protección individual (EPI).',
      D: 'Priorizar el volumen de producción sin supeditarlo a las condiciones de trabajo.'
    },
    correct: 'B',
    explanation: 'El Art. 2 de la LPRL 31/1995 establece como fin primordial promover la seguridad y salud de los trabajadores mediante la prevención de los riesgos derivados del trabajo.',
    active: true
  },
  {
    id: 'Q102',
    level: 1,
    difficulty: 'Básico',
    type: 'TEST',
    category: 'Señalización de Seguridad',
    cycle: 'GENERAL',
    question: '¿Qué significado reglamentario tiene una señal circular con borde rojo, fondo blanco y pictograma negro?',
    options: {
      A: 'Obligación estricta de uso de un equipo específico.',
      B: 'Prohibición de un comportamiento susceptible de provocar un peligro inminente.',
      C: 'Indicación de salida de emergencia o puesto de salvamento.',
      D: 'Advertencia general sobre la presencia de un riesgo latente.'
    },
    correct: 'B',
    explanation: 'Según el Real Decreto 485/1997 sobre señalización, las señales de prohibición son redondas con borde y banda diagonal roja sobre fondo blanco y pictograma negro.',
    active: true
  },
  {
    id: 'Q103',
    level: 1,
    difficulty: 'Básico',
    type: 'TEST',
    category: 'Derechos y Obligaciones',
    cycle: 'GENERAL',
    question: 'En materia de Equipos de Protección Individual (EPI), ¿quién está obligado legalmente a asumir su coste económico?',
    options: {
      A: 'El propio trabajador mediante deducciones prorrateadas en nómina.',
      B: 'El empresario, quien debe suministrarlos gratuitamente y reponerlos cuando sea necesario.',
      C: 'La mutua de accidentes laborales a partes iguales con el comité de empresa.',
      D: 'El servicio público de empleo.'
    },
    correct: 'B',
    explanation: 'El Art. 17.2 de la LPRL y el RD 773/1997 determinan que el empresario proporcionará a sus trabajadores de forma totalmente gratuita los EPIs necesarios para el puesto.',
    active: true
  },
  {
    id: 'Q104',
    level: 1,
    difficulty: 'Básico',
    type: 'TEST',
    category: 'Definiciones Clave',
    cycle: 'ADMINISTRACION',
    question: '¿Qué se define legalmente como "condición de trabajo" en el ámbito de la prevención?',
    options: {
      A: 'Únicamente el salario neto pactado en el convenio colectivo.',
      B: 'Cualquier característica del trabajo que pueda tener una influencia significativa en la generación de riesgos.',
      C: 'La duración del contrato temporal.',
      D: 'El horario de descanso para el café estipulado en la empresa.'
    },
    correct: 'B',
    explanation: 'El Art. 4.7 de la LPRL define condición de trabajo como cualquier característica laboral (locales, agentes físicos/químicos, organización) que influya en los riesgos para la salud.',
    active: true
  },

  // ================= LEVEL 2: IDENTIFICACIÓN DE RIESGOS & EPIS (Básico/Medio) =================
  {
    id: 'Q201',
    level: 2,
    difficulty: 'Básico/Medio',
    type: 'EPI_SELECT',
    category: 'Equipos de Protección Individual',
    cycle: 'GENERAL',
    question: 'RETO PRÁCTICO EPIs: Se realizará corte con amoladora angular (radial) en taller con proyección de chispas y ruido superior a 85 dB. ¿Qué combinación es obligatoria?',
    options: {
      A: 'Gafas de seguridad de montura integral / pantalla facial y protección auditiva certificada (tapones u orejeras).',
      B: 'Únicamente guantes de hilo fino y mascarilla higiénica desechable.',
      C: 'Casco de obra sin visera protectora ni protección auditiva.',
      D: 'Calzado textil ligero y pantalla de soldador oscuro inactiva.'
    },
    correct: 'A',
    explanation: 'El corte con amoladora genera proyectiles a gran velocidad (riesgo mecánico/ocular) y niveles sonoros perjudiciales (>85 dB(A)), exigiendo protección ocular/facial e intrauricular/auricular.',
    active: true
  },
  {
    id: 'Q202',
    level: 2,
    difficulty: 'Básico/Medio',
    type: 'TEST',
    category: 'Higiene Industrial',
    cycle: 'GENERAL',
    question: 'En un taller con vapores de disolventes volátiles, ¿cuál es la medida preventiva prioritaria según los principios de la acción preventiva?',
    options: {
      A: 'Entregar de inmediato mascarillas quirúrgicas a los operarios.',
      B: 'Sustituir el agente químico por uno inocuo o instalar un sistema de extracción localizada en el foco.',
      C: 'Permitir las labores únicamente en turnos de noche cuando no haya inspecciones.',
      D: 'Aumentar la velocidad de trabajo para reducir el tiempo de exposición.'
    },
    correct: 'B',
    explanation: 'El Art. 15 de la LPRL establece la jerarquía preventiva: combatir los riesgos en su origen, sustituir lo peligroso por lo que entrañe poco o ningún peligro y anteponer la protección colectiva a la individual.',
    active: true
  },
  {
    id: 'Q203',
    level: 2,
    difficulty: 'Básico/Medio',
    type: 'TEST',
    category: 'Seguridad Eléctrica',
    cycle: 'ELECTRICIDAD',
    question: 'Antes de realizar una intervención en una instalación eléctrica en baja tensión sin tensión, ¿cuál es la 1ª de las 5 Reglas de Oro?',
    options: {
      A: 'Verificar la ausencia de tensión con voltímetro.',
      B: 'Desconectar la instalación mediante corte visible o efectivo de todas las fuentes.',
      C: 'Poner a tierra y en cortocircuito los conductores.',
      D: 'Colocar protecciones de plástico sobre las barras.'
    },
    correct: 'B',
    explanation: 'La 1ª regla de oro del RD 614/2001 (riesgo eléctrico) es "Desconectar" (corte visible o efectivo). Las siguientes son: prevenir realimentación, verificar ausencia de tensión, puesta a tierra/cortocircuito y señalizar la zona.',
    active: true
  },
  {
    id: 'Q204',
    level: 2,
    difficulty: 'Básico/Medio',
    type: 'TEST',
    category: 'Seguridad en Máquinas',
    cycle: 'MECANICA',
    question: 'En un torno paralelo o fresadora industrial, ¿qué elemento de seguridad NO debe ser anulado jamás por el operario?',
    options: {
      A: 'El resguardo móvil interenclavado que cubre el plato de garras y la parada de emergencia (seta).',
      B: 'La lámpara de iluminación orientable del cabezal.',
      C: 'La bandeja de virutas metálicas del suelo.',
      D: 'El indicador analógico de revoluciones por minuto.'
    },
    correct: 'A',
    explanation: 'El RD 1215/1997 prohíbe taxativamente puentear o manipular los resguardos con dispositivo de enclavamiento o los órganos de parada de emergencia.',
    active: true
  },

  // ================= LEVEL 3: MEDIDAS PREVENTIVAS & PRIMEROS AUXILIOS (Medio) =================
  {
    id: 'Q301',
    level: 3,
    difficulty: 'Medio',
    type: 'TEST',
    category: 'Ergonomía Física',
    cycle: 'GENERAL',
    question: 'Según la Guía Técnica del INSST para la manipulación manual de cargas, ¿cuál es el peso máximo teórico en condiciones ideales para la población general?',
    options: {
      A: '15 kg',
      B: '25 kg',
      C: '40 kg',
      D: '50 kg'
    },
    correct: 'B',
    explanation: 'La Guía Técnica del INSST (RD 487/1997) estipula 25 kg como peso máximo recomendado para condiciones ideales en población general trabajadora (reducido a 15 kg para situaciones desfavorables o colectivos sensibles).',
    active: true
  },
  {
    id: 'Q302',
    level: 3,
    difficulty: 'Medio',
    type: 'ORDERING',
    category: 'Primeros Auxilios',
    cycle: 'GENERAL',
    question: 'PROTOCOLO DE EMERGENCIA: ¿Cuál es la secuencia correcta de la conducta PAS ante un accidente laboral?',
    options: {
      A: 'Proteger el lugar y las personas → Avisar a los servicios de socorro (112) → Socorrer a las víctimas.',
      B: 'Socorrer inmediatamente sin perder tiempo → Avisar al encargado → Proteger la máquina.',
      C: 'Avisar al 112 → Socorrer de inmediato → Proteger la entrada.',
      D: 'Proteger a los testigos → Socorrer sin avisar → Evaluar los daños materiales.'
    },
    correct: 'A',
    explanation: 'El protocolo PAS es estricto: 1º PROTEGER (evitar que el socorrista se convierta en una nueva víctima), 2º AVISAR (dar alerta precisa a los servicios de emergencias) y 3º SOCORRER.',
    active: true
  },
  {
    id: 'Q303',
    level: 3,
    difficulty: 'Medio',
    type: 'TEST',
    category: 'Trabajos en Altura & Espacios Marítimos',
    cycle: 'EMBARCACIONES',
    question: 'Durante reparaciones en la borda o cubierta de un barco varado con riesgo de caída a distinta altura (>2 m), ¿qué protección es preferente?',
    options: {
      A: 'Únicamente calzado con suela antideslizante sin atadura.',
      B: 'Protección colectiva perimetral (redes de seguridad o barandillas sólidas con pasamanos y rodapié).',
      C: 'Arnés de seguridad atado a un cable auxiliar no certificado.',
      D: 'Aviso verbal periódico entre compañeros de cuadrilla.'
    },
    correct: 'B',
    explanation: 'El principio de anteponer la protección colectiva a la individual (Art. 15 LPRL) exige priorizar barandillas perimetrales reglamentarias (con rodapié para caída de objetos) frente a equipos individuales anticaídas.',
    active: true
  },
  {
    id: 'Q304',
    level: 3,
    difficulty: 'Medio',
    type: 'TEST',
    category: 'Ergonomía de Pantallas',
    cycle: 'ADMINISTRACION',
    question: 'En un puesto de oficina con pantallas de visualización de datos (PVD), ¿a qué altura debe situarse el borde superior del monitor?',
    options: {
      A: 'Por encima de la frente para forzar la inclinación cervical hacia atrás.',
      B: 'A la altura o ligeramente por debajo del nivel de los ojos del usuario.',
      C: 'Sobre la superficie de la mesa mirando siempre hacia abajo.',
      D: 'En un lateral a 90 grados respecto al teclado.'
    },
    correct: 'B',
    explanation: 'Según el RD 488/1997 sobre PVD, la pantalla debe permitir una postura cervical neutra; el borde superior debe coincidir aproximadamente con la línea de la mirada horizontal.',
    active: true
  },

  // ================= LEVEL 4: CASOS PRÁCTICOS & EMERGENCIAS (Medio/Alto) =================
  {
    id: 'Q401',
    level: 4,
    difficulty: 'Medio/Alto',
    type: 'CASE_STUDY',
    category: 'Espacios Confinados',
    cycle: 'GENERAL',
    question: 'CASO REAL: Un operario entra a un tanque cisterna sin ventilar ni medir la atmósfera previa. A los dos minutos queda inconsciente. ¿Qué acción debe tomar el recurso preventivo exterior?',
    options: {
      A: 'Ingresar de inmediato sin protección para arrastrar al compañero antes de que fallezca.',
      B: 'Activar el plan de emergencia, solicitar socorro especializado e iniciar ventilación forzada sin penetrar sin ERA (Equipo de Respiración Autónoma).',
      C: 'Arrojar cubos de agua fresca al interior para intentar reanimarlo desde arriba.',
      D: 'Anotar el incidente en el libro de incidencias y aguardar al relevo de turno.'
    },
    correct: 'B',
    explanation: 'En espacios confinados más del 60% de los fallecimientos corresponden a socorristas improvisados que entran sin equipo autónomo. Es crítico activar la emergencia y solo ingresar con ERA y rescate vertical trípode.',
    active: true
  },
  {
    id: 'Q402',
    level: 4,
    difficulty: 'Medio/Alto',
    type: 'TEST',
    category: 'Lucha contra Incendios',
    cycle: 'GENERAL',
    question: 'Ante un conato de fuego en un cuadro de distribución eléctrica bajo tensión, ¿cuál es el agente extintor más apropiado?',
    options: {
      A: 'Extintor hídrico de agua a chorro continuo.',
      B: 'Extintor de Nieve Carbónica (Dióxido de Carbono - CO2) o Polvo Seco no conductor.',
      C: 'Manguera de espuma física acuosa aplicada directamente.',
      D: 'Mantas térmicas humedecidas en agua común.'
    },
    correct: 'B',
    explanation: 'El CO2 es un agente gas dieléctrico (no conduce la corriente eléctrica) y no deja residuos corrosivos en los componentes electrónicos ni expone al operador al riesgo de electrocución.',
    active: true
  },
  {
    id: 'Q403',
    level: 4,
    difficulty: 'Medio/Alto',
    type: 'TEST',
    category: 'Trabajos en Tensión',
    cycle: 'ELECTRICIDAD',
    question: 'Para realizar un trabajo en proximidad de partes en tensión en alta tensión, ¿qué elemento organizativo es preceptivo?',
    options: {
      A: 'Una autorización escrita expresa (Descargo / Permiso de Trabajo Especial) y la presencia de un Recurso Preventivo.',
      B: 'Exclusivamente el visto bueno verbal del operario más veterano.',
      C: 'Un extintor de agua colocado a 5 metros.',
      D: 'Trabajar en silencio para escuchar posibles arcos eléctricos.'
    },
    correct: 'A',
    explanation: 'El RD 614/2001 exige para trabajos con riesgo eléctrico grave procedimientos de trabajo por escrito, delimitación de la zona de peligro y supervisión de un recurso preventivo cualificado.',
    active: true
  },

  // ================= LEVEL 5: ANÁLISIS & TOMA DE DECISIONES COMPLEJAS (Alto) =================
  {
    id: 'Q501',
    level: 5,
    difficulty: 'Alto',
    type: 'TEST',
    category: 'Riesgo Grave e Inminente',
    cycle: 'GENERAL',
    question: 'ANÁLISIS NORMATIVO: Se constata el colapso inminente de un andamio colgado y la empresa no adopta medidas inmediatas. ¿Qué potestad tienen los Delegados de Prevención?',
    options: {
      A: 'Ninguna; solo pueden elevar un escrito consultivo no vinculante al mes siguiente.',
      B: 'Acordar por mayoría la paralización inmediata de los trabajos y comunicarlo formalmente a la empresa y a la Autoridad Laboral.',
      C: 'Tramitar el despido disciplinario de los encargados de turno.',
      D: 'Cerrar unilateralmente las instalaciones de la empresa sin aviso a la inspección.'
    },
    correct: 'B',
    explanation: 'El Art. 21.3 de la LPRL otorga a los representantes legales de los trabajadores y a los delegados de prevención la potestad de paralizar la actividad por mayoría cuando exista un riesgo grave e inminente para la vida o la salud.',
    active: true
  },
  {
    id: 'Q502',
    level: 5,
    difficulty: 'Alto',
    type: 'TEST',
    category: 'Investigación de Accidentes',
    cycle: 'GENERAL',
    question: 'Al investigar un accidente grave por caída desde cubierta, se comprueba que el trabajador no llevaba arnés, no había línea de vida y no recibió formación. ¿Cuál es la causa raíz primaria?',
    options: {
      A: 'La mala suerte fortuita inherente al sector de la construcción.',
      B: 'La culpa exclusiva e intencionada del operario accidentado.',
      C: 'Fallo sistémico en la integración de la prevención en el sistema general de gestión de la empresa y en la planificación preventiva.',
      D: 'La dirección del viento en ese instante.'
    },
    correct: 'C',
    explanation: 'En la metodología del árbol de causas (INSST), la ausencia de medios técnicos, supervisión y formación evidencia una falla organizativa y de gestión preventiva estructural en la empresa.',
    active: true
  },
  {
    id: 'Q503',
    level: 5,
    difficulty: 'Alto',
    type: 'TEST',
    category: 'Coordinación de Actividades Empresariales',
    cycle: 'GENERAL',
    question: 'En un centro de trabajo donde coinciden trabajadores de varias empresas contratistas, ¿qué deber impone el Real Decreto 171/2004 al empresario titular?',
    options: {
      A: 'Pagar las cuotas de seguridad social de todas las empresas subcontratadas.',
      B: 'Dar instrucciones precisas sobre los riesgos del centro y las medidas de emergencia, coordinando activamente a las partes.',
      C: 'Prohibir la entrada a cualquier trabajador que no pertenezca a su plantilla propia.',
      D: 'Exigir que todas las empresas compartan el mismo horario laboral estricto.'
    },
    correct: 'B',
    explanation: 'El RD 171/2004 y el Art. 24 de la LPRL regulan la Coordinación de Actividades Empresariales (CAE), obligando al titular a informar sobre riesgos propios y medidas de emergencia a todos los concurrentes.',
    active: true
  }
];
