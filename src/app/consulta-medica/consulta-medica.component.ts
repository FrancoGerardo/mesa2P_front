import { Component, OnInit, Input } from '@angular/core';
import { ConsultaMedicaService } from '../services/consulta-medica.service';
import { ConsultaMedica } from '../models/consulta-medica.model';
import { Reserva } from '../models/reserva.model';
import { ReservaService } from '../services/reserva.service';
import { RecetaService } from '../services/receta.service';
import { RecetaMedicamentoService } from '../services/receta-medicamento.service';
import { MedicamentoService } from '../services/medicamento.service';
import { Medicamento } from '../models/medicamento.model';
import { RecetaMedicamento } from '../models/receta-medicamento.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecetaDetallesDTO } from '../models/receta-detalles-dto.model';
import { Laboratorio } from '../models/laboratorio.model';
import { LaboratorioService } from '../services/laboratorio.service';

@Component({
  selector: 'app-consulta-medica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-medica.component.html'
})
export class ConsultaMedicaComponent implements OnInit {
  reservas: Reserva[] = [];
  consultas: ConsultaMedica[] = [];
  consulta: ConsultaMedica = {
    reservaId: null,
    historiaId: null,
    fechaConsulta: new Date(),
    diagnostico: '',
    tratamiento: '',
    notas: ''
  };
  consultaSeleccionada: ConsultaMedica | null = null;
  recetaInstrucciones = '';
  medicamentos: Medicamento[] = [];
  recetaMedicamentos: RecetaMedicamento[] = [];
  showRecetaModal = false;
  showRecetaMedicamentosModal = false;
  reservaSeleccionada: Reserva | null = null;
  consultaParaReceta: ConsultaMedica | null = null;
  @Input() medicoId: number;  // Se puede recibir como parámetro
  consultaGuardada = false; // Nueva bandera para controlar el estado de la consulta

  nuevoMedicamento: RecetaMedicamento = {
    recetaId: null,
    medicamentoId: 0,
    dosis: '',
    frecuencia: '',
    duracion: 0
  };
  recetaDetalles: RecetaDetallesDTO[] ;
  showRecetaDetallesModal = false;
  laboratorio: Laboratorio = {
    consultaId: 0,
    tipoAnalisis: '',
    descripcion: '',
    fechaProgramacion: new Date().toISOString().slice(0, 16) // Formato para el campo de fecha y hora
  };
  laboratorioSeleccionado: Laboratorio | null = null;
  showLaboratorioModal = false;
  showVerLaboratorioModal = false;
  constructor(
    private consultaService: ConsultaMedicaService,
    private reservaService: ReservaService,
    private recetaService: RecetaService,
    private recetaMedicamentoService: RecetaMedicamentoService,
    private medicamentoService: MedicamentoService,
    private laboratorioService: LaboratorioService

  ) {}

  ngOnInit(): void {
    this.loadConsultas();
    this.loadReservas();
    this.loadMedicamentos();
  }
  openLaboratorioModal(consultaId: number) {
    this.laboratorioSeleccionado = { consultaId, tipoAnalisis: '', descripcion: '', fechaProgramacion: new Date().toISOString().slice(0, 16) };
    this.showLaboratorioModal = true;
  }

  // Método para cerrar el modal de programación de laboratorio
  closeLaboratorioModal() {
    this.showLaboratorioModal = false;
  }

  // Método para cerrar el modal de visualización de laboratorio
  closeVerLaboratorioModal() {
    this.showVerLaboratorioModal = false;
    this.laboratorioSeleccionado = null;
  }
  // Método para programar un laboratorio
  programarLaboratorio() {
    if (this.laboratorioSeleccionado) {
      this.laboratorioService.createLaboratorio(this.laboratorioSeleccionado).subscribe(
        (response) => {
          alert('Laboratorio programado exitosamente.');
          this.closeLaboratorioModal();
        },
        (error) => {
          console.error('Error al programar laboratorio:', error);
        }
      );
    }
  }

  // Método para abrir el modal de visualización de laboratorio
  openVerLaboratorioModal(consultaId: number) {
    this.laboratorioService.getLaboratorioByConsultaId(consultaId).subscribe(
      (laboratorio) => {
        this.laboratorioSeleccionado = laboratorio;
        this.showVerLaboratorioModal = true;
      },
      (error) => {
        alert('No se encontró laboratorio para esta consulta.');
        console.error('Error al cargar laboratorio:', error);
      }
    );
  }

  loadRecetaDetalles(consultaId: number) {
    this.recetaService.getRecetaDetallesByConsultaId(consultaId).subscribe((data: RecetaDetallesDTO[]) => {
      this.recetaDetalles = data; // Almacena todas las recetas para la consulta
      this.showRecetaDetallesModal = true;
      console.log('Detalles de las recetas cargadas:', this.recetaDetalles);
    });
  }
  
  closeRecetaDetallesModal() {
    this.showRecetaDetallesModal = false;
    this.recetaDetalles = [];
  }
  
  loadConsultas() {
    this.consultaService.getAllConsultas().subscribe((data) => {
      this.consultas = data;
      console.log('Consultas cargadas:', this.consultas);
      this.filterReservas(); // Aplicar filtro después de cargar las consultas
    });
  }
  
