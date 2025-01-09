// src/app/components/especialidades/especialidades.component.ts
import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../services/especialidad.service';
import { Especialidad } from '../models/especialidad.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-especialidades',
  standalone: true,
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EspecialidadesComponent implements OnInit {
  especialidades: Especialidad[] = [];
  selectedEspecialidad: Partial<Especialidad> = { nombre: '', descripcion: '' };
  editingEspecialidad: boolean = false;

  constructor(private especialidadService: EspecialidadService) {}

  ngOnInit(): void {
    this.fetchEspecialidades();
  }

  fetchEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe((data) => {
      this.especialidades = data;
    });
  }

  createEspecialidad() {
    if (this.selectedEspecialidad) {
      this.especialidadService.createEspecialidad(this.selectedEspecialidad as Especialidad).subscribe(() => {
        this.fetchEspecialidades();
        this.resetSelectedEspecialidad();
      });
    }
  }

  editEspecialidad(especialidad: Especialidad) {
    this.selectedEspecialidad = { ...especialidad };
    this.editingEspecialidad = true;
  }

  updateEspecialidad() {
    if (this.selectedEspecialidad && this.selectedEspecialidad.id) {
      this.especialidadService.updateEspecialidad(this.selectedEspecialidad.id, this.selectedEspecialidad as Especialidad).subscribe(() => {
        this.fetchEspecialidades();
        this.cancelEdit();
      });
    }
  }

  deleteEspecialidad(id: number) {
    this.especialidadService.deleteEspecialidad(id).subscribe(() => {
      this.fetchEspecialidades();
    });
  }

  cancelEdit() {
    this.resetSelectedEspecialidad();
    this.editingEspecialidad = false;
  }

  resetSelectedEspecialidad() {
    this.selectedEspecialidad = { nombre: '', descripcion: '' };
  }
}
