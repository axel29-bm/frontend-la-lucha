export interface MasterData {
    id: number;
    code: string;
    name: string;
}

export interface ProviderBankAccount {
    providerBankAccountId: number;
    bankId: number;
    bankName: string | null;
    currencyCode: string;
    accountNumber: string | null;
    cci: string | null;
    accountHolderName: string;
    isDefault: boolean;
    isActive: boolean;
}

export interface ProviderResponse {
    providerId: number;
    providerCode: string | null;
    legalName: string;
    commercialName: string | null;
    taxId: string | null;
    masterEmail: string | null;
    masterPhone: string | null;
    fiscalAddress: string | null;
    department: string | null;
    province: string | null;
    district: string | null;
    isActive: boolean;
    bankAccounts: ProviderBankAccount[];
}

export interface CreateProviderPayload {
    providerCode: string;
    legalName: string;
    commercialName: string;
    taxId: string;
    masterEmail: string;
    masterPhone: string;
    fiscalAddress: string;
    department: string;
    province: string;
    district: string;
    penBankId: number;
    penAccountNumber: string;
    penCci: string;
    usdBankId: number;
    usdAccountNumber: string;
    usdCci: string;
}

export interface UpdateProviderPayload {
    providerCode: string;
    legalName: string;
    commercialName?: string;
    taxId: string;
    masterEmail?: string;
    masterPhone?: string;
    fiscalAddress?: string;
    department?: string;
    province?: string;
    district?: string;
}

export interface ToggleProviderPayload {
    providerId: number;
    isActive: boolean;
}