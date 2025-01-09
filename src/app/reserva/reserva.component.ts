import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../services/reserva.service';
import { PacienteService } from '../services/paciente.service';
import { HorarioMedicoEspecialidadService } from '../services/horario-medico-especialidad.service';
import { CupoService } from '../services/cupo.service';
import { UserService } from '../services/user.service';
import { Reserva } from '../models/reserva.model';
import { Cupo } from '../models/cupo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  templateUrl: './reserva.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./reserva.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  pacientes: any[] = [];
  especialidades: any[] = [];
  uniqueMedicos: any[] = [];
  cupos: Cupo[] = [];
  filteredCupos: Cupo[] = [];
  newReserva: Partial<Reserva> = {
    pacienteId: 0,
    estado: 'Disponible',
    cupoId: 0,
    fechaReserva: new Date().toISOString().split('T')[0]
  };
  showCupoModal: boolean = false;
  selectedMedicoId: number | null = null;
  selectedEspecialidadId: number | null = null;

  constructor(
    private reservaService: ReservaService,
    private pacienteService: PacienteService,
    private horarioMedicoEspecialidadService: HorarioMedicoEspecialidadService,
    private cupoService: CupoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchReservas();
    this.fetchPacientes();
    this.fetchEspecialidades();
  }

  fetchReservas() {
    this.reservaService.getReservas().subscribe((data) => {
      this.reservas = data;
      console.log('Reservas obtenidas:', this.reservas); // Debug de reservas
    });
  }

  fetchPacientes() {
    this.pacienteService.getPacientes().subscribe((pacientes) => {
      this.userService.getUsers().subscribe((usuarios) => {
        this.pacientes = pacientes.map((paciente) => {
          const usuario = usuarios.find((u) => u.id === paciente.usuarioId);
          return {
            pacienteId: paciente.id,
            nombre: usuario ? usuario.nombre : '',
            apellido: usuario ? usuario.apellido : ''
          };
        });
        console.log('Pacientes obtenidos:', this.pacientes); // Debug de pacientes
      });
    });
  }

  fetchEspecialidades() {
    this.horarioMedicoEspecialidadService.getAll().subscribe((data) => {
      this.especialidades = data.reduce((acc, horario) => {
        if (!acc.some(especialidad => especialidad.id === horario.especialidadId)) {
          acc.push({
            id: horario.especialidadId,
            nombre: horario.especialidadNombre
          });
        }
        return acc;
      }, []);
      console.log('Especialidades obtenidas:', this.especialidades); // Debug de especialidades
    });
  }

  onEspecialidadChange() {
    if (this.selectedEspecialidadId) {
      this.horarioMedicoEspecialidadService.getMedicosByEspecialidad(this.selectedEspecialidadId).subscribe((data) => {
        this.uniqueMedicos = [...new Map(data.map(item => [item['medicoId'], item])).values()];
        console.log('Médicos únicos por especialidad:', this.uniqueMedicos); // Debug de médicos únicos
        this.cupos = [];
        this.selectedMedicoId = null;
      });
    }
  }

  onMedicoChange() {
    if (this.selectedMedicoId && this.selectedEspecialidadId) {
      this.openCupoModal();
    }
  }

  openCupoModal() {
    if (this.selectedMedicoId && this.selectedEspecialidadId) {
      this.cupoService.getCuposWithDetails(this.selectedMedicoId, this.selectedEspecialidadId).subscribe((data) => {
        const todayDay = new Date().getDay();
        this.filteredCupos = data.filter(cupo => this.getDayOfWeek(cupo.diaSemana) === todayDay);
        console.log(data);
        console.log('Cupos filtrados para el día actual:', this.filteredCupos); // Debug de cupos filtrados
        this.showCupoModal = true;
      });
    }
  }

  closeCupoModal() {
    this.showCupoModal = false;
  }

  selectCupo(cupo: Cupo) {
    this.newReserva.cupoId = cupo.cupoId;
    console.log('Cupo seleccionado:', cupo); // Debug de cupo seleccionado
    this.closeCupoModal();
  }

  createReserva() {
    if (this.newReserva.pacienteId && this.newReserva.cupoId && this.newReserva.fechaReserva) {
      this.reservaService.createReserva(this.newReserva as Reserva).subscribe(() => {
        this.fetchReservas();
        console.log('Reserva creada:', this.newReserva); // Debug de reserva creada
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newReserva = { pacienteId: 0, estado: 'Reservada', cupoId: 0, fechaReserva: new Date().toISOString().split('T')[0] };
    this.selectedMedicoId = null;
    this.selectedEspecialidadId = null;
    this.uniqueMedicos = [];
    this.cupos = [];
  }

  deleteReserva(reservaId: number) {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
      this.reservaService.deleteReserva(reservaId).subscribe(() => {
        this.fetchReservas();
        console.log('Reserva eliminada con ID:', reservaId); // Debug de reserva eliminada
      });
    }
  }

  getDayOfWeek(dia: string): number {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return days.indexOf(dia);
  }
}
