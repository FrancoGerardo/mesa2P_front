import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoDePago } from '../models/metodo-de-pago.model';

@Injectable({
  providedIn: 'root',
})
export class MetodoDePagoService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/metodos-de-pago';

  constructor(private http: HttpClient) {}

  // Obtener todos los métodos de pago
  getMetodosDePago(): Observable<MetodoDePago[]> {
    return this.http.get<MetodoDePago[]>(`${this.apiUrl}`);
  }

  // Obtener un método de pago por ID
  getMetodoDePagoById(metodoId: number): Observable<MetodoDePago> {
    return this.http.get<MetodoDePago>(`${this.apiUrl}/${metodoId}`);
  }

  // Crear un nuevo método de pago
  createMetodoDePago(metodo: Partial<MetodoDePago>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, metodo);
  }

  // Actualizar un método de pago existente
  updateMetodoDePago(metodoId: number, metodo: Partial<MetodoDePago>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${metodoId}`, metodo);
  }

  // Eliminar un método de pago
  deleteMetodoDePago(metodoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${metodoId}`);
  }
}
