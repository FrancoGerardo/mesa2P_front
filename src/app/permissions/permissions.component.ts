import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { Permission } from '../models/permission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-permissions',
  standalone: true,
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[] = [];
  newPermission: Partial<Permission> = { nombre: '' };
  editingPermission: Partial<Permission> | null = null;

  constructor(private permissionService: PermissionService) {}

  ngOnInit() {
    this.fetchPermissions();
  }

  fetchPermissions() {
    this.permissionService.getPermissions().subscribe((data) => {
      this.permissions = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    });
  }

  createPermission() {
    if (this.newPermission.nombre) {
      this.permissionService.createPermission(this.newPermission as Permission).subscribe(() => {
        this.fetchPermissions();
        this.newPermission = { nombre: '' };
      });
    }
  }

  editPermission(permission: Permission) {
    this.editingPermission = { ...permission };
  }

  updatePermission() {
    if (this.editingPermission && this.editingPermission.id) {
      this.permissionService.updatePermission(this.editingPermission.id, this.editingPermission as Permission).subscribe(() => {
        this.fetchPermissions();
        this.editingPermission = null;
      });
    }
  }

  cancelEdit() {
    this.editingPermission = null;
  }

  deletePermission(permissionId: number) {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.permissionService.deletePermission(permissionId).subscribe(() => {
        this.fetchPermissions();
      });
    }
  }
}
