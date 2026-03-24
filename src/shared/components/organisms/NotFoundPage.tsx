import React from 'react'
import { Link } from 'react-router-dom'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'

/**
 * Página de error 404 (No encontrada).
 * - Se muestra cuando el usuario accede a una ruta inexistente.
 * - Utiliza componentes CoreUI para estructura y estilo.
 * - Permite al usuario volver al dashboard mediante un botón.
 */
const NotFoundPage: React.FC = () => (
  <div className="d-flex flex-column min-vh-100 align-items-center justify-content-center bg-body-tertiary">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8} className="text-center">
          <h1 className="display-1 fw-bold mb-4">404</h1>
          <p className="fs-3">Página no encontrada</p>
          <p className="lead mb-4">
            La ruta que has ingresado no existe.
          </p>
          <Link to="/dashboard">
            <CButton color="primary">Ir al Dashboard</CButton>
          </Link>
        </CCol>
      </CRow>
    </CContainer>
  </div>
)

export default NotFoundPage
