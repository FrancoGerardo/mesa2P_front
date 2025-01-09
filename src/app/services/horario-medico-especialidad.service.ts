// src/app/services/horario-medico-especialidad.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioMedicoEspecialidad } from '../models/horario-medico-especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioMedicoEspecialidadService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/api/horario-medico-especialidad';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HorarioMedicoEspecialidad[]> {
    return this.http.get<HorarioMedicoEspecialidad[]>(`${this.apiUrl}`);
  }

  create(horarioMedicoEspecialidad: HorarioMedicoEspecialidad): Observable<void> {
    return this.http.post<void>(this.apiUrl, horarioMedicoEspecialidad);
  }
  getMedicosByEspecialidad(especialidadId: number): Observable<HorarioMedicoEspecialidad[]> {
    return this.http.get<HorarioMedicoEspecialidad[]>(`${this.apiUrl}/especialidad/${especialidadId}/medicos`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
