# Bookmark

![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg?logo=react\&logoColor=black) ![MUI](https://img.shields.io/badge/MUI-5.x-007FFF.svg?logo=mui\&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4.svg?logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green.svg)

Aplicación **web** desarrollada en **React 18** (Create React App) para gestionar marcadores (bookmarks): guardarlos, organizarlos por carpetas, calificarlos y buscarlos fácilmente. Se integra con la **Bookmak API** para operaciones CRUD y autenticación.

> **Estado**: prototipo funcional. La UI y la capa de datos están sujetas a cambios frecuentes.

---

## ✨ Características principales

* **Dashboard** con vista de tarjetas y tabla filtrable.
* **CRUD de marcadores**: título, URL, descripción, etiquetas, puntuación.
* **Carpetas / categorías** anidadas con recuento de elementos.
* **Búsqueda rápida** (fuzzy search) y ordenamiento.
* **UI accesible** basada en **Material UI** y utilidades de **Tailwind CSS**.
* **Dark / Light mode** con persistencia en `localStorage`.
* **Llamadas a la Bookmak API** autenticadas (JWT) mediante **Axios**.

---

## 🗂️ Tecnologías utilizadas

| Categoría          | Stack                              |
| ------------------ | ---------------------------------- |
| **Frontend**       | React 18 · React Router 6 · Axios  |
| **UI Kit**         | Material UI 5 · Tailwind CSS 3     |
| **Estado**         | Context API + hooks                |
| **Build**          | Create React App (react‑scripts 5) |
| **Lint / Formato** | ESLint · Prettier                  |

---

## 🛠️ Requisitos previos

| Herramienta | Versión mínima |
| ----------- | -------------- |
| Node.js     | 18.x           |
| npm         | 9.x            |

> También puedes usar **pnpm** o **yarn** si lo prefieres.

---

## 🚀 Inicio rápido

```bash
# 1. Clona el repositorio
$ git clone https://github.com/TAVI0/bookmark.git
$ cd bookmark

# 2. Instala dependencias
$ npm install

# 3. Copia variables de entorno y ajusta valores
$ cp .env.example .env.local
# Reemplaza API_URL y JWT_SECRET según tu entorno

# 4. Ejecuta en modo desarrollo
$ npm start

# La app quedará disponible en http://localhost:3000
```

### Variables de entorno

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
REACT_APP_JWT_STORAGE_KEY=bookmark_token
```

> **Tip**: en producción define estas variables como *secrets* o variables de entorno en tu plataforma (Vercel, Netlify, etc.).

---

## 📦 Scripts disponibles

| Comando         | Descripción                                              |
| --------------- | -------------------------------------------------------- |
| `npm start`     | Inicia el servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión optimizada en `build/`                 |
| `npm run lint`  | Ejecuta ESLint sobre los archivos fuente                 |
| `npm run eject` | Expone la configuración de CRA (acción irreversible)     |

---

## 📁 Estructura del proyecto (resumen)

```
bookmark/
├── public/             # estáticos, index.html
├── src/
│   ├── api/            # llamadas Axios y hooks
│   ├── components/     # botones, tarjetas, modales reutilizables
│   ├── features/       # dominios (bookmarks, folders, auth)
│   ├── hooks/          # hooks personalizados
│   ├── pages/          # vistas principales (Home, Login, FolderView)
│   ├── styles/         # Tailwind y CSS extra
│   └── App.jsx         # punto de entrada de rutas
├── tailwind.config.js  # configuración Tailwind
└── package.json
```

---
