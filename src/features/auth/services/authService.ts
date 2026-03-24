import axios from 'axios'
import { AUTH_LOGIN_URL } from '../../../shared/constants/environment'
import type { LoginResponse } from '../types/userTypes'

/**
 * authService
 * - Servicio de autenticación para login contra el backend La Lucha.
 * - POST http://localhost:5218/api/Auth/login  (o VITE_AUTH_LOGIN_URL si está configurado)
 * - Request:  { email, password }
 * - Response: { accessToken, expiresAtUtc }
 */
const authService = {
  /**
   * Envía una solicitud POST para autenticación del usuario.
   * @param email    - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns LoginResponse con accessToken y expiresAtUtc
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      AUTH_LOGIN_URL,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } },
    )
    return response.data
  },
}

export default authService