// src/app/components/medicamento/medicamento.component.ts
import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../models/medicamento.model';
import { MedicamentoService } from '../services/medicamento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-medicamento',
    templateUrl: './medicamento.component.html',
    standalone: true,
    styleUrls: ['./medicamento.component.css'],
    imports: [CommonModule, FormsModule]

})
export class MedicamentoComponent implements OnInit {
    medicamentos: Medicamento[] = [];
    medicamento: Medicamento = { nombre: '', descripcion: '' };
    isEditing = false;

    constructor(private medicamentoService: MedicamentoService) { }

    ngOnInit(): void {
        this.loadMedicamentos();
    }

    loadMedicamentos(): void {
        this.medicamentoService.getAllMedicamentos().subscribe(data => {
            this.medicamentos = data;
        });
    }

    createMedicamento(): void {
        this.medicamentoService.createMedicamento(this.medicamento).subscribe(() => {
            this.loadMedicamentos();
            this.clearForm();
        });
    }

    editMedicamento(medicamento: Medicamento): void {
        this.medicamento = { ...medicamento };
        this.isEditing = true;
    }

    updateMedicamento(): void {
        if (this.medicamento.id) {
            this.medicamentoService.updateMedicamento(this.medicamento.id, this.medicamento).subscribe(() => {
                this.loadMedicamentos();
                this.clearForm();
            });
        }
    }

    deleteMedicamento(id: number): void {
        if (confirm('¿Estás seguro de eliminar este medicamento?')) {
            this.medicamentoService.deleteMedicamento(id).subscribe(() => {
                this.loadMedicamentos();
            });
        }
    }

    clearForm(): void {
        this.medicamento = { nombre: '', descripcion: '' };
        this.isEditing = false;
    }
}
