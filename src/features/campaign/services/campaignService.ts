import { CAMPAIGNS_PATH } from '../../../shared/constants/environment';
import api from '../../../shared/services/api';
import type { Campaign, DetailCampaign } from '../types/campaignsTypes';

// fnc para obtener todas las campañas
export async function getCampaigns(): Promise<Campaign[]> {
    const response = await api.get<Campaign[]>(CAMPAIGNS_PATH);
    return response.data;
}

// fnc para obtener el detalle de la campaña por id
export async function getCampaignById(id: string | number): Promise<DetailCampaign> {
    const response = await api.get<DetailCampaign>(`${CAMPAIGNS_PATH}/${id}`);
    return response.data;
}

// fnc para crear una campaña nueva
export async function createCampaign(campaignData: FormData): Promise<DetailCampaign> {
    const response = await api.post<DetailCampaign>(CAMPAIGNS_PATH, campaignData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

// fnc para actualizar una campaña
export async function updateCampaign(id: number, campaignData: DetailCampaign): Promise<DetailCampaign> {
    const response = await api.put<DetailCampaign>(`${CAMPAIGNS_PATH}/${id}`, campaignData);
    return response.data;
}