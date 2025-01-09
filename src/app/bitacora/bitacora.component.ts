import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../services/bitacora.service';
import { Bitacora } from '../models/bitacora.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
  bitacoras: Bitacora[] = [];
  filteredBitacoras: Bitacora[] = [];
  startDate: string = '';
  endDate: string = '';
  isLoading: boolean = false;

  constructor(private bitacoraService: BitacoraService) {}

  ngOnInit() {
    this.fetchBitacoras();
  }

  // Fetch bitacoras from the service
  fetchBitacoras() {
    this.isLoading = true;
    this.bitacoraService.getBitacoras().subscribe({
      next: (data) => {
        this.bitacoras = data;
        this.filteredBitacoras = data;
        this.isLoading = false;
      },
      error: () => {
        console.error('Error fetching bitacora data');
        this.isLoading = false;
      }
    });
  }

  // Filter records based on date range
  filterRecords() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.filteredBitacoras = this.bitacoras.filter((record) => {
        const recordDate = new Date(record.fecha);
        return recordDate >= start && recordDate <= end;
      });
    } else {
      this.filteredBitacoras = this.bitacoras;
    }
  }

  // Reset date filters
  resetFilters() {
    this.startDate = '';
    this.endDate = '';
    this.filteredBitacoras = this.bitacoras;
  }

  // Export filtered data to Excel
  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredBitacoras);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bitacora');
    XLSX.writeFile(workbook, `Bitacora_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
  exportToPDF() {
    const doc = new jsPDF();
  
    // Configurar encabezado
    doc.setFontSize(18);
    doc.text('Historial de Bitácora', 14, 15);
  
    // Configurar subtítulo con fecha
    const currentDate = new Date();
    doc.setFontSize(12);
    doc.text(`Generado: ${currentDate.toLocaleString()}`, 14, 22);
  
    // Construir los datos para la tabla
    const tableData = this.filteredBitacoras.map((bitacora, index) => [
      index + 1,
      bitacora.usuario_id || 'N/A',
      bitacora.accion,
      bitacora.tabla,
      bitacora.detalle.length > 50 ? bitacora.detalle.slice(0, 50) + '...' : bitacora.detalle,
      bitacora.ip || 'N/A',
      new Date(bitacora.fecha).toLocaleString(),
    ]);
  
    // Opciones para la tabla
    (doc as any).autoTable({
      head: [['#', 'Usuario', 'Acción', 'Tabla', 'Detalle', 'IP', 'Fecha']],
      body: tableData,
      startY: 30,
      theme: 'striped',
      styles: {
        cellPadding: 4,
        fontSize: 10,
        overflow: 'linebreak',
        halign: 'center',
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: 10 }, // ID
        1: { cellWidth: 20 }, // Usuario
        2: { cellWidth: 25 }, // Acción
        3: { cellWidth: 25 }, // Tabla
        4: { cellWidth: 60 }, // Detalle (ajustado para evitar desbordamiento)
        5: { cellWidth: 25 }, // IP
        6: { cellWidth: 30 }, // Fecha
      },
     
    });
  
    // Guardar el archivo con un nombre dinámico
    doc.save(`Historial_Bitacora_${currentDate.toISOString().slice(0, 10)}.pdf`);
  }
  
  
}
