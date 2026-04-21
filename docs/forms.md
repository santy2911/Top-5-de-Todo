# Formularios

## TopModal

Componente modal para crear y editar listas. Se abre desde el botón "Nuevo Top 5" o desde el botón editar de una tarjeta.

### Campos

- **Título** — texto, máximo 50 caracteres, obligatorio
- **Posiciones (x5)** — texto, máximo 50 caracteres, obligatorio
- **Descripción de cada posición** — texto, máximo 100 caracteres, opcional

### Validación

- Si el título está vacío muestra un error
- Si no están las 5 posiciones rellenas muestra un error

### Drag & Drop

Las posiciones se pueden reordenar arrastrando con la API nativa del navegador. Al arrastrar, la posición activa baja la opacidad para indicar que se está moviendo.

### Estado

El formulario usa `useState` para controlar el título, las posiciones y el mensaje de error.

## Toast

Componente de notificación temporal. Aparece abajo a la derecha durante 3 segundos y desaparece solo. Se usa para confirmar acciones como crear, editar, eliminar o copiar una lista.