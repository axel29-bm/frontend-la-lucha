import { EMAIL_HISTORY_PATH } from '../../../shared/constants/environment';
import api from '../../../shared/services/api';
import type { EmailHistory } from '../types/emailTypes';


export async function getEmailHistory(): Promise<EmailHistory[]> {
    const response = await api.get<EmailHistory[]>(EMAIL_HISTORY_PATH);
    return response.data;
}