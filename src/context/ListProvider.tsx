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

  const handleCrear = useCallback((lista: TopLista) => {
    setListas((prev) => [lista, ...prev]);
  }, [setListas]);

  const handleEliminar = useCallback((id: string) => {
    setListas((prev) => prev.filter((l) => l.id !== id));
  }, [setListas]);

  const handleEditar = useCallback((lista: TopLista) => {
    setListas((prev) => prev.map((l) => l.id === lista.id ? lista : l));
  }, [setListas]);

  const handleCopiar = useCallback((lista: TopLista) => {
    const texto = `${lista.titulo}\n${lista.posiciones.map((p, i) => `${i + 1}. ${p.texto}`).join("\n")}\n\nCreado con Top 5 de Todo`;
    navigator.clipboard.writeText(texto);
  }, []);

  const valor = useMemo(() => ({
    listas,
    handleCrear,
    handleEliminar,
    handleEditar,
    handleCopiar,
  }), [listas, handleCrear, handleEliminar, handleEditar, handleCopiar]);

  return (
    <ListasContext.Provider value={valor}>
      {children}
    </ListasContext.Provider>
  );
}