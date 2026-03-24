import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibElectron,
  cilBullhorn,
  cilGroup,
  cilPhone,
  cilSettings,
  cilSpeedometer,
  cilUser,
  cilUserPlus,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

// --- 1. Importa el ícono desde react-icons/vsc ---
// 'vsc' es el sub-paquete para los íconos de VSCode
import { VscCallOutgoing } from 'react-icons/vsc'
import { CiMail } from "react-icons/ci";
//import { MdOutlineCampaign } from 'react-icons/md'

// Interfaz para badge visual (íconos con contador)
export interface NavBadge {
  color: string
  text: string
}

// Estructura esperada para cada ítem de navegación
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
    name: 'Perfil',
    to: '/Profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users-list',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Registrar usuarios',
    to: '/create-users',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Llamadas',
    to: '/calls',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Llamar',
    to: '/call-up', 
    icon: <VscCallOutgoing className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Campañas',
    to: '/campaign', 
    icon: <CIcon icon={cilBullhorn} className="nav-icon"/>,
  },
  {
    component: CNavItem,
    name: 'Correos electrónicos',
    to: '/email', 
    icon: <CiMail className="nav-icon"/>,
  },
  //{
  //  component: CNavItem,
  //  name: 'Mi IA',
  //  to: '/my-ai',
  //  icon: <CIcon icon={cibElectron} customClassName="nav-icon" />,
  //},
  {
    component: CNavItem,
    name: 'Mi IA',
    to: '/my-ai',
    icon: <CIcon icon={cibElectron} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Configuración',
    to: '/config',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav