import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDollar,
  cilInstitution,
  cilPeople,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

export interface NavBadge {
  color: string
  text: string
}

export interface NavItemType {
  component: React.ElementType
  name?: React.ReactNode
  to?: string
  href?: string
  icon?: React.ReactNode
  badge?: NavBadge
  items?: NavItemType[]
  [key: string]: unknown
}

const _nav: NavItemType[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bancos',
    to: '/banks',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Monedas',
    to: '/currencies',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proveedores',
    to: '/providers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
]

export default _nav