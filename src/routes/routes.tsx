import React, { type ComponentType, type LazyExoticComponent } from 'react'

const Dashboard = React.lazy(() => import('../features/dashboard/pages/DashboardPage'));
const Profile = React.lazy(() => import('../features/user/pages/ProfilePage'));
const CallsList = React.lazy(() => import('../features/calls/components/CallListPage'));
const CallUpList = React.lazy(() => import('../features/call-up/components/CallUpPage'));
const RegisterUsers = React.lazy(() => import('../features/create-users/pages/UserRegistrationPage'));
const MyAiPage = React.lazy(() => import('../features/my-ai/components/MyAiPage'));
const UserList = React.lazy(() => import('../features/users-list/components/UserListPage'));
const ConfigPage = React.lazy(() => import ("../features/config/components/ConfigPage"));
const CallDetailPage = React.lazy(() => import('../features/calls/components/CallDetailPage'));
const CampaignListPage = React.lazy(() => import('../features/campaign/components/CampaignListPage'));
const CampaignDetailPage = React.lazy(() => import('../features/campaign/components/CampaignDetailPage'))
const EmailListPage = React.lazy(() => import('../features/email/components/EmailsListPage'));

export interface AppRoute {
  path: string
  name?: string
  exact?: boolean
  element?: LazyExoticComponent<ComponentType<React.PropsWithChildren<unknown>>>
}

/**
 * Definición central de rutas cargadas dinámicamente.
 * - Cada ruta contiene: `path`, `name` (visible en el breadcrumb) y el componente asociado.
 * - Usa `React.lazy` para carga diferida (code splitting).
 */

const routes: AppRoute[] = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard }, // dashboard
  { path: '/create-users', name: 'Crear usuarios', element: RegisterUsers }, // crear un usuario
  { path: '/users-list', name: 'Lista de usuarios', element: UserList }, // lista de usuarios
  { path: '/profile', name: 'Perfil de usuario', element: Profile }, // perfil del usuario conectado
  { path: '/calls', name: 'Llamadas', element: CallsList }, // lista de las llamadas
  { path: '/call-up', name: 'Llamar', element: CallUpList }, // llamada que se hace desde el portal
  { path: '/my-ai', name: 'Mi IA', element: MyAiPage }, // mi IA
  { path: '/config', name: 'Configuración', element: ConfigPage }, // configuración
  { path: '/email', name: 'Correos electrónicos', element: EmailListPage }, // emails
  { path: '/calls/:id', name: 'Detalle de la llamada', element: CallDetailPage }, // detalle de la llamada
  { path: '/campaign', name: 'Campañas', element: CampaignListPage }, // campañas
  { path: '/campaign/:id', name: 'Detalle de la campaña', element: CampaignDetailPage }, // campañas
]

export default routes