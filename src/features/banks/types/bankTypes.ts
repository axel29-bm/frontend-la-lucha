export interface Bank {
    bankId: number;
    bankCode: string;
    bankName: string;
    swiftCode: string | null;
    isActive: boolean;
}

export interface CreateBankPayload {
    bankCode: string;
    bankName: string;
    swiftCode?: string;
}

export interface UpdateBankPayload {
    bankCode: string;
    bankName: string;
    swiftCode?: string;
}

export interface ToggleBankPayload {
    bankId: number;
    isActive: boolean;
}