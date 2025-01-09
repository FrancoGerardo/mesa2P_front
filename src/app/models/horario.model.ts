// src/app/models/horario.model.ts
export interface Horario {
  id?: number;
  diaId: number;
  jornadaId: number;
  diaSemana?: string;  // Para mostrar el nombre del día
  horaInicio?: string; // Para mostrar la hora de inicio de la jornada
  horaFinal?: string;    // Para mostrar la hora de fin de la jornada
}
