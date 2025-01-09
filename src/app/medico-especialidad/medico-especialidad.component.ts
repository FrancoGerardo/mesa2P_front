// src/app/medico-especialidad/medico-especialidad.component.ts
import { Component, OnInit } from '@angular/core';
import { MedicoEspecialidadService } from '../services/medico-especialidad.service';
import { EspecialidadService } from '../services/especialidad.service';
import { MedicoService } from '../services/medico.service';
import { UserService } from '../services/user.service';
import { Especialidad } from '../models/especialidad.model';
import { MedicoEspecialidad } from '../models/medico-especialidad.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medico-especialidad',
  templateUrl: './medico-especialidad.component.html',
  styleUrls: ['./medico-especialidad.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MedicoEspecialidadComponent implements OnInit {
  medicos: { medicoId: number; nombre: string; apellido: string }[] = [];
  especialidades: Especialidad[] = [];
  especialidadesDelMedico: MedicoEspecialidad[] = [];
  selectedMedicoId: number | null = null;
  selectedEspecialidadId: number | null = null;
  showModal: boolean = false;

  constructor(
    private medicoService: MedicoService,
    private userService: UserService,
    private especialidadService: EspecialidadService,
    private medicoEspecialidadService: MedicoEspecialidadService
  ) {}

  ngOnInit(): void {
    this.fetchMedicos();
    this.fetchEspecialidades();
  }

  fetchMedicos() {
    this.medicoService.getMedicos().subscribe((medicos) => {
      this.userService.getUsuariosConRolMedico().subscribe((usuarios) => {
        this.medicos = medicos.map((medico) => {
          const usuario = usuarios.find((user) => user.id === medico.usuarioId);
          return {
            medicoId: medico.id,
            nombre: usuario ? usuario.nombre : '',
            apellido: usuario ? usuario.apellido : ''
          };
        });
      });
    });
  }

  fetchEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe((data) => {
      console.log(this.especialidades = data);
      this.especialidades = data
    });
  }

  addEspecialidadToMedico() {
    if (this.selectedMedicoId && this.selectedEspecialidadId) {
      this.medicoEspecialidadService.addEspecialidadToMedico(this.selectedMedicoId, this.selectedEspecialidadId)
        .subscribe(() => {
          this.viewEspecialidades(this.selectedMedicoId);
          this.selectedEspecialidadId = null;
        });
    }
  }

  viewEspecialidades(medicoId: number) {
    this.selectedMedicoId = medicoId;
    this.medicoEspecialidadService.getEspecialidadesByMedico(medicoId).subscribe((data) => {
      this.especialidadesDelMedico = data;
      console.log(this.especialidadesDelMedico = data);

      this.showModal = true;
    });
  }

  removeEspecialidad(especialidadId: number) {
    if (this.selectedMedicoId) {
      this.medicoEspecialidadService.removeEspecialidadFromMedico(this.selectedMedicoId, especialidadId)
        .subscribe(() => {
          this.especialidadesDelMedico = this.especialidadesDelMedico.filter(
            esp => esp.especialidadId !== especialidadId
          );
        });
    }
  }

  closeModal() {
    this.showModal = false;
    this.especialidadesDelMedico = [];
  }
}
