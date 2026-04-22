import { useState, useEffect, useMemo } from "react";
import TopCardGrid from "../components/TopCardGrid";
import EmptyState from "../components/EmptyState";
import TopModal from "../components/TopModal";
import Toast from "../components/Toast";
import { useListasContext } from "../context/ListContext";
import type { TopLista } from "../types";

const LIMITE = 10;

export default function Home() {
  const { listas, loading, error, handleCrear, handleEliminar, handleEditar, handleCopiar } = useListasContext();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [listaEditar, setListaEditar] = useState<TopLista | undefined>(undefined);
  const [toast, setToast] = useState("");
  const [oscuro, setOscuro] = useState(() => localStorage.getItem("tema") === "oscuro");
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("reciente");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", oscuro);
    localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  }, [oscuro]);

  const listasFiltradas = useMemo(() => {
    let resultado = [...listas];
    if (busqueda.trim()) {
      resultado = resultado.filter(l =>
        l.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
    if (orden === "reciente") resultado.sort((a, b) => b.creadoEn.localeCompare(a.creadoEn));
    if (orden === "antiguo") resultado.sort((a, b) => a.creadoEn.localeCompare(b.creadoEn));
    if (orden === "az") resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    return resultado;
  }, [listas, busqueda, orden]);

  const progreso = Math.round((listas.length / LIMITE) * 100);
  const colorBarra = progreso >= 90 ? "bg-red-500" : progreso >= 60 ? "bg-yellow-500" : "bg-gradient-to-r from-indigo-500 to-purple-600";

  const mostrarToast = (mensaje: string) => {
    setToast(mensaje);
    setTimeout(() => setToast(""), 3000);
  };

  const abrirModalCrear = () => {
    if (listas.length >= LIMITE) {
      mostrarToast("Has alcanzado el límite de 10 listas");
      return;
    }
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
    <div className="min-h-screen bg-[#f8f7ff] dark:bg-[#0f1629] p-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Top 5 de Todo</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Crea tus rankings personales</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOscuro(p => !p)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1a2235] transition-colors cursor-pointer"
              aria-label="Cambiar tema"
            >
              {oscuro ? "☀️" : "🌙"}
            </button>
            <button
              onClick={abrirModalCrear}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              + Nuevo Top 5
            </button>
          </div>
        </header>

        {!loading && !error && (
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {listas.length} de {LIMITE} listas creadas
            </p>
            <div className="w-full h-2 bg-gray-200 dark:bg-[#2a3555] rounded-full overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${colorBarra}`}
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
        )}

        {!loading && !error && listas.length > 0 && (
          <form autoComplete="off" className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-[#2a3555] bg-white dark:bg-[#1a2235] text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={orden}
              onChange={e => setOrden(e.target.value)}
              name="orden-top5-app"
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a3555] bg-white dark:bg-[#1a2235] text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="reciente">Más reciente</option>
              <option value="antiguo">Más antiguo</option>
              <option value="az">A-Z</option>
            </select>
          </form>
        )}

        {loading && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-12">Cargando listas...</p>
        )}

        {error && (
          <p className="text-center text-red-500 py-12">Error al cargar las listas: {error}</p>
        )}

        {!loading && !error && (
          listasFiltradas.length === 0 && busqueda ? (
            <p className="text-center text-gray-400 dark:text-gray-500 py-12">
              No hay resultados para "{busqueda}"
            </p>
          ) : listasFiltradas.length === 0 ? (
            <EmptyState onCrear={abrirModalCrear} />
          ) : (
            <TopCardGrid
              listas={listasFiltradas}
              onEliminar={eliminarLista}
              onEditar={abrirModalEditar}
              onCopiar={copiarLista}
            />
          )
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