/**
 * Navegación del sidebar.
 * - Renderiza dinámicamente los ítems del menú desde la estructura `_nav.tsx`.
 * - Usa recursividad para manejar grupos de navegación anidados.
 * - Utiliza `simplebar-react` para scroll personalizado.
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import type { NavItemType } from './_nav'

interface AppSidebarNavProps {
  items: NavItemType[]
}

export const AppSidebarNav: React.FC<AppSidebarNavProps> = ({ items }) => {
  /**
   * Construye visualmente un enlace de navegación con ícono y badge opcional.
   */
  const navLink = (
    name?: React.ReactNode,
    icon?: React.ReactNode,
    badge?: { color: string; text: string },
    indent = false
  ) => (
    <>
      {icon
        ? icon
        : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto" size="sm">
          {badge.text}
        </CBadge>
      )}
    </>
  )

  /**
   * Renderiza un item de navegación (puede ser externo, interno o visual).
   */
  const navItem = (item: NavItemType, index: number, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
            {...rest}
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

   /**
   * Renderiza un grupo anidado de navegación (submenús).
   */
  const navGroup = (item: NavItemType, index: number) => {
    const { component, name, icon, items, ...rest } = item
    const Component = component
    return (
      <Component
        compact
        as="div"
        key={index}
        toggler={navLink(name, icon)}
        {...rest}
      >
        {items?.map((child: NavItemType, idx: number) =>
          child.items ? navGroup(child, idx) : navItem(child, idx, true)
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  )
}
