// src/app/components/horarios/horarios.component.ts
import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { DiaService } from '../services/dia.service';
import { JornadaService } from '../services/jornada.service';
import { Horario } from '../models/horario.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  horarios: Horario[] = [];
  dias: { id: number; diaSemana: string }[] = [];
  jornadas: { id: number; horaInicio: string; horaFinal: string }[] = [];
  newHorario: Partial<Horario> = { diaId: 0, jornadaId: 0 };
  editingHorario: Partial<Horario> | null = null;

  constructor(
    private horarioService: HorarioService,
    private diaService: DiaService,
    private jornadaService: JornadaService
  ) {}

  ngOnInit() {
    this.fetchHorarios();
    this.fetchDias();
    this.fetchJornadas();
  }

  fetchHorarios() {
    this.horarioService.getAllHorarios().subscribe((data) => {
      this.horarios = data;
    });
  }

  fetchDias() {
    this.diaService.getAllDias().subscribe((data) => {
      this.dias = data;
    });
  }

  fetchJornadas() {
    this.jornadaService.getAllJornadas().subscribe((data) => {
      this.jornadas = data;
    });
  }

  createHorario() {
    console.log(this.newHorario );
    if (this.newHorario.diaId && this.newHorario.jornadaId) {
      this.horarioService.createHorario(this.newHorario as Horario).subscribe(() => {
        this.fetchHorarios();
        this.newHorario = { diaId: 0, jornadaId: 0 };
      });
    }
  }

  editHorario(horario: Horario) {
    this.editingHorario = { ...horario };
  }

  updateHorario() {
    if (this.editingHorario && this.editingHorario.id) {
      this.horarioService.updateHorario(this.editingHorario.id, this.editingHorario as Horario).subscribe(() => {
        this.fetchHorarios();
        this.editingHorario = null;
      });
    }
  }

  cancelEdit() {
    this.editingHorario = null;
  }

  deleteHorario(id: number) {
    if (confirm('Are you sure you want to delete this schedule?')) {
      this.horarioService.deleteHorario(id).subscribe(() => {
        this.fetchHorarios();
      });
    }
  }
}
