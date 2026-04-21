interface ToastProps {
  mensaje: string;
}

export default function Toast({ mensaje }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-gray-800 dark:bg-white text-white dark:text-gray-800 px-4 py-3 rounded-lg shadow-lg text-sm">
      {mensaje}
    </div>
  );
}