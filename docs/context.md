# Context

## Implementación en el proyecto

El contexto está dividido en dos archivos dentro de `src/context/`.

### ListContext.tsx

Define qué datos y funciones va a contener el contexto.

```ts
export const ListasContext = createContext<ListasContextType | undefined>(undefined);
```

También exporta `useListasContext`, un custom hook para consumir el contexto de forma segura. Si se usa fuera de un `ListProvider` lanza un error.

### ListProvider.tsx

Contiene el estado real y las funciones. Envuelve a los componentes hijos y les da acceso al contexto.

Aquí vive:
- El array de listas con `useLocalStorage`
- `handleEliminar`, `handleEditar` y `handleCopiar` con `useCallback`
- El valor del contexto agrupado con `useMemo`

## Cómo se consume

En `App.tsx` el `ListProvider` envuelve toda la app:

```tsx
export default function App() {
  return (
    <ListProvider>
      <Home />
    </ListProvider>
  );
}
```

Y en cualquier componente que necesite las listas:

```ts
const { listas, handleEliminar } = useListasContext();
```