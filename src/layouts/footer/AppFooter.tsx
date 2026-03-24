/**
 * Componente del pie de página para toda la aplicación.
 * Contiene derechos de autor y un enlace externo.
 */

import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter: React.FC = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2025 La Lucha Sanguchería Criolla.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Todos los derechos reservados.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
