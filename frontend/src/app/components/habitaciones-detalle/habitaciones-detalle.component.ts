import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HogarService } from '../../services/hogar/hogar.service';
import { HabitacionService } from '../../services/habitacion/habitacion.service';
import { TareaService } from '../../services/tarea/tarea.service';
import { Habitacion } from '../../models/habitacion.model';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-habitaciones-detalle',
  standalone: false,
  templateUrl: './habitaciones-detalle.component.html',
  styleUrls: ['./habitaciones-detalle.component.css']
})
export class HabitacionesDetalleComponent implements OnInit {
  habitaciones: Habitacion[] = [];
  tareasPorHabitacion: { [key: string]: Tarea[] } = {};
  habitacionSeleccionada: string | null = null;

  cargando = true;
  error = '';
  mensajeExito = '';
  mostrarModalHabitacion = false;
  mostrarModalTarea = false;
  mostrarDetallesTarea = false;
  tareaSeleccionada: Tarea | null = null;

  habitacionForm: FormGroup;
  tareaForm: FormGroup;

  diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ];

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private tareaService: TareaService
  ) {
    this.habitacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipoHabitacion: ['', [Validators.required]],
      descripcion: ['']
    });

    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      frecuencia: ['', [Validators.required]],
      diasSemana: [[]],
      horario: [''],
      duracionEstimada: [15, [Validators.min(5), Validators.max(480)]],
      prioridad: ['media']
    });
  }

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.habitacionService.obtenerHabitaciones().subscribe({
      next: (habitaciones) => {
        this.habitaciones = habitaciones;
        if (habitaciones.length > 0) {
          this.habitacionSeleccionada = habitaciones[0]._id!;
          if (this.habitacionSeleccionada) {
            this.cargarTareasPorHabitacion(this.habitacionSeleccionada);
          }
        }
        this.cargando = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las habitaciones';
        this.cargando = false;
      }
    });
  }

  cargarTareasPorHabitacion(habitacionId: string): void {
    this.tareaService.obtenerTareasPorHabitacion(habitacionId).subscribe({
      next: (tareas) => {
        this.tareasPorHabitacion[habitacionId] = tareas;
      },
      error: (error) => {
        this.error = `Error al cargar las tareas de la habitación`;
      }
    });
  }

  seleccionarHabitacion(habitacionId: string): void {
    this.habitacionSeleccionada = habitacionId;
    if (!this.tareasPorHabitacion[habitacionId]) {
      this.cargarTareasPorHabitacion(habitacionId);
    }
  }

  completarTarea(tareaId: string): void {
    this.tareaService.completarTarea(tareaId).subscribe({
      next: () => {
        this.mensajeExito = 'Tarea completada exitosamente';
        // Recargar las tareas de la habitación actual
        if (this.habitacionSeleccionada) {
          this.cargarTareasPorHabitacion(this.habitacionSeleccionada);
        }
        this.limpiarMensajes();
      },
      error: (error) => {
        this.error = 'Error al completar la tarea';
        this.limpiarMensajes();
      }
    });
  }

  abrirModalHabitacion(): void {
    this.mostrarModalHabitacion = true;
    this.habitacionForm.reset();
  }

  cerrarModalHabitacion(): void {
    this.mostrarModalHabitacion = false;
    this.habitacionForm.reset();
  }

  crearHabitacion(): void {
    if (this.habitacionForm.valid) {
      this.habitacionService.crearHabitacion(this.habitacionForm.value).subscribe({
        next: (habitacion) => {
          this.mensajeExito = 'Habitación creada exitosamente';
          this.cerrarModalHabitacion();
          this.cargarHabitaciones();
        },
        error: (error) => {
          this.error = error.error.mensaje || 'Error al crear la habitación';
        }
      });
    }
  }

  abrirModalTarea(): void {
    this.mostrarModalTarea = true;
    this.tareaForm.reset({ duracionEstimada: 15, prioridad: 'media' });
  }

  cerrarModalTarea(): void {
    this.mostrarModalTarea = false;
    this.tareaForm.reset();
  }

  crearTarea(): void {
    if (this.tareaForm.valid && this.habitacionSeleccionada) {
      const tareaData = {
        ...this.tareaForm.value,
        habitacionId: this.habitacionSeleccionada
      };

      this.tareaService.crearTarea(tareaData).subscribe({
        next: () => {
          this.mensajeExito = 'Tarea creada exitosamente';
          this.cerrarModalTarea();
          if (this.habitacionSeleccionada) {
            this.cargarTareasPorHabitacion(this.habitacionSeleccionada);
          }
          this.limpiarMensajes();
        },
        error: (error) => {
          this.error = error.error.mensaje || 'Error al crear la tarea';
          this.limpiarMensajes();
        }
      });
    }
  }

  verDetallesTarea(tarea: Tarea): void {
    this.tareaSeleccionada = tarea;
    this.mostrarDetallesTarea = true;
  }

  cerrarDetallesTarea(): void {
    this.mostrarDetallesTarea = false;
    this.tareaSeleccionada = null;
  }

  onDiaSemanaChange(dia: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const diasSemana = this.tareaForm.get('diasSemana')?.value as string[] || [];

    if (checkbox.checked) {
      diasSemana.push(dia);
    } else {
      const index = diasSemana.indexOf(dia);
      if (index > -1) {
        diasSemana.splice(index, 1);
      }
    }

    this.tareaForm.patchValue({ diasSemana });
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.mensajeExito = '';
      this.error = '';
    }, 3000);
  }

  getNombreHabitacion(habitacionId: string | null): string {
    if (!habitacionId) return '';
    const habitacion = this.habitaciones.find(h => h._id === habitacionId);
    return habitacion?.nombre || '';
  }

  tieneDiasSemana(): boolean {
    return !!this.tareaSeleccionada?.diasSemana?.length;
  }
}
