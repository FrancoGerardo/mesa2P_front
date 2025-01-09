// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './paciente/paciente.component';
import { MedicosComponent } from './medicos/medicos.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { MedicoEspecialidadComponent } from './medico-especialidad/medico-especialidad.component';
import { HorariosComponent } from './horarios/horarios.component';
import { DocumentosLaboratorioComponent } from './documentos-laboratorio/documentos-laboratorio.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { HorarioMedicoEspecialidadComponent } from './horario-medico-especialidad/horario-medico-especialidad.component';
import { ReservasComponent } from './reserva/reserva.component';
import { ConsultaMedicaComponent } from './consulta-medica/consulta-medica.component';
import { PermisoPostergacionComponent } from './permiso-postergacion/permiso-postergacion.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { AuthGuard } from './guards/auth.guard';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { ReporteComponent } from './reporte/reporte.component';
import { EvaluacionMedicoComponent } from './evaluacion-medico/evaluacion-medico.component';
import { SegurosComponent } from './seguros/seguros.component';
import { MetodosDePagoComponent } from './metodos-de-pago/metodos-de-pago.component';
// Definición de Rutas
export const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] }, // Solo rolId 1 tiene acceso a todas las rutas de admin
    children: [
      // Administración de Roles y Usuarios
      { path: 'roles', component: RolesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'permisos', component: PermissionsComponent },

      // Pacientes y Médicos
      { path: 'pacientes', component: PacientesComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'especialidades', component: EspecialidadesComponent },
      { path: 'asociar-especialidad-medico', component: MedicoEspecialidadComponent },

      // Horarios y Cupos
      { path: 'horario', component: HorariosComponent },
      { path: 'asignar', component: HorarioMedicoEspecialidadComponent },

      // Reservas y Permiso de Postergación
      { path: 'reserva', component: ReservasComponent },
      { path: 'postergacion', component: PermisoPostergacionComponent },
      { path: 'bitacora', component: BitacoraComponent },
      { path: 'reporte', component: ReporteComponent },
      { path: 'seguro', component: SegurosComponent },


      // Medicamentos y Recetas
      { path: 'medicamento', component: MedicamentoComponent },
      
      { path: 'evaluacion', component: EvaluacionMedicoComponent },

      // Laboratorio e Historias Clínicas
      { path: 'docu-laboratorio', component: DocumentosLaboratorioComponent },
      { path: 'historial', component: HistoriaClinicaComponent },
      { path: 'metodopago', component: MetodosDePagoComponent },

    ]
  },
  
  // Ruta específica para "Consulta" accesible solo para rolId 3 (Médico)
  { 
    path: 'consulta', 
    component: ConsultaMedicaComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [3] } 
  },
  { 
    path: 'postergar', 
    component: PermisoPostergacionComponent, 
    canActivate: [AuthGuard], 
    data: { roles: [3] } 
  },
  // Rutas generales
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
