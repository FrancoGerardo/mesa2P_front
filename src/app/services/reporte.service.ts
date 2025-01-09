import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteConsulta } from '../models/paciente-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReporteConsultas(): Observable<PacienteConsulta[]> {
    return this.http.get<PacienteConsulta[]>(`${this.apiUrl}/consultas`);
  }
}
