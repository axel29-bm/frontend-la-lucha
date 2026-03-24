import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CForm,
  CFormInput, CFormLabel, CFormSelect, CFormTextarea, CSpinner, CFormFeedback, CAlert,
  CFormText,
  CInputGroup,
  CInputGroupText
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilBullhorn, cilCode, cilEyedropper, cilPaperclip, cilPaperPlane, cilPencil, cilSave, cilShare } from '@coreui/icons';
import { getCampaignById, createCampaign, updateCampaign } from '../services/campaignService';
import type { DetailCampaign } from '../types/campaignsTypes';

const initialState: DetailCampaign = {
  id: 0,
  campaignName: '',
  prompt: '',
  type: 0,
  status: 0,
  createdAt: null,
  updatedAt: null,
  emailTemplate: '',
  emailCCO: '',
  emailAttachment: '',
};


const renderFormattedText = (text: string) => {
  if (!text) return null;

  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // negrita
    .replace(/\*(.*?)\*/g, '<em>$1</em>')  // cursiva
    .replace(/\\n/g, '<br />'); // salto de linhea

  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

const CampaignDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const campaignId = id ? parseInt(id, 10) : null;
  const isEditMode = !!id && !isNaN(Number(id));
  const [campaign, setCampaign] = useState<DetailCampaign>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);

  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [existingAttachmentName, setExistingAttachmentName] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      setIsEditingPrompt(false);
      setIsEditingTemplate(false);
    } else {
      setIsEditingPrompt(true);
      setIsEditingTemplate(true);
    }

    if (isEditMode && campaignId) {
      setIsLoading(true);
      setError(null);
      getCampaignById(campaignId)
        .then(dataFromApi => {
          setCampaign(dataFromApi);
          
          if (dataFromApi.emailAttachment) {
            const fileName = dataFromApi.emailAttachment.split('\\').pop() || dataFromApi.emailAttachment;
            setExistingAttachmentName(fileName);
          }
        })
        .catch(err => {
          console.error("Error al cargar la campaña:", err);
          setError("No se pudo cargar la campaña.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [campaignId, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const finalValue = name === 'type' || name === 'status' ? parseInt(value, 10) : value;
    setCampaign(prev => ({ ...prev!, [name]: finalValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentFile(e.target.files[0]);
      setExistingAttachmentName(null);
    } else {
      setAttachmentFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    setValidated(true);
    setError(null);
    
    if (event.currentTarget.checkValidity() === false || campaign.type === 0 || campaign.status === 0) {
      return;
    }
    
    setIsSaving(true);
    setError(null);

    const formData = new FormData();
    Object.entries(campaign).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, String(value));
        }
    });

    if (attachmentFile) {
      formData.append('emailAttachmentFile', attachmentFile);
    }
    
    try {
      if (isEditMode && campaignId) {
        await updateCampaign(campaignId, campaign);
      } else {
        await createCampaign(formData);
      }
      navigate('/campaign'); 
    } catch (err) {
      console.error("Error al guardar la campaña:", err);
      setError("Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <CRow className="justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <CCol xs="auto" className="text-center">
            <CSpinner color="primary" />
            <p className="mt-3 text-muted">Cargando datos de la campaña...</p>
        </CCol>
      </CRow>
    );
  }

  return (
    <CRow className="justify-content-center mt-3 mb-3">
      <CCol md={10} lg={8}>
        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
          <CCard className="shadow-sm">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CIcon icon={cilBullhorn} className="me-2" />
                <strong>{isEditMode ? `Editando campaña` : 'Crear nueva campaña'}</strong>
              </div>
              <CButton color="light" onClick={() => navigate(-1)}>
                 <CIcon icon={cilArrowLeft} className="me-2" />
                 Regresar
              </CButton>
            </CCardHeader>
            <CCardBody className="p-4">
              {error && <CAlert color="danger">{error}</CAlert>}

              <CRow className="g-4">
                <CCol md={12}>
                  <CFormLabel htmlFor="campaignName">Nombre de la campaña</CFormLabel>
                  <CFormInput
                    type="text"
                    id="campaignName"
                    name="campaignName"
                    value={campaign.campaignName}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Campaña 3"
                  />
                  <CFormFeedback invalid>Por favor, ingresa un nombre para la campaña.</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="type">Tipo</CFormLabel>
                  <CFormSelect
                    id="type"
                    name="type"
                    value={campaign.type}
                    onChange={handleChange}
                    required
                    invalid={validated && campaign.type === 0}
                  >
                    <option value="0" disabled>Seleccionar tipo...</option>
                    <option value="1">Entrante</option>
                    <option value="2">Saliente</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Selecciona un tipo.</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="status">Estado</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={campaign.status}
                    onChange={handleChange}
                    required
                    invalid={validated && campaign.status === 0}
                  >
                    <option value="0" disabled>Seleccionar estado...</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Selecciona un estado.</CFormFeedback>
                </CCol>

                <CCol md={12}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <CFormLabel htmlFor="prompt" className="mb-0">Instrucciones</CFormLabel>
                        {isEditMode && (
                             <CButton size="sm" color="secondary" variant="outline" onClick={() => setIsEditingPrompt(prev => !prev)}>
                                <CIcon icon={cilPencil} className="me-1" />
                                {isEditingPrompt ? 'Dejar de editar' : 'Editar instrucciones'}
                            </CButton>
                        )}
                    </div>
                    {isEditingPrompt ? (
                        <>
                          <CFormTextarea
                              id="prompt"
                              name="prompt"
                              rows={15}
                              value={campaign.prompt}
                              onChange={handleChange}
                              placeholder="Describe las instrucciones o reglas..."
                          />
                          <CFormText as="div" className="mt-2 text-muted">
                              Guía de formato:
                              <ul className="mb-0" style={{ paddingLeft: '20px' }}>
                                  <li>Usa <strong>**texto en negrita**</strong> para resaltar.</li>
                                  <li>Usa <em>*texto en cursiva*</em> para enfatizar.</li>
                                  <li>Usa <code>\n</code> o presiona Enter para saltos de línea.</li>
                              </ul>
                          </CFormText>
                        </>
                    ) : (
                        <CCard>
                            <CCardBody style={{ whiteSpace: 'pre-line', maxHeight: '400px', overflowY: 'auto', background: '#f8f9fa' }}>
                               {renderFormattedText(campaign.prompt)}
                            </CCardBody>
                        </CCard>
                    )}
                </CCol>

{/*                 {campaign.type === 2 && (
                  <>*/}
                  <CCol xs={12}><hr className="mt-4 mb-2" /></CCol>
                    <CCol xs={12}>
                      <div className="d-flex align-items-center">
                          <CIcon icon={cilPaperPlane} className="me-2 text-primary" />
                          <h5 className="mb-0 text-primary">Configuración de correo</h5>
                      </div>
                    </CCol>
                    
                    {/* 
                    <CCol md={12}>
                        <CFormLabel htmlFor="recipients">Destinatarios (para un envío manual)</CFormLabel>
                        <CInputGroup><CInputGroupText><CIcon icon={cilPeople} /></CInputGroupText><CFormTextarea id="recipients" rows={3} value={recipients} onChange={(e) => setRecipients(e.target.value)} /></CInputGroup>
                        <CFormText>Añade aquí correos para un envío. No se guardan en la configuración de la campaña.</CFormText>
                    </CCol>
                    */}

                    <CCol md={12}>
                        <CFormLabel htmlFor="emailCCO">Copia interna (CCO)</CFormLabel>
                        <CInputGroup>
                           <CInputGroupText><CIcon icon={cilShare} /></CInputGroupText>
                           <CFormInput
                                type="text"
                                id="emailCCO"
                                name="emailCCO"
                                placeholder="javier.alvarado.n@gmail.com"
                                value={campaign.emailCCO || ''}
                                onChange={handleChange}
                           />
                        </CInputGroup>
                        <CFormText>Este correo recibirá una copia de todos los envíos. Se guarda con la campaña.</CFormText>
                    </CCol>

                    <CCol md={12}>
                        <CFormLabel htmlFor="attachment">Archivo adjunto</CFormLabel>
                        <CInputGroup>
                            <CInputGroupText><CIcon icon={cilPaperclip} /></CInputGroupText>
                            <CFormInput type="file" id="attachment" onChange={handleFileChange} />
                        </CInputGroup>
                        {attachmentFile && <CFormText className="text-success mt-1">Nuevo archivo: <strong>{attachmentFile.name}</strong></CFormText>}
                        {existingAttachmentName && <CFormText className="text-muted mt-1">Archivo actual: <strong>{existingAttachmentName}</strong></CFormText>}
                    </CCol>

                    <CCol xs={12}>
                        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
                           <CFormLabel htmlFor="emailTemplate" className="mb-0">Plantilla de correo HTML</CFormLabel>
                           <CButton size="sm" color="secondary" variant="outline" onClick={() => setIsEditingTemplate(p => !p)}>
                              <CIcon icon={isEditingTemplate ? cilEyedropper : cilCode} className="me-1" />
                              {isEditingTemplate ? 'Ver vista previa' : 'Editar HTML'}
                           </CButton>
                        </div>
                        {isEditingTemplate ? (
                            <CFormTextarea
                                id="emailTemplate"
                                name="emailTemplate"
                                rows={20}
                                value={campaign.emailTemplate || ''}
                                onChange={handleChange}
                                placeholder="Pega tu código HTML aquí..."
                                style={{ fontFamily: 'monospace', fontSize: '14px', background: '#f4f4f4' }}
                            />
                        ) : (
                            <div style={{ border: '1px solid #dee2e6', borderRadius: 'var(--cui-border-radius)', padding: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
                                <div dangerouslySetInnerHTML={{ __html: campaign.emailTemplate || '<p class="text-muted text-center">No hay plantilla definida para mostrar.</p>' }} />
                            </div>
                        )}
                    </CCol>
                  {/*
                  </>
                )}*/}
              </CRow>

            </CCardBody>
            <div className="card-footer text-end bg-light">
                <CButton type="submit" color="primary" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <CSpinner as="span" size="sm" aria-hidden="true" />
                      <span className="ms-2">Guardando...</span>
                    </>
                  ) : (
                    <>
                      <CIcon icon={cilSave} className="me-2" />
                      Guardar cambios
                    </>
                  )}
                </CButton>
            </div>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  );
};

export default CampaignDetailPage;