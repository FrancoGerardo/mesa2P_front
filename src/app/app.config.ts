import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000, // Duración del toast
        positionClass: 'toast-top-right', // Esquina superior derecha
        preventDuplicates: true, // Evita duplicados
        progressBar: true, // Muestra barra de progreso
        progressAnimation: 'increasing', // Animación de la barra
        closeButton: true, // Botón para cerrar el toast
        newestOnTop: true, // Los más recientes se muestran arriba
        easeTime: 300, // Tiempo de animación
      })
    ),
  ],
};
