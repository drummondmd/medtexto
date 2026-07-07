// hooks/useDraftStorage.ts
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseDraftStorageOptions {
  key: string;
  debounceMs?: number;
  storage?: "local" | "session" | "both";
}

export function useDraftStorage({
  key,
  debounceMs = 500,
  storage = "both",
}: UseDraftStorageOptions) {
  const [value, setValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storageKey = `draft:${key}`;

  // Carrega o rascunho salvo ao montar (só no client)
  useEffect(() => {
    try {
      const saved =
        (storage !== "local" && sessionStorage.getItem(storageKey)) ||
        (storage !== "session" && localStorage.getItem(storageKey)) ||
        "";
      if (saved) setValue(saved);
    } catch (e) {
      console.warn("Falha ao restaurar rascunho:", e);
    } finally {
      setIsLoaded(true);
    }
  }, [storageKey, storage]);

  // Salva com debounce a cada mudança
  const updateValue = useCallback(
    (newValue: string) => {
      setValue(newValue);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        try {
          if (storage !== "local") sessionStorage.setItem(storageKey, newValue);
          if (storage !== "session") localStorage.setItem(storageKey, newValue);
        } catch (e) {
          console.warn("Falha ao salvar rascunho:", e);
        }
      }, debounceMs);
    },
    [storageKey, storage, debounceMs]
  );

  // Limpa o rascunho (chame isso ao salvar/enviar com sucesso)
  const clearDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
      localStorage.removeItem(storageKey);
    } catch (e) {
      console.warn("Falha ao limpar rascunho:", e);
    }
    setValue("");
  }, [storageKey]);

  return { value, updateValue, clearDraft, isLoaded };
}
