import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoPostergacion } from '../models/permiso-postergacion.model';

@Injectable({
    providedIn: 'root'
})
export class PermisoPostergacionService {
    private apiUrl = 'http://mesa2p2-production.up.railway.app/api/permisos-postergacion';

    constructor(private http: HttpClient) {}

    getAllPermisos(): Observable<PermisoPostergacion[]> {
        return this.http.get<PermisoPostergacion[]>(this.apiUrl);
    }

    getPermisoById(id: number): Observable<PermisoPostergacion> {
        return this.http.get<PermisoPostergacion>(`${this.apiUrl}/${id}`);
    }

    createPermiso(permiso: PermisoPostergacion): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(this.apiUrl, permiso);
    }

    updatePermiso(id: number, permiso: PermisoPostergacion): Observable<{ message: string }> {
        return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, permiso);
    }

    deletePermiso(id: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
    }
}
