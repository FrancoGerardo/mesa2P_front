// src/app/models/documentos-laboratorio.model.ts
export interface DocumentosLaboratorio {
    documentoId?: number;
    laboratorioId: number;
    nombreArchivo: string;
    tipoDocumento: string;
    ubicacionArchivo: string;
    fechaRealizacion: Date;
  }
  