  loadReservas(): void {
    this.reservaService.getReservasByMedicoId().subscribe(
      (data) => {
        this.reservas = data;
        console.log('Reservas cargadas:', this.reservas);
        this.filterReservas(); // Aplicar filtro después de cargar las reservas
      },
      (error) => {
        console.log('Error al cargar reservas:', error);
      }
    );
  }

  filterReservas() {
    // Verifica que `this.consultas` y `this.reservas` contengan datos antes de filtrar
    if (this.consultas && this.reservas) {
      // Crear un conjunto con los IDs de reservas que ya tienen consultas asociadas
      const reservasConConsulta = new Set(this.consultas.map(c => c.reservaId));
  
      // Filtrar las reservas solo si no están en el conjunto de reservas con consulta
      this.reservas = this.reservas.filter(reserva => !reservasConConsulta.has(reserva.reservaId));
      
      console.log('Reservas filtradas (sin consultas asociadas):', this.reservas);
    } else {
      console.warn('No se pudo filtrar reservas porque no hay datos disponibles en consultas o reservas.');
    }
  }
  

  loadMedicamentos() {
    this.medicamentoService.getAllMedicamentos().subscribe((data) => {
      this.medicamentos = data;
      console.log('Medicamentos cargados:', this.medicamentos);
    });
  }

  onReservaChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const reservaId = Number(selectElement.value);
    this.reservaService.getDetalleReserva(reservaId).subscribe((reserva) => {
      this.reservaSeleccionada = reserva;
      this.consulta.reservaId = reservaId;
      this.consulta.historiaId = reserva.historiaId;
      console.log('Reserva seleccionada:', this.reservaSeleccionada);
      console.log('Consulta actualizada con reserva seleccionada:', this.consulta);
    });
  }

  saveConsulta() {
    console.log('Guardando consulta:', this.consulta);
    this.consultaService.createConsulta(this.consulta).subscribe(() => {
      alert('Consulta creada exitosamente');
      this.loadConsultas();
      this.consultaGuardada = true; // Cambia el estado a verdadero para ocultar el selector de reservas
    });
  }

  openCrearRecetaModal(consulta: ConsultaMedica) {
    this.consultaParaReceta = consulta;
    this.showRecetaModal = true;
    console.log('Abrir modal de receta para la consulta:', this.consultaParaReceta);
  }

  closeRecetaModal() {
    this.showRecetaModal = false;
    this.recetaInstrucciones = '';
    this.recetaMedicamentos = [];
    this.nuevoMedicamento = { recetaId: 0, medicamentoId: 0, dosis: '', frecuencia: '', duracion: 0 };
    console.log('Modal de receta cerrado');
  }

  saveReceta() {
    if (this.consultaParaReceta && this.consultaParaReceta.consultaId) {
      const receta = {
        consultaId: this.consultaParaReceta.consultaId,
        fechaEmision: new Date().toISOString(),
        instrucciones: this.recetaInstrucciones
      };
      console.log('Guardando receta:', receta);
  
      this.recetaService.createReceta(receta).subscribe((recetaResponse) => {
        console.log('Respuesta de creación de receta:', recetaResponse);
        const recetaId = recetaResponse.id; // Suponiendo que el backend devuelve el ID generado
        this.nuevoMedicamento.recetaId = recetaId; // Asignar recetaId para medicamentos
        this.showRecetaMedicamentosModal = true; // Abrir modal para añadir medicamentos
        alert('Receta creada exitosamente. Ahora puede añadir medicamentos.');
      });
    } else {
      alert('Error: No se pudo obtener el ID de la consulta para crear la receta.');
    }
  }
  
  

  openConsultaDetails(consulta: ConsultaMedica) {
    this.consultaSeleccionada = consulta;
    console.log('Detalles de la consulta abierta:', this.consultaSeleccionada);
  }

  closeConsultaDetails() {
    this.consultaSeleccionada = null;
    console.log('Detalles de la consulta cerrados');
  }

  addMedicamentoToReceta() {
    if (!this.nuevoMedicamento.recetaId) {
      console.log('Error: No hay recetaId asignado para los medicamentos.');
      return;
    }
    console.log('Añadiendo medicamento a la receta:', this.nuevoMedicamento);
    this.recetaMedicamentoService.addMedicamentoToReceta(this.nuevoMedicamento).subscribe(response => {
      console.log('Medicamento añadido a la receta:', response);
      this.recetaMedicamentos.push({ ...this.nuevoMedicamento });
      this.nuevoMedicamento = { recetaId: this.nuevoMedicamento.recetaId, medicamentoId: 0, dosis: '', frecuencia: '', duracion: 0 };
      alert('Medicamento añadido exitosamente.');
    });
  }
  
  saveRecetaMedicamentos() {
    console.log('Guardando todos los medicamentos de la receta:', this.recetaMedicamentos);
    this.recetaMedicamentos.forEach((med) => {
      this.recetaMedicamentoService.addMedicamentoToReceta(med).subscribe(() => {
        console.log('Medicamento añadido a la receta en el backend:', med);
      });
    });
    alert('Todos los medicamentos han sido añadidos a la receta.');
    this.closeRecetaMedicamentosModal();
  }

  closeRecetaMedicamentosModal() {
    this.showRecetaMedicamentosModal = false;
    this.recetaMedicamentos = [];
    console.log('Modal de añadir medicamentos cerrado');
  }
}