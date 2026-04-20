interface EmptyStateProps {
  onCrear: () => void;
}

export default function EmptyState({ onCrear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900">
        <svg
          className="w-10 h-10 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h10"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        No tienes listas aún
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Crea tu primer Top 5 y empieza a organizar tus cosas favoritas
      </p>
      <button
        onClick={onCrear}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
      >
        Crear mi primer Top 5
      </button>
    </div>
  );
}