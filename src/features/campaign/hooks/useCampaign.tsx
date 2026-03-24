import { useState } from 'react';
import { getCampaignById, getCampaigns } from '../services/campaignService';
import type { Campaign } from '../types/campaignsTypes'; 

export function useCampaign() {
  // las llamadas pueden devolver un array o null
  const [campaigns, setCampaign] = useState<Campaign[] | null>(null);
  // inicializa el spinner en false
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // error en null
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    //cambia el estado del spinner en true 
    setIsLoading(true);
    //sigue el error en null
    setError(null);
    // sigue el estado de las llamadas en null
    setCampaign(null);

    try {
      const initialCampaigns = await getCampaigns(); 
      if (initialCampaigns.length === 0) {
        setCampaign([]);
        setIsLoading(false);
        return;
      }
      const detailPromises = initialCampaigns.map(campaign => getCampaignById(campaign.id));
      const results = await Promise.allSettled(detailPromises);

      const hydratedCampaign = results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<Campaign>).value);
      
      setCampaign(hydratedCampaign);
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

  return { campaigns, isLoading, error, fetchCampaigns };
}