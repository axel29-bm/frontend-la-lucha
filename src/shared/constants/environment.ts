/**
 * Variables de entorno relacionadas con la API.
 * - Se cargan desde `import.meta.env` y se ensamblan para formar las URLs completas.
 * - Utilizadas por los servicios globales y específicos de features.
 */

export const API_URL = import.meta.env.VITE_API_URL 
export const API_LOGIN_PATH = import.meta.env.VITE_API_LOGIN_PATH
// export const API_TRANSACTIONS_PATH = import.meta.env.VITE_API_TRANSACTIONS_PATH
export const API_CALLS_PATH = import.meta.env.VITE_API_CALLS_PATH
export const REGISTER_USER_URL = import.meta.env.VITE_API_REGISTER_USER
export const CALL_UP_PATH = import.meta.env.VITE_API_CALL_UP_PATH
export const CAMPAIGNS_PATH = import.meta.env.VITE_API_CAMPAIGNS_PATH
export const EMAIL_HISTORY_PATH = import.meta.env.VITE_API_EMAIL_PATH

/** URL completa para login (backend La Lucha) */
export const AUTH_LOGIN_URL =
  import.meta.env.VITE_AUTH_LOGIN_URL ?? 'http://localhost:5218/api/Auth/login'

/** URL completa para login (legacy) */
export const LOGIN_URL = `${API_URL}${API_LOGIN_PATH}`

/** URL completa para obtener transacciones */
// export const TRANSACTIONS_URL = `${API_URL}${API_TRANSACTIONS_PATH}`
export const CALLS_URL = `${API_URL}${API_CALLS_PATH}`

export const CALLS_UP_URL = `${API_URL}${CALL_UP_PATH}`
export const CAMPAIGNS_URL = `${API_URL}${CAMPAIGNS_PATH}`
export const USERS_URL = `${API_URL}/api/users`