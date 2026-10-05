# API de Tareas con Next.js, Supabase y Vercel

Aplicación web de tareas desarrollada con Next.js, conectada a una base de datos PostgreSQL mediante Supabase y preparada para su despliegue automático mediante Vercel.

El proyecto implementa una API REST con operaciones CRUD y una interfaz web que permite visualizar las tareas y las peticiones realizadas a la API.

Este repositorio será utilizado como base para realizar una práctica sobre despliegue de aplicaciones web, Preview Deployments y Continuous Deployment utilizando Git, GitHub y Vercel.

---

# 1. Descripción del proyecto

La aplicación permite administrar una lista de tareas mediante las siguientes operaciones:

- Consultar tareas.
- Crear tareas.
- Marcar tareas como completadas.
- Editar tareas.
- Eliminar tareas.
- Consultar las peticiones y respuestas realizadas desde la interfaz.

La arquitectura general del proyecto es la siguiente:

```text
Usuario / Navegador
        |
        v
Aplicación Next.js
        |
        v
    API REST
        |
        v
    Supabase
        |
        v
   PostgreSQL
```

Posteriormente, la aplicación será publicada mediante Vercel utilizando un repositorio de GitHub.

```text
Desarrollador
      |
      | git push
      v
   GitHub
      |
      v
   Vercel
      |
      v
Aplicación publicada
```

---

# 2. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| Next.js | Framework utilizado para la interfaz y las rutas de la API |
| Node.js | Entorno de ejecución |
| NPM | Administración de dependencias |
| Supabase | Servicios backend y acceso a PostgreSQL |
| PostgreSQL | Persistencia de las tareas |
| Git | Control de versiones |
| GitHub | Repositorio remoto |
| Vercel | Despliegue y publicación automática de la aplicación |

---

# 3. Estructura del proyecto

La estructura principal del repositorio es la siguiente:

```text
Expo_Vercel/
├── app/
│   ├── page.js
│   │
│   └── api/
│       ├── salud/
│       │   └── route.js
│       │
│       └── tareas/
│           ├── route.js
│           │
│           └── [id]/
│               └── route.js
│
├── lib/
│   └── supabase.js
│
├── .env.example
├── package.json
└── README.md
```

### Archivos principales

| Archivo | Función |
|---|---|
| `app/page.js` | Interfaz de tareas y consola de peticiones |
| `app/api/salud/route.js` | Comprueba la conexión con Supabase |
| `app/api/tareas/route.js` | Implementa GET y POST |
| `app/api/tareas/[id]/route.js` | Implementa PUT y DELETE |
| `lib/supabase.js` | Configura la conexión con Supabase |
| `.env.example` | Define los nombres de las variables necesarias |
| `package.json` | Dependencias y scripts del proyecto |

Los archivos adicionales generados automáticamente por `create-next-app` forman parte de la configuración del proyecto y no requieren modificaciones para realizar esta práctica.

---

# 4. Requisitos

Antes de comenzar verifica que tu equipo tenga instalado:

- Node.js 20 o superior.
- NPM.
- Git.
- Visual Studio Code o algún editor de código.

También será necesario contar con:

- Una cuenta de GitHub.
- Una cuenta de Supabase.
- Una cuenta de Vercel.

Puedes verificar las herramientas instaladas mediante:

```bash
node --version
npm --version
git --version
```

Si los comandos muestran correctamente las versiones instaladas, puedes continuar.

---

# 5. Preparación del entorno

Antes de comenzar la práctica de Vercel se deberá preparar y comprobar el funcionamiento de la aplicación de manera local.

---

## 5.1 Clonar el repositorio

Clona el repositorio proporcionado para la práctica:

```bash
git clone https://github.com/4bram/Expo_Vercel.git
```

Ingresa al directorio:

```bash
cd Expo_Vercel
```

Instala las dependencias:

```bash
npm install
```

Una vez finalizada la instalación, el proyecto estará disponible localmente.

---

## 5.2 Crear un proyecto en Supabase

Cada alumno deberá utilizar su propio proyecto de Supabase.

Ingresa a Supabase y crea un nuevo proyecto.

Espera a que termine el proceso de configuración antes de continuar.

Una vez creado, abre:

```text
SQL Editor
```

Crea una nueva consulta y ejecuta:

```sql
create table public.tareas (
  id bigint generated always as identity primary key,
  titulo text not null,
  completada boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tareas enable row level security;

insert into public.tareas (titulo)
values
('Aprender Vercel'),
('Aprender Supabase');
```

