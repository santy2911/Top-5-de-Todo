import { useState } from "react";
import type { TopLista, Posicion } from "../types";
import Badge from "./Badge";

interface TopCardProps {
  lista: TopLista;
  onEliminar: (id: string) => void;
  onEditar: (lista: TopLista) => void;
  onCopiar: (lista: TopLista) => void;
}

export default function TopCard({ lista, onEliminar, onEditar, onCopiar }: TopCardProps) {
  const [expandida, setExpandida] = useState<string | null>(null);

  const toggleExpandir = (id: string) => {
    setExpandida(expandida === id ? null : id);
  };

  return (
    <div className="group relative flex flex-col gap-3 p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {lista.titulo}
      </h3>

      <ul className="flex flex-col gap-2">
        {lista.posiciones.map((posicion: Posicion, index: number) => (
          <li key={posicion.id}>
            <button
              onClick={() => toggleExpandir(posicion.id)}
              className="flex items-center gap-3 w-full text-left cursor-pointer"
              aria-label={`Ver descripción de ${posicion.texto}`}
            >
              <Badge numero={index + 1} />
              <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                {posicion.texto}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${expandida === posicion.id ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandida === posicion.id && (
              <p className="mt-1 ml-11 text-xs text-gray-500 dark:text-gray-400">
                {posicion.descripcion || "Sin descripción"}
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
        <button
          onClick={() => onEditar(lista)}
          className="text-xs px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={() => onCopiar(lista)}
          className="text-xs px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Copiar
        </button>
        <button
          onClick={() => onEliminar(lista.id)}
          className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}