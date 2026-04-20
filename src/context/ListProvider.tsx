import { useCallback, useMemo, type ReactNode } from "react";
import { ListasContext } from "./ListContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { TopLista } from "../types";

const LISTAS_PRUEBA: TopLista[] = [
  {
    id: "1",
    titulo: "Prueba",
    creadoEn: new Date().toISOString(),
    posiciones: [
      { id: "p1", texto: "a", descripcion: "aa" },
      { id: "p2", texto: "b", descripcion: "bb" },
      { id: "p3", texto: "c", descripcion: "cc" },
      { id: "p4", texto: "d", descripcion: "dd" },
      { id: "p5", texto: "e", descripcion: "ee" },
    ],
  },
];

export function ListProvider({ children }: { children: ReactNode }) {
  const [listas, setListas] = useLocalStorage<TopLista[]>("listas", LISTAS_PRUEBA);

  const handleEliminar = useCallback((id: string) => {
    setListas((prev) => prev.filter((l) => l.id !== id));
  }, [setListas]);

  const handleEditar = useCallback((lista: TopLista) => {
    console.log("Editar:", lista);
  }, []);

  const handleCopiar = useCallback((lista: TopLista) => {
    console.log("Copiar:", lista);
  }, []);

  const valor = useMemo(() => ({
    listas,
    handleEliminar,
    handleEditar,
    handleCopiar,
  }), [listas, handleEliminar, handleEditar, handleCopiar]);

  return (
    <ListasContext.Provider value={valor}>
      {children}
    </ListasContext.Provider>
  );
}