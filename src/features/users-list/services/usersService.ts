/**
 * Servicio de Gestión de Usuarios — La Lucha.
 *
 * GET  /api/users        → conectado a la API real
 * GET  /api/users/:id    → conectado a la API real
 * PUT  /api/users/:id    → pendiente de endpoint backend
 * DELETE /api/users/:id  → pendiente de endpoint backend
 * POST /api/users        → pendiente de endpoint backend
 */

import api from '../../../shared/services/api'
import { USERS_URL } from '../../../shared/constants/environment'
import type { ManagedUser, CreateUserPayload, UpdateUserPayload } from '../types/usersTypes'

/* -----------------------------------------------------------------------
   Datos mock (solo para el diseño — reemplazar con llamadas a la API)
   ----------------------------------------------------------------------- */
const MOCK_USERS: ManagedUser[] = [
  {
    id: '1',
    username: 'jperez',
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'jperez@lalucha.com',
    phone: '+51 987 654 321',
    picture: null,
    role: { id: '1', name: 'Administrador' },
    is_active: true,
    created_at: '2025-01-10T08:00:00Z',
  },
  {
    id: '2',
    username: 'mgarcia',
    first_name: 'María',
    last_name: 'García',
    email: 'mgarcia@lalucha.com',
    phone: '+51 912 345 678',
    picture: null,
    role: { id: '2', name: 'Agente' },
    is_active: true,
    created_at: '2025-01-15T09:30:00Z',
  },
  {
    id: '3',
    username: 'clopez',
    first_name: 'Carlos',
    last_name: 'López',
    email: 'clopez@lalucha.com',
    phone: '+51 934 567 890',
    picture: null,
    role: { id: '2', name: 'Agente' },
    is_active: false,
    created_at: '2025-02-01T10:00:00Z',
  },
  {
    id: '4',
    username: 'arojas',
    first_name: 'Ana',
    last_name: 'Rojas',
    email: 'arojas@lalucha.com',
    phone: '+51 956 789 012',
    picture: null,
    role: { id: '3', name: 'Supervisor' },
    is_active: true,
    created_at: '2025-02-20T11:00:00Z',
  },
  {
    id: '5',
    username: 'lmendoza',
    first_name: 'Luis',
    last_name: 'Mendoza',
    email: 'lmendoza@lalucha.com',
    phone: '+51 978 901 234',
    picture: null,
    role: { id: '2', name: 'Agente' },
    is_active: true,
    created_at: '2025-03-01T08:30:00Z',
  },
  {
    id: '6',
    username: 'sflores',
    first_name: 'Sofía',
    last_name: 'Flores',
    email: 'sflores@lalucha.com',
    phone: '+51 901 234 567',
    picture: null,
    role: { id: '2', name: 'Agente' },
    is_active: false,
    created_at: '2025-03-10T09:00:00Z',
  },
]

/* -----------------------------------------------------------------------
   Funciones del servicio
   ----------------------------------------------------------------------- */

/**
 * Obtiene la lista de todos los usuarios.
 * GET /api/users
 */
export const getUsers = async (): Promise<ManagedUser[]> => {
  const response = await api.get<ManagedUser[]>(USERS_URL)
  return response.data
}

/**
 * Obtiene el detalle de un usuario por ID.
 * GET /api/users/:id
 */
export const getUserById = async (id: string): Promise<ManagedUser> => {
  const response = await api.get<ManagedUser>(`${USERS_URL}/${id}`)
  return response.data
}

/**
 * Actualiza los datos de un usuario existente.
 * TODO: reemplazar con → return (await api.put<ManagedUser>(`${USERS_URL}/${id}`, data)).data
 */
export const updateUser = async (id: string, data: UpdateUserPayload): Promise<ManagedUser> => {
  await new Promise((r) => setTimeout(r, 600))
  const index = MOCK_USERS.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('Usuario no encontrado')
  const updated: ManagedUser = {
    ...MOCK_USERS[index],
    first_name: data.first_name ?? MOCK_USERS[index].first_name,
    last_name: data.last_name ?? MOCK_USERS[index].last_name,
    email: data.email ?? MOCK_USERS[index].email,
    phone: data.phone ?? MOCK_USERS[index].phone,
    is_active: data.is_active ?? MOCK_USERS[index].is_active,
  }
  MOCK_USERS[index] = updated
  return updated
}

/**
 * Elimina un usuario por ID.
 * TODO: reemplazar con → await api.delete(`${USERS_URL}/${id}`)
 */
export const deleteUser = async (id: string): Promise<void> => {
  await new Promise((r) => setTimeout(r, 500))
  const index = MOCK_USERS.findIndex((u) => u.id === id)
  if (index === -1) throw new Error('Usuario no encontrado')
  MOCK_USERS.splice(index, 1)
}

/**
 * Crea un nuevo usuario.
 * TODO: reemplazar con → return (await api.post<ManagedUser>(USERS_URL, data)).data
 */
export const createUser = async (data: CreateUserPayload): Promise<ManagedUser> => {
  await new Promise((r) => setTimeout(r, 600))
  const parts = data.full_name.trim().split(/\s+/)
  const first_name = parts[0] ?? data.full_name
  const last_name = parts.length > 1 ? parts.slice(1).join(' ') : ''
  const newUser: ManagedUser = {
    id: String(Date.now()),
    username: data.username,
    first_name,
    last_name: last_name,
    email: data.email,
    phone: data.phone,
    picture: null,
    role: { id: data.role_id ?? '2', name: 'Agente' },
    is_active: true,
    created_at: new Date().toISOString(),
  }
  MOCK_USERS.push(newUser)
  return newUser
}
