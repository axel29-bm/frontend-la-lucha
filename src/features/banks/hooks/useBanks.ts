import { useState, useEffect, useCallback } from 'react';
import { getBanks, toggleBankStatus, createBank, updateBank } from '../services/bankService';
import type { Bank, CreateBankPayload, UpdateBankPayload } from '../types/bankTypes';

export const useBanks = () => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBanks = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getBanks();
            setBanks(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchBanks(); }, [fetchBanks]);

    const handleToggle = async (bankId: number, currentStatus: boolean) => {
        const newStatus = !currentStatus;
        setBanks(prev => prev.map(b =>
            b.bankId === bankId ? { ...b, isActive: newStatus } : b
        ));
        try {
            await toggleBankStatus({ bankId, isActive: newStatus });
        } catch {
            setBanks(prev => prev.map(b =>
                b.bankId === bankId ? { ...b, isActive: currentStatus } : b
            ));
        }
    };

    const handleCreate = async (payload: CreateBankPayload) => {
        await createBank(payload);
        await fetchBanks();
    };

    const handleUpdate = async (bankId: number, payload: UpdateBankPayload) => {
        await updateBank(bankId, payload);
        await fetchBanks();
    };

    return { banks, loading, handleToggle, handleCreate, handleUpdate, refresh: fetchBanks };
};