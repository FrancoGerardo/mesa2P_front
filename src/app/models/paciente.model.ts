export interface Paciente {
  id?: number; // Opcional, generado por el backend
  usuarioId: number;
  fechaNacimiento: string;
  genero: string;
  tipoSangre: string;
  apellido:string;
  nombre:string;
}
