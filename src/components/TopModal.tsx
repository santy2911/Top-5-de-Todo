import { useState, useRef } from "react";
import type { TopLista, Posicion } from "../types";

interface TopModalProps {
  listaEditar?: TopLista;
  onGuardar: (lista: TopLista) => void;
  onCerrar: () => void;
}

export default function TopModal({ listaEditar, onGuardar, onCerrar }: TopModalProps) {
  const [titulo, setTitulo] = useState(listaEditar?.titulo ?? "");
  const [posiciones, setPosiciones] = useState<Posicion[]>(
    listaEditar?.posiciones ?? [
      { id: crypto.randomUUID(), texto: "", descripcion: "" },
      { id: crypto.randomUUID(), texto: "", descripcion: "" },
      { id: crypto.randomUUID(), texto: "", descripcion: "" },
      { id: crypto.randomUUID(), texto: "", descripcion: "" },
      { id: crypto.randomUUID(), texto: "", descripcion: "" },
    ]
  );
  const [error, setError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const dragSobre = useRef<number | null>(null);

  const completadas = posiciones.filter((p) => p.texto.trim() !== "").length;

  const actualizarTexto = (index: number, valor: string) => {
    const nuevas = [...posiciones];
    nuevas[index] = { ...nuevas[index], texto: valor };
    setPosiciones(nuevas);
  };

  const actualizarDescripcion = (index: number, valor: string) => {
    const nuevas = [...posiciones];
    nuevas[index] = { ...nuevas[index], descripcion: valor };
    setPosiciones(nuevas);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragSobre.current = index;
  };

  const handleDrop = () => {
    if (dragIndex === null || dragSobre.current === null) return;
    const nuevas = [...posiciones];
    const movida = nuevas[dragIndex];
    nuevas.splice(dragIndex, 1);
    nuevas.splice(dragSobre.current, 0, movida);
    setPosiciones(nuevas);
    setDragIndex(null);
    dragSobre.current = null;
  };

  const handleGuardar = () => {
    if (titulo.trim() === "") {
      setError("El título es obligatorio");
      return;
    }
    if (completadas < 5) {
      setError("Debes rellenar las 5 posiciones");
      return;
    }
    setError("");
    onGuardar({
      id: listaEditar?.id ?? crypto.randomUUID(),
      titulo: titulo.trim(),
      posiciones,
      creadoEn: listaEditar?.creadoEn ?? new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#1a2235] rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#2a3555]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {listaEditar ? "Editar Top 5" : "Crear Top 5"}
          </h2>
          <button onClick={onCerrar} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              maxLength={50}
              placeholder="Ej: Mis películas favoritas"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#2a3555] bg-white dark:bg-[#0f1629] text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Top 5 — Arrastra para reordenar
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{completadas}/5 completadas</span>
            </div>

            {posiciones.map((posicion, index) => (
              <div
                key={posicion.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={handleDrop}
                className={`flex gap-2 items-start p-2 rounded-lg border border-gray-200 dark:border-[#2a3555] bg-gray-50 dark:bg-[#0f1629]/50 ${dragIndex === index ? "opacity-40" : ""}`}
              >
                <span className="mt-2 cursor-move text-gray-400 select-none">⠿</span>

                <div className="mt-2 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <input
                    type="text"
                    value={posicion.texto}
                    onChange={(e) => actualizarTexto(index, e.target.value)}
                    maxLength={50}
                    placeholder={`Posición ${index + 1}`}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#2a3555] bg-white dark:bg-[#0f1629] text-gray-800 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={posicion.descripcion ?? ""}
                    onChange={(e) => actualizarDescripcion(index, e.target.value)}
                    maxLength={100}
                    placeholder="¿Por qué este puesto?"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-[#2a3555] bg-white dark:bg-[#0f1629] text-gray-500 dark:text-gray-400 placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onCerrar}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-[#2a3555] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0f1629] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 cursor-pointer"
            >
              {listaEditar ? "Guardar cambios" : "+ Crear Lista"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}