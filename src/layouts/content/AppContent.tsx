
/**
 * Componente principal del contenido de la app.
 * Define las rutas configuradas dinámicamente desde `routes.ts`,
 * e incluye fallback de carga y manejo de ruta no encontrada.
 */

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../../routes/routes'
import type { AppRoute } from '../../routes/routes'
import NotFoundPage from '../../shared/components/organisms/NotFoundPage'

const AppContent: React.FC = () => {
  return (
    <main className="flex-grow-1">
      <CContainer fluid>
        {/* Suspense permite mostrar un spinner mientras se carga una vista lazy */}
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route: AppRoute, idx: number) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    element={<route.element />}
                  />
                )
              )
            })}
            {/* Redirección raíz */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Página no encontrada */}
            <Route path="*" element={<NotFoundPage />} /> {/* <-- aquí también */}
          </Routes>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(AppContent)
