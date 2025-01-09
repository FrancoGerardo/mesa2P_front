export interface RecetaDetallesDTO {
    fechaEmision: string;
    instrucciones: string;
    fechaConsulta?: string;
    diagnostico?: string;
    tratamiento?: string;
    notas?: string;
    pacienteNombre?: string;
    pacienteApellido?: string;
    medicoNombre?: string;
    medicoApellido?: string;
    especialidadNombre?: string;
    diaAtencion?: string;
    consultaHoraInicio?: string;
    consultaHoraFinal?: string;
    medicamentoNombre?: string;
    medicamentoDosis?: string;
    medicamentoFrecuencia?: string;
    medicamentoDuracion?: number;
  }
  