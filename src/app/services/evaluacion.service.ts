// src/app/services/evaluacion.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluacion } from '../models/evaluacion.model';

@Injectable({
  providedIn: 'root',
})
export class EvaluacionService {
  private readonly apiUrl = 'https://mesa2p2-production.up.railway.app/api/evaluaciones';

  constructor(private http: HttpClient) {}

  // Guardar una evaluación
  saveEvaluacion(evaluacion: Evaluacion): Observable<void> {
    return this.http.post<void>(this.apiUrl, evaluacion);
  }

  // Obtener todas las evaluaciones por médico y especialidad
  getEvaluacionesByMedico(medicoId: number, especialidadId: number): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(`${this.apiUrl}/${medicoId}/${especialidadId}`);
  }

  // Obtener el promedio de evaluaciones por médico y especialidad
  getPromedioEvaluacion(medicoId: number, especialidadId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/promedio/${medicoId}/${especialidadId}`);
  }
  // Obtener todas las evaluaciones detalladas
  getAllEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.apiUrl);
  }
}
