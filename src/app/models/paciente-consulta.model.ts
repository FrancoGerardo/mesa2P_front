export interface PacienteConsulta {
    pacienteId: number;
    nombrePaciente: string;
    apellidoPaciente: string;
    tipoSangrePaciente: string;
    fechaNacimientoPaciente: string;
    historiaId: number;
    fechaHistoria: string;
    consultaId: number;
    fechaConsulta: string;
    diagnostico: string;
    tratamiento: string;
    notasConsulta: string;
    medicamentosRecetados: string;
    laboratoriosAsociados: string;
    medicoId: number;
    nombreMedico: string;
    apellidoMedico: string;
    especialidadMedico: string;
    consultaHoraInicio: string;
    consultaHoraFinal: string;
    diaConsulta: string;
    jornadaConsulta: string;
  }
  