Esto creará la tabla `tareas` con la siguiente estructura:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | bigint | Identificador único |
| `titulo` | text | Descripción de la tarea |
| `completada` | boolean | Estado de la tarea |
| `created_at` | timestamptz | Fecha y hora de creación |

También se crearán dos registros iniciales:

```text
Aprender Vercel
Aprender Supabase
```

---

## 5.3 Obtener las credenciales de Supabase

Dentro de la configuración de tu proyecto de Supabase localiza la información de la API.

Se necesitarán:

```text
Project URL
Secret key
```

La aplicación utiliza estas variables:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

Para este proyecto se utiliza la Secret key del lado del servidor.

No utilices la Publishable key para esta configuración, ya que la tabla tiene Row Level Security habilitado y las rutas del proyecto están preparadas para trabajar del lado servidor con la Secret key.

### Importante

La Secret key es una credencial privada.

Nunca debe:

- Subirse a GitHub.
- Escribirse directamente en el código.
- Colocarse en componentes ejecutados en el navegador.
- Aparecer en capturas.
- Compartirse públicamente.

---

## 5.4 Configurar las variables de entorno

En la raíz del proyecto encontrarás:

```text
.env.example
```

Crea una copia llamada:

```text
.env.local
```

### Windows PowerShell

```powershell
copy .env.example .env.local
```

### Linux, WSL o macOS

```bash
cp .env.example .env.local
```

Abre `.env.local` y agrega los valores correspondientes a tu proyecto:

```env
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_KEY=sb_secret_tu_llave
```

Guarda el archivo.

`.env.local` está ignorado por Git, por lo que no deberá enviarse al repositorio.

Si modificas posteriormente las variables de entorno, detén el servidor con:

```text
Ctrl + C
```

y vuelve a ejecutarlo.

---

## 5.5 Ejecutar la aplicación localmente

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre desde el navegador:

```text
http://localhost:3000
```

Si la conexión con Supabase funciona correctamente deberán aparecer las tareas:

```text
Aprender Vercel
Aprender Supabase
```

---

# 6. Funcionamiento de la API

La aplicación contiene una API REST para administrar las tareas.

## Rutas disponibles

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/salud` | Verifica la conexión con Supabase |
| GET | `/api/tareas` | Obtiene todas las tareas |
| POST | `/api/tareas` | Crea una nueva tarea |
| PUT | `/api/tareas/:id` | Modifica una tarea |
| DELETE | `/api/tareas/:id` | Elimina una tarea |

### Ejemplo de POST

```json
{
  "titulo": "Nueva tarea"
}
```

### Ejemplo de PUT

```json
{
  "titulo": "Tarea modificada",
  "completada": true
}
```

---

## 6.1 Pruebas opcionales desde PowerShell

También se pueden probar las rutas directamente desde PowerShell.

### Crear una tarea

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas" -Method Post -ContentType "application/json" -Body '{"titulo":"Nueva tarea"}'
```

### Actualizar una tarea

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas/3" -Method Put -ContentType "application/json" -Body '{"completada":true}'
```

### Eliminar una tarea

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tareas/3" -Method Delete
```

El identificador utilizado deberá cambiarse de acuerdo con los registros existentes en la base de datos.

---

# 7. Interfaz y consola de peticiones

La página principal permite:

- Consultar las tareas.
- Crear nuevas tareas.
- Marcar tareas como completadas.
- Eliminar tareas.

Debajo de la interfaz se encuentra una consola que permite observar las peticiones realizadas por la aplicación.

La consola muestra información como:

- Hora de la petición.
- Método HTTP.
- Ruta.
- Código de estado.
- Tiempo de respuesta.
- Solicitud enviada.
- Respuesta recibida.

Al cargar la aplicación se realizará una petición:

```text
GET /api/tareas
```

Al realizar operaciones desde la interfaz podrán observarse peticiones como:

```text
POST /api/tareas
PUT /api/tareas/3
DELETE /api/tareas/3
```

Después de una modificación también se ejecutará nuevamente:

```text
GET /api/tareas
```

para actualizar la información mostrada.

---

# Práctica: Despliegue automático con Vercel

# 8. Objetivo de la práctica

Implementar el despliegue de una aplicación Next.js conectada con Supabase utilizando GitHub y Vercel.

Durante la práctica se comprobarán los siguientes conceptos:

- Deployment.
- Variables de entorno.
- Production Deployment.
- Preview Deployment.
- Integración entre GitHub y Vercel.
- Continuous Deployment.
- Persistencia de datos con Supabase.

