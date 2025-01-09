import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HistoriaClinicaService, HistoriaClinicaResumen } from '../services/historia-clinica.service';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente.model';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoriaClinicaComponent implements OnInit {
  historiaClinica: HistoriaClinicaResumen[] = [];
  pacientes: Paciente[] = [];
  pacienteId: number | null = null; // Inicialmente no hay paciente seleccionado
  isLoading = false;

  constructor(
    private historiaClinicaService: HistoriaClinicaService,
    private pacienteService: PacienteService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {
    this.isLoading = true;
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar pacientes', err);
        this.isLoading = false;
      }
    });
  }

  cargarHistoriaClinica(): void {
    if (this.pacienteId) {
      this.isLoading = true;
      this.historiaClinicaService.getHistoriaClinicaResumen(this.pacienteId).subscribe({
        next: (data) => {
          this.historiaClinica = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar la historia clínica', err);
          this.isLoading = false;
        }
      });
    }
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Resumen de Historia Clínica', 14, 10);

    if (this.historiaClinica.length > 0) {
      const paciente = this.historiaClinica[0];
      doc.setFontSize(12);
      doc.text(`Nombre: ${paciente.nombrePaciente} ${paciente.apellidoPaciente}`, 14, 20);
      doc.text(`ID Paciente: ${paciente.pacienteId}`, 14, 26);
      doc.text(`ID Historia Clínica: ${paciente.historiaId}`, 14, 32);
      doc.text(`Fecha de Creación: ${new Date(paciente.fechaCreacionHistoria).toLocaleString()}`, 14, 38);

      this.historiaClinica.forEach((consulta, index) => {
        doc.setFontSize(14);
        doc.text(`Consulta Médica (ID: ${consulta.consultaId})`, 14, 46 + index * 10);

        const consultaData = [
          ['Fecha', new Date(consulta.fechaConsulta).toLocaleString()],
          ['Diagnóstico', consulta.diagnostico],
          ['Tratamiento', consulta.tratamiento],
          ['Notas', consulta.notasConsulta || 'No hay notas disponibles.'],
          ['Medicamentos', consulta.medicamentosReceta || 'No hay medicamentos recetados.'],
          ['Laboratorios', consulta.laboratorios || 'No se han realizado laboratorios.']
        ];

        (doc as any).autoTable({
          startY: 52 + index * 50,
          head: [['Atributo', 'Detalle']],
          body: consultaData,
          theme: 'grid',
          headStyles: {
            fillColor: [22, 160, 133],
            textColor: [255, 255, 255],
            fontSize: 10
          },
          bodyStyles: {
            fontSize: 8
          },
          margin: { top: 10 }
        });
      });
    } else {
      doc.setFontSize(12);
      doc.text('No hay datos disponibles para este paciente.', 14, 20);
    }

    doc.save(`Historia_Clinica_${new Date().toISOString().slice(0, 10)}.pdf`);
  }
}
