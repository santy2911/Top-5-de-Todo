# Capa de red — API Client

## Descripción

El cliente de API centraliza todas las llamadas HTTP al backend en `src/api/client.ts`.
Cada función devuelve una promesa tipada con TypeScript, alineada con los tipos del backend.

## Base URL

`http://localhost:3001/api/v1`

## Función base `request<T>`

Wrapper sobre `fetch` que gestiona headers, comprueba `response.ok` y lanza un `Error`
con el mensaje del backend si la respuesta no es exitosa.

## Funciones disponibles

| Función | Método | Endpoint | Devuelve |
|---|---|---|---|
| `obtenerTodas()` | GET | `/listas` | `TopLista[]` |
| `obtenerPorId(id)` | GET | `/listas/:id` | `TopLista` |
| `crear(datos)` | POST | `/listas` | `TopLista` |
| `actualizar(id, datos)` | PUT | `/listas/:id` | `TopLista` |
| `eliminar(id)` | DELETE | `/listas/:id` | `{ mensaje: string }` |

## Tipos

Los tipos `TopLista` y `Posicion` están definidos en `src/types/index.ts` y son compartidos
entre el cliente de API y los componentes. El tipo `ListaInput` se define en el propio cliente
para tipar el body de POST y PUT.

## Estados de red en la UI

El `ListProvider` gestiona tres estados:

- **loading** — `true` mientras se espera la respuesta inicial del GET /listas
- **error** — string con el mensaje si la petición falla, `null` si todo va bien
- **éxito** — el array `listas` se rellena con los datos de la API

Estos tres estados se exponen a través del contexto y se consumen en `Home.tsx`.

## Fuente de verdad

Los datos de las listas viven exclusivamente en el backend (en memoria).
El frontend ya no usa `localStorage` para las listas — solo `useState` sincronizado con la API.