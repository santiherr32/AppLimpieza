import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { HogarService } from './services/hogar/hogar.service';
import { HabitacionService } from './services/habitacion/habitacion.service';
import { TareaService } from './services/tarea/tarea.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppLimpieza';

  constructor(
    private authService: AuthService,
    private hogarService: HogarService,
    private habitacionService: HabitacionService,
    private tareaService: TareaService
  ) { }
}
