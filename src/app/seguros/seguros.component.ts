import { Component, OnInit } from '@angular/core';
import { SegurosService} from '../services/seguros.service';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente.model';
import { MetodoDePagoService } from '../services/metodo-de-pago.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PagoSeguro } from '../models/pago-seguro.mode';
import { MetodoDePago } from '../models/metodo-de-pago.model';
@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SegurosComponent implements OnInit {
  pacientes: Paciente[] = [];
  historialPagos: PagoSeguro[] = [];
  metodosPago: MetodoDePago[] = [];
  seguroActivo = false;
  pacienteSeleccionado: number | null = null;
  nuevoPago: Partial<PagoSeguro> = {
    monto: 0,
    fechaPago: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    metodoId: 0,
    estado: '',
  };
  estadosPago = ['Procesado', 'Pendiente', 'Cancelado'];
  isLoading = false;

  constructor(
    private segurosService: SegurosService,
    private pacienteService: PacienteService,
    private metodoDePagoService: MetodoDePagoService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarMetodosPago();
  }

  cargarPacientes(): void {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => (this.pacientes = data),
      error: () => console.error('Error al cargar pacientes'),
    });
  }

  cargarMetodosPago(): void {
    this.metodoDePagoService.getMetodosDePago().subscribe({
      next: (data) => (this.metodosPago = data),
      error: () => console.error('Error al cargar métodos de pago'),
    });
  }

  cargarHistorial(): void {
    if (this.pacienteSeleccionado) {
      this.isLoading = true;
      this.segurosService.obtenerHistorialDePagos(this.pacienteSeleccionado).subscribe({
        next: (data) => {
          this.historialPagos = data;
          this.validarEstadoSeguro();
          this.isLoading = false;
        },
        error: () => {
          console.error('Error al cargar historial de pagos');
          this.isLoading = false;
        },
      });
    } else {
      alert('Seleccione un paciente.');
    }
  }

  validarEstadoSeguro(): void {
    if (this.pacienteSeleccionado) {
      this.segurosService.obtenerEstadoSeguro(this.pacienteSeleccionado).subscribe({
        next: (estado) => (this.seguroActivo = estado),
        error: () => console.error('Error al validar estado del seguro'),
      });
    }
  }

  registrarPago(): void {
    if (
      this.pacienteSeleccionado &&
      this.nuevoPago.monto &&
      this.nuevoPago.fechaPago &&
      this.nuevoPago.metodoId &&
      this.nuevoPago.estado
    ) {
      this.nuevoPago.pacienteId = this.pacienteSeleccionado;
      this.segurosService.registrarPagoSeguro(this.nuevoPago).subscribe({
        next: () => {
          alert('Pago registrado exitosamente');
          this.cargarHistorial();
          this.nuevoPago = {
            monto: 0,
            fechaPago: new Date().toISOString().split('T')[0],
            metodoId: 0,
            estado: '',
          };
        },
        error: () => alert('Error al registrar el pago'),
      });
    } else {
      alert('Complete todos los campos del pago.');
    }
  }
}
