import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../models/medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private baseUrl = 'https://mesa2p2-production.up.railway.app/api/medicamentos';

  constructor(private http: HttpClient) {}

  // Obtener todos los medicamentos
  getAllMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(this.baseUrl);
  }

  // Obtener un medicamento por ID
  getMedicamentoById(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo medicamento
  createMedicamento(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>(this.baseUrl, medicamento);
  }

  // Actualizar un medicamento existente
  updateMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.baseUrl}/${id}`, medicamento);
  }

  // Eliminar un medicamento por ID
  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
