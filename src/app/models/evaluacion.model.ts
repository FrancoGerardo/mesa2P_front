// src/app/models/evaluacion.model.ts
export interface Evaluacion {
    evaluacionId: number;
    consultaId: number;
    pacienteId: number;
    medicoId: number;
    especialidadId: number;
    puntuacion: number;
    comentario: string;
    fechaEvaluacion: string;
    nombrePaciente: string;
    apellidoPaciente: string;
    nombreMedico: string;
    apellidoMedico: string;
    nombreEspecialidad: string;
  }
  