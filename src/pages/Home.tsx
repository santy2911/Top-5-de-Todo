import { useState } from "react";
import TopCardGrid from "../components/TopCardGrid";
import EmptyState from "../components/EmptyState";
import TopModal from "../components/TopModal";
import Toast from "../components/Toast";
import { useListasContext } from "../context/ListContext";
import type { TopLista } from "../types";

export default function Home() {
  const { listas, handleCrear, handleEliminar, handleEditar, handleCopiar } = useListasContext();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [listaEditar, setListaEditar] = useState<TopLista | undefined>(undefined);
  const [toast, setToast] = useState("");

  const mostrarToast = (mensaje: string) => {
    setToast(mensaje);
    setTimeout(() => setToast(""), 3000);
  };

  const abrirModalCrear = () => {
    setListaEditar(undefined);
    setModalAbierto(true);
  };

  const abrirModalEditar = (lista: TopLista) => {
    setListaEditar(lista);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setListaEditar(undefined);
  };

  const guardarLista = (lista: TopLista) => {
    if (listaEditar) {
      handleEditar(lista);
      mostrarToast("Lista actualizada ✓");
    } else {
      handleCrear(lista);
      mostrarToast("Lista creada ✓");
    }
    cerrarModal();
  };

  const copiarLista = (lista: TopLista) => {
    handleCopiar(lista);
    mostrarToast("Copiado al portapapeles ✓");
  };

  const eliminarLista = (id: string) => {
    handleEliminar(id);
    mostrarToast("Lista eliminada");
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
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {listas.length} listas
            </p>
          </div>
          <button
            onClick={abrirModalCrear}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            + Nuevo Top 5
          </button>
        </header>

        {listas.length === 0 ? (
          <EmptyState onCrear={abrirModalCrear} />
        ) : (
          <TopCardGrid
            listas={listas}
            onEliminar={eliminarLista}
            onEditar={abrirModalEditar}
            onCopiar={copiarLista}
          />
        )}
      </div>

      {modalAbierto && (
        <TopModal
          listaEditar={listaEditar}
          onGuardar={guardarLista}
          onCerrar={cerrarModal}
        />
      )}

      {toast && <Toast mensaje={toast} />}
    </div>
  );
}