import { useState, useCallback } from 'react'
import type { ManagedUser, UpdateUserPayload } from '../types/usersTypes'
import {
  getUsers,
  updateUser,
  deleteUser,
} from '../services/usersService'

/**
 * Hook para gestión de usuarios.
 * Maneja la carga, actualización y eliminación de usuarios.
 */
export const useUsers = () => {
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }, [])

  const editUser = useCallback(async (id: string, data: UpdateUserPayload): Promise<boolean> => {
    try {
      const updated = await updateUser(id, data)
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar usuario')
      return false
    }
  }, [])

  const removeUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar usuario')
      return false
    }
  }, [])

  return { users, loading, error, fetchUsers, editUser, removeUser }
}
