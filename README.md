This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# API de tareas con Next.js, Supabase y Vercel

API REST de tareas (CRUD) hecha con Next.js, con base de datos en Supabase y deploy automático en Vercel. Incluye una interfaz web con una consola que muestra las peticiones y respuestas en vivo.

Sirve como base para practicar el flujo completo: ramas de desarrollo en Git, base de datos en la nube y despliegue automático.

## Tecnologías

| Tecnología | Para qué se usa |
|---|---|
| Next.js | Framework: la interfaz y las rutas de la API |
| Supabase | Base de datos PostgreSQL en la nube |
| Vercel | Hosting y deploy automático desde GitHub |
| Git y GitHub | Control de versiones y ramas |

## Estructura del proyecto

```
Expo_Vercel/
├── app/
│   ├── page.js                  ← interfaz de tareas y consola de peticiones
│   └── api/
│       ├── salud/route.js       ← GET: prueba la conexión con Supabase
│       └── tareas/
│           ├── route.js         ← GET y POST
│           └── [id]/route.js    ← PUT y DELETE
├── lib/
│   └── supabase.js              ← conexión a Supabase (se crea una sola vez)
├── .env.example                 ← nombres de las variables, sin valores
└── package.json
```

Los archivos `AGENTS.md` y `CLAUDE.md` los genera `create-next-app` y no afectan el proyecto.

## Requisitos

- Node.js 20 o superior
- Git
- Cuenta en GitHub, Supabase y Vercel (los tres tienen plan gratuito)

## Paso 1: Clonar e instalar

```bash
git clone https://github.com/4bram/Expo_Vercel.git
cd Expo_Vercel
npm install
```

## Paso 2: Crear tu base de datos en Supabase

Cada persona usa su propio proyecto de Supabase.

1. En supabase.com crea un proyecto nuevo y guarda la contraseña de la base de datos.
2. Abre SQL Editor, pega esto y da Run:

```sql
create table public.tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  completada boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tareas enable row level security;

insert into public.tareas (titulo)
values ('Aprender Vercel'), ('Aprender Supabase');
```

3. Ve a Project Settings → API Keys y copia dos datos:
   - Project URL (algo como `https://xxxx.supabase.co`)
   - Secret key (empieza con `sb_secret_`; si ves llaves legacy, es la `service_role`)

Importante: usa la secret key, no la publishable. La tabla tiene RLS activado, y con la llave pública la API devuelve una lista vacía sin marcar error.

## Paso 3: Variables de entorno

Copia el archivo de ejemplo con el nombre `.env.local`:

```bash
# Windows (PowerShell)
copy .env.example .env.local

# Mac / Linux
cp .env.example .env.local
```

Ábrelo y llena tus datos, sin comillas ni espacios:

```
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_KEY=sb_secret_tu_llave
```

`.env.local` está ignorado por Git, así que no se sube a GitHub.

## Paso 4: Ejecutar en local

```bash
npm run dev
```

Abre `http://localhost:3000`. Si cambias `.env.local`, detén el servidor con Ctrl+C y vuelve a correr `npm run dev`, porque las variables solo se leen al arrancar.

## Rutas de la API

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/salud` | Verifica la conexión con Supabase |
| GET | `/api/tareas` | Lista todas las tareas |
| POST | `/api/tareas` | Crea una tarea. Cuerpo: `{"titulo": "..."}` |
| PUT | `/api/tareas/:id` | Edita una tarea. Cuerpo: `{"titulo": "...", "completada": true}` |
| DELETE | `/api/tareas/:id` | Elimina una tarea |

Pruebas en PowerShell (cambia la URL por la tuya):

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas" -Method Post -ContentType "application/json" -Body '{"titulo":"Nueva tarea"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas/3" -Method Put -ContentType "application/json" -Body '{"completada":true}'
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas/3" -Method Delete
```

## Interfaz y consola de peticiones

