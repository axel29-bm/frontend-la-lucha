import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'

interface PrivateRouteProps {
  children: React.ReactNode
}

/**
 * Componente de ruta protegida.
 * - Evalúa si el usuario está autenticado (mediante Redux).
 * - Si no lo está, lo redirige al login.
 * - Si lo está, muestra el contenido hijo de forma segura.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Evalúa autenticación global desde Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  // Redirección condicional
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default PrivateRoute
