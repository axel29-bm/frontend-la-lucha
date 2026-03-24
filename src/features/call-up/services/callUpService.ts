import { CALLS_UP_URL } from '../../../shared/constants/environment';
import api from '../../../shared/services/api';
import type { CallUpType } from '../types/callUpTypes';

export async function CallUp(payload: CallUpType): Promise<any> {
    const response = await api.post(CALLS_UP_URL, payload);
  
    return response.data;
}