import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../services/reporte.service';
import { PacienteConsulta } from '../models/paciente-consulta.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reportes: any[] = [];
  filteredReportes: any[] = [];
  startDate: string = '';
  endDate: string = '';
  columns = [
    { label: 'Paciente ID', dataKey: 'pacienteId', selected: true },
    { label: 'Nombre', dataKey: 'nombrePaciente', selected: true },
    { label: 'Apellido', dataKey: 'apellidoPaciente', selected: true },
    { label: 'Tipo de Sangre', dataKey: 'tipoSangrePaciente', selected: true },
    { label: 'Fecha de Nacimiento', dataKey: 'fechaNacimientoPaciente', selected: true },
    { label: 'Historia ID', dataKey: 'historiaId', selected: true },
    { label: 'Fecha Historia', dataKey: 'fechaHistoria', selected: true },
    { label: 'Consulta ID', dataKey: 'consultaId', selected: true },
    { label: 'Fecha Consulta', dataKey: 'fechaConsulta', selected: true },
    { label: 'Diagnóstico', dataKey: 'diagnostico', selected: true },
    { label: 'Tratamiento', dataKey: 'tratamiento', selected: true },
    { label: 'Medicamentos Recetados', dataKey: 'medicamentosRecetados', selected: true },
    { label: 'Médico', dataKey: 'nombreMedico', selected: true },
    { label: 'Especialidad', dataKey: 'especialidadMedico', selected: true },
  ];

  constructor(private reporteService: ReporteService) {}

  ngOnInit() {
    this.fetchReportes();
  }

  fetchReportes() {
    this.reporteService.obtenerReporteConsultas().subscribe({
      next: (data) => {
        this.reportes = data;
        this.filteredReportes = data;
      },
      error: () => {
        console.error('Error fetching report data');
      },
    });
  }

  filterRecords() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredReportes = this.reportes.filter((record) => {
        const recordDate = new Date(record.fechaConsulta);
        return recordDate >= start && recordDate <= end;
      });
    } else {
      this.filteredReportes = this.reportes;
    }
  }

  resetFilters() {
    this.startDate = '';
    this.endDate = '';
    this.filteredReportes = this.reportes;
  }

  exportToPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text('Reporte de Consultas Médicas', 14, 10);
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 16);

    const selectedColumns = this.columns.filter((col) => col.selected);
    const rows = this.filteredReportes.map((row) =>
      selectedColumns.map((col) => row[col.dataKey] || 'N/A')
    );

    (doc as any).autoTable({
      head: [selectedColumns.map((col) => col.label)],
      body: rows,
      startY: 20,
      theme: 'grid',
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2,
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255],
      },
    });

    doc.save(`ReporteConsultas_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredReportes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reportes');
    XLSX.writeFile(workbook, `Reportes_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

}