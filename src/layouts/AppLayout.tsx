import React from 'react'
import { useSelector } from 'react-redux';
import AppSidebar from './sidebar/AppSidebar';
import AppHeader from './header/AppHeader';
import AppFooter from './footer/AppFooter';
import AppContent from './content/AppContent';
import type { RootState } from '../store';

/**
 * Layout principal de la aplicación (estructura de página).
 * - Contiene los componentes estructurales: sidebar, header, footer, y el contenido.
 * - El `sidebarShow` se controla desde el store global (Redux).
 * - Se aplica una clase condicional al wrapper para mostrar u ocultar el sidebar.
 */
const AppLayout: React.FC = () => {
  const sidebarShow = useSelector((state: RootState) => state.sidebar.sidebarShow)

  return (
    <>
      <AppSidebar />
      <div className={
          "bg-login-page wrapper d-flex flex-column min-vh-100" +
          (sidebarShow ? " sidebar-open" : " sidebar-closed")
        }>
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </>
  )
}

export default AppLayout
