// models/horario-especialidad.model.ts
export interface HorarioEspecialidad {
    horarioId?: number;
    especialidadId: number;
    diaSemana: string;
    horaInicio: string;
    horaFin: string;
    cupoMaximo: number;
  }
  