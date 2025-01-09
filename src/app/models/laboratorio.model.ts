// src/app/models/laboratorio.model.ts
export interface Laboratorio {
    id?: number;
    consultaId: number;
    tipoAnalisis: string;
    descripcion: string;
    fechaProgramacion: string; // formato de fecha ISO
  }
  