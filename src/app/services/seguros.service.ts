import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoSeguro } from '../models/pago-seguro.mode';

@Injectable({
  providedIn: 'root',
})
export class SegurosService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/pagos-seguro';

  constructor(private http: HttpClient) {}

  obtenerHistorialDePagos(pacienteId: number): Observable<PagoSeguro[]> {
    return this.http.get<PagoSeguro[]>(`${this.apiUrl}/historial/${pacienteId}`);
  }

  obtenerEstadoSeguro(pacienteId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/estado/${pacienteId}`);
  }

  registrarPagoSeguro(pago: Partial<PagoSeguro>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/registrar`, pago);
  }
}
