// src/app/models/medico-especialidad.model.ts
export interface MedicoEspecialidad {
  medicoId: number;
  especialidadId: number;
  medicoNombre?: string;        // Nuevo campo
  medicoApellido?: string;       // Nuevo campo
  especialidadNombre?: string;   // Nuevo campo
}
