import { useState } from 'react';
import { getCalls, getCallById } from '../services/callService';
import type { DetailCall } from '../types/callsTypes'; 

export function useCalls() {
  // las llamadas pueden devolver un array o null
  const [calls, setCalls] = useState<DetailCall[] | null>(null);
  // inicializa el spinner en false
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // error en null
  const [error, setError] = useState<string | null>(null);

  const fetchCalls = async () => {
    //cambia el estado del spinner en true 
    setIsLoading(true);
    //sigue el error en null
    setError(null);
    // sigue el estado de las llamadas en null
    setCalls(null);

    try {
      const initialCalls = await getCalls(); 
      if (initialCalls.length === 0) {
        setCalls([]);
        setIsLoading(false);
        return;
      }
      const detailPromises = initialCalls.map(call => getCallById(call.id));
      const results = await Promise.allSettled(detailPromises);

      const hydratedCalls = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<DetailCall>).value);
      
      setCalls(hydratedCalls);
    } catch (err) {
      // le cambia el estado a error
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
      setError(errorMessage);
      console.error("Error al obtener las llamadas:", err);
    } finally {
      // cambia el spinner a false, es decir, para
      setIsLoading(false);
    }
  };

  return { calls, isLoading, error, fetchCalls };
}