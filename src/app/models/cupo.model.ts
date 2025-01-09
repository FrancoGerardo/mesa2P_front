// src/app/models/cupo.model.ts

export interface Cupo {
  cupoId: number;
  horarioMedicoEspecialidadId: number;
  horaInicio: string;
  horaFin: string;
  diaId: number;
  diaSemana: string;
  jornadaNombre: string;
  jornadaInicio: string;
  jornadaFin: string;
  medicoId: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidadId: number;
  nombreEspecialidad: string;
  disponible: boolean; // Indica si el cupo está disponible o no
  estado: string; // Agregado el campo estado para reflejar el estado del cupo
}
