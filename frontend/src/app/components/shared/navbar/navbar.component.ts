import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  estaAutenticado(): boolean {
    // Por ahora, simplemente verificamos si hay un token en localStorage
    return !!localStorage.getItem('token');
  }

  cerrarSesion(): void {
    // Eliminar el token y cualquier información de usuario del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    
    // Redirigir al inicio
    this.router.navigate(['/inicio']);
  }
}