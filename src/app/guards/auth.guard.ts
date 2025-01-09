// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const allowedRoles = [1, 3]; // Solo permitir acceso a roles 1 y 3
    const user = this.authService.getUserFromToken();

    if (user) {
      if (allowedRoles.includes(user.rolId)) {
        // Usuario autenticado y tiene uno de los roles permitidos (1 o 3)
        const requiredRoles = route.data['roles'] as Array<number>;

        // Verifica si el rol del usuario coincide con el rol requerido para la ruta actual
        if (requiredRoles && requiredRoles.includes(user.rolId)) {
          return true;
        } else {
          // Si no coincide con el rol requerido, redirige a una página de acceso denegado o login
          return this.router.createUrlTree(['/login']);
        }
      } else {
        // Usuario autenticado, pero sin uno de los roles permitidos (1 o 3)
        return this.router.createUrlTree(['/login']);
      }
    }

    // Usuario no autenticado
    return this.router.createUrlTree(['/login']);
  }
}
