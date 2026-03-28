import api from '../../../shared/services/api';
import type { Bank, CreateBankPayload, UpdateBankPayload, ToggleBankPayload } from '../types/bankTypes';

const BASE = '/api/banks';

export const getBanks = async (): Promise<Bank[]> => {
    const response = await api.get<Bank[]>(BASE);
    return response.data;
};

export const createBank = async (payload: CreateBankPayload) => {
    const response = await api.post(BASE, payload);
    return response.data;
};

export const updateBank = async (bankId: number, payload: UpdateBankPayload) => {
    const response = await api.put(`${BASE}/${bankId}`, payload);
    return response.data;
};

export const toggleBankStatus = async (payload: ToggleBankPayload) => {
    const response = await api.patch(`${BASE}/toggle-status`, payload);
    return response.data;
};