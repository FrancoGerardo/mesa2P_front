import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jornada } from '../models/jornada.model';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/jornadas';

  constructor(private http: HttpClient) {}

  getAllJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.apiUrl);
  }
}
