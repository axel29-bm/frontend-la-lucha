import api from '../../../shared/services/api';
import type { ProviderResponse, CreateProviderPayload, UpdateProviderPayload, ToggleProviderPayload, MasterData } from '../types/providerTypes';

const BASE = '/api/providers';

export const getProviders = async (): Promise<ProviderResponse[]> => {
    const response = await api.get<ProviderResponse[]>(BASE);
    return response.data;
};

export const getProviderMasterData = async () => {
    const response = await api.get<{ banks: MasterData[]; currencies: MasterData[] }>(`${BASE}/master-data`);
    return response.data;
};

export const createProvider = async (payload: CreateProviderPayload) => {
    const response = await api.post(BASE, payload);
    return response.data;
};

export const updateProvider = async (id: number, payload: UpdateProviderPayload) => {
    const response = await api.put(`${BASE}/${id}`, payload);
    return response.data;
};

export const toggleProviderStatus = async (payload: ToggleProviderPayload) => {
    const response = await api.patch(`${BASE}/toggle-status`, payload);
    return response.data;
};