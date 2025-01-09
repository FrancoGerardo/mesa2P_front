// src/app/services/laboratorio.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Laboratorio } from '../models/laboratorio.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/laboratorio';

  constructor(private http: HttpClient) {}

  getLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<Laboratorio[]>(this.apiUrl);
  }

  getLaboratorioById(id: number): Observable<Laboratorio> {
    return this.http.get<Laboratorio>(`${this.apiUrl}/${id}`);
  }

  createLaboratorio(laboratorio: Laboratorio): Observable<Laboratorio> {
    return this.http.post<Laboratorio>(this.apiUrl, laboratorio);
  }

  updateLaboratorio(id: number, laboratorio: Laboratorio): Observable<Laboratorio> {
    return this.http.put<Laboratorio>(`${this.apiUrl}/${id}`, laboratorio);
  }
// src/app/services/laboratorio.service.ts
getLaboratorioByConsultaId(consultaId: number): Observable<Laboratorio> {
  return this.http.get<Laboratorio>(`${this.apiUrl}/consulta/${consultaId}`);
}

  deleteLaboratorio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
