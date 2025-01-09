import { Component, OnInit } from '@angular/core';
import { PermisoPostergacion } from '../models/permiso-postergacion.model';
import { PermisoPostergacionService } from '../services/permiso-postergacion.service';
import { MedicoService } from '../services/medico.service'; // Importar el servicio de médicos
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medico } from '../models/medico.model';

@Component({
    selector: 'app-permiso-postergacion',
    templateUrl: './permiso-postergacion.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule],
    styleUrls: ['./permiso-postergacion.component.css']
})
export class PermisoPostergacionComponent implements OnInit {
    permisos: PermisoPostergacion[] = [];
    medicos: Medico[] = []; // Lista de médicos para el select
    permiso: PermisoPostergacion = {
        medicoId: 0,
        tipoPostergacion: 'Por Hora',
        fechaInicio: new Date(),
        estado: 'Pendiente',
        motivo: ''
    };
    isEditing: boolean = false;
    estadosDisponibles = ['Pendiente', 'Aprobada', 'Rechazada'];
    mostrarHoras: boolean = true;

    constructor(
        private permisoService: PermisoPostergacionService,
        private medicoService: MedicoService // Inyectar el servicio de médicos
    ) {}

    ngOnInit(): void {
        this.loadPermisos();
        this.loadMedicos(); // Cargar la lista de médicos al iniciar
        this.onTipoPostergacionChange();
    }

    loadPermisos() {
        this.permisoService.getAllPermisos().subscribe((data) => {
            this.permisos = data;
            console.log('Permisos de postergación cargados:', this.permisos);
        });
    }

    loadMedicos() {
        this.medicoService.getMedicos().subscribe((data) => {
            this.medicos = data;
            console.log('Lista de médicos:', this.medicos);
        });
    }

    createPermiso() {
        this.permisoService.createPermiso(this.permiso).subscribe(response => {
            console.log(response.message);
            this.loadPermisos();
            this.clearForm();
        });
    }

    editPermiso(permiso: PermisoPostergacion) {
        this.permiso = { ...permiso };
        this.isEditing = true;
        this.onTipoPostergacionChange();
        console.log('Editando permiso:', this.permiso);
    }

    updatePermiso() {
        if (this.permiso.postergacionId) {
            this.permisoService.updatePermiso(this.permiso.postergacionId, this.permiso).subscribe(() => {
                alert('Permiso de postergación actualizado.');
                this.loadPermisos();
                this.clearForm();
            });
        }
    }

    deletePermiso(id: number) {
        this.permisoService.deletePermiso(id).subscribe(() => {
            this.loadPermisos();
        });
    }

    changeEstado(permiso: PermisoPostergacion, nuevoEstado: string) {
        permiso.estado = nuevoEstado;
        this.permisoService.updatePermiso(permiso.postergacionId!, permiso).subscribe(() => {
            alert(`Estado cambiado a ${nuevoEstado}.`);
            this.loadPermisos();
        });
    }

    clearForm() {
        this.permiso = {
            medicoId: 0,
            tipoPostergacion: 'Por Hora',
            fechaInicio: new Date(),
            estado: 'Pendiente',
            motivo: ''
        };
        this.isEditing = false;
        this.onTipoPostergacionChange();
    }

    onTipoPostergacionChange() {
        this.mostrarHoras = this.permiso.tipoPostergacion === 'Por Hora';
    }
}
