# Hooks

## useState

Sirve para guardar un valor dentro de un componente que puede cambiar. Cuando el valor cambia, React vuelve a renderizar el componente automáticamente.

En el proyecto lo uso en `TopCard.tsx` para guardar qué posición está expandida en cada tarjeta.

```ts
const [expandida, setExpandida] = useState<string | null>(null);
```

## useEffect

Sirve para ejecutar código cuando ocurre algo concreto, por ejemplo cuando el componente se monta por primera vez o cuando cambia una variable.

Lo uso en `App.tsx` para cargar las listas de localStorage al arrancar la app.

## useMemo

Sirve para memorizar el resultado de un cálculo y que no se repita en cada render si los datos no han cambiado.

En `App.tsx` lo uso para contar el total de posiciones de todas las listas y mostrarlo en el header.

```ts
const totalPosiciones = useMemo(() => {
  return listas.reduce((acc, lista) => acc + lista.posiciones.length, 0);
}, [listas]);
```

## useCallback

Sirve para memorizar una función y que no se recree en cada render. Es útil cuando pasas funciones como props a componentes hijos, porque evita rerenders innecesarios.

En `App.tsx` lo uso para `handleEliminar`, `handleEditar` y `handleCopiar`.

```ts
const handleEliminar = useCallback((id: string) => {
  setListas((prev) => prev.filter((l) => l.id !== id));
}, [setListas]);
```

## Custom hook: useLocalStorage

Un custom hook es una función reutilizable que encapsula lógica con hooks de React. Se crea para no repetir el mismo código en varios componentes.

Lo tengo en `src/hooks/useLocalStorage.ts` y lo uso en `App.tsx` para guardar y cargar las listas automáticamente sin tener que escribir el código de localStorage cada vez.

```ts
const [listas, setListas] = useLocalStorage<TopLista[]>("listas", LISTAS_PRUEBA);
```

Por dentro usa `useState` para guardar el valor en memoria y `useEffect` para sincronizarlo con localStorage cada vez que cambia.