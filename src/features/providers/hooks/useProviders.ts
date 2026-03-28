import { useState, useEffect, useCallback } from 'react';
import { getProviders, toggleProviderStatus, updateProvider } from '../services/providerService';
import type { ProviderResponse, UpdateProviderPayload, ToggleProviderPayload } from '../types/providerTypes';

export const useProviders = () => {
    const [providers, setProviders] = useState<ProviderResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProviders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProviders();
            setProviders(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchProviders(); }, [fetchProviders]);

    const handleToggle = async (payload: ToggleProviderPayload) => {
        const prevStatus = !payload.isActive;
        setProviders(prev => prev.map(p =>
            p.providerId === payload.providerId ? { ...p, isActive: payload.isActive } : p
        ));
        try {
            await toggleProviderStatus(payload);
        } catch {
            setProviders(prev => prev.map(p =>
                p.providerId === payload.providerId ? { ...p, isActive: prevStatus } : p
            ));
        }
    };

    const handleUpdate = async (id: number, payload: UpdateProviderPayload) => {
        await updateProvider(id, payload);
        await fetchProviders();
    };

    return { providers, loading, handleToggle, handleUpdate, refresh: fetchProviders };
};
