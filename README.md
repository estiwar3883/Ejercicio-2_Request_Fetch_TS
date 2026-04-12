# Ejercicio 2 - Request Fetch TS

Proyecto monorepo con dos aplicaciones:

- `backend-next.js`: Backend con Next.js y API Routes.
- `frontend.ts`: Frontend con Vite y TypeScript.

> Nota: el `package.json` raíz declara workspaces `frontend` y `backend`, pero las carpetas reales son `frontend.ts` y `backend-next.js`. Por eso es más seguro ejecutar los comandos directamente desde cada subcarpeta.

---

## Requisitos

- Node.js 18+ (o la versión recomendada por tu entorno)
- npm disponible en el sistema

---

## Instalación

Instalar dependencias en cada subproyecto:

```bash
cd c:\Users\Nico\Desktop\Ejercicio-2_Request_Fetch_TS\backend-next.js
npm install

cd ..\frontend.ts
npm install
```

Si prefieres hacerlo desde la raíz, ten en cuenta que el workspace raíz no coincide con las carpetas reales, así que lo más confiable es instalar desde cada carpeta.

---

## Backend: Next.js (`backend-next.js`)

### Qué hace

El backend expone una API REST simple en:

- `GET /api/users` → devuelve la lista de usuarios
- `POST /api/users` → crea un nuevo usuario y lo guarda en la base de datos local

### Ejecutar

```bash
cd c:\Users\Nico\Desktop\Ejercicio-2_Request_Fetch_TS\backend-next.js
npm run dev
```

Luego abre:

- `http://localhost:3000`

La API de usuarios queda disponible en:

- `http://localhost:3000/api/users`

### Scripts disponibles

- `npm run dev` — servidor de desarrollo
- `npm run build` — construir la app para producción
- `npm run start` — arrancar la app construida
- `npm run lint` — ejecutar ESLint

---

## Frontend: Vite + TypeScript (`frontend.ts`)

### Qué hace

El frontend tiene lógica para consumir APIs usando un servicio genérico `ApiService<T>`:

- Consume la API local de usuarios `http://localhost:3000/api/users`
- Consume `https://jsonplaceholder.typicode.com/posts`
- Consume `https://rickandmortyapi.com/api/character`

### Ejecutar

```bash
cd c:\Users\Nico\Desktop\Ejercicio-2_Request_Fetch_TS\frontend.ts
npm run dev
```

Luego abre el servidor de Vite en el puerto que indique la terminal (por defecto `http://localhost:5173`).

### Scripts disponibles

- `npm run dev` — servidor de desarrollo de Vite
- `npm run build` — compilar para producción
- `npm run preview` — previsualizar la app construida

---

## Estructura principal del proyecto

```
Ejercicio-2_Request_Fetch_TS/
├── backend-next.js/         # Backend Next.js
│   ├── package.json
│   ├── src/app/page.tsx
│   ├── src/app/api/users/route.ts
│   └── src/lib/db.ts
├── frontend.ts/            # Frontend Vite + TS
│   ├── package.json
│   ├── src/service/ApiService.ts
│   ├── src/logic/getUsers.ts
│   ├── src/models/Usuario.ts
│   └── src/dto/UsuarioDTO.ts
└── package.json             # Monorepo raíz (workspaces)
```

---

## Flujo de uso recomendado

1. Ejecuta el backend:
   - `cd backend-next.js`
   - `npm run dev`
2. Ejecuta el frontend en otra terminal:
   - `cd frontend.ts`
   - `npm run dev`
3. Abre el frontend en el puerto de Vite y prueba las peticiones.

---

## Notas importantes

- La API local de usuarios usa un archivo de datos interno y responde con JSON.
- El frontend está preparado para consumir varias APIs con una capa genérica de manejo de respuestas.
- Si hay problemas de CORS, verifica que el backend esté corriendo en `http://localhost:3000` antes de abrir el frontend.

---

## Extensiones útiles

- `Next.js` para el backend.
- `Vite` y `TypeScript` para el frontend.
- `Tailwind CSS` está presente en el backend como dependencia de desarrollo.

---

## Cómo contribuir

1. Añade nuevas rutas o recursos en `backend-next.js/src/app/api`
2. Extiende el servicio genérico en `frontend.ts/src/service/ApiService.ts`
3. Prueba cada subproyecto por separado

---

## Preguntas frecuentes

### ¿Puedo ejecutar todo desde la raíz?

Puedes intentar con `npm install` en la raíz, pero el workspace raíz no coincide con las carpetas reales. Para evitar errores, usa los comandos dentro de `backend-next.js` y `frontend.ts`.

### ¿Dónde está el servicio que hace las peticiones?

`frontend.ts/src/service/ApiService.ts`

### ¿Dónde está la API de usuarios?

`backend-next.js/src/app/api/users/route.ts`
