import type { NavigateFunction, NavigateOptions } from 'react-router-dom';

let navigator: NavigateFunction | null = null;

/** Registra la función `navigate` globalmente */
export const setNavigator = (navFn: NavigateFunction) => {
  navigator = navFn;
};

/** 
 * 
 * Servicio global de navegación.
 *
 * - `setNavigator(navFn)`: Guarda la función `navigate` obtenida de
 *   `useNavigate()` al montar la app (ver NavigationProvider).
 * - `navigate(to, options)`: Permite redirigir desde cualquier archivo,
 *   incluso fuera de componentes React (interceptores, utilidades, etc.).
 *   *Si la función todavía no está disponible* se hace un *fallback*
 *   modificando directamente el hash de la URL para que HashRouter pueda
 *   procesarla sin recargar la página.
 * 
 * 
 * Navegación programática universal */
export const navigate = (to: string, options?: NavigateOptions) => {
  if (navigator) {
    navigator(to, options);
  } else {
    // Fallback (HashRouter) ─ evita recarga completa
    window.location.hash = `#${to.startsWith('/') ? to : '/' + to}`;
  }
};
