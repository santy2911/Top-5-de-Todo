# API Reference

Base URL: `http://localhost:3001/api/v1`

## Endpoints

### GET /listas
Devuelve todas las listas.

**Response 200:** array de `TopLista`

### GET /listas/:id
Devuelve una lista por su id.

**Response 200:** objeto `TopLista`  
**Response 404:** `{ "error": "Lista no encontrada" }`

### POST /listas
Crea una nueva lista.

**Body:** `titulo` (string) y `posiciones` (array de `Posicion`)  
**Response 201:** objeto `TopLista` creado

### PUT /listas/:id
Actualiza una lista existente.

**Body:** `titulo` (string) y `posiciones` (array de `Posicion`)  
**Response 200:** objeto `TopLista` actualizado  
**Response 404:** `{ "error": "Lista no encontrada" }`

### DELETE /listas/:id
Elimina una lista.

**Response 200:** `{ "mensaje": "Lista eliminada correctamente" }`  
**Response 404:** `{ "error": "Lista no encontrada" }`