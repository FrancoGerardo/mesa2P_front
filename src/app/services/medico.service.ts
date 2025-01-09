import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/api/medicos';

  constructor(private http: HttpClient) {}

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl);
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`);
  }

  createMedico(medico: Medico): Observable<void> {
    return this.http.post<void>(this.apiUrl, medico);
  }

  updateMedico(id: number, medico: Medico): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, medico);
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
