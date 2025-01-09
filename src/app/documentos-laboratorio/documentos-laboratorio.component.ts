import { Component, OnInit } from '@angular/core';
import { DocumentosLaboratorio } from '../models/documentos-laboratorio.model';
import { DocumentosLaboratorioService } from '../services/documentos-laboratorio.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentos-laboratorio',
  templateUrl: './documentos-laboratorio.component.html',
  styleUrls: ['./documentos-laboratorio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DocumentosLaboratorioComponent implements OnInit {
  laboratorios: any[] = [];
  selectedLaboratorioId: number | null = null;
  fechaHoy = new Date();

  newDocumento: DocumentosLaboratorio = {
    laboratorioId: 0,
    nombreArchivo: '',
    tipoDocumento: '',
    ubicacionArchivo: '',
    fechaRealizacion: this.fechaHoy
  };

  constructor(private documentosService: DocumentosLaboratorioService) {}

  ngOnInit(): void {
    this.loadLaboratorios();
  }

  loadLaboratorios(): void {
    this.documentosService.getLaboratorios().subscribe((data) => {
      this.laboratorios = data;
    });
  }

  createDocumento(): void {
    if (this.selectedLaboratorioId) {
      // Asigna el laboratorio seleccionado y la fecha actual
      this.newDocumento.laboratorioId = this.selectedLaboratorioId;
      this.newDocumento.fechaRealizacion = this.fechaHoy;

      // Llama al servicio para crear el documento
      this.documentosService.createDocumento(this.newDocumento).subscribe(() => {
        // Limpia el formulario después de guardar el documento
        this.clearForm();
      });
    }
  }

  clearForm(): void {
    this.newDocumento = {
      laboratorioId: 0,
      nombreArchivo: '',
      tipoDocumento: '',
      ubicacionArchivo: '',
      fechaRealizacion: this.fechaHoy
    };
    this.selectedLaboratorioId = null;
  }
}
