import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'
import type { AuthState } from '../types/userTypes'

// Estado inicial de autenticación
const initialState: AuthState = {
  user: null,
  token: null,
  expiresAtUtc: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     /** Inicia el proceso de login (puede activar loading) */
    loginStart: () => {},

    /** Login exitoso: guarda el token, expiración y cambia el estado a autenticado */
    loginSuccess: (state, action: PayloadAction<{
      token: string
      expiresAtUtc: string
    }>) => {
      state.token = action.payload.token
      state.expiresAtUtc = action.payload.expiresAtUtc
      state.isAuthenticated = true
    },

     /** Login fallido: limpia el estado */
    loginFailure: (state) => {
      state.user = null
      state.token = null
      state.expiresAtUtc = null
      state.isAuthenticated = false
    },

    /** Logout explícito: borra los datos del usuario */
    logout: (state) => {
      state.user = null
      state.token = null
      state.expiresAtUtc = null
      state.isAuthenticated = false
    },
  },
})

// Exporta acciones
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

/**
 * authSlice (Redux Toolkit)
 * - Administra el estado global de autenticación.
 * - Contiene acciones para login, logout, éxito y error.
 * - También expone selectores para consultar el estado de autenticación.
 */
// Selectores para acceder al estado auth desde componentes
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export default authSlice.reducer
