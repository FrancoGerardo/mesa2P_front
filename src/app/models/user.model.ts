export interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono?: string;
    direccion?: string;
    rolId?: number;  
  }
  