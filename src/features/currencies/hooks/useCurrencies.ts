import { useState, useEffect, useCallback } from 'react';
import { getCurrencies } from '../services/currencyService';
import type { Currency } from '../types/currencyTypes';

export const useCurrencies = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCurrencies = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCurrencies();
            setCurrencies(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchCurrencies(); }, [fetchCurrencies]);

    return { currencies, loading, refresh: fetchCurrencies };
};
