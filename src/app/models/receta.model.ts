// src/app/models/receta.model.ts
export interface Receta {
    id?: number; // opcional para las nuevas recetas, ya que se generará en el backend
    consultaId: number;
    fechaEmision: string; // opcional para permitir que se asigne en el backend si no se proporciona
    instrucciones: string;
}
