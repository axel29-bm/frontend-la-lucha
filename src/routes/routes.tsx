import React, { type ComponentType, type LazyExoticComponent } from 'react'

const Dashboard = React.lazy(() => import('../features/dashboard/pages/DashboardPage'));
const BanksPage = React.lazy(() => import('../features/banks/pages/BanksPage'));
const CurrenciesPage = React.lazy(() => import('../features/currencies/pages/CurrenciesPage'));
const ProvidersListPage = React.lazy(() => import('../features/providers/pages/ProvidersListPage'));
const ProviderRegistrationPage = React.lazy(() =>
  import('../features/providers/pages/ProviderRegistrationPage').then(m => ({ default: m.ProviderRegistrationPage }))
);

export interface AppRoute {
  path: string
  name?: string
  exact?: boolean
  element?: LazyExoticComponent<ComponentType<React.PropsWithChildren<unknown>>>
}

const routes: AppRoute[] = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/banks', name: 'Bancos', element: BanksPage },
  { path: '/currencies', name: 'Monedas', element: CurrenciesPage },
  { path: '/providers', name: 'Proveedores', element: ProvidersListPage },
  { path: '/providers/new', name: 'Nuevo proveedor', element: ProviderRegistrationPage },
]

export default routes