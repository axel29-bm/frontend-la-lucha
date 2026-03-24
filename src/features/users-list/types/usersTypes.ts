/**
 * Tipos para el módulo de Gestión de Usuarios — La Lucha.
 *
 * ⚠️  INTEGRACIÓN BACKEND:
 * Estos tipos están diseñados para conectarse a la API REST.
 * Ajusta los campos según la respuesta real de tu backend.
 */

/** Rol de un usuario */
export interface UserRole {
  id: string
  name: string
}

/** Usuario gestionado (lista y detalle) */
export interface ManagedUser {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  picture?: string | null
  role: UserRole
  is_active: boolean
  created_at?: string
}

/** Payload para crear un usuario */
export interface CreateUserPayload {
  username: string
  full_name: string
  email: string
  password: string
  role_id?: string
  phone?: string
}

/** Payload para editar un usuario */
export interface UpdateUserPayload {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  role_id?: string
  is_active?: boolean
}

/** Estado del hook de usuarios */
export interface UsersState {
  users: ManagedUser[]
  loading: boolean
  error: string | null
}
