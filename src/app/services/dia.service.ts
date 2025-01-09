import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dia } from '../models/dia.model';

@Injectable({
  providedIn: 'root'
})
export class DiaService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/api/dias';

  constructor(private http: HttpClient) {}

  getAllDias(): Observable<Dia[]> {
    return this.http.get<Dia[]>(this.apiUrl);
  }
}
