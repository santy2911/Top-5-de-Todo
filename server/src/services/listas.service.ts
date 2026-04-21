import { v4 as uuidv4 } from "uuid";

export interface Posicion {
  id: string;
  texto: string;
  descripcion?: string;
}

export interface TopLista {
  id: string;
  titulo: string;
  posiciones: Posicion[];
  creadoEn: string;
}

let listas: TopLista[] = [];

export const obtenerTodas = (): TopLista[] => listas;

export const obtenerPorId = (id: string): TopLista | undefined =>
  listas.find((l) => l.id === id);

export const crear = (datos: Omit<TopLista, "id" | "creadoEn">): TopLista => {
  const nueva: TopLista = {
    id: uuidv4(),
    ...datos,
    creadoEn: new Date().toISOString(),
  };
  listas.push(nueva);
  return nueva;
};

export const actualizar = (id: string, datos: Omit<TopLista, "id" | "creadoEn">): TopLista | null => {
  const index = listas.findIndex((l) => l.id === id);
  if (index === -1) return null;
  listas[index] = { ...listas[index], ...datos };
  return listas[index];
};

export const eliminar = (id: string): boolean => {
  const antes = listas.length;
  listas = listas.filter((l) => l.id !== id);
  return listas.length < antes;
};