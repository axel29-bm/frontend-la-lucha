interface Service {
  id: string
  name: string
  controller: string
  title: string
  extra_data: string | null
  rate_sus_to_bs: string
  rate_bs_to_sus: string
}

interface PaymentMethod {
  code: string
  name: string
  commissions: unknown[]
}


/**
 *  * Tipos relacionados al módulo de autenticación y usuario.
 * - Define el modelo de `User`, estructura de `AuthState`, y el `LoginResponse`.
 * 
 * Representa un usuario autenticado del sistema.
 */
export interface User {
  username: string
  first_name: string
  last_name: string
  type_identification: string
  identification: string
  email: string
  phone: string
  picture: string | null
  password_is_expired: boolean
  role: { id: string, name: string }
  entity: { id: string, name: string }
  agency: { id: string, name: string }
  country: { id: string, name: string }
  city: { id: string, name: string }
  town: { id: string, name: string }
  permissions: Array<{
    module: string
    controller: string
    method: string
    description: string | null
  }>
  services: Service[]
  service_events: unknown[]
  payment_methods: PaymentMethod[]
}

/** Estado global de autenticación */
export interface AuthState {
  user: User | null
  token: string | null
  expiresAtUtc: string | null
  isAuthenticated: boolean
}

/** Respuesta del endpoint POST /api/Auth/login */
export interface LoginResponse {
  accessToken: string
  expiresAtUtc: string
}

/** Props usadas en componentes de formulario */
export interface Props {
  onSubmit: (data: { email: string; password: string }) => void
  loading?: boolean
  error?: string
}

/** Valores de formulario de login */
export type LoginFormValues = {
  email: string
  password: string
}