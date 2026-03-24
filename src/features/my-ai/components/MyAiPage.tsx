import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CRow,
  CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibElectron, cilPaperPlane } from '@coreui/icons';

const MyAiPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(''); 

    console.log('Enviando a la IA:', prompt);
    setTimeout(() => {
      const simulatedResponse = `Respuesta simulada para la pregunta: "${prompt}"`;
      setResponse(simulatedResponse);
      setIsLoading(false);
    }, 2000); 
  };

  return (
    <CRow className="justify-content-center mt-4">
      <CCol xs={12} md={10} lg={8}>
        <CCard>
          <CCardHeader className="d-flex align-items-center">
            <CIcon icon={cibElectron} className="me-2" size="lg" />
            <h5 className="mb-0">Mi IA</h5>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormTextarea
                id="ai-prompt"
                placeholder="Escribe aquí"
                rows={5}
                value={prompt}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <CButton type="submit" color="primary" disabled={isLoading || !prompt.trim()}>
                  {isLoading ? (
                    <CSpinner size="sm" />
                  ) : (
                    <>
                      <CIcon icon={cilPaperPlane} className="me-2" />
                      Botón para IA
                    </>
                  )}
                </CButton>
              </div>
            </CForm>

            {/* Sección para mostrar la respuesta */}
            {isLoading && (
              <div className="text-center mt-4">
                <CSpinner color="primary" />
                <p className="text-body-secondary mt-2">Cargando...</p>
              </div>
            )}

            {response && !isLoading && (
              <CCard className="mt-4 bg-body-tertiary"> 
                <CCardHeader className="small text-body-secondary">Respuesta de mi IA</CCardHeader>
                <CCardBody>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p> 
                </CCardBody>
              </CCard>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MyAiPage;