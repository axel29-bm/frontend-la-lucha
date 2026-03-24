import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/slices/authSlice'

interface Permission {
  module: string
  controller: string
  method: string
  description: string | null
}

/**
 * Hook para verificación de permisos de usuario autenticado.
 * - Obtiene el usuario desde el estado global.
 * - Proporciona la función `hasPermission` para consultar permisos específicos.
 *
 * @returns Objeto con `hasPermission()` y el arreglo de `permissions` completo.
 */
export function usePermissions() {
  const user = useSelector(selectUser)
  
  /**
   * Evalúa si el usuario tiene el permiso especificado.
   * @param module Módulo a verificar
   * @param controller Controlador dentro del módulo
   * @param method Método opcional (si se omite, solo evalúa módulo + controlador)
   * @returns `true` si el permiso existe
   */
  const hasPermission = (module: string, controller: string, method?: string) => {
    if (!user?.permissions) return false
    return user.permissions.some(
      (perm: Permission) =>
      perm.module === module &&
      perm.controller === controller &&
      (!method || perm.method === method)
    )
  }

  return { hasPermission, permissions: user?.permissions || [] }
}
