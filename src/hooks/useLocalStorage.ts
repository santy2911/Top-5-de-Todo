import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = localStorage.getItem(key);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(valor));
  }, [key, valor]);

  return [valor, setValor] as const;
}