La página principal (`/`) permite agregar, marcar como completadas y eliminar tareas. Debajo tiene una consola que muestra cada petición que hace la interfaz: la hora, el método, la ruta, el código de estado, el tiempo de respuesta, la solicitud enviada y la respuesta recibida. Con el botón Limpiar se vacía.

Al cargar la página verás un `GET /api/tareas`. Cada acción manda su petición (`POST`, `PUT` o `DELETE`) y luego un `GET` para refrescar la lista.

## Paso 5: Desplegar en Vercel

1. Sube tu copia del proyecto a tu propio repo de GitHub.
2. En vercel.com: Add New → Project → importa el repo.
3. Deja el preset en Next.js y escribe el Project Name en minúsculas.
4. En Environment Variables agrega `SUPABASE_URL` y `SUPABASE_KEY` con tus valores, en Production and Preview. No actives la integración opcional de Supabase que ofrece Vercel, porque ya configuraste las variables a mano.
5. Da Deploy.
6. Confirma en Settings → Environments que Production siga la rama `main`.

Desde ese momento, cada `git push` a `main` publica en producción automáticamente. Los pushes a otras ramas generan un preview con URL temporal.

Las variables solo se aplican a deploys nuevos. Si las cambias, ve a Deployments → último deploy → menú ⋯ → Redeploy.

## Flujo de ramas

El proyecto se construyó con ramas de desarrollo que se unen en `main`, la rama de deploy automático, sin Pull Requests:

| Rama | Qué agrega |
|---|---|
| `conexion-supabase` | `lib/supabase.js` y la ruta `/api/salud` |
| `listar-tareas` | `GET /api/tareas` |
| `crear-tareas` | `POST /api/tareas` |
| `editar-eliminar` | `PUT` y `DELETE` en `/api/tareas/[id]` |
| `interfaz` | Página de tareas |
| `consola` | Consola de peticiones |
| `main` | Rama de deploy automático |

Ciclo que se repite en cada rama:

```bash
git checkout main
git checkout -b NOMBRE-DE-LA-RAMA
# ...programas los cambios...
git add .
git commit -m "mensaje"
git push -u origin NOMBRE-DE-LA-RAMA   # genera un preview en Vercel
git checkout main
git merge NOMBRE-DE-LA-RAMA
git push origin main                   # despliega a producción
```

Une cada rama a `main` antes de empezar la siguiente, para que no haya conflictos en los archivos compartidos.

## Problemas comunes

| Qué pasa | Causa probable | Solución |
|---|---|---|
| La lista sale vacía (`[]`) y no hay error | Estás usando la llave pública | Usa la secret key (`sb_secret_...`) |
| Error de variable faltante al correr en local | No existe `.env.local` o está mal escrito | Revisa que esté en la raíz, junto a `package.json` |
| Cambié la llave y sigue igual | El servidor o el deploy no se reiniciaron | Reinicia `npm run dev` o haz Redeploy en Vercel |
| `PUT` o `DELETE` responde 500 con `"undefined"` | La carpeta de la ruta no se llama `[id]` | Renómbrala a `[id]`, con los corchetes |
| Error al correr la página | Hay un `page.tsx` y un `page.js` a la vez | Borra `app/page.tsx` |
| Vercel muestra la página de ejemplo de Next.js | Estás viendo producción antes del merge a `main` | Une la rama a `main` y haz push |
| El preview pide iniciar sesión | Vercel protege los previews por defecto | Entra con tu cuenta de Vercel |

## Seguridad

- No subas nunca tus llaves a GitHub ni las pegues en capturas o chats. La secret key da acceso completo a tu base de datos.
- Si una llave se expone, regenérala en Supabase y actualiza la variable en `.env.local` y en Vercel.
- Esta API no tiene autenticación: cualquiera que conozca la URL puede leer y modificar las tareas. Está pensada solo para aprender, así que no la uses con datos reales.

## Nota sobre el lenguaje

El proyecto se creó con `create-next-app`, que genera archivos de TypeScript (como `layout.tsx`). El código de la API y de la interfaz está en JavaScript, y Next.js acepta ambos lenguajes en el mismo proyecto.
