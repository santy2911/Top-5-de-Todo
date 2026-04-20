import type { TopLista } from "../types";
import TopCard from "./TopCard";

interface TopCardGridProps {
  listas: TopLista[];
  onEliminar: (id: string) => void;
  onEditar: (lista: TopLista) => void;
  onCopiar: (lista: TopLista) => void;
}

export default function TopCardGrid({ listas, onEliminar, onEditar, onCopiar }: TopCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listas.map((lista) => (
        <TopCard
          key={lista.id}
          lista={lista}
          onEliminar={onEliminar}
          onEditar={onEditar}
          onCopiar={onCopiar}
        />
      ))}
    </div>
  );
}