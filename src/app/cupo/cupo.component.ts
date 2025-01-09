// src/app/components/cupos/cupos.component.ts

import { Component, OnInit } from '@angular/core';
import { CupoService } from '../services/cupo.service';
import { Cupo } from '../models/cupo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cupos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.css']
})
export class CuposComponent implements OnInit {
  cupos: Cupo[] = [];
  cupo: Cupo | null = null;
  searchId: number | null = null;
  errorMessage: string = '';

  constructor(private cupoService: CupoService) {}

  ngOnInit(): void {
    this.getAllCupos();
  }

  // Obtener todos los cupos
  getAllCupos() {
    this.cupoService.getCupos().subscribe(
      (data) => {
        this.cupos = data;
        this.cupo = null;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los cupos';
        console.error(error);
      }
    );
  }

  // Buscar cupo por ID
  searchCupoById() {
    if (this.searchId) {
      this.cupoService.getCupoById(this.searchId).subscribe(
        (data) => {
          this.cupo = data;
          this.cupos = [];
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Cupo no encontrado';
          console.error(error);
        }
      );
    }
  }

  // Limpiar búsqueda
  clearSearch() {
    this.searchId = null;
    this.getAllCupos();
    this.errorMessage = '';
  }
}
