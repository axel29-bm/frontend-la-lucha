import api from '../../../shared/services/api';
import type { Call, CallNote, DetailCall, UpdateLeadStatusPayload } from '../types/callsTypes';
import { CALLS_URL } from '../../../shared/constants/environment'

interface AddNotePayload {
  comment: string;
  createdBy: string;
}

// fnc para obtener todas las llamadas
export async function getCalls(): Promise<Call[]> {
  const response = await api.get<Call[]>(CALLS_URL);
  
  return response.data;
}

// fnc para obtener el detalle de la llamada por id
export async function getCallById(id: string | number): Promise<DetailCall> {
  const response = await api.get<DetailCall>(`${CALLS_URL}/${id}`);
  return response.data;
}

// fnc para obtener el presignedUrl
export async function getRecordingPresignedUrl(recordingSid: string): Promise<string> {
  type PresignedUrlResponse = {
    presignedUrl: string;
  }

  const response = await api.get<PresignedUrlResponse>(`/api/calls/recording/${recordingSid}/presigned-url`);

  return response.data.presignedUrl;
}

export async function addNoteToCall(id: string | number, noteData: AddNotePayload): Promise<CallNote> {
  const response = await api.post<CallNote>(`/api/calls/records/${id}/insertnote`, noteData);
  return response.data;
}

/*
export async function getAllLeadStatuses(): Promise<LeadStatus[]> {
  const response = await api.get<LeadStatus[]>('/api/lead-statuses');
  return response.data;
}
*/

export async function updateLeadStatus(id: string | number, payload: UpdateLeadStatusPayload): Promise<DetailCall> {
  const response = await api.put<DetailCall>(`/api/calls/records/${id}/updateleadstatus`, payload);
  return response.data;
}