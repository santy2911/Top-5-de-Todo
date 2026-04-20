import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-indigo-500">404</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg">
        Página no encontrada
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Volver al inicio
      </Link>
    </div>
  );
}