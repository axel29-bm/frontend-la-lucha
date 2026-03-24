import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallDetail } from '../hooks/useCallDetail';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CAlert,
  CListGroup, CListGroupItem,
  CContainer,
  CForm,
  CFormLabel,
  CFormTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { MdOutlineTripOrigin } from "react-icons/md";
import { cilArrowLeft, cilInfo, cilCalendar, cilPhone, cilDialpad, cilUser, cibGmail, cilHistory, cilAvTimer, cilTranslate, cilAirplaneMode, cilNoteAdd, cilSave } from '@coreui/icons';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './CallDetailPage.css'; 
import CollapsibleDetailItem from './CollapseDetailItem';
import TranscriptChat from './TranscriptChat';
import { addNoteToCall } from '../services/callService';
import LeadStatusCollapsibleSection from './LeadStatusCollapsibleSection';
import { FaRegHandshake } from 'react-icons/fa';

interface DetailItemProps {
  icon: any;
  label: string;
  value: React.ReactNode;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <CListGroupItem className="d-flex align-items-center">
    <CIcon icon={icon} className="me-3 text-body-secondary" />
    <div className="w-100">
      <div className="text-body-secondary small">{label}</div>
      <strong>{value}</strong>
    </div>
  </CListGroupItem>
);

interface CallStatusProps {
  hasEnded: boolean;
};

const CallStatus: React.FC<CallStatusProps> = ({ hasEnded }) => {
  const status = {
    color: hasEnded ? 'success' : 'warning',
    text: hasEnded ? 'Finalizada' : 'En curso',
    icon: MdOutlineTripOrigin,
  };

  return (
    <div className={`d-flex align-items-center text-${status.color} mb-3`}>
      <status.icon className="me-2" size={20} />
      <strong className="fw-semibold">{status.text}</strong>
    </div>
  );
};

const CallDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { detailCall, isLoading, error, audioUrl, isAudioLoading, refetch } = useCallDetail(id);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);
  
  const handleAddNote = async () => {
    if (!newNoteContent.trim() || !id) return;

    setIsAddingNote(true);
    setNoteError(null);

    try {
      const notePayload = {
        comment: newNoteContent,
        createdBy: "Javier Alvarado", 
      };

      await addNoteToCall(id, notePayload);
      setNewNoteContent('');
      
      if (refetch) {
        await refetch();
      }

    } catch (err) {
      console.error("Error al agregar la nota:", err);
      setNoteError("No se pudo guardar la nota. Inténtalo de nuevo.");
    } finally {
      setIsAddingNote(false);
    }
  };

  const renderCallDetails = () => {
    if (!detailCall || !id) {
      return null;
    }
    const callHasEnded = !!detailCall.endTime;

    return (
      <>
        <CListGroupItem className="d-flex flex-column align-items-end">
          <div className='text-body-secondary'>Estado</div>
          <CallStatus hasEnded={callHasEnded}/>
        </CListGroupItem>

        <CListGroup flush>
          <CContainer>
          <CRow className='p-3 g-0'>
            <CCol md={6} className="p-3">
              <DetailItem 
                icon={cilUser} 
                label="Nombre" 
                value={detailCall.clientName && detailCall.clientName !== 'null' ? detailCall.clientName : "No proporcionó nombre"} 
              />
              <DetailItem icon={cilPhone} label="Teléfono" value={detailCall.clientNumber && detailCall.clientNumber !== 'unknown' ? detailCall.clientNumber : "No proporcionó número telefónico"} />
              <DetailItem icon={cibGmail} label="Correo electrónico" value={detailCall.clientEmail && detailCall.clientEmail !== 'unknown' ? detailCall.clientEmail : "No proporcionó correo electrónico"} />
              <DetailItem
                icon={cilDialpad} 
                label="Tipo" 
                value={detailCall.isIncomming === 1 ? "Entrante" : "Saliente"} 
              />
            </CCol>

              <CCol md={6} className="p-3">
                {detailCall.startTime && (
                  <>
                    <DetailItem
                      icon={cilCalendar}
                      label="Día"
                      value={new Date(detailCall.startTime).toLocaleDateString()}
                    />
                    <DetailItem
                      icon={cilAvTimer}
                      label="Hora"
                      value={new Date(detailCall.startTime).toLocaleTimeString()}
                    />
                    
                    {callHasEnded && (
                      <DetailItem
                        icon={cilHistory}
                        label="Duración"
                        value={(() => {
                          const start = new Date(detailCall.startTime);
                          const end = new Date(detailCall.endTime!);
                          const diffMs = end.getTime() - start.getTime();
                          const minutes = Math.floor(diffMs / 60000);
                          const seconds = Math.floor((diffMs % 60000) / 1000);
                          return `${minutes}m ${seconds}s`;
                        })()}
                      />
                    )}
                  </>
                )}
              </CCol>
          </CRow>
          </CContainer>

          {/* LEADSTATUS | ESTADO DEL LEAD */}
          {detailCall.leadStatus && (
          <LeadStatusCollapsibleSection
            callId={id}
            currentStatus={detailCall.leadStatus}
            onStatusUpdate={refetch}
            icon={<FaRegHandshake />}
            label="Estado del lead"
            startOpen={true}
          />
          )}

          {/* PASOS SIGUIENTES */}
          {detailCall.nextSteps && (
            <CollapsibleDetailItem icon={cilAirplaneMode} label="Pasos siguientes">
              {(() => {
                let steps: string[] = [];

                if (Array.isArray(detailCall.nextSteps)) {
                  steps = detailCall.nextSteps;
                } else {
                  try {
                    const parsed = JSON.parse(detailCall.nextSteps);
                    if (Array.isArray(parsed)) steps = parsed;
                    else return <div>{detailCall.nextSteps}</div>;
                  } catch {
                    return <div>{detailCall.nextSteps}</div>;
                  }
                }

                return (
                  <ul className="ps-3 mb-0">
                    {steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                );
              })()}
            </CollapsibleDetailItem>
          )}
        </CListGroup>
        
        {/* AUDIO URL */}
        {detailCall.recordingSid && (
          <div className="p-3 mt-3 border-top">
            <h6 className="mb-2 text-body-secondary">Grabación</h6>

            {isAudioLoading && (
              <div className="text-center">
                <CSpinner size="sm" />
                <span className="ms-2 small">Cargando grabación...</span>
              </div>
            )}

            {!isAudioLoading && audioUrl && (
              <AudioPlayer
                src={audioUrl}
                showJumpControls={false}
                layout="stacked-reverse"
              />
            )}

            {!isAudioLoading && !audioUrl && (
              <CAlert color="warning" className="mb-0 small">
                Aún se esta procesando el archivo de audio.
              </CAlert>
            )}
          </div> 
        )}

        {/* TRANSCRIPCIÓN DEL AUDIO */}
        {detailCall.transcription && (
          <CollapsibleDetailItem icon={cilTranslate} label="Transcripción">
            <TranscriptChat transcription={detailCall.transcription} />
          </CollapsibleDetailItem>
        )}
 
          <CollapsibleDetailItem icon={cilNoteAdd} label="Notas de la llamada">
            <div className='border-top p-3'>
                {/* FORM PARA AGREGAR NUEVA NOTA */}
                <CForm>
                    <CFormLabel htmlFor="newNote" className="fw-semibold">Agregar nueva nota</CFormLabel>
                    <CFormTextarea
                        id="newNote"
                        rows={3}
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        placeholder="Escribe tus observaciones aquí..."
                        disabled={isAddingNote}
                    />
                    {noteError && <CAlert color="danger" className="mt-2 small p-2">{noteError}</CAlert>}
                    <div className="text-end mt-3">
                        <CButton
                            color="primary"
                            onClick={handleAddNote}
                            disabled={isAddingNote || !newNoteContent.trim()}
                        >
                            {isAddingNote ? (
                                <><CSpinner size="sm" as="span" className="me-2" /> Guardando...</>
                            ) : (
                                <><CIcon icon={cilSave} className="me-2" /> Guardar nota</>
                            )}
                        </CButton>
                    </div>
                </CForm>
            </div>
            
            {/* NOTAS AGREGADAS */}
            <CListGroup flush className="mb-3">
                {detailCall.notes && detailCall.notes.length > 0 ? (
                    detailCall.notes.map(note => (
                        <CListGroupItem key={note.recordNoteId}>
                            <p className="mb-1" style={{ whiteSpace: 'pre-wrap' }}>{note.comment}</p>
                            <small className="text-body-secondary">
                                Por <strong>{note.createdBy || 'Javier Alvarado'}</strong> el {new Date(note.createdAt).toLocaleString()}
                            </small>
                        </CListGroupItem>
                    ))
                ) : (
                    <CListGroupItem className="text-center text-body-secondary py-3">
                        Aún no hay notas para esta llamada.
                    </CListGroupItem>
                )}
            </CListGroup>
        </CollapsibleDetailItem>
      </>
    );
  };

  return (
    <CRow className="justify-content-center mb-3">
      <CCol xs={12} md={10} lg={8}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <span><CIcon icon={cilInfo} className="me-2" /><strong>Detalle de la llamada #{id}</strong></span>
            <CButton color="secondary" size="sm" onClick={() => navigate('/calls')}>
              <CIcon icon={cilArrowLeft} className="me-1" /> Volver
            </CButton>
          </CCardHeader>
          <CCardBody>
            {isLoading && <div className="text-center p-4"><CSpinner /></div>}
            {error && <CAlert color="danger">{error}</CAlert>}
            {!isLoading && !error && !detailCall && <CAlert color="warning">No se encontraron datos para esta llamada.</CAlert>}
            
            <CListGroup flush>
              {renderCallDetails()}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CallDetailPage;