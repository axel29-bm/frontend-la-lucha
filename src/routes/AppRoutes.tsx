import { Routes, Route } from 'react-router-dom'
import PrivateRoute from '../shared/components/organisms/PrivateRoute'
import AppLayout from '../layouts/AppLayout'
import NotFoundPage from '../shared/components/organisms/NotFoundPage'
import AuthPage from '../features/auth/pages/AuthPage'

/**
 * Definición centralizada de rutas de la aplicación.
 * - Usa React Router para declarar las rutas públicas y privadas.
 * - Aplica un layout principal (`AppLayout`) a las rutas protegidas.
 * - Redirige a una página 404 personalizada si la ruta no existe.
 */
const AppRoutes = () => (
  <Routes>
    {/* Ruta pública para autenticación */}
    <Route path="/login" element={<AuthPage />} />

    {/* Rutas protegidas dentro del layout principal */}
    <Route
      path="/*"
      element={
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      }
    />

    {/* Ruta de fallback (404) */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes
