import React, { useState, useMemo } from 'react';
import { useEmailHistory } from '../hooks/useEmailHistory';
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CSpinner, CAlert,
  CFormInput, CInputGroup, CInputGroupText,
  CTooltip,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilSearch, cilUser, cilClock, cilCalendar } from '@coreui/icons';
import type { EmailHistory } from '../types/emailTypes';
import { FaRegEye } from 'react-icons/fa';


const formatDateTime = (timestamp: string | undefined): { date: string; time: string } => {
  if (!timestamp) {
    return { date: 'N/A', time: 'N/A' };
  }

  let utcTimestamp = timestamp;
  if (!utcTimestamp.endsWith('Z')) {
    utcTimestamp += 'Z';
  }

  const localDate = new Date(utcTimestamp);

  const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

  return {
    date: localDate.toLocaleDateString('es-ES', dateOptions),
    time: localDate.toLocaleTimeString('es-ES', timeOptions),
  };
};

const EmailsListPage: React.FC = () => {
  const { history, isLoading, error } = useEmailHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<EmailHistory | null>(null);

  const handleViewEmail = (email: EmailHistory) => {
    setSelectedEmail(email);
  };

  const filteredHistory = useMemo(() => {
    if (!searchTerm) return history;
    const lowercasedFilter = searchTerm.toLowerCase();
    return history.filter(email =>
      email.clientEmail.toLowerCase().includes(lowercasedFilter) ||
      (email.cco || '').toLowerCase().includes(lowercasedFilter)
    );
  }, [history, searchTerm]);

  return (
    <>
      <CRow className="justify-content-center mt-3">
        <CCol md={11} lg={10}>
          <CCard className="mb-4 shadow-sm">
            <CCardHeader className="d-flex justify-content-between align-items-center p-3">
              <div>
                <CIcon icon={cilEnvelopeClosed} className="me-2" />
                <strong>Historial de correos</strong>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-4">
                <CCol md={7} lg={5}>
                  <CInputGroup>
                    <CInputGroupText><CIcon icon={cilSearch} /></CInputGroupText>
                    <CFormInput
                      type="search"
                      placeholder="Buscar por correo del destinatario..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              {isLoading && <div className="text-center p-5"><CSpinner color="primary" /></div>}
              {error && <CAlert color="danger">{error}</CAlert>}

              {!isLoading && !error && (
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead>
                    <CTableRow className='text-center'>
                      <CTableHeaderCell style={{ width: '30%' }}>Hora</CTableHeaderCell>
                      <CTableHeaderCell>Correo del cliente</CTableHeaderCell>
                      <CTableHeaderCell style={{ width: '20%' }}>Acciones</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredHistory.length > 0 ? filteredHistory.map((email) => {
                      const { date, time } = formatDateTime(email.timestamp);
                      
                      return (
                        <CTableRow key={email.emailHistoryId}>
                          <CTableDataCell className="text-center">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <div className='d-flex align-items-center mb-1'>
                                  <CIcon icon={cilCalendar} className="me-2 text-muted"/>
                                  {date}
                                </div>
                                <div className='d-flex align-items-center fw-bold'>
                                  <CIcon icon={cilClock} className="me-2 text-muted"/>
                                  {time}
                                </div>
                            </div>
                          </CTableDataCell>
                        
                          <CTableDataCell className="text-center">
                            <CIcon icon={cilUser} className="me-2 text-muted" />
                            {email.clientEmail}
                          </CTableDataCell>
                        
                          <CTableDataCell className="text-center">
                            <CTooltip content="Ver correo completo">
                              <CButton color="light" size="sm" onClick={() => handleViewEmail(email)}>
                              <FaRegEye style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => handleViewEmail(email)}/>
                              </CButton>
                            </CTooltip>
                          </CTableDataCell>
                        </CTableRow>
                      );
                      }) : (
                        <CTableRow>
                          <CTableDataCell colSpan={3} className="text-center p-4 text-muted fst-italic">
                            {searchTerm ? 'No se encontraron correos con ese criterio.' : 'No hay historial de correos para mostrar.'}
                          </CTableDataCell>
                        </CTableRow>
                    )}
                  </CTableBody>
                </CTable>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* MODAL/POPUP PARA ABRIR EL DETALLE DE LA CAMPAÑA */}
      <CModal 
        size="lg"
        scrollable
        visible={!!selectedEmail}
        onClose={() => setSelectedEmail(null)}
      >
        <CModalHeader>
          <CModalTitle>
            <CIcon icon={cilEnvelopeClosed} className="me-2" />
            Vista previa del correo
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEmail && (
            <>
              <p><strong>Destinatario:</strong> {selectedEmail.clientEmail}</p>
              {selectedEmail.cco && <p><strong>CCO:</strong> {selectedEmail.cco}</p>}
              <hr />
              <div dangerouslySetInnerHTML={{ __html: selectedEmail.emailBody }} />
            </>
          )}
        </CModalBody>
      </CModal>
    </>
  );
};

export default EmailsListPage;