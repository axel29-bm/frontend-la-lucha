export interface EmailHistory {
    emailHistoryId: number;
    timestamp: string;
    clientEmail: string;
    cco: string | null;
    emailBody: string;
    campaignId: number;
  }