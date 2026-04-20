import TopCardGrid from "../components/TopCardGrid";
import EmptyState from "../components/EmptyState";
import { useListasContext } from "../context/ListContext";

export default function Home() {
  const { listas, handleEliminar, handleEditar, handleCopiar } = useListasContext();

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
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {listas.length} listas
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