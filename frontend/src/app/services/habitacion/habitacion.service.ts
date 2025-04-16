import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private apiUrl = environment.apiUrl + '/api/habitaciones';

  constructor(private http: HttpClient) { }

  crearHabitacion(habitacion: {
    nombre: string,
    descripcion: string,
    tipoHabitacion: string
  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, habitacion);
  }

  obtenerHabitaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerHabitacion(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarHabitacion(id: string, habitacion: {
    nombre: string,
    descripcion: string,
    tipoHabitacion: string
  }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminarHabitacion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}