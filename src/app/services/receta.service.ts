// src/app/services/receta.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

@Injectable({
    providedIn: 'root'
})
export class RecetaService {
    private apiUrl = 'http://mesa2p2-production.up.railway.app/api/recetas'; // URL del backend

    constructor(private http: HttpClient) {}

    // Obtener todas las recetas
    getAllRecetas(): Observable<Receta[]> {
        return this.http.get<Receta[]>(this.apiUrl);
    }

    // Obtener una receta por ID
    getRecetaById(id: number): Observable<Receta> {
        return this.http.get<Receta>(`${this.apiUrl}/${id}`);
    }

    // Obtener detalles completos de una receta por consulta ID
    getRecetaDetallesByConsultaId(consultaId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/detalles/${consultaId}`);
    }

    // Crear una nueva receta
    createReceta(receta: Receta): Observable<Receta> {
        return this.http.post<Receta>(this.apiUrl, receta);
    }

    // Actualizar una receta existente
    updateReceta(id: number, receta: Receta): Observable<Receta> {
        return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta);
    }

    // Eliminar una receta
    deleteReceta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
