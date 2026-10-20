# API de películas de Dragon Ball

API REST en Node.js y PostgreSQL. En local, Postgres corre en Docker con un volumen persistente; en Render se aprovisiona una base PostgreSQL administrada.

## Ejecutar localmente

Requisitos: Node.js 20 o superior, Docker Desktop con Compose y Git.

1. Copia las variables de ejemplo a `.env` (`copy .env.example .env` en CMD o `Copy-Item .env.example .env` en PowerShell).
2. Inicia Postgres: `docker compose up -d`.
3. Instala dependencias: `npm install`.
4. Crea la tabla y carga el catálogo inicial: `npm run db:setup`.
5. Inicia la API: `npm run dev`.

La base vive en el volumen Docker `postgres_data`. `docker compose down` la conserva; `docker compose down -v` borra los datos.

## Rutas

- `GET /health`: estado de la API y la base.
- `GET /api/peliculas`: catálogo de películas.
- `GET /api/peliculas/:id`: película por identificador.
- `GET /api/peliculas?anio=2018`: filtrar por año.

El catálogo inicial contiene títulos de las películas de Dragon Ball, Dragon Ball Z y Dragon Ball Super. Puedes probar `http://localhost:3000/api/peliculas/1`.

## n8n

En un nodo **HTTP Request**, usa método `GET` y la URL pública de Render, por ejemplo `https://TU-SERVICIO.onrender.com/api/peliculas/1`; selecciona respuesta JSON. La API permite CORS. Esta versión de consulta no lleva autenticación.

## GitHub y Render

1. Crea un repositorio vacío en GitHub, conecta esta carpeta y sube la rama `main`.
2. En Render crea un Blueprint desde el repositorio. `render.yaml` configura el servicio Node y la base PostgreSQL; el primer despliegue carga el catálogo inicial.
3. Prueba `/health` y `/api/peliculas/1` en la URL de Render.

No subas `.env` ni credenciales al repositorio. En Render la API usa la base PostgreSQL administrada; el volumen Docker local no se comparte con el servicio en la nube.
