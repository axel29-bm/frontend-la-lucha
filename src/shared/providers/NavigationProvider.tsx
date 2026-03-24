import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../utils/navigationService';

/**
 * NavigationProvider
 * ------------------
 * Se monta dentro del `<HashRouter>` y, apenas se renderiza,
 * registra la función `navigate()` global llamando a `setNavigator`.
 *
 * Así, cualquier parte del código puede llamar:
 * ```ts
 * import { navigate } from '@/shared/utils/navigationService'
 * navigate('/login')
 * ```
 * sin depender de hooks de React.
 */
const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Exponemos la función navigate globalmente
    setNavigator(navigate);
  }, [navigate]);

  return <>{children}</>;
};

export default NavigationProvider;
