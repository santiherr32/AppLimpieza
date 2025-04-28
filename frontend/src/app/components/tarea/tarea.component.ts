import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from '../../services/tarea/tarea.service';
import { HabitacionService } from '../../services/habitacion/habitacion.service';
import { Tarea } from '../../models/tarea.model';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-tarea',
  standalone: false,
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  tareaForm: FormGroup;
  tareas: Tarea[] = [];
  habitaciones: Habitacion[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  modoEdicion: boolean = false;
  tareaSeleccionada: Tarea | null = null;

  frecuencias = [
    'diaria',
    'semanal',
    'quincenal',
    'mensual',
    'personalizada'
  ] as const;

  diasSemana = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
    'domingo'
  ] as const;

  prioridades = [
    'baja',
    'media',
    'alta'
  ] as const;

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private habitacionService: HabitacionService
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      habitacionId: ['', [Validators.required]],
      frecuencia: ['', [Validators.required]],
      diasSemana: [[]],
      horario: [''],
      duracionEstimada: [15, [Validators.min(5), Validators.max(480)]],
      prioridad: ['media']
    });
  }

  ngOnInit(): void {
    this.cargarHabitaciones();
    this.cargarTareasPendientes();
  }

  cargarHabitaciones(): void {
    this.habitacionService.obtenerHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
      },
      error: (error) => {
        this.mensajeError = 'Error al cargar las habitaciones';
        this.limpiarMensajes();
      }
    });
  }

  cargarTareasPendientes(): void {
    this.tareaService.obtenerTareasPendientes().subscribe({
      next: (data) => {
        this.tareas = data;
      },
      error: (error) => {
        this.mensajeError = 'Error al cargar las tareas pendientes';
        this.limpiarMensajes();
      }
    });
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      const tareaData = this.tareaForm.value;

      this.tareaService.crearTarea(tareaData).subscribe({
        next: (response) => {
          this.mensajeExito = 'Tarea creada exitosamente';
          this.cargarTareasPendientes();
          this.resetForm();
        },
        error: (error) => {
          this.mensajeError = error.error.mensaje || 'Error al crear la tarea';
          this.limpiarMensajes();
        }
      });
    }
  }

  completarTarea(tareaId: string | undefined): void {
    if (tareaId) {
      this.tareaService.completarTarea(tareaId).subscribe({
        next: () => {
          this.mensajeExito = 'Tarea completada exitosamente';
          this.cargarTareasPendientes();
          this.limpiarMensajes();
        },
        error: (error) => {
          this.mensajeError = error.error.mensaje || 'Error al completar la tarea';
          this.limpiarMensajes();
        }
      });
    }
  }

  eliminarTarea(tareaId: string | undefined): void {
    if (tareaId && confirm('¿Está seguro de eliminar esta tarea?')) {
      this.tareaService.eliminarTarea(tareaId).subscribe({
        next: () => {
          this.mensajeExito = 'Tarea eliminada exitosamente';
          this.cargarTareasPendientes();
          this.limpiarMensajes();
        },
        error: (error) => {
          this.mensajeError = error.error.mensaje || 'Error al eliminar la tarea';
          this.limpiarMensajes();
        }
      });
    }
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

  resetForm(): void {
    this.tareaForm.reset({
      prioridad: 'media',
      duracionEstimada: 15
    });
    this.modoEdicion = false;
    this.tareaSeleccionada = null;
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    }, 3000);
  }

  getNombreHabitacion(habitacion: string | Habitacion): string {
    if (typeof habitacion === 'string') {
      return '';
    }
    return habitacion.nombre || '';
  }
}
