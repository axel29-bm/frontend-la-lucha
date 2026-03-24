import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../services/authService'
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice'
import { tokenUtils } from '../../../shared/utils/tokenUtils'

/**
 * Custom hook: `useLogin`
 * - Encapsula la lógica de inicio de sesión.
 * - Administra estado local `loading` y `error`.
 * - Dispara acciones de Redux (`loginStart`, `loginSuccess`, `loginFailure`).
 * - Persiste el token en localStorage via tokenUtils.
 * - Redirige al usuario al dashboard si el login es exitoso.
 */
export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * Ejecuta la lógica de login:
   * - Llama al servicio de autenticación con email y password.
   * - Persiste el accessToken y expiresAtUtc en localStorage.
   * - Actualiza el estado global de Redux.
   * - Redirige al dashboard.
   */
  const login = async (data: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    dispatch(loginStart())
    try {
      const response = await authService.login(data.email, data.password)

      // Persist token in localStorage for consistent access
      tokenUtils.save(response.accessToken, response.expiresAtUtc)

      dispatch(loginSuccess({
        token: response.accessToken,
        expiresAtUtc: response.expiresAtUtc,
      }))
      navigate('/dashboard')
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message)
      } else {
        setError('Login failed')
      }
      dispatch(loginFailure())
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
