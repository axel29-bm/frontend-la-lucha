import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CTooltip,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCog, cilSave, cilLockLocked, cilLockUnlocked } from '@coreui/icons';
import { FaKey } from 'react-icons/fa';

const MOCK_TWILIO_TOKEN = 'AC7f1c2e6b7a8c9d0e1f2a3b4c5d6e7f8';
const MOCK_OPENAI_TOKEN = 'sk-H1oWz0xQn3H2aUe5FgYZt3Lj2A4xkKJmZfJXh7pbazbK7Y9q';

const ConfigPage: React.FC = () => {
  const [twilioToken, setTwilioToken] = useState(MOCK_TWILIO_TOKEN);
  const [openAIToken, setOpenAIToken] = useState(MOCK_OPENAI_TOKEN);
  
  const [isTwilioVisible, setIsTwilioVisible] = useState(false);
  const [isOpenAIVisible, setIsOpenAIVisible] = useState(false);

  const handleSave = () => {
    console.log('Guardando configuración:');
    console.log('Twilio Token:', twilioToken);
    console.log('OpenAI Token:', openAIToken);
  };

  return (
    <CRow className="justify-content-center mt-4">
      <CCol lg={8} xl={6}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="d-flex align-items-center">
            <CIcon icon={cilCog} className="me-2" />
            <strong style={{ fontSize: '1.1rem' }}>Configuración</strong>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <div className="mb-4">
                <CFormLabel htmlFor="twilio-token" className="fw-bold">
                  Token de Twilio
                </CFormLabel>
                <p className="text-muted small">
                  Introduce o cambia tu token de Twilio.
                </p>
                <CInputGroup>
                  <CInputGroupText>
                    <FaKey />
                  </CInputGroupText>
                  <CFormInput
                    type={isTwilioVisible ? 'text' : 'password'}
                    id="twilio-token"
                    placeholder="Ej: AC7f1c2e6b7a8c9d0e1f2a3b4c5d6e7f8"
                    value={twilioToken}
                    onChange={(e) => setTwilioToken(e.target.value)}
                  />
                  <CTooltip content={isTwilioVisible ? 'Ocultar' : 'Mostrar'}>
                    <CButton 
                      type="button" 
                      color="secondary" 
                      variant="outline"
                      onClick={() => setIsTwilioVisible(!isTwilioVisible)}
                    >
                      <CIcon icon={isTwilioVisible ? cilLockUnlocked : cilLockLocked} />
                    </CButton>
                  </CTooltip>
                </CInputGroup>
              </div>

              <div className="mb-5">
                <CFormLabel htmlFor="openai-token" className="fw-bold">
                  Token de OpenAI
                </CFormLabel>
                <p className="text-muted small">
                  Introduce o cambia tu token de OpenAI.
                </p>
                <CInputGroup>
                  <CInputGroupText>
                    <FaKey />
                  </CInputGroupText>
                  <CFormInput
                    type={isOpenAIVisible ? 'text' : 'password'}
                    id="openai-token"
                    placeholder="Ej: sk-H1oWz0xQn3H2aUe5FgYZt3Lj2A4xkKJmZfJXh7pbazbK7Y9q"
                    value={openAIToken}
                    onChange={(e) => setOpenAIToken(e.target.value)}
                  />
                  <CTooltip content={isOpenAIVisible ? 'Ocultar' : 'Mostrar'}>
                     <CButton 
                      type="button" 
                      color="secondary"
                      variant="outline"
                      onClick={() => setIsOpenAIVisible(!isOpenAIVisible)}
                    >
                      <CIcon icon={isOpenAIVisible ? cilLockUnlocked : cilLockLocked} />
                    </CButton>
                  </CTooltip>
                </CInputGroup>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="primary" onClick={handleSave} size="lg">
                  <CIcon icon={cilSave} className="me-2" />
                  Guardar
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ConfigPage;