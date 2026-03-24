import React from 'react'
import { CCard, CCardBody } from '@coreui/react'
import LoginForm from '../molecules/LoginForm'
import type { Props } from '../../types/userTypes'

/**
 * LoginCard es un componente contenedor que muestra la tarjeta de autenticación
 * con temática "La Lucha Sanguchería Criolla".
 * Internamente incluye el componente LoginForm y recibe sus props desde un nivel superior.
 *
 * @param {Props} props - Props para manejar la autenticación del usuario (onSubmit, loading, error).
 */
const LoginCard: React.FC<Props> = ({ onSubmit, loading, error }) => (
  <CCard className="lucha-login-card">
    <CCardBody className="p-4 p-md-5">
      <LoginForm onSubmit={onSubmit} loading={loading} error={error} />
    </CCardBody>
  </CCard>
)

export default LoginCard
