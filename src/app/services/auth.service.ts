import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://mesa2p2-production.up.railway.app/auth'; 
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión y recibir el token
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Método para guardar el token
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Método para obtener el token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Método para extraer la información del token
  getUserFromToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token); // Utiliza `jwt_decode`
    }
    return null;
  }
  getMedicoIdFromToken(): number | null {
    const user = this.getUserFromToken();
    return user ? user.medicoId : null; // Asegúrate de que el campo coincide con el nombre en el token
  }
  // Método para cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }
}