import api from '../../../shared/services/api';
import type { Currency } from '../types/currencyTypes';

export const getCurrencies = async (): Promise<Currency[]> => {
    const response = await api.get<Currency[]>('/api/currencies');
    return response.data;
};
