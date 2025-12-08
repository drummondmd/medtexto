// src/hooks/useApiMutator.js

import { useState, useCallback, useRef, useEffect } from "react";

// Definindo o tipo de status fora do hook para clareza (assumindo que o arquivo é .ts ou .tsx)
// Se for .js, remova ": StatusType" e "<StatusType>"
type StatusType = {
  isMutating: boolean;
  success: boolean | undefined;
  message: string | undefined;
};

const INITIAL_STATUS: StatusType = { isMutating: false, success: undefined, message: undefined };

/**
 * Hook genérico para encapsular o estado e a lógica de qualquer chamada de API de mutação (POST, PUT, DELETE).
 * * @param {function} apiFunction - A função de API que será executada (ex: api.updateNote, api.deleteUser).
 * @param {string} successMessage - Mensagem para o caso de sucesso (opcional).
 * @param {number} resetDelay - Tempo em milissegundos para resetar o feedback (message e success). Padrão: 5000ms.
 */

const useApiMutator = (
  apiFunction: any,
  successMessage = "Operação realizada com sucesso.",
  resetDelay = 5000 // Novo parâmetro para o delay
) => {
  // Se for .js, use apenas: const [status, setStatus] = useState(INITIAL_STATUS);
  const [status, setStatus] = useState<StatusType>(INITIAL_STATUS);

  // Ref para armazenar o ID do timeout para limpeza
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para limpar apenas o feedback (message e success)
  const clearFeedbackState = useCallback(() => {
    setStatus((prev) => ({
      ...prev,
      success: undefined,
      message: undefined,
    }));
  }, []);

  const setFeedback = useCallback(
    (success: boolean, message: string) => {
      // 1. Limpa qualquer timeout anterior (evita que um reset indesejado aconteça)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // 2. Define o status manualmente (isMutating sempre será false)
      setStatus({
        isMutating: false,
        success: success,
        message: message,
      });

      // 3. Configura o timeout para limpar o feedback após o delay
      timeoutRef.current = setTimeout(clearFeedbackState, resetDelay);
    },
    [clearFeedbackState, resetDelay]
  ); // Depende do resetDelay e da função de limpeza

  // Efeito de Limpeza: Garante que o timer seja cancelado ao desmontar o componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // A função principal que será chamada pelo componente
  const executeMutation = useCallback(
    async (...args) => {
      // 1. Limpa qualquer timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // 2. Inicia a mutação
      setStatus({ isMutating: true, success: undefined, message: undefined });

      try {
        const result = await apiFunction(...args);
        if (result.success) {
          // 3. Sucesso: Define o status e agenda o reset
          setStatus({ isMutating: false, success: true, message: successMessage });
          timeoutRef.current = setTimeout(clearFeedbackState, resetDelay); // Agenda o reset
          return result;
        } else {
          // 4. Erro: Define o status e agenda o reset
          setStatus({ isMutating: false, success: false, message: "Erro na mutação" });

          timeoutRef.current = setTimeout(clearFeedbackState, resetDelay); // Agenda o reset
          return result;
        }
      } catch (err) {
        const errorMessage = (err as Error)?.message || "Erro ao executar a operação.";

        // 4. Erro: Define o status e agenda o reset
        setStatus({ isMutating: false, success: false, message: errorMessage });

        timeoutRef.current = setTimeout(clearFeedbackState, resetDelay); // Agenda o reset

        throw err;
      }
    },
    [apiFunction, successMessage, resetDelay, clearFeedbackState]
  ); // Dependências do useCallback

  return { status, executeMutation, setFeedback }; // Retornando clearFeedbackState para uso manual opcional
};

export default useApiMutator;
