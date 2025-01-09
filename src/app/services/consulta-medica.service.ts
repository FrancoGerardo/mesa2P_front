// src/app/services/consulta-medica.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultaMedica } from '../models/consulta-medica.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaMedicaService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/api/consultas'; // URL definida directamente

  constructor(private http: HttpClient) {}

  // Obtener todas las consultas
  getAllConsultas(): Observable<ConsultaMedica[]> {
    return this.http.get<ConsultaMedica[]>(this.apiUrl);
  }

  // Obtener una consulta por ID
  getConsultaById(id: number): Observable<ConsultaMedica> {
    return this.http.get<ConsultaMedica>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva consulta
  createConsulta(consulta: Partial<ConsultaMedica>): Observable<string> {
    return this.http.post<string>(this.apiUrl, consulta);
  }

  // Actualizar una consulta
  updateConsulta(id: number, consulta: Partial<ConsultaMedica>): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, consulta);
  }

  // Eliminar una consulta
  deleteConsulta(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
