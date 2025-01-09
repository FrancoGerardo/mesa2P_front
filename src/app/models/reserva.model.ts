// src/app/models/reserva.model.ts

export interface Reserva {
  reservaId: number;
  pacienteId: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  fechaReserva: string;
  estado: string;
  cupoId: number;
  horaInicio: string;
  horaFin: string;
  medicoId: number;
  nombreMedico: string;
  apellidoMedico: string;
  especialidadId: number;
  nombreEspecialidad: string;
  historiaId?: number; // Incluye historiaId opcional
}