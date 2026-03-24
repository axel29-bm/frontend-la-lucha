import { useState, useEffect, useCallback } from 'react';
import { getCallById, getRecordingPresignedUrl } from '../services/callService';
import type { DetailCall } from '../types/callsTypes';

export function useCallDetail(id: string | undefined) {
  const [detailCall, setDetailCall] = useState<DetailCall | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);

  // --- CAMBIO: Envolvemos la lógica de fetch en una función reutilizable ---
  const fetchCallDetail = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      setError("No se proporcionó un ID de llamada");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await getCallById(id);
      setDetailCall(data);

      if (data.callRecordReady && data.recordingSid) {
        setIsAudioLoading(true);
        try {
          const url = await getRecordingPresignedUrl(data.recordingSid);
          setAudioUrl(url);
        } catch (audioError) {
          console.error("No se pudo obtener la URL de la grabación", audioError);
        } finally {
          setIsAudioLoading(false);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los detalles de la llamada';
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCallDetail();
  }, [fetchCallDetail]);

  return { detailCall, isLoading, error, audioUrl, isAudioLoading, refetch: fetchCallDetail };
}