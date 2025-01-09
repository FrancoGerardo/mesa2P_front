import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  isCollapsed = true; // Sidebar oculta por defecto en pantallas pequeñas
  isDesktop = false; // Detecta si la vista es de escritorio
  sections = [
    {
      name: 'adminOpen',
      label: 'Administración',
      icon: 'fas fa-user-cog',
      isOpen: true,
      links: [
        { route: '/admin/roles', label: 'Roles', icon: 'fas fa-user-shield' },
        { route: '/admin/users', label: 'Usuarios', icon: 'fas fa-users' },
        { route: '/admin/permisos', label: 'Permisos', icon: 'fas fa-unlock-alt' },
      ],
    },
    {
      name: 'pacientesOpen',
      label: 'Pacientes y Médicos',
      icon: 'fas fa-user-injured',
      isOpen: false,
      links: [
        { route: '/admin/pacientes', label: 'Pacientes', icon: 'fas fa-user-injured' },
        { route: '/admin/medicos', label: 'Médicos', icon: 'fas fa-user-md' },
        { route: '/admin/especialidades', label: 'Especialidades', icon: 'fas fa-stethoscope' },
        { route: '/admin/asociar-especialidad-medico', label: 'Asociar Especialidad', icon: 'fas fa-user-tag' },
      ],
    },
    {
      name: 'horariosOpen',
      label: 'Horarios y Cupos',
      icon: 'fas fa-clock',
      isOpen: false,
      links: [
        { route: '/admin/horario', label: 'Horarios', icon: 'fas fa-calendar-alt' },
        { route: '/admin/asignar', label: 'Asignar Horarios', icon: 'fas fa-calendar-check' },
      ],
    },
    {
      name: 'reservasOpen',
      label: 'Reservas y Permisos',
      icon: 'fas fa-calendar',
      isOpen: false,
      links: [
        { route: '/admin/reserva', label: 'Reservas', icon: 'fas fa-calendar-plus' },
        { route: '/admin/postergacion', label: 'Permisos de Postergación', icon: 'fas fa-calendar-times' },
        { route: '/admin/bitacora', label: 'Bitácora', icon: 'fas fa-book' },
        { route: '/admin/reporte', label: 'Reportes', icon: 'fas fa-file-alt' },
        { route: '/admin/seguro', label: 'Seguros', icon: 'fas fa-briefcase-medical' },
        { route: '/admin/metodopago', label: 'Metodos de Pago', icon: 'fas fa-briefcase-medical' },

      ],
    },
    {
      name: 'medicamentosOpen',
      label: 'Medicamentos y Recetas',
      icon: 'fas fa-prescription-bottle',
      isOpen: false,
      links: [
        { route: '/admin/medicamento', label: 'Medicamentos', icon: 'fas fa-pills' },
      ],
    },
    {
      name: 'laboratorioOpen',
      label: 'Historias Clínicas',
      icon: 'fas fa-flask',
      isOpen: false,
      links: [
        { route: '/admin/historial', label: 'Historias Clínicas', icon: 'fas fa-book-medical' },
      ],
    },
  ];
  

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSection(sectionName: string) {
    const section = this.sections.find((s) => s.name === sectionName);
    if (section) section.isOpen = !section.isOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  private checkScreenSize() {
    this.isDesktop = window.innerWidth >= 1024;
    if (this.isDesktop) {
      this.isCollapsed = false; // Siempre visible en escritorio
    }
  }
}
