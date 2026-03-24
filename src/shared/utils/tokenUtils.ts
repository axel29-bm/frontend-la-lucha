/**
 * tokenUtils
 * - Helpers para gestionar el accessToken y su expiración en localStorage.
 * - Centraliza la lectura/escritura del token para garantizar consistencia.
 */

const TOKEN_KEY = 'la_lucha_access_token'
const EXPIRES_KEY = 'la_lucha_token_expires'

export const tokenUtils = {
  /** Guarda el token y su fecha de expiración */
  save(accessToken: string, expiresAtUtc: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(EXPIRES_KEY, expiresAtUtc)
  },

  /** Retorna el token almacenado, o null si no existe */
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  /** Retorna la fecha de expiración almacenada, o null si no existe */
  getExpiry(): string | null {
    return localStorage.getItem(EXPIRES_KEY)
  },

  /** Elimina el token y la expiración del almacenamiento */
  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRES_KEY)
  },

  /** Verifica si el token ha expirado */
  isExpired(): boolean {
    const expiry = localStorage.getItem(EXPIRES_KEY)
    if (!expiry) return true
    return new Date(expiry) <= new Date()
  },
}
