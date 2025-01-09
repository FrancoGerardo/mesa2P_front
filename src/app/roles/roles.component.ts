import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  newRole: Partial<Role> = { nombre: '' };
  editingRole: Partial<Role> | null = null;
  isLoading = false;

  constructor(private roleService: RoleService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchRoles();
  }

  // Obtener todos los roles y ordenarlos por ID
  fetchRoles() {
    this.isLoading = true;
    this.roleService.getRoles().subscribe(
      (data) => {
        this.roles = data.sort((a, b) => a.id - b.id);
        this.toastr.success('Roles loaded successfully!', 'Success');
        this.isLoading = false;
      },
      () => {
        this.toastr.error('Error fetching roles. Please try again later.', 'Error');
        this.isLoading = false;
      }
    );
  }

  // Crear un nuevo rol
  createRole() {
    if (this.newRole.nombre && this.newRole.nombre.trim()) {
      this.isLoading = true;
      this.roleService.createRole(this.newRole as Role).subscribe(
        () => {
          this.fetchRoles();
          this.newRole = { nombre: '' };
          this.toastr.success('Role created successfully!', 'Success');
          this.isLoading = false;
        },
        () => {
          this.toastr.error('Error creating role. Please try again later.', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.warning('Role name cannot be empty.', 'Warning');
    }
  }

  // Iniciar edición de un rol
  editRole(role: Role) {
    this.editingRole = { ...role };
    this.toastr.info('You are editing this role.', 'Info');
  }

  // Actualizar el rol en edición
  updateRole() {
    if (this.editingRole && this.editingRole.id && this.editingRole.nombre.trim()) {
      this.isLoading = true;
      this.roleService.updateRole(this.editingRole.id, this.editingRole as Role).subscribe(
        () => {
          this.fetchRoles();
          this.editingRole = null;
          this.toastr.success('Role updated successfully!', 'Success');
          this.isLoading = false;
        },
        () => {
          this.toastr.error('Error updating role. Please try again later.', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.warning('Role name cannot be empty.', 'Warning');
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.editingRole = null;
    this.toastr.info('Edit cancelled.', 'Info');
  }

  // Eliminar un rol
  deleteRole(roleId: number) {
    const confirmed = confirm('Are you sure you want to delete this role?');
    if (confirmed) {
      this.isLoading = true;
      this.roleService.deleteRole(roleId).subscribe(
        () => {
          this.fetchRoles();
          this.toastr.success('Role deleted successfully!', 'Success');
          this.isLoading = false;
        },
        () => {
          this.toastr.error('Error deleting role. Please try again later.', 'Error');
          this.isLoading = false;
        }
      );
    }
  }
}
