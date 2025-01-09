import { Component, OnInit } from '@angular/core';
import { MetodoDePagoService } from '../services/metodo-de-pago.service';
import { MetodoDePago } from '../models/metodo-de-pago.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-metodos-de-pago',
  templateUrl: './metodos-de-pago.component.html',
  styleUrls: ['./metodos-de-pago.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class MetodosDePagoComponent implements OnInit {
  metodos: MetodoDePago[] = [];
  newMetodo: Partial<MetodoDePago> = { nombre: '', descripcion: '' };
  editingMetodo: Partial<MetodoDePago> | null = null;
  isLoading = false;

  constructor(
    private metodoDePagoService: MetodoDePagoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchMetodos();
  }

  fetchMetodos() {
    this.isLoading = true;
    this.metodoDePagoService.getMetodosDePago().subscribe(
      (data) => {
        this.metodos = data;
        this.toastr.success('Métodos de pago cargados exitosamente.', 'Éxito');
        this.isLoading = false;
      },
      () => {
        this.toastr.error('Error al cargar los métodos de pago.', 'Error');
        this.isLoading = false;
      }
    );
  }

  createMetodo() {
    if (this.newMetodo.nombre?.trim()) {
      this.isLoading = true;
      this.metodoDePagoService.createMetodoDePago(this.newMetodo).subscribe(
        () => {
          this.fetchMetodos();
          this.newMetodo = { nombre: '', descripcion: '' };
          this.toastr.success('Método de pago creado exitosamente.', 'Éxito');
          this.isLoading = false;
        },
        () => {
          this.toastr.error('Error al crear el método de pago.', 'Error');
          this.isLoading = false;
        }
      );
    } else {
      this.toastr.warning('El nombre del método de pago no puede estar vacío.', 'Advertencia');
    }
  }

  editMetodo(metodo: MetodoDePago) {
    this.editingMetodo = { ...metodo };
  }

  updateMetodo() {
    if (this.editingMetodo && this.editingMetodo.metodoId && this.editingMetodo.nombre?.trim()) {
      this.isLoading = true;
      this.metodoDePagoService
        .updateMetodoDePago(this.editingMetodo.metodoId, this.editingMetodo)
        .subscribe(
          () => {
            this.fetchMetodos();
            this.editingMetodo = null;
            this.toastr.success('Método de pago actualizado exitosamente.', 'Éxito');
            this.isLoading = false;
          },
          () => {
            this.toastr.error('Error al actualizar el método de pago.', 'Error');
            this.isLoading = false;
          }
        );
    } else {
      this.toastr.warning('El nombre del método de pago no puede estar vacío.', 'Advertencia');
    }
  }

  cancelEdit() {
    this.editingMetodo = null;
  }

  deleteMetodo(metodoId: number) {
    if (confirm('¿Está seguro de eliminar este método de pago?')) {
      this.isLoading = true;
      this.metodoDePagoService.deleteMetodoDePago(metodoId).subscribe(
        () => {
          this.fetchMetodos();
          this.toastr.success('Método de pago eliminado exitosamente.', 'Éxito');
          this.isLoading = false;
        },
        () => {
          this.toastr.error('Error al eliminar el método de pago.', 'Error');
          this.isLoading = false;
        }
      );
    }
  }
}
