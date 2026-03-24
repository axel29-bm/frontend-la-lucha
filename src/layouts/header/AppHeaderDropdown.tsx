/**
 * Dropdown de usuario ubicado en el header.
 * - Muestra avatar del usuario actual (o imagen por defecto).
 * - Permite navegar al perfil o cerrar sesión.
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import { cilUser, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import userDefaultAvatar from '../../assets/img/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/slices/authSlice'

const AppHeaderDropdown: React.FC = () => {
  const user = useSelector(selectUser)
  const avatarUrl = user?.picture || userDefaultAvatar 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleProfile = () => {
    navigate('/profile')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item" placement="bottom-end">
      <CDropdownToggle className="py-0 pe-0" caret={false}>
        <CAvatar src={avatarUrl} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Configuración</CDropdownHeader>
        <CDropdownItem as="button" onClick={handleProfile}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem as="button" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
