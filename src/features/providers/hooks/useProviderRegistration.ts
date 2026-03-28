import { useState, useEffect } from 'react';
import { getProviderMasterData, createProvider } from '../services/providerService';
import type { MasterData, CreateProviderPayload } from '../types/providerTypes';

export const useProviderRegistration = () => {
    const [banks, setBanks] = useState<MasterData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar bancos para los dropdowns de las TABS de cuentas
    useEffect(() => {
        const fetchMasterData = async () => {
            try {
                const data = await getProviderMasterData();
                setBanks(data.banks);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Error al cargar catálogo de bancos';
                setError(message);
            }
        };
        fetchMasterData();
    }, []);

    const handleRegister = async (payload: CreateProviderPayload) => {
        setLoading(true);
        setError(null);
        try {
            if (payload.taxId.length !== 11) throw new Error("El RUC debe tener 11 dígitos");

            await createProvider(payload);
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error en el registro';
            setError(message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { banks, loading, error, handleRegister };
};