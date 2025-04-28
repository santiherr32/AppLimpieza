import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionService } from '../../services/habitacion/habitacion.service';

@Component({
  selector: 'app-habitacion',
  standalone: false,
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {
  habitacionForm: FormGroup;
  habitaciones: any[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  modoEdicion: boolean = false;
  habitacionSeleccionada: any = null;

  tiposHabitacion = [
    'cocina',
    'baño',
    'dormitorio',
    'sala',
    'comedor',
    'oficina',
    'otro'
  ];

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService
  ) {
    this.habitacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: [''],
      tipoHabitacion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarHabitaciones();
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

  onSubmit(): void {
    if (this.habitacionForm.valid) {
      const habitacionData = this.habitacionForm.value;

      if (this.modoEdicion && this.habitacionSeleccionada) {
        this.habitacionService.actualizarHabitacion(this.habitacionSeleccionada._id, habitacionData).subscribe({
          next: (response) => {
            this.mensajeExito = 'Habitación actualizada exitosamente';
            this.cargarHabitaciones();
            this.resetForm();
          },
          error: (error) => {
            this.mensajeError = error.error.mensaje || 'Error al actualizar la habitación';
            this.limpiarMensajes();
          }
        });
      } else {
        this.habitacionService.crearHabitacion(habitacionData).subscribe({
          next: (response) => {
            this.mensajeExito = 'Habitación creada exitosamente';
            this.cargarHabitaciones();
            this.resetForm();
          },
          error: (error) => {
            this.mensajeError = error.error.mensaje || 'Error al crear la habitación';
            this.limpiarMensajes();
          }
        });
      }
    }
  }

  editarHabitacion(habitacion: any): void {
    this.habitacionSeleccionada = habitacion;
    this.modoEdicion = true;
    this.habitacionForm.patchValue({
      nombre: habitacion.nombre,
      descripcion: habitacion.descripcion,
      tipoHabitacion: habitacion.tipoHabitacion
    });
  }

  eliminarHabitacion(id: string): void {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      this.habitacionService.eliminarHabitacion(id).subscribe({
        next: () => {
          this.mensajeExito = 'Habitación eliminada exitosamente';
          this.cargarHabitaciones();
          this.limpiarMensajes();
        },
        error: (error) => {
          this.mensajeError = error.error.mensaje || 'Error al eliminar la habitación';
          this.limpiarMensajes();
        }
      });
    }
  }

  resetForm(): void {
    this.habitacionForm.reset();
    this.modoEdicion = false;
    this.habitacionSeleccionada = null;
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    }, 3000);
  }
}
