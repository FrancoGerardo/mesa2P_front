export interface MetodoDePago {
    metodoId: number; // ID del método de pago
    nombre: string; // Nombre del método (Tarjeta, Transferencia, etc.)
    descripcion?: string; // Descripción opcional del método
  }
  