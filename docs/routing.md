# Rutas y navegación

## Librería utilizada

React Router DOM v7.

## Estructura de rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home` | Página principal con todas las listas |
| `*` | `NotFound` | Página 404 para rutas no existentes |

## Configuración

El `BrowserRouter` envuelve toda la app en `App.tsx`, dentro del `ListProvider` para que todas las rutas tengan acceso al contexto.

## Navegación

La página 404 incluye un `Link` para volver a `/` sin recargar la página.