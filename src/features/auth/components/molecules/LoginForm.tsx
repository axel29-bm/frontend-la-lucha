import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../atoms/Input'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeClosed, cilLockLocked } from '@coreui/icons'
import type { LoginFormValues, Props } from '../../types/userTypes'
import { CButton, CSpinner } from '@coreui/react'

const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Logo La Lucha */}
      <div className="lucha-logo-wrapper">
        <img
          src="/brand/la-lucha-logo.svg"
          alt="La Lucha Sanguchería Criolla"
          className="lucha-logo"
        />
      </div>

      <p className="lucha-welcome">Bienvenido. Ingrese al sistema.</p>

      <Input
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' },
        })}
        type="email"
        placeholder="Correo electrónico"
        autoComplete="email"
        icon={<CIcon icon={cilEnvelopeClosed} />}
      />
      {errors.email && <span className="lucha-field-error">{errors.email.message}</span>}

      <Input
        {...register('password', { required: 'La contraseña es obligatoria' })}
        type="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        icon={<CIcon icon={cilLockLocked} />}
      />
      {errors.password && <span className="lucha-field-error">{errors.password.message}</span>}

      {/* Error de autenticación */}
      {error && <div className="lucha-auth-error">{error}</div>}

      {/* Botón de submit */}
      <div className="d-flex justify-content-end align-items-center mt-4">
        <CButton type="submit" className="lucha-btn-submit" disabled={loading}>
          {loading ? (
            <>
              <CSpinner size="sm" className="me-2" />
              Ingresando...
            </>
          ) : (
            'Ingresar'
          )}
        </CButton>
      </div>
    </form>
  )
}

export default LoginForm