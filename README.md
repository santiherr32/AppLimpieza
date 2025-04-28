# AppLimpieza

Una aplicación web full-stack para gestión de tareas de limpieza del hogar desarrollada con el stack MEAN (MongoDB, Express, Angular, Node.js).

## Descripción

AppLimpieza permite a los usuarios gestionar y dar seguimiento a las tareas de limpieza de su hogar. Los usuarios pueden crear habitaciones, configurar tareas específicas y establecer horarios personalizados para cada una.

## Características Principales

- Autenticación de usuarios con JWT
- Gestión de hogares (un hogar por usuario)
- Administración de habitaciones
- Creación y seguimiento de tareas de limpieza
- Interfaz responsive con TailwindCSS
- API RESTful
- Protección de rutas

## Demo

- Frontend: [https://santiherr32.github.io/AppLimpieza/](https://santiherr32.github.io/AppLimpieza/)
- Backend: [https://app-limpieza.vercel.app](https://app-limpieza.vercel.app)

## Tecnologías

### Frontend
- Angular 19.2.0
- TailwindCSS 4.1.4
- RxJS 7.8.0
- TypeScript 5.7.2

### Backend
- Node.js
- Express.js
- MongoDB
- JWT
- Mongoose

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/santiherr32/AppLimpieza.git

# Frontend
cd AppLimpieza/frontend
npm install
npm start

# Backend
cd ../backend
npm install
# Crear archivo .env con las variables necesarias
npm start
```

### Variables de Entorno (Backend)

Crear un archivo `.env` en la carpeta backend:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/appLimpieza
JWT_SECRET=tu_clave_secreta
```

## Estructura del Proyecto

```
AppLimpieza/
├── frontend/           # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   └── README.md
│
└── backend/           # Servidor Express
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── app.js
    └── README.md
```

## Scripts Disponibles

### Frontend
```bash
npm start          # Iniciar servidor de desarrollo
npm run build     # Construir para producción
npm run test      # Ejecutar tests
ng deploy         # Desplegar en GitHub Pages
```

### Backend
```bash
npm start         # Iniciar servidor
```

## Despliegue

- Frontend: Desplegado en GitHub Pages
- Backend: Desplegado en Vercel

## URLs de Desarrollo

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:3000`

## Licencia

MIT

## Autor

Santiago Herrera
- GitHub: [@santiherr32](https://github.com/santiherr32)