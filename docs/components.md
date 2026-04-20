# Componentes

## 1. Tipos Compartidos (src/types/index.ts)

Para asegurar la consistencia de los datos en todos los componentes, se han definido interfaces TypeScript para las entidades `TopLista` y `Posicion`. `TopLista` representa una lista completa con su título, fecha de creación y array de posiciones. `Posicion` representa cada uno de los 5 elementos de la lista, con un texto obligatorio y una descripción opcional.

## 2. Componentes Reutilizables

### Badge

Propósito: Mostrar el número de posición (1-5) de forma visual y consistente en toda la aplicación.

Comportamiento: Renderiza un círculo con gradiente indigo → purple y el número centrado en su interior. Es el componente más pequeño y reutilizable del proyecto — se usa dentro de `TopCard` para identificar cada posición, pero podría usarse en cualquier otro lugar que necesite mostrar un número destacado.

Props recibidas (tipadas):
- `numero: number` — el número a mostrar dentro del círculo.

---

### EmptyState

Propósito: Informar al usuario de que no tiene listas creadas todavía.

Comportamiento: Renderiza un icono, un mensaje y un botón de llamada a la acción. Se muestra en `App` cuando el array de listas está vacío. Recibe una función `onCrear` como prop para que el componente padre decida qué hacer al pulsar el botón, manteniendo así la separación de responsabilidades.

Props recibidas (tipadas):
- `onCrear: () => void` — función callback que se ejecuta al pulsar el botón.

---

### TopCard

Propósito: Mostrar el contenido completo de una lista Top 5 de forma visual e interactiva.

Comportamiento: Renderiza el título de la lista y sus 5 posiciones, cada una acompañada de su `Badge`. Cada posición es expandible al hacer clic para mostrar u ocultar su descripción, esto se gestiona internamente con `useState` — guardando el `id` de la posición actualmente expandida. Los botones de editar, copiar y eliminar están ocultos por defecto y aparecen al hacer hover sobre la tarjeta gracias a la clase `group` de Tailwind, lo que mantiene la interfaz limpia.

Props recibidas (tipadas):
- `lista: TopLista` — objeto con todos los datos de la lista.
- `onEliminar: (id: string) => void` — función callback para eliminar la lista.
- `onEditar: (lista: TopLista) => void` — función callback para editar la lista.
- `onCopiar: (lista: TopLista) => void` — función callback para copiar el contenido de la lista.

---

### TopCardGrid

Propósito: Organizar y mostrar todas las tarjetas del usuario en un layout responsive.

Comportamiento: Recibe el array completo de listas y renderiza una `TopCard` por cada una usando `.map()`. Utiliza `key={lista.id}` para que React pueda identificar cada tarjeta de forma única y gestionar correctamente las actualizaciones del DOM. El grid se adapta automáticamente a 1 columna en móvil y 3 columnas en desktop mediante las clases responsive de Tailwind.

Props recibidas (tipadas):
- `listas: TopLista[]` — array de listas a mostrar.
- `onEliminar: (id: string) => void`
- `onEditar: (lista: TopLista) => void`
- `onCopiar: (lista: TopLista) => void`