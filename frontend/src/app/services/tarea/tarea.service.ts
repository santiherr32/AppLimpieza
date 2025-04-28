import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = environment.apiUrl + '/api/tareas';

  constructor(private http: HttpClient) { }

  crearTarea(tarea: {
    nombre: string,
    descripcion: string,
    habitacionId: string,
    frecuencia: string,
    diasSemana?: string[],
    horario?: string,
    duracionEstimada?: number,
    prioridad?: string
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  obtenerTareasPorHabitacion(habitacionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/habitacion/${habitacionId}`);
  }

  obtenerTareasPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendientes`);
  }

  completarTarea(tareaId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/completar/${tareaId}`, {});
  }

  descompletarTarea(tareaId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/descompletar/${tareaId}`, {});
  }

  eliminarTarea(tareaId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${tareaId}`);
  }
}