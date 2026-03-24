import React from 'react'
import { CContainer, CRow, CCol } from '@coreui/react'
import { useLogin } from '../hooks/useLogin'
import LoginCard from '../components/organisms/LoginCard'

/**
 * Página de autenticación (Login) — Temática La Lucha.
 * - Renderiza el formulario de inicio de sesión encapsulado en un `LoginCard`.
 * - Utiliza `useLogin`, un custom hook que maneja el estado de autenticación (submit, loading, error).
 * - Estilizada con fondo oscuro y acento rojo acorde al branding "La Lucha".
 */
const AuthPage: React.FC = () => {
  const { login, loading, error } = useLogin()

  return (
    <div className="lucha-login-page">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} sm={10} md={7} lg={5}>
            <LoginCard onSubmit={login} loading={loading} error={error || undefined} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default AuthPage
