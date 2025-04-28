# AppLimpieza Frontend

Frontend para una aplicación de gestión de tareas de limpieza desarrollada con Angular y TailwindCSS.

## Descripción

AppLimpieza es una aplicación que permite a los usuarios gestionar tareas de limpieza para diferentes habitaciones de su hogar. Los usuarios pueden crear diferentes habitaciones, configurar tareas específicas y establecer horarios para cada una.

## Características

- Autenticación de usuarios con JWT
- Gestión de hogares (un hogar por usuario)
- Administración de habitaciones por hogar
- Creación y seguimiento de tareas de limpieza
- Interfaz responsive con TailwindCSS
- Protección de rutas con AuthGuard

## Requisitos Previos

- Node.js (v18 o superior)
- npm (incluido con Node.js)
- Angular CLI v19.2.7

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/santiherr32/AppLimpieza.git

# Navegar al directorio del frontend
cd AppLimpieza/frontend

# Instalar dependencias
npm install
```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run start

# Construir el proyecto
npm run build

# Ejecutar tests unitarios
npm run test

# Modo watch para desarrollo
npm run watch

# Desplegar en GitHub Pages
ng add angular-cli-ghpages
ng deploy
```

## Estructura del Proyecto

```
frontend/
  ├── src/
  │   ├── app/
  │   │   ├── components/     # Componentes de la aplicación
  │   │   ├── guards/         # Guards para protección de rutas
  │   │   ├── interceptors/   # Interceptores HTTP
  │   │   ├── services/       # Servicios de la aplicación
  │   │   └── models/         # Interfaces y tipos
  │   ├── assets/            # Recursos estáticos
  │   └── environments/      # Configuraciones por entorno
  ├── angular.json          # Configuración de Angular
  └── tailwind.config.js   # Configuración de TailwindCSS
```

## Tecnologías Principales

- Angular 19.2.0
- TailwindCSS 4.1.4
- RxJS 7.8.0
- Angular CLI 19.2.7
- TypeScript 5.7.2

## Desarrollo

El servidor de desarrollo se iniciará en `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias cualquiera de los archivos fuente.

## Producción

La aplicación está desplegada en GitHub Pages:
- URL: `https://santiherr32.github.io/AppLimpieza/`

## Conexión con el Backend

La aplicación se conecta a un backend desarrollado en Node.js + Express + MongoDB:
- Desarrollo: `http://localhost:3000`
- Producción: `https://app-limpieza.vercel.app`

## Variables de Entorno

El proyecto utiliza dos configuraciones de entorno:
- `environment.ts` - Desarrollo local
- `environment.ts` - Producción (GitHub Pages)

## Autenticación

La autenticación se maneja mediante JWT (JSON Web Tokens):
- Los tokens se almacenan en localStorage
- Se incluyen en las peticiones HTTP mediante un interceptor
- Las rutas protegidas utilizan AuthGuard
