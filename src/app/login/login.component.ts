import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Guarda el token en el almacenamiento local
        this.authService.setToken(response.token);
        
        // Decodifica el token para obtener toda la información
        const userInfo = this.authService.getUserFromToken();
        console.log('Información del usuario desde el token:', userInfo);

        // Redirige según el rol del usuario
        if (userInfo.rolId === 1) {
          this.router.navigate(['/admin/roles']);
        } else if (userInfo.rolId === 3) {
          this.router.navigate(['/consulta']);
        } else {
          alert("Rol no autorizado.");
        }
      },
      (error) => {
        alert("Credenciales inválidas. Inténtalo de nuevo.");
      }
    );
  }
}
