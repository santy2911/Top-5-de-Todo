import { useState } from "react";
import type { TopLista } from "../types";
import Badge from "./Badge";

interface TopCardProps {
  lista: TopLista;
  onEliminar: (id: string) => void;
  onEditar: (lista: TopLista) => void;
  onCopiar: (lista: TopLista) => void;
}

export default function TopCard({ lista, onEliminar, onEditar, onCopiar }: TopCardProps) {
  const [expandida, setExpandida] = useState<string | null>(null);
  const [confirmar, setConfirmar] = useState(false);

  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 dark:border-[#2a3555] bg-white dark:bg-[#1a2235] shadow-sm hover:shadow-md hover:scale-[1.02] transition-all overflow-hidden">

      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 to-purple-600" />

      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {lista.titulo}
        </h3>

        <ul className="flex flex-col gap-2">
          {lista.posiciones.map((posicion, index) => (
            <li key={posicion.id}>
              <button
                onClick={() => setExpandida(expandida === posicion.id ? null : posicion.id)}
                className="flex items-center gap-3 w-full text-left cursor-pointer"
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
            className="text-xs px-3 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => onCopiar(lista)}
            className="text-xs px-3 py-1 rounded-lg bg-gray-100 dark:bg-[#2a3555] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#334066] transition-colors cursor-pointer"
          >
            Copiar
          </button>
          <button
            onClick={() => setConfirmar(true)}
            className="text-xs px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>

      {confirmar && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-white/95 dark:bg-[#1a2235]/95 backdrop-blur-sm p-5">
          <p className="text-sm font-medium text-gray-800 dark:text-white text-center">
            ¿Eliminar <span className="font-bold">"{lista.titulo}"</span>?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmar(false)}
              className="px-4 py-1.5 rounded-lg border border-gray-300 dark:border-[#2a3555] text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-[#0f1629] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onEliminar(lista.id);
                setConfirmar(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}