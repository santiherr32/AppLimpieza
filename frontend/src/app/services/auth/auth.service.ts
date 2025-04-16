import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/usuarios';
  private tokenKey = 'auth-token';
  private usuarioSubject = new BehaviorSubject<any>(null);
  public usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuario();
  }

  private cargarUsuario(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.obtenerPerfil().subscribe();
    }
  }

  registrar(usuario: { nombre: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, usuario)
      .pipe(
        tap(respuesta => {
          this.guardarToken(respuesta.token);
          this.usuarioSubject.next(respuesta);
        })
      );
  }

  login(credenciales: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales)
      .pipe(
        tap(respuesta => {
          this.guardarToken(respuesta.token);
          this.usuarioSubject.next(respuesta);
        })
      );
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`)
      .pipe(
        tap(usuario => {
          this.usuarioSubject.next(usuario);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.usuarioSubject.next(null);
  }

  private guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }
}