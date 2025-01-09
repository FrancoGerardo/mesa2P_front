import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/especialidades';

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  getEspecialidadById(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
  }

  createEspecialidad(especialidad: Especialidad): Observable<void> {
    return this.http.post<void>(this.apiUrl, especialidad);
  }

  updateEspecialidad(id: number, especialidad: Especialidad): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, especialidad);
  }

  deleteEspecialidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
