export interface Bitacora {
    bitacora_id: number;
    usuario_id: number | null;
    accion: string;
    tabla: string;
    detalle: string;
    ip: string | null;
    fecha: string; // ISO 8601 string
  }
  