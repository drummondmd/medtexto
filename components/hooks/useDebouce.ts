import { useEffect, useState } from "react";

/**
 * Hook para esperar um tempo para fazer chamada na API. Retorno valor após o tempo estipulado 500ms de padrão
 *
 * @param value
 * @param ms
 * @returns
 */

export function useDebounce(value: any, ms: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);

  return debounced;
}
