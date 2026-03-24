export interface Campaign {
    id: number;
    campaignName: string;
    type: number;
    status: number;
    createdAt: string | null;
    updatedAt: string | null;
    prompt: string; 
}

export interface DetailCampaign extends Campaign {
    emailTemplate: string | null;
    emailCCO: string | null;
    emailAttachment: string | null;
}