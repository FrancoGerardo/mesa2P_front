// src/app/services/medico-especialidad.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicoEspecialidad } from '../models/medico-especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoEspecialidadService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/medico-especialidad';

  constructor(private http: HttpClient) {}

  // Obtener todas las relaciones con detalles
  getAllWithDetails(): Observable<MedicoEspecialidad[]> {
    return this.http.get<MedicoEspecialidad[]>(`${this.apiUrl}/details`);
  }

  // Obtener especialidades por médico ID
  getEspecialidadesByMedico(medicoId: number): Observable<MedicoEspecialidad[]> {
    return this.http.get<MedicoEspecialidad[]>(`${this.apiUrl}/${medicoId}/especialidades`);
  }

  // Añadir una especialidad a un médico
  addEspecialidadToMedico(medicoId: number, especialidadId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${medicoId}/especialidades/${especialidadId}`, {});
  }

  // Eliminar una especialidad de un médico
  removeEspecialidadFromMedico(medicoId: number, especialidadId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${medicoId}/especialidades/${especialidadId}`);
  }
}
