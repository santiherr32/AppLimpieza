import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  perfilForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.minLength(6)]]
    });

    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.authService.obtenerPerfil().subscribe({
      next: (usuario) => {
        this.perfilForm.patchValue({
          nombre: usuario.nombre,
          correo: usuario.correo
        });
      },
      error: (err) => this.mensajeError = 'Error al cargar los datos del usuario'
    });
  }

  actualizarPerfil(): void {
    if (this.perfilForm.valid) {
      this.authService.actualizarPerfil(this.perfilForm.value).subscribe({
        next: () => this.mensajeExito = 'Perfil actualizado correctamente',
        error: (err) => this.mensajeError = err.error?.mensaje || 'Error al actualizar el perfil'
      });
    }
  }
}
