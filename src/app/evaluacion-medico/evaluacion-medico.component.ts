import { Component, OnInit } from '@angular/core';
import { Evaluacion } from '../models/evaluacion.model';
import { EvaluacionService } from '../services/evaluacion.service';
import { EspecialidadService } from '../services/especialidad.service';
import { ConsultaMedicaService } from '../services/consulta-medica.service';
import { Especialidad } from '../models/especialidad.model';
import { ConsultaMedica } from '../models/consulta-medica.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-medico',
  templateUrl: './evaluacion-medico.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./evaluacion-medico.component.css'],
})
export class EvaluacionMedicoComponent implements OnInit {
  consultas: ConsultaMedica[] = [];
  especialidades: Especialidad[] = [];
  nuevaEvaluacion: Partial<Evaluacion> = {
    puntuacion: 0,
    comentario: '',
  };
  isLoading = false;
  evaluaciones: Evaluacion[] = [];

  constructor(
    private evaluacionService: EvaluacionService,
    private consultaMedicaService: ConsultaMedicaService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.cargarConsultas();
    this.cargarEspecialidades();
    this.cargarEvaluaciones();

  }
  cargarEvaluaciones(): void {
    this.isLoading = true;
    this.evaluacionService.getAllEvaluaciones().subscribe({
      next: (data) => {
        this.evaluaciones = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Error al cargar las evaluaciones');
        this.isLoading = false;
      }
    });
  }
  cargarConsultas() {
    this.consultaMedicaService.getAllConsultas().subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: () => console.error('Error al cargar consultas')
    });
  }

  cargarEspecialidades() {
    this.especialidadService.getEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: () => console.error('Error al cargar especialidades')
    });
  }

  onConsultaSeleccionada(event: Event) {
    const consultaId = (event.target as HTMLSelectElement).value;
    const consultaSeleccionada = this.consultas.find(c => c.consultaId === +consultaId);

    if (consultaSeleccionada) {
      this.nuevaEvaluacion.consultaId = consultaSeleccionada.consultaId;
      this.nuevaEvaluacion.pacienteId = consultaSeleccionada.pacienteId;
      this.nuevaEvaluacion.medicoId = consultaSeleccionada.medicoId;
      this.nuevaEvaluacion.especialidadId = consultaSeleccionada.especialidadId;
    }
  }

  guardarEvaluacion() {
    if (
      this.nuevaEvaluacion.consultaId &&
      this.nuevaEvaluacion.puntuacion &&
      this.nuevaEvaluacion.comentario
    ) {
      this.evaluacionService.saveEvaluacion(this.nuevaEvaluacion as Evaluacion).subscribe({
        next: () => {
          alert('Evaluación guardada exitosamente');
          this.nuevaEvaluacion = {};
        },
        error: () => alert('Error al guardar la evaluación')
      });
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
}
