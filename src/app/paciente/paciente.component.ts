import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../services/paciente.service';
import { UserService } from '../services/user.service';
import { Paciente } from '../models/paciente.model';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  usuariosConRolPaciente: User[] = [];
  selectedPaciente: Partial<Paciente> = { usuarioId: null, fechaNacimiento: '', genero: '', tipoSangre: '' };
  editingPaciente: boolean = false;

  constructor(private pacienteService: PacienteService, private usuarioService: UserService) {}

  ngOnInit(): void {
    this.fetchPacientes();
    this.fetchUsuariosConRolPaciente();
  }

  fetchPacientes() {
    this.pacienteService.getPacientes().subscribe((data) => {
      this.pacientes = data;
    });
  }

  fetchUsuariosConRolPaciente() {
    this.usuarioService.getUsuariosConRolPaciente().subscribe((data) => {
      this.usuariosConRolPaciente = data;
    });
  }

  createPaciente() {
    if (this.selectedPaciente) {
      this.pacienteService.createPaciente(this.selectedPaciente as Paciente).subscribe(() => {
        this.fetchPacientes();
        this.resetSelectedPaciente();
      });
    }
  }

  editPaciente(paciente: Paciente) {
    this.selectedPaciente = { ...paciente };
    this.editingPaciente = true;
  }

  updatePaciente() {
    if (this.selectedPaciente && this.selectedPaciente.id) {
      this.pacienteService.updatePaciente(this.selectedPaciente.id, this.selectedPaciente as Paciente).subscribe(() => {
        this.fetchPacientes();
        this.cancelEdit();
      });
    }
  }

  deletePaciente(id: number) {
    this.pacienteService.deletePaciente(id).subscribe(() => {
      this.fetchPacientes();
    });
  }

  cancelEdit() {
    this.resetSelectedPaciente();
    this.editingPaciente = false;
  }

  resetSelectedPaciente() {
    this.selectedPaciente = { usuarioId: null, fechaNacimiento: '', genero: '', tipoSangre: '' };
  }

  // Obtener nombre del usuario
  getUsuarioNombre(usuarioId: number): string {
    const usuario = this.usuariosConRolPaciente.find((u) => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'N/A';
  }
}
