// formato de LeadStatus
export interface LeadStatus {
  leadStatusId: number;
  statusKey: string;
  descripcion: string;
}

//formato de la nota de la call
export interface CallNote {
  recordNoteId: number;
  recordId: number;
  comment: string;
  createdBy: string;
  createdAt: string;
}

// formato de la llamada - campos
export interface Call {
  id: number;
  callSid: string;
  clientNumber: string;
  twilioNumber: string;
  startTime: string;
  endTime: string | null;
  leadStatusId: number;
  leadStatus: LeadStatus;
}

export interface UpdateLeadStatusPayload {
  leadStatusId: number;
  comment: string;
}

// formato del detalle de la llamada - campos
export interface DetailCall extends Call {
  recordingUrl: string | null;
  createdAt: string;
  updatedAt: string;
  sentiment: string | null;
  sentimentScore: number;
  nextSteps: string[] | string | null;
  clientName: string | null;
  clientEmail: string | null;
  recordingSid: string | null;
  transcription: string | null;
  source: boolean;
  callRecordReady: boolean;
  isIncomming: number;
  campaignId: number;
  notes: CallNote[] | null;
}