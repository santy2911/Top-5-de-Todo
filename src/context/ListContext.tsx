import { createContext, useContext } from "react";
import type { TopLista } from "../types";

export interface ListasContextType {
  listas: TopLista[];
  loading: boolean;
  error: string | null;
  handleCrear: (lista: TopLista) => Promise<void>;
  handleEliminar: (id: string) => Promise<void>;
  handleEditar: (lista: TopLista) => Promise<void>;
  handleCopiar: (lista: TopLista) => void;
}

export const ListasContext = createContext<ListasContextType | undefined>(undefined);

export function useListasContext() {
  const context = useContext(ListasContext);
  if (context === undefined) {
    throw new Error("Contexto no encontrado, debe usarse dentro de un ListProvider");
  }
  return context;
}