Al finalizar se deberá haber implementado el siguiente flujo:

```text
Desarrollador
      |
      | git push
      v
   GitHub
      |
      v
   Vercel
      |
      v
Aplicación Web
      |
      v
  Supabase
      |
      v
 PostgreSQL
```

---

# 9. Comprobar la aplicación antes del despliegue

Antes de trabajar con Vercel comprueba nuevamente que la aplicación se ejecute correctamente:

```bash
npm run dev
```

Abre:

```text
http://localhost:3000
```

Desde la interfaz crea una tarea:

```text
Realizar práctica de Vercel
```

Después:

1. Crea la tarea.
2. Márcala como completada.
3. Observa las peticiones de la consola.
4. Elimina una tarea de prueba.

### Evidencia 1

Tomar una captura donde se observe:

- La aplicación funcionando en `localhost`.
- La lista de tareas.
- La tarea creada.
- La consola de peticiones.

---

# 10. Crear un repositorio propio en GitHub

Cada alumno deberá utilizar su propio repositorio para realizar los deployments.

El proyecto clonado mantiene inicialmente la referencia al repositorio original.

Comprueba la configuración:

```bash
git remote -v
```

Elimina el repositorio remoto original:

```bash
git remote remove origin
```

Comprueba nuevamente:

```bash
git remote -v
```

Ahora crea un repositorio vacío en GitHub.

Nombre sugerido:

```text
practica-vercel
```

No agregues un nuevo README, `.gitignore` o licencia desde GitHub, debido a que el proyecto ya contiene esos archivos.

Copia la URL de tu repositorio.

Conecta el proyecto:

```bash
git remote add origin URL_DE_TU_REPOSITORIO
```

Ejemplo:

```bash
git remote add origin https://github.com/TU-USUARIO/practica-vercel.git
```

Verifica:

```bash
git remote -v
```

Asegúrate de utilizar `main`:

```bash
git branch -M main
```

Sube el proyecto:

```bash
git push -u origin main
```

### Evidencia 2

Tomar una captura del repositorio personal en GitHub mostrando los archivos del proyecto.

---

# 11. Importar el proyecto en Vercel

Ingresa a Vercel con tu cuenta.

Selecciona:

```text
Add New
>
Project
```

Busca el repositorio creado anteriormente:

```text
practica-vercel
```

Selecciona:

```text
Import
```

Vercel deberá detectar automáticamente:

```text
Framework Preset: Next.js
```

Antes de realizar el deployment se deberán configurar las variables de entorno.

---

# 12. Configurar variables de entorno en Vercel

Dentro de la configuración del proyecto localiza:

```text
Environment Variables
```

Agrega:

```text
SUPABASE_URL
```

y:

```text
SUPABASE_KEY
```

Utiliza los mismos valores configurados anteriormente en `.env.local`.

Configura las variables para:

```text
Production
Preview
```

No actives la integración opcional de Supabase ofrecida por Vercel, ya que la conexión del proyecto se configuró manualmente mediante variables de entorno.

### Importante

No tomes capturas donde sean visibles los valores de `SUPABASE_KEY`.

Una vez configuradas las variables selecciona:

```text
Deploy
```

Vercel realizará el proceso:

```text
Código
  |
  v
Instalación de dependencias
  |
  v
Build
  |
  v
Deployment
  |
  v
Ready
```

### Evidencia 3

Tomar una captura donde se observe que el primer deployment terminó correctamente en Vercel.

---

# 13. Comprobar la aplicación en producción

Cuando finalice el deployment, Vercel proporcionará una URL pública similar a:

```text
https://practica-vercel-xxxxx.vercel.app
```

Abre la URL.

Comprueba que las tareas almacenadas en Supabase aparezcan correctamente.

Crea una nueva tarea:

```text
Aplicación desplegada en Vercel
```

Comprueba también que sea posible modificar y eliminar tareas.

En este momento el flujo será:

```text
Usuario
   |
   v
Vercel
   |
   v
Aplicación Next.js
   |
   v
Supabase
   |
   v
PostgreSQL
```

### Evidencia 4

Tomar una captura de la aplicación funcionando desde la URL pública proporcionada por Vercel.

La URL deberá ser visible en el navegador.

---

# 14. Crear un Preview Deployment

A continuación se comprobará el funcionamiento de los Preview Deployments.

Regresa a la terminal.

Asegúrate de estar en `main`:

```bash
git checkout main
```

Crea una nueva rama:

```bash
git checkout -b cambio-interfaz
```

