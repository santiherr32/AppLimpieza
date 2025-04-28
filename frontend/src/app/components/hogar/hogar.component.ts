import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HogarService } from '../../services/hogar/hogar.service';

@Component({
  selector: 'app-hogar',
  standalone: false,
  templateUrl: './hogar.component.html',
  styleUrls: ['./hogar.component.css']
})
export class HogarComponent implements OnInit {
  hogarForm: FormGroup;
  hogar: any = null;
  mensajeExito: string = '';
  mensajeError: string = '';
  modoEdicion: boolean = false;

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
    this.hogarService.obtenerHogar().subscribe({
      next: (data) => {
        this.hogar = data;
        if (this.hogar) {
          this.hogarForm.patchValue({
            nombre: this.hogar.nombre,
            direccion: this.hogar.direccion
          });
          this.modoEdicion = true;
        }
      },
      error: (error) => {
        if (error.status !== 404) {
          this.mensajeError = 'Error al cargar el hogar';
        }
      }
    });
  }

  onSubmit(): void {
    if (this.hogarForm.valid) {
      const hogarData = this.hogarForm.value;

      if (this.modoEdicion) {
        this.hogarService.actualizarHogar(hogarData).subscribe({
          next: (response) => {
            this.hogar = response;
            this.mensajeExito = 'Hogar actualizado exitosamente';
            this.limpiarMensajes();
          },
          error: (error) => {
            this.mensajeError = error.error.mensaje || 'Error al actualizar el hogar';
            this.limpiarMensajes();
          }
        });
      } else {
        this.hogarService.crearHogar(hogarData).subscribe({
          next: (response) => {
            this.hogar = response;
            this.modoEdicion = true;
            this.mensajeExito = 'Hogar creado exitosamente';
            this.limpiarMensajes();
          },
          error: (error) => {
            this.mensajeError = error.error.mensaje || 'Error al crear el hogar';
            this.limpiarMensajes();
          }
        });
      }
    }
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    }, 3000);
  }
}
