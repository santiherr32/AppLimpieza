import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HogarService } from '../../services/hogar/hogar.service';
import { Hogar } from '../../models/hogar.model';

@Component({
  selector: 'app-hogar-page',
  standalone: false,
  templateUrl: './hogar-page.component.html',
  styleUrls: ['./hogar-page.component.css']
})
export class HogarPageComponent implements OnInit {
  hogar: Hogar | null = null;
  modoEdicion = false;
  cargando = true;
  error = '';
  mensajeExito = '';
  hogarForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hogarService: HogarService
  ) {
    this.hogarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarHogar();
  }

  cargarHogar(): void {
    this.cargando = true;
    this.hogarService.obtenerHogar().subscribe({
      next: (hogar) => {
        this.hogar = hogar;
        this.hogarForm.patchValue({
          nombre: hogar.nombre,
          direccion: hogar.direccion
        });
        this.cargando = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el hogar';
        this.cargando = false;
      }
    });
  }

  toggleEdicion(): void {
    this.modoEdicion = !this.modoEdicion;
    if (!this.modoEdicion) {
      this.hogarForm.patchValue({
        nombre: this.hogar?.nombre,
        direccion: this.hogar?.direccion
      });
    }
  }

  guardarCambios(): void {
    if (this.hogarForm.valid) {
      this.hogarService.actualizarHogar(this.hogarForm.value).subscribe({
        next: (hogar) => {
          this.hogar = hogar;
          this.modoEdicion = false;
          this.mensajeExito = 'Hogar actualizado exitosamente';
          this.limpiarMensajes();
        },
        error: (error) => {
          this.error = 'Error al actualizar el hogar';
          this.limpiarMensajes();
        }
      });
    }
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.mensajeExito = '';
      this.error = '';
    }, 3000);
  }
}