Comprueba la rama actual:

```bash
git branch
```

El resultado deberá ser similar a:

```text
* cambio-interfaz
  main
```

---

# 15. Realizar una modificación

Abre:

```text
app/page.js
```

Localiza el título principal de la aplicación y modifícalo para incluir tu nombre.

Ejemplo:

```text
Práctica Vercel - Hugo Rivera
```

Guarda los cambios.

Comprueba primero la modificación localmente.

Después ejecuta:

```bash
git status
```

Agrega los cambios:

```bash
git add .
```

Crea el commit:

```bash
git commit -m "Personalizar interfaz"
```

Sube únicamente la nueva rama:

```bash
git push -u origin cambio-interfaz
```

No realices todavía un merge con `main`.

---

# 16. Comprobar el Preview Deployment

Ingresa nuevamente al proyecto en Vercel.

Vercel deberá detectar la nueva rama y generar un Preview Deployment.

El flujo será:

```text
cambio-interfaz
       |
       | git push
       v
     GitHub
       |
       v
     Vercel
       |
       v
Preview Deployment
       |
       v
 URL temporal
```

Abre la URL correspondiente al Preview Deployment.

Comprueba que aparezca:

```text
Práctica Vercel - Tu Nombre
```

La aplicación principal de producción todavía deberá mostrar la versión anterior.

Esto permite diferenciar los dos entornos:

| Rama | Deployment |
|---|---|
| `cambio-interfaz` | Preview |
| `main` | Production |

### Evidencia 5

Tomar una captura del Preview Deployment mostrando la modificación realizada.

---

# 17. Desplegar automáticamente a producción

Después de comprobar correctamente el Preview Deployment, incorpora los cambios a `main`.

Regresa a la terminal:

```bash
git checkout main
```

Fusiona la rama:

```bash
git merge cambio-interfaz
```

Envía el cambio:

```bash
git push origin main
```

## Importante

Después de ejecutar:

```bash
git push origin main
```

no realices un deployment manual desde Vercel.

Ingresa al panel de Vercel y observa el proceso.

Vercel deberá detectar automáticamente el nuevo commit:

```text
git push
   |
   v
GitHub
   |
   v
Vercel detecta el commit
   |
   v
Build automático
   |
   v
Nuevo deployment
   |
   v
Production actualizada
```

Este proceso permite comprobar el funcionamiento del despliegue automático.

### Evidencia 6

Tomar una captura del nuevo deployment generado automáticamente después del `git push` a `main`.

---

# 18. Comprobar la nueva versión de producción

Espera hasta que Vercel indique:

```text
Ready
```

Abre nuevamente la URL principal de producción.

Ahora deberá aparecer:

```text
Práctica Vercel - Tu Nombre
```

El cambio deberá haberse publicado sin realizar manualmente otro deployment.

### Evidencia 7

Tomar una captura de la aplicación de producción mostrando la modificación realizada.

---

# 19. Verificar la persistencia de datos

Desde la aplicación desplegada crea una nueva tarea:

```text
Deployment automático completado
```

Marca la tarea como completada.

Después ingresa a Supabase y abre la tabla:

```text
tareas
```

Comprueba que el registro se encuentre almacenado.

El flujo realizado será:

```text
Usuario
   |
   v
Aplicación en Vercel
   |
   v
API Next.js
   |
   v
Supabase
   |
   v
PostgreSQL
```

### Evidencia 8

Tomar una captura de la tabla `tareas` en Supabase mostrando el registro:

```text
Deployment automático completado
```

No mostrar credenciales o claves de Supabase.

---

# 20. Resultado esperado

Al finalizar la práctica se deberán obtener los siguientes resultados:

| Resultado | Estado esperado |
|---|---|
| Aplicación ejecutándose localmente | Correcto |
| Conexión con Supabase | Correcta |
| CRUD de tareas | Funcional |
| Repositorio personal en GitHub | Publicado |
| Primer deployment en Vercel | Correcto |
| Aplicación pública | Funcional |
| Preview Deployment | Comprobado |
| Production Deployment | Comprobado |
| Continuous Deployment | Comprobado |
| Persistencia de datos | Comprobada |

El flujo completo será:

```text
DESARROLLO

Desarrollador
     |
     | git commit
     | git push
     v
   GitHub
     |
     v
   Vercel
     |
     v
Deployment


APLICACIÓN

Usuario
   |
   v
Aplicación en Vercel
   |
   v
API Next.js
   |
   v
Supabase
   |
   v
PostgreSQL
```

---

