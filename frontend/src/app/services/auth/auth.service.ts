import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/usuarios';
  private tokenKey = 'auth-token';
  private usuarioSubject = new BehaviorSubject<any>(null);
  private cargandoUsuario = new BehaviorSubject<boolean>(true);

  public usuario$ = this.usuarioSubject.asObservable();
  public cargandoUsuario$ = this.cargandoUsuario.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuario();
  }

  private cargarUsuario(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      this.cargandoUsuario.next(false);
      return;
    }

    this.obtenerPerfil().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al cargar usuario:', error);
        if (error.status === 401) {
          this.logout();
        }
        return of(null);
      }),
      finalize(() => {
        this.cargandoUsuario.next(false);
      })
    ).subscribe(usuario => {
      if (usuario) {
        this.usuarioSubject.next(usuario);
      }
    });
  }

  registrar(usuario: { nombre: string, correo: string, contraseña: string }): Observable<any> {
    this.logout();
    return this.http.post<any>(`${this.apiUrl}/register`, usuario).pipe(
      tap(respuesta => {
        localStorage.setItem(this.tokenKey, respuesta.token);
        this.usuarioSubject.next(respuesta);
      })
    );
  }

  login(credenciales: { correo: string, contraseña: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(respuesta => {
        localStorage.setItem(this.tokenKey, respuesta.token);
        this.usuarioSubject.next(respuesta);
      })
    );
  }

  obtenerPerfil(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/perfil`).pipe(
      tap(usuario => {
        this.usuarioSubject.next(usuario);
      })
    );
  }

  actualizarPerfil(datos: { nombre: string; correo: string; contraseña?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/perfil`, datos).pipe(
      tap(usuarioActualizado => {
        this.usuarioSubject.next(usuarioActualizado);
      })
    );
  }

  estaAutenticado(): boolean {
    return !!this.usuarioSubject.getValue();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.usuarioSubject.next(null);
  }
}