import { useState, useEffect, useCallback } from 'react';
import { getEmailHistory } from '../services/emailService'; // Asegúrate que la ruta a tu servicio es correcta
import type { EmailHistory } from '../types/emailTypes'; // Y a tus tipos

export const useEmailHistory = () => {
  const [history, setHistory] = useState<EmailHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getEmailHistory();
      // Ordenamos los correos del más reciente al más antiguo para una mejor UX
      const sortedData = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setHistory(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al cargar el historial.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, isLoading, error, fetchHistory };
};