# 21. Evidencias requeridas

| No. | Evidencia |
|---:|---|
| 1 | Aplicación funcionando localmente y consola de peticiones |
| 2 | Repositorio personal publicado en GitHub |
| 3 | Primer deployment exitoso en Vercel |
| 4 | Aplicación funcionando desde la URL pública |
| 5 | Preview Deployment de la rama `cambio-interfaz` |
| 6 | Deployment automático después del `git push` a `main` |
| 7 | Aplicación de producción mostrando la modificación |
| 8 | Registro final almacenado correctamente en Supabase |

---

# 22. Entregable

Realizar un reporte en formato PDF que incluya:

1. Portada.
2. Objetivo de la práctica.
3. Introducción breve sobre Vercel.
4. Desarrollo de la práctica.
5. Las 8 evidencias solicitadas.
6. Descripción breve de cada evidencia.
7. Conclusión.
8. URL del repositorio personal de GitHub.
9. URL de la aplicación desplegada en Vercel.

---

# 23. Problemas comunes

| Problema | Causa probable | Solución |
|---|---|---|
| La lista aparece vacía `[]` | Se utilizó una llave incorrecta | Verifica la `SUPABASE_KEY` |
| Error de variable faltante | `.env.local` no existe o está mal configurado | Comprueba que se encuentre junto a `package.json` |
| Se modificó una variable pero continúa el error | El servidor no se reinició | Detén y ejecuta nuevamente `npm run dev` |
| Vercel sigue utilizando una variable anterior | El deployment se generó antes del cambio | Realiza un Redeploy |
| PUT o DELETE responde con error | La ruta `[id]` no está configurada correctamente | Verifica `app/api/tareas/[id]/route.js` |
| La aplicación muestra la página inicial de Next.js | Se está desplegando una versión incorrecta | Comprueba la rama y los commits enviados |
| El Preview solicita iniciar sesión | El deployment está protegido por Vercel | Inicia sesión con tu cuenta |
| El deployment falla | Error durante el build | Revisa los logs del deployment en Vercel |
| La aplicación funciona localmente pero no en Vercel | Faltan variables de entorno | Verifica `SUPABASE_URL` y `SUPABASE_KEY` en Vercel |

---

# 24. Seguridad

Durante toda la práctica deberán respetarse las siguientes indicaciones:

- Nunca subir `.env.local` a GitHub.
- Nunca publicar `SUPABASE_KEY`.
- No colocar credenciales directamente en el código.
- No mostrar claves o contraseñas en capturas.
- Revisar los archivos antes de ejecutar `git add .`.
- No utilizar datos personales o sensibles en esta aplicación.
- Si una clave se expone accidentalmente, deberá regenerarse en Supabase y actualizarse localmente y en Vercel.

La API utilizada en esta práctica no implementa autenticación de usuarios y está diseñada únicamente con fines educativos.

---

# 25. Flujo de ramas utilizado en el desarrollo del proyecto

El proyecto original fue construido utilizando diferentes ramas de desarrollo que posteriormente se integraron en `main`.

| Rama | Funcionalidad desarrollada |
|---|---|
| `conexion-supabase` | Conexión con Supabase y `/api/salud` |
| `listar-tareas` | `GET /api/tareas` |
| `crear-tareas` | `POST /api/tareas` |
| `editar-eliminar` | `PUT` y `DELETE` |
| `interfaz` | Interfaz gráfica |
| `consola` | Consola de peticiones |
| `main` | Versión integrada y rama de producción |

Este flujo corresponde al proceso utilizado para desarrollar el proyecto base.

Durante la práctica no será necesario reconstruir estas ramas. Únicamente se utilizará la rama `cambio-interfaz` para comprobar el funcionamiento de los Preview Deployments.

---

# 26. Nota sobre el lenguaje

El proyecto fue creado utilizando `create-next-app`.

Algunos archivos generados automáticamente por Next.js utilizan TypeScript, por ejemplo:

```text
layout.tsx
```

El código principal de la API y de la interfaz utilizado en esta práctica está desarrollado en JavaScript.

Next.js permite utilizar JavaScript y TypeScript dentro de un mismo proyecto.

---

# 28. Referencias

- Next.js Documentation: https://nextjs.org/docs
- Vercel Documentation: https://vercel.com/docs
- Vercel Deployments: https://vercel.com/docs/deployments
- Vercel Git Integrations: https://vercel.com/docs/git
- Vercel Environments: https://vercel.com/docs/deployments/environments
- Supabase Documentation: https://supabase.com/docs
