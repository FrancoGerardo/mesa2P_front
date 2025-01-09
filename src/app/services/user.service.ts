import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private apiUrl = 'https://mesa2p2-production.up.railway.app/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/change-password`, { currentPassword, newPassword });
  }
    // Obtener usuarios con el rol de paciente
    getUsuariosConRolPaciente(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/pacientes`);
    }
    getUsuariosConRolMedico(): Observable<User[]> {
      return this.http.get<User[]>(`${this.apiUrl}/medicos`);
    }
    
}
