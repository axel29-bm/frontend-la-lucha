import { useState } from 'react';
import { CallUp } from '../services/callUpService';
import type { CallUpType } from '../types/callUpTypes';

const initialFormData: CallUpType = {
  to: '',
  name: '',
  project: '',
  campaignId: '',
};

export function useCallUp() {
  const [formData, setFormData] = useState<CallUpType>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await CallUp(formData);
      setFormData(initialFormData); 
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar la llamada';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, isLoading, error, success, handleInputChange, handleSubmit };
}