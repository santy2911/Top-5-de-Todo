# 📋 TopListas — Fullstack Project

Aplicación fullstack para crear y gestionar tus **Top 5 personalizados**: películas favoritas, canciones, lugares...

🌐 **Demo:** [top-5-de-todo.vercel.app](https://top-5-de-todo.vercel.app)

---

## 🧱 Arquitectura

```
Practicas Fullstack Project/
├── src/                        # Frontend — React + TypeScript + Vite
│   ├── components/
│   │   ├── Badge.tsx           # Número de posición con gradiente
│   │   ├── EmptyState.tsx      # Pantalla vacía con CTA
│   │   ├── Toast.tsx           # Notificaciones emergentes
│   │   ├── TopCard.tsx         # Tarjeta individual de lista
│   │   ├── TopCardGrid.tsx     # Grid responsive de tarjetas
│   │   └── TopModal.tsx        # Modal de creación / edición
│   ├── context/
│   │   └── ListProvider.tsx    # Contexto global de listas
│   ├── pages/
│   │   ├── Home.tsx            # Página principal
│   │   └── NotFound.tsx        # Página 404
│   ├── types/                  # Tipos compartidos (TopLista, Posicion)
│   ├── App.tsx
│   └── main.tsx
└── server/                     # Backend — Node.js + Express + TypeScript
    └── src/
        ├── controllers/
        │   └── listas.controller.ts
        ├── routes/
        │   └── listas.routes.ts
        └── services/
            └── listas.service.ts
```

---

## ✨ Funcionalidades

- **Crear** listas Top 5 con título, posiciones y descripción por posición
- **Editar** listas existentes
- **Eliminar** con diálogo de confirmación integrado en la tarjeta
- **Copiar** una lista al portapapeles
- **Reordenar** posiciones arrastrando y soltando (drag & drop) dentro del modal
- **Buscar** listas por título en tiempo real
- **Ordenar** por más reciente, más antiguo o alfabético
- **Dark mode** con persistencia en `localStorage`
- **Notificaciones Toast** para feedback de cada acción
- **Límite de 10 listas** con aviso cuando se alcanza
- **Barra de progreso** visual del total de listas
- **Estado vacío** con llamada a la acción para crear la primera lista

---

## 📡 API REST

Base URL: `https://top-5-de-todo.onrender.com/api/v1/listas`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/` | Obtener todas las listas |
| `GET` | `/:id` | Obtener lista por ID |
| `POST` | `/` | Crear nueva lista |
| `PUT` | `/:id` | Actualizar lista existente |
| `DELETE` | `/:id` | Eliminar lista |

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el proyecto

```bash
git clone https://github.com/santy2911/Top-5-de-Todo
cd Practicas Fullstack Project
```

### 2. Backend

```bash
cd server
npm install
npm run dev
```

### 3. Frontend

```bash
# En una terminal nueva, desde la raíz del proyecto
npm install
npm run dev
```