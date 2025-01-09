// src/app/models/horario-medico-especialidad.model.ts
export interface HorarioMedicoEspecialidad {
    horarioMedicoEspecialidadId?: number;
    medicoId: number;
    especialidadId: number;
    horarioId: number;
    medicoNombre?: string;
    medicoApellido?: string;
    especialidadNombre?: string;
    diaSemana?: string;
    horaInicio?: string;
    horaFin?: string;
  }
  