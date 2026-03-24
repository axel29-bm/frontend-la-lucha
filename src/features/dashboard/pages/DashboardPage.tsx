import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBullhorn,
  cilEnvelopeClosed,
  cilGroup,
  cilPhone,
  cilUserPlus,
} from '@coreui/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../../store'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)

  const displayName = user
    ? `${user.first_name} ${user.last_name}`.trim() || user.username
    : 'Usuario'

  const quickLinks = [
    {
      label: 'Llamadas',
      icon: cilPhone,
      to: '/calls',
      description: 'Historial y gestión de llamadas',
    },
    {
      label: 'Campañas',
      icon: cilBullhorn,
      to: '/campaign',
      description: 'Administra tus campañas activas',
    },
    {
      label: 'Usuarios',
      icon: cilGroup,
      to: '/users-list',
      description: 'Lista y gestión de usuarios',
    },
    {
      label: 'Registrar usuario',
      icon: cilUserPlus,
      to: '/create-users',
      description: 'Agrega un nuevo usuario al sistema',
    },
    {
      label: 'Correos',
      icon: cilEnvelopeClosed,
      to: '/email',
      description: 'Historial de correos enviados',
    },
  ]

  return (
    <>
      {/* Banner de bienvenida */}
      <CCard className="mb-4 lucha-dashboard-banner">
        <CCardBody className="p-4">
          <h2 className="lucha-dashboard-title mb-1">
            Bienvenido, {displayName}
          </h2>
          <p className="lucha-dashboard-subtitle mb-0">
            La Lucha Sanguchería Criolla
          </p>
        </CCardBody>
      </CCard>

      {/* Accesos rápidos */}
      <p className="lucha-section-heading mb-3">Accesos rápidos</p>
      <CRow className="g-3">
        {quickLinks.map((item) => (
          <CCol key={item.to} xs={12} sm={6} md={4}>
            <CCard
              className="h-100 lucha-quick-card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(item.to)}
            >
              <CCardBody className="d-flex align-items-center gap-3 p-3">
                <div className="lucha-quick-icon-wrap">
                  <CIcon icon={item.icon} size="xl" className="lucha-quick-icon" />
                </div>
                <div>
                  <div className="lucha-quick-label">{item.label}</div>
                  <div className="lucha-quick-desc">{item.description}</div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Dashboard
