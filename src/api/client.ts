import type { TopLista, Posicion } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api/v1";

async function request<T>(url: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.error ?? `Error ${respuesta.status}`);
  }

  return respuesta.json() as Promise<T>;
}

export type ListaInput = {
  titulo: string;
  posiciones: Posicion[];
};

export const listasApi = {
  obtenerTodas: () =>
    request<TopLista[]>("/listas"),

  obtenerPorId: (id: string) =>
    request<TopLista>(`/listas/${id}`),

  crear: (datos: ListaInput) =>
    request<TopLista>("/listas", {
      method: "POST",
      body: JSON.stringify(datos),
    }),

  actualizar: (id: string, datos: ListaInput) =>
    request<TopLista>(`/listas/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
    }),

  eliminar: (id: string) =>
    request<{ mensaje: string }>(`/listas/${id}`, {
      method: "DELETE",
    }),
};