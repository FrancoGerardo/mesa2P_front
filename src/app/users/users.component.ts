import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  roles: Role[] = [];
  selectedUser: Partial<User> = { nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '', rolId: null };
  editingUser: boolean = false;
  passwordChanged: boolean = false;

  constructor(private userService: UserService, private roleService: RoleService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));  // Sorting by `id`
    });
  }

  fetchRoles() {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  createUser() {
    if (this.selectedUser) {
      this.userService.createUser(this.selectedUser as User).subscribe(() => {
        this.fetchUsers();
        this.resetSelectedUser();
      });
    }
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.selectedUser.password = '';  // Clear password for security
    this.passwordChanged = false;
    this.editingUser = true;
  }

  updateUser() {
    if (this.selectedUser && this.selectedUser.id) {
      if (!this.passwordChanged) delete this.selectedUser.password;  // Don't update password if unchanged
      this.userService.updateUser(this.selectedUser.id, this.selectedUser as User).subscribe(() => {
        this.fetchUsers();
        this.cancelEdit();
      });
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.fetchUsers();
    });
  }

  cancelEdit() {
    this.resetSelectedUser();
    this.editingUser = false;
  }

  resetSelectedUser() {
    this.selectedUser = { nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '', rolId: null };
    this.passwordChanged = false;
  }

  getRoleName(rolId: number | null): string {
    const role = this.roles.find((role) => role.id === rolId);
    return role ? role.nombre : 'N/A';
  }
}
