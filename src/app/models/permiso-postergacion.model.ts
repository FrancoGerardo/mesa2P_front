// src/app/models/permiso-postergacion.model.ts

export interface PermisoPostergacion {
    postergacionId?: number;
    medicoId: number;
    tipoPostergacion: string;
    fechaSolicitud?: string; // Se puede añadir automáticamente en el backend
    fechaInicio: string | Date;
    horaInicio?: string;
    horaFin?: string;
    estado: string;
    motivo: string;
}
