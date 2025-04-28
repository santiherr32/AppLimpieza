import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HogarService {
  private apiUrl = environment.apiUrl + '/api/hogares';

  constructor(private http: HttpClient) { }

  crearHogar(hogar: { nombre: string, direccion: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, hogar);
  }

  obtenerHogar(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  actualizarHogar(hogar: { nombre: string, direccion: string }): Observable<any> {
    return this.http.put<any>(this.apiUrl, hogar);
  }
}