/**
 * Componente principal del encabezado de la aplicación.
 * - Incluye el botón para colapsar/expandir el sidebar.
 * - Integra navegación (`NavLink`), cambio de tema (dark/light/auto) y menú de usuario (`AppHeaderDropdown`).
 * - Aplica una sombra cuando el usuario hace scroll.
 * - Muestra las rutas activas a través del componente `AppBreadcrumb`.
 */

import React, { useEffect, useRef } from 'react'
//import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  //CNavLink,
  //CNavItem,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'
import AppHeaderDropdown from './AppHeaderDropdown'
import AppBreadcrumb from './AppBreadcrumb'
import type { RootState } from '../../store'
import { setSidebarShow } from '../slices/sidebarSlice'

const AppHeader: React.FC = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state: RootState) => state.sidebar.sidebarShow)

  // Agrega/remueve sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid style={{ padding: '12px' }}>
        <CHeaderToggler
          onClick={() => dispatch(setSidebarShow(!sidebarShow))}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        
        {/* Navegación visible en escritorio */}
        {/*
        <CHeaderNav className="d-none d-md-flex gap-4">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>Dashboard</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/profile" as={NavLink}>Perfil</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/users-list" as={NavLink}>Usuarios</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/create-users" as={NavLink}>Registrar usuarios</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/calls" as={NavLink}>Llamadas</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/call-up" as={NavLink}>Llamar</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/my-ai" as={NavLink}>Mi IA</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/config" as={NavLink}>Configuración</CNavLink>
          </CNavItem>
        </CHeaderNav>
        */}

        {/* Controles a la derecha */}
        <CHeaderNav className="ms-auto">
          {/* Cambio de tema: dark, light, auto */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
