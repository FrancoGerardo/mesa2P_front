// src/app/horario-medico-especialidad/horario-medico-especialidad.component.ts
import { Component, OnInit } from '@angular/core';
import { HorarioMedicoEspecialidadService } from '../services/horario-medico-especialidad.service';
import { HorarioService } from '../services/horario.service';
import { Horario } from '../models/horario.model';
import { MedicoEspecialidadService } from '../services/medico-especialidad.service';
import { HorarioMedicoEspecialidad } from '../models/horario-medico-especialidad.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-medico-especialidad',
  standalone: true,
  templateUrl: './horario-medico-especialidad.component.html',
  styleUrls: ['./horario-medico-especialidad.component.css'],
  imports: [CommonModule, FormsModule]
})
export class HorarioMedicoEspecialidadComponent implements OnInit {
  medicosEspecialidades: { id: string; medicoId: number; especialidadId: number; medicoNombre: string; medicoApellido: string; especialidadNombre: string }[] = [];
  horarios: Horario[] = [];
  assignedHorarios: HorarioMedicoEspecialidad[] = [];

  newHorarioMedicoEspecialidad: HorarioMedicoEspecialidad = {
    medicoId: 0,
    especialidadId: 0,
    horarioId: 0,
  };

  constructor(
    private horarioService: HorarioService,
    private horarioMedicoEspecialidadService: HorarioMedicoEspecialidadService,
    private medicoEspecialidadService: MedicoEspecialidadService
  ) {}

  ngOnInit(): void {
    this.fetchMedicosEspecialidades();
    this.fetchHorarios();
    this.loadAssignedHorarios();
  }

  fetchMedicosEspecialidades() {
    this.medicoEspecialidadService.getAllWithDetails().subscribe((data) => {
      this.medicosEspecialidades = data.map(me => ({
        id: `${me.medicoId}-${me.especialidadId}`,
        medicoId: me.medicoId,
        especialidadId: me.especialidadId,
        medicoNombre: me.medicoNombre,
        medicoApellido: me.medicoApellido,
        especialidadNombre: me.especialidadNombre
      }));
    });
  }

  fetchHorarios() {
    this.horarioService.getAllHorarios().subscribe((data) => {
      this.horarios = data;
    });
  }

  createHorarioMedicoEspecialidad() {
    const [medicoId, especialidadId] = this.newHorarioMedicoEspecialidad.medicoId.toString().split('-').map(Number);
    this.newHorarioMedicoEspecialidad.medicoId = medicoId;
    this.newHorarioMedicoEspecialidad.especialidadId = especialidadId;

    if (medicoId && especialidadId && this.newHorarioMedicoEspecialidad.horarioId ) {
      this.horarioMedicoEspecialidadService.create(this.newHorarioMedicoEspecialidad).subscribe(() => {
        this.loadAssignedHorarios();
        this.newHorarioMedicoEspecialidad = { medicoId: 0, especialidadId: 0, horarioId: 0};
      });
    }
  }

  loadAssignedHorarios() {
    this.horarioMedicoEspecialidadService.getAll().subscribe((data) => {
      this.assignedHorarios = data;
    });
  }

  removeAssignedHorario(id: number) {
    console.log("Eliminando horario con ID: ", id);  // Agregar log para verificar ID
    this.horarioMedicoEspecialidadService.delete(id).subscribe(() => {
      this.loadAssignedHorarios();  // Refresca la lista después de eliminar
    });
  }
  
}
