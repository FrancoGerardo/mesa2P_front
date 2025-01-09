// src/app/services/reserva.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/api/reservas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  getDetalleReserva(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  createReserva(reserva: Reserva): Observable<void> {
    return this.http.post<void>(this.apiUrl, reserva);
  }

  updateReserva(id: number, reserva: Reserva): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reserva);
  }

  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getReservasByMedicoId(): Observable<Reserva[]> {
    const medicoId = this.authService.getMedicoIdFromToken();
    if (medicoId !== null) {
      return this.http.get<Reserva[]>(`${this.apiUrl}/medico/${medicoId}`);
    } else {
      return new Observable<Reserva[]>((observer) => {
        observer.next([]); // Retorna un array vacío
        observer.complete();
      });
    }
  }
  
}
