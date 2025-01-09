import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../services/medico.service';
import { UserService } from '../services/user.service';
import { Medico } from '../models/medico.model';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicos',
  standalone: true,
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  usuariosConRolMedico: User[] = [];
  selectedMedico: Partial<Medico> = { usuarioId: null, genero: '', fechaNacimiento: '' };
  editingMedico: boolean = false;

  constructor(private medicoService: MedicoService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchMedicos();
    this.fetchUsuariosConRolMedico();
  }

  fetchMedicos() {
    this.medicoService.getMedicos().subscribe((data) => {
      this.medicos = data;
    });
  }

  fetchUsuariosConRolMedico() {
    this.userService.getUsuariosConRolMedico().subscribe((data) => {
      this.usuariosConRolMedico = data;
    });
  }

  createMedico() {
    if (this.selectedMedico.usuarioId && this.selectedMedico.genero && this.selectedMedico.fechaNacimiento) {
      this.medicoService.createMedico(this.selectedMedico as Medico).subscribe(() => {
        this.fetchMedicos();
        this.resetSelectedMedico();
      });
    }
  }

  editMedico(medico: Medico) {
    this.selectedMedico = { ...medico };
    this.editingMedico = true;
  }

  updateMedico() {
    if (this.selectedMedico.id) {
      this.medicoService.updateMedico(this.selectedMedico.id, this.selectedMedico as Medico).subscribe(() => {
        this.fetchMedicos();
        this.cancelEdit();
      });
    }
  }

  deleteMedico(medicoId: number) {
    this.medicoService.deleteMedico(medicoId).subscribe(() => {
      this.fetchMedicos();
    });
  }

  cancelEdit() {
    this.resetSelectedMedico();
    this.editingMedico = false;
  }

  resetSelectedMedico() {
    this.selectedMedico = { usuarioId: null, genero: '', fechaNacimiento: '' };
  }

  getUsuarioNombre(usuarioId: number | null): string {
    const usuario = this.usuariosConRolMedico.find((u) => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'N/A';
  }
}
