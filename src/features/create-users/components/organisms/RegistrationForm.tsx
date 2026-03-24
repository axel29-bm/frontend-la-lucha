import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CSpinner,
  CAlert,
  CInputGroupText,
  CInputGroup,
  CFormLabel,
} from '@coreui/react';
import { MdOutlineMail, MdOutlinePassword } from 'react-icons/md';
import { CIcon } from '@coreui/icons-react';
import { cilShortText, cilUser, cilUserPlus } from '@coreui/icons';

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error: string | null;
}

/**
 * Formulario de registro de usuario — Temática La Lucha.
 * Campos: username, fullName, email, password, confirmPassword.
 */
const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, onChange, isLoading, error }) => {
  return (
    <CRow className="justify-content-center align-items-start mt-2">
      <CCol md={10} lg={8} xl={6}>

        {/* Cabecera */}
        <CCard className="mb-4 lucha-users-header">
          <CCardBody className="p-4">
            <div className="d-flex align-items-center gap-3">
              <div className="lucha-users-icon-wrap">
                <CIcon icon={cilUserPlus} size="xl" className="text-white" />
              </div>
              <div>
                <h4 className="lucha-users-title mb-0">Registrar nuevo usuario</h4>
                <p className="lucha-users-subtitle mb-0">
                  Completa los datos para dar acceso al sistema
                </p>
              </div>
            </div>
          </CCardBody>
        </CCard>

        {/* Formulario */}
        <CCard className="lucha-users-table-card">
          <CCardBody className="p-4">
            <CForm onSubmit={onSubmit}>
              {error && <CAlert color="danger" className="mb-4">{error}</CAlert>}

              <CRow className="g-3 mb-3">
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Nombre de usuario *</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText className="lucha-search-icon">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="username"
                      type="text"
                      placeholder="Ej: jperez"
                      className="lucha-form-input"
                      onChange={onChange}
                      required
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Nombre completo *</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText className="lucha-search-icon">
                      <CIcon icon={cilShortText} />
                    </CInputGroupText>
                    <CFormInput
                      name="fullName"
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="lucha-form-input"
                      onChange={onChange}
                      required
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <div className="mb-3">
                <CFormLabel className="lucha-form-label">Correo electrónico *</CFormLabel>
                <CInputGroup>
                  <CInputGroupText className="lucha-search-icon">
                    <MdOutlineMail />
                  </CInputGroupText>
                  <CFormInput
                    name="email"
                    type="email"
                    placeholder="correo@lalucha.com"
                    className="lucha-form-input"
                    onChange={onChange}
                    required
                  />
                </CInputGroup>
              </div>

              <CRow className="g-3 mb-4">
                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Contraseña *</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText className="lucha-search-icon">
                      <MdOutlinePassword />
                    </CInputGroupText>
                    <CFormInput
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      className="lucha-form-input"
                      onChange={onChange}
                      required
                    />
                  </CInputGroup>
                </CCol>

                <CCol xs={12} sm={6}>
                  <CFormLabel className="lucha-form-label">Repetir contraseña *</CFormLabel>
                  <CInputGroup>
                    <CInputGroupText className="lucha-search-icon">
                      <MdOutlinePassword />
                    </CInputGroupText>
                    <CFormInput
                      name="confirmPassword"
                      type="password"
                      placeholder="Repetir contraseña"
                      className="lucha-form-input"
                      required
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              <div className="d-flex justify-content-end gap-2">
                <CButton
                  type="button"
                  className="lucha-btn-outline"
                  onClick={() => window.history.back()}
                  disabled={isLoading}
                >
                  Cancelar
                </CButton>
                <CButton
                  type="submit"
                  className="lucha-btn-submit px-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><CSpinner size="sm" className="me-2" />Registrando...</>
                  ) : (
                    <><CIcon icon={cilUserPlus} className="me-2" />Registrar usuario</>
                  )}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>

      </CCol>
    </CRow>
  );
};

export default RegistrationForm;