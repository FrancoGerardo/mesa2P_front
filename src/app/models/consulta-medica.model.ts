export interface ConsultaMedica {
  consultaId?: number; // ID de la consulta
  reservaId: number | null; // ID de la reserva asociada
  historiaId: number | null; // ID de la historia clínica
  pacienteId?: number; // ID del paciente
  medicoId?: number; // ID del médico
  especialidadId?: number; // ID de la especialidad médica
  cupoId?: number; // ID del cupo (opcional, según tu backend)
  fechaConsulta: Date; // Fecha de la consulta
  diagnostico: string; // Diagnóstico de la consulta
  tratamiento: string; // Tratamiento recomendado
  notas: string; // Notas adicionales de la consulta
  nombrePaciente?: string; // Nombre del paciente (opcional)
  apellidoPaciente?: string; // Apellido del paciente (opcional)
  nombreMedico?: string; // Nombre del médico (opcional)
  apellidoMedico?: string; // Apellido del médico (opcional)
}
