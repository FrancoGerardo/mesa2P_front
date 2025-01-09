import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService) {}

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'The new passwords do not match.';
      return;
    }

    this.userService.changePassword(this.currentPassword, this.newPassword).subscribe(
      () => {
        this.successMessage = 'Password changed successfully.';
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Failed to change password. ' + error.message;
        this.successMessage = '';
      }
    );
  }
}
