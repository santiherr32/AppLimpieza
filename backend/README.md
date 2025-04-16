# AppLimpieza-backend

Backend para una aplicación de gestión de tareas de limpieza desarrollada con el stack MEAN.

## Descripción

AppLimpieza es una aplicación que permite a los usuarios gestionar tareas de limpieza para diferentes habitaciones de su hogar. Los usuarios pueden crear diferentes habitaciones, configurar tareas específicas y establecer horarios para cada una.

## Características

- Autenticación de usuarios con JWT
- Gestión de hogares (un hogar por usuario)
- Administración de habitaciones por hogar
- Creación y seguimiento de tareas de limpieza con diferentes frecuencias
- API RESTful para consumo desde el frontend Angular

## Instalación

1. Clona el repositorio de la aplicación y dirigete a la carpeta backend:
   ```
   git clone https://github.com/santiherr32/AppLimpieza.git
   cd backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la carpeta backend con el siguiente contenido:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/appLimpieza
   JWT_SECRET=aqui_una_clave_secreta_muy_segura
   ```
   
   Nota: Reemplaza `aqui_una_clave_secreta_muy_segura` con una clave segura y única.

## Iniciar el servidor

Para iniciar el servidor corre:

```
npm start
```

El servidor se iniciará en `http://localhost:3000`

## Endpoints de la API

### Usuarios

- `POST /api/usuarios/register` - Registrar un nuevo usuario
- `POST /api/usuarios/login` - Iniciar sesión
- `GET /api/usuarios/perfil` - Obtener perfil del usuario autenticado

### Hogares

- `POST /api/hogares` - Crear un nuevo hogar
- `GET /api/hogares` - Obtener el hogar del usuario
- `PUT /api/hogares` - Actualizar el hogar del usuario

### Habitaciones

- `POST /api/habitaciones` - Crear una nueva habitación
- `GET /api/habitaciones` - Obtener todas las habitaciones del hogar
- `GET /api/habitaciones/:id` - Obtener una habitación específica
- `PUT /api/habitaciones/:id` - Actualizar una habitación
- `DELETE /api/habitaciones/:id` - Eliminar una habitación

### Tareas

- `POST /api/tareas` - Crear una nueva tarea
- `GET /api/tareas/habitacion/:habitacionId` - Obtener tareas de una habitación
- `GET /api/tareas/pendientes` - Obtener todas las tareas pendientes
- `PUT /api/tareas/completar/:tareaId` - Marcar tarea como completada
- `DELETE /api/tareas/:tareaId` - Eliminar una tarea

## Base de datos

El proyecto utiliza MongoDB como base de datos. Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema antes de iniciar el servidor.

Para verificar la conexión a MongoDB:

1. Asegúrate de que el servicio MongoDB esté activo:
   ```
   net start MongoDB  # En Windows
   ```

2. Conéctate usando mongosh y creando la base de datos:
   ```
   mongosh
   use appLimpieza
   ```

## Estructura de carpetas

```
backend/
  ├── controllers/    # Controladores para la lógica de negocio
  ├── middleware/     # Middleware personalizado (autenticación)
  ├── models/         # Modelos de Mongoose
  ├── routes/         # Definición de rutas API
  ├── app.js          # Punto de entrada principal
  ├── .env            # Variables de entorno
  └── .gitignore      # Archivos ignorados por Git
```

## Modelos

- **Usuario**: Gestión de usuarios con roles.
- **Hogar**: Representa el hogar del usuario.
- **Habitación**: Las diferentes habitaciones del hogar.
- **Tarea**: Tareas de limpieza con horarios y frecuencias.

## Autenticación

La API utiliza JSON Web Tokens (JWT) para la autenticación. Para acceder a las rutas protegidas, debes incluir el token en el encabezado de la solicitud:

```
Authorization: Bearer tu_token_jwt
```

## Dependencias principales

- Express.js: Framework web
- Mongoose: ODM para MongoDB
- bcryptjs: Encriptación de contraseñas
- jsonwebtoken: Generación y verificación de JWT
- cors: Middleware para habilitar CORS
- dotenv: Carga de variables de entorno