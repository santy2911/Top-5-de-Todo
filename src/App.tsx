import { useState } from "react";
import type { TopLista } from "./types";
import TopCardGrid from "./components/TopCardGrid";
import EmptyState from "./components/EmptyState";

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


export default function App() {
  const [listas, setListas] = useState<TopLista[]>(LISTAS_PRUEBA);

  const handleEliminar = (id: string) => {
    setListas(listas.filter((l) => l.id !== id));
  };

  const handleEditar = (lista: TopLista) => {
    console.log("Editar:", lista);
  };

  const handleCopiar = (lista: TopLista) => {
    console.log("Copiar:", lista);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Top 5 de Todo
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Crea tus rankings personales
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer">
            + Nuevo Top 5
          </button>
        </header>


        {listas.length === 0 ? (
          <EmptyState onCrear={() => console.log("Crear lista")} />
        ) : (
          <TopCardGrid
            listas={listas}
            onEliminar={handleEliminar}
            onEditar={handleEditar}
            onCopiar={handleCopiar}
          />
        )}

      </div>
    </div>
  );
}