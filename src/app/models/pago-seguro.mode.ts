export interface PagoSeguro {
    pagoId?: number;
    pacienteId: number;
    monto: number;
    fechaPago: string; // La fecha en formato ISO
    fechaVencimiento?: string; // Opcional porque el trigger la establece
    metodoId: number; // ID del método de pago
    estado: string; // Procesado, Pendiente, Cancelado
    metodoPago?: string; // Para mostrar el nombre del método de pago en el historial
  }
  