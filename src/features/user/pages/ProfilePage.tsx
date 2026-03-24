import { cilEnvelopeOpen, cilHome, cilPen, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CImage, CListGroup, CListGroupItem, CRow, CTooltip } from '@coreui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../auth/slices/authSlice'
import userDefaultAvatar from '../../../assets/img/user.webp'

/**
 * Página del perfil de usuario.
 * Muestra la información personal como nombre, correo, ciudad, país e identificación.
 * También ofrece un botón para editar el perfil.
 */
const ProfilePage: React.FC = () => {
  const user = useSelector(selectUser)
  const avatarUrl = user?.picture || userDefaultAvatar 

  return (
    <CRow className="justify-content-center mt-4">
      <CCol xs={12} md={8} lg={6}>
        <CCard>
          <CCardHeader className="d-flex align-items-center justify-content-between bg-primary text-white">
            <div>
              <CIcon icon={cilUser} className="me-2" />
              <span className="fw-bold">Perfil de usuario</span>
            </div>
            <CTooltip content="Editar perfil" placement="top">
              <CButton color="secondary">
                <CIcon icon={cilPen} />
              </CButton>
            </CTooltip>
          </CCardHeader>
          <CCardBody>
            {/* Datos del usuario */}
            <div className="d-flex align-items-center flex-column mb-4">
              <CImage
                src={avatarUrl}
                alt="Avatar"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
              />
              {/*<h4 className="mb-0">{user?.first_name} {user?.last_name}</h4>*/}
              <h4 className="mb-0">Javier Alvarado</h4>
              {/*<span className="text-body-secondary">@{user?.username}</span>*/}
              <span className="text-body-secondary">@javier.alvarado.n</span>
              {/*<CBadge color="info" className="mt-2">{user?.role?.name}</CBadge>*/}
              <CBadge color="info" className="mt-2">Superuser</CBadge>
            </div>
            {/* Información adicional */}
            <CListGroup flush>
              <CListGroupItem>
                <CIcon icon={cilEnvelopeOpen} className="me-2" />
                {/* <strong>Email:</strong> <span className="ms-1">{user?.email || <em>Sin correo</em>}</span>*/}
                <strong>Email:</strong> <span className="ms-1">javier.alvarado.n@gmail.com</span>
              </CListGroupItem>
              <CListGroupItem>
                <CIcon icon={cilHome} className="me-2" />
                <strong>Ciudad:</strong> <span className="ms-1">{user?.city?.name || <em>Lima</em>}</span>
                {/*<strong>Ciudad:</strong> <span className="ms-1">{user?.city?.name || <em>Sin ciudad</em>}</span>*/}
                {user?.country?.name && (
                  <span className="ms-3">
                    <strong>País:</strong> {user?.country?.name}
                  </span>
                )} 
              </CListGroupItem>
              {/* 
              <CListGroupItem>
                {/*<strong>Identificación:</strong> <span className="ms-1">{user?.identification || <em>--</em>}</span>
                <strong>Identificación:</strong> <span className="ms-1">09384258</span>
              </CListGroupItem>
              */}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export default ProfilePage
