import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { HogarService } from '../../services/hogar/hogar.service';
import { HabitacionService } from '../../services/habitacion/habitacion.service';
import { TareaService } from '../../services/tarea/tarea.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  hogar: any = null;
  habitaciones: any[] = [];
  tareasPendientes: any[] = [];
  usuario: any = null;
  cargando = true;
  error = '';

  // Estados para distinguir entre no existencia y error
  hogarNoExiste = false;
  habitacionesNoExisten = false;
  tareasNoExisten = false;

  // Modal de nuevo hogar
  mostrarModalNuevoHogar = false;
  hogarForm: FormGroup;

  private authSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hogarService: HogarService,
    private habitacionService: HabitacionService,
    private tareaService: TareaService,
    private authService: AuthService
  ) {
    this.hogarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authSub = this.authService.cargandoUsuario$.pipe(
      switchMap(cargando => {
        if (!cargando) {
          // Solo verificamos autenticación después de que la carga termine
          if (!this.authService.estaAutenticado()) {
            this.router.navigate(['/inicio']);
            return of(null);
          }
          return this.authService.usuario$;
        }
        return of(null);
      }),
      // Filtrar valores nulos para evitar ejecuciones innecesarias
      filter(usuario => usuario !== null)
    ).subscribe(usuario => {
      this.usuario = usuario;
      this.cargarDatos();
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  cargarDatos(): void {
    this.cargando = true;
    this.hogarService.obtenerHogar().subscribe({
      next: (hogar) => {
        this.hogar = hogar;
        this.cargarHabitaciones();
      },
      error: (error) => {
        if (error.status === 404) {
          this.hogarNoExiste = true;
          this.mostrarModalNuevoHogar = true;
        } else {
          this.error = 'No se pudo cargar el hogar';
        }
        this.cargando = false;
      }
    });
  }

  cargarHabitaciones(): void {
    this.habitacionService.obtenerHabitaciones().subscribe({
      next: (habitaciones) => {
        this.habitaciones = habitaciones;
        this.habitacionesNoExisten = habitaciones.length === 0;
        this.cargarTareasPendientes();
      },
      error: (error) => {
        if (error.status === 404) {
          this.habitacionesNoExisten = true;
        } else {
          this.error = 'No se pudieron cargar las habitaciones';
        }
        this.cargando = false;
      }
    });
  }

  cargarTareasPendientes(): void {
    this.tareaService.obtenerTareasPendientes().subscribe({
      next: (tareas) => {
        this.tareasPendientes = tareas;
        this.tareasNoExisten = tareas.length === 0;
        this.cargando = false;
      },
      error: (error) => {
        if (error.status === 404) {
          this.tareasNoExisten = true;
        } else {
          this.error = 'No se pudieron cargar las tareas';
        }
        this.cargando = false;
      }
    });
  }

  crearHogar(): void {
    if (this.hogarForm.valid) {
      this.hogarService.crearHogar(this.hogarForm.value).subscribe({
        next: (hogar) => {
          this.hogar = hogar;
          this.hogarNoExiste = false;
          this.mostrarModalNuevoHogar = false;
          this.hogarForm.reset();
          this.cargarDatos();
        },
        error: (error) => {
          this.error = error.error.mensaje || 'Error al crear el hogar';
        }
      });
    }
  }

  cerrarModal(): void {
    this.mostrarModalNuevoHogar = false;
  }
}
