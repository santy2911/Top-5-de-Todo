import { useState, useEffect, type ReactNode } from "react";
import { ListasContext } from "./ListContext";
import { listasApi } from "../api/client";
import type { TopLista } from "../types";

export function ListProvider({ children }: { children: ReactNode }) {
  const [listas, setListas] = useState<TopLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listasApi.obtenerTodas()
      .then(setListas)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCrear = async (lista: TopLista) => {
    const nueva = await listasApi.crear({
      titulo: lista.titulo,
      posiciones: lista.posiciones,
    });
    setListas(prev => [nueva, ...prev]);
  };

  const handleEliminar = async (id: string) => {
    await listasApi.eliminar(id);
    setListas(prev => prev.filter(l => l.id !== id));
  };

  const handleEditar = async (lista: TopLista) => {
    const actualizada = await listasApi.actualizar(lista.id, {
      titulo: lista.titulo,
      posiciones: lista.posiciones,
    });
    setListas(prev => prev.map(l => l.id === actualizada.id ? actualizada : l));
  };

  const handleCopiar = (lista: TopLista) => {
    const texto = `${lista.titulo}\n${lista.posiciones.map((p, i) => `${i + 1}. ${p.texto}`).join("\n")}`;
    navigator.clipboard.writeText(texto);
  };

  return (
    <ListasContext.Provider value={{ listas, loading, error, handleCrear, handleEliminar, handleEditar, handleCopiar }}>
      {children}
    </ListasContext.Provider>
  );
}