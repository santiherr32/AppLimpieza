# AppLimpieza-backend

Backend para una aplicación de gestión de tareas de limpieza desarrollada con el stack MEAN.

## Descripción

AppLimpieza es una aplicación que permite a los usuarios gestionar tareas de limpieza para diferentes habitaciones de su hogar. Los usuarios pueden crear diferentes habitaciones, configurar tareas específicas y establecer horarios para cada una.

## Instalación

1. Clona este repositorio:
   ```
   git clone https://github.com/tu-usuario/AppLimpieza-backend.git
   cd AppLimpieza-backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/appLimpieza
   ```

## Iniciar el servidor

Para iniciar el servidor en modo desarrollo:

```
node app.js
```

O si tienes nodemon instalado:

```
nodemon app.js
```

El servidor se iniciará en `http://localhost:3000`

## Endpoints

- `GET /`: Endpoint inicial para verificar que el servidor está funcionando correctamente.

## Base de datos

El proyecto utiliza MongoDB como base de datos. Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema antes de iniciar el servidor.

Para verificar la conexión a MongoDB:

1. Asegúrate de que el servicio MongoDB esté activo:
   ```
   net start MongoDB  # En Windows
   ```

2. Conéctate usando mongosh:
   ```
   mongosh
   use appLimpieza
   ```

## Estructura de carpetas

```
backend/
  ├── models/         # Modelos de Mongoose
  ├── app.js          # Punto de entrada principal
  ├── .env            # Variables de entorno
  └── .gitignore      # Archivos ignorados por Git
```

## Modelos

- **Usuario**: Gestión de usuarios con roles.
- **Hogar**: Representa el hogar del usuario.
- **Habitación**: Las diferentes habitaciones del hogar.
- **Tarea**: Tareas de limpieza con horarios y frecuencias.