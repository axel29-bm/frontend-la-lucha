import React, { useEffect, useState } from 'react';
import { useCalls } from '../hooks/useCalls';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CSpinner, CAlert,
  CBadge,
  CFormInput,
  CPagination,
  CPaginationItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilClock, cilPhone } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";

interface SentimentDetails {
  text: string;
  emoji: string;
  color: string;
  badgeColor: 'success' | 'warning' | 'danger' | 'secondary';
}

const adjustToLocalPeruTime = (timestamp: string): Date => {
  const utcDate = new Date(timestamp);
  return new Date(utcDate.getTime() - 5 * 60 * 60 * 1000);
};

const formatCallTime = (timestamp: string | undefined): { date: string; time: string } => {
  if (!timestamp) {
    return { date: 'Fecha no disponible', time: 'Hora no disponible' };
  }

  const correctedDate = adjustToLocalPeruTime(timestamp);

  return {
    date: correctedDate.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
    time: correctedDate.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
  };
};


const CallListPage: React.FC = () => {
  // trae las calls, isLoading, error y fetchCalls de useCalls()
  const { calls, isLoading, error, fetchCalls } = useCalls();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // navigate para entrar al detalle de cada llamada
  const navigate = useNavigate();
  
  // para dar click en el icono y entrar al detalle
  const handleClick = (id: number) => {
    navigate(`/calls/${id}`);
  };

  const filteredCalls = (calls || []).filter(call =>
    (call.clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCalls.length / ITEMS_PER_PAGE);

  const currentCalls = filteredCalls.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getSentimentDetails = (score: number | undefined): SentimentDetails => {
    if (typeof score !== 'number' || isNaN(score)) {
      return {
        text: 'N/A',
        emoji: '❔',
        color: '#6c757d',
        badgeColor: 'secondary'
      };
    }
    
    if (score >= 0.75) {
      return {
        text: 'Positivo',
        emoji: '😊',
        color: '#28a745',
        badgeColor: 'success'
      };
    } else if (score >= 0.5) {
      return {
        text: 'Neutral',
        emoji: '😐',
        color: '#ffc107',
        badgeColor: 'warning'
      };
    } else {
      return {
        text: 'Negativo',
        emoji: '😞',
        color: '#dc3545',
        badgeColor: 'danger'
      };
    }
  };

  return (
    <CRow style={{justifyContent: 'center', marginTop: '10px' }}>
      <CCol style={{maxWidth: '77%'}}>
        <CCard className="mb-4">
          <CCardHeader style={{padding: '18px'}}>
            <CIcon icon={cilPhone} className="me-2" />
            <strong>Historial de llamadas</strong>
          </CCardHeader>
          {/* cuerpo de la card */}
          <CCardBody>
            <CRow className="mb-3 align-items-end">
              <CCol md={8}>
                <CFormInput
                  type="text"
                  placeholder="Buscar por nombre de cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CButton color="primary" onClick={fetchCalls} disabled={isLoading} className="w-100">
                  {isLoading ? <CSpinner size="sm" /> : 'Consultar llamadas'}
                </CButton>
              </CCol>
            </CRow>
            
            {/* en caso el error sea true, muestra el error */}
            {error && <CAlert color="danger">{error}</CAlert>}

            {!isLoading && calls && (
              <>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow className='text-center'>
                    {/* <CTableHeaderCell>ID</CTableHeaderCell> */}
                    <CTableHeaderCell>Nombres</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Hora de la llamada</CTableHeaderCell>
                    <CTableHeaderCell>Puntaje</CTableHeaderCell>
                    <CTableHeaderCell>Prioridad</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-center'>
                    {currentCalls.map((call) => {
                      const sentiment = getSentimentDetails(call.sentimentScore);
                      const formattedTime = formatCallTime(call.startTime!); 
                      return (
                        <CTableRow key={call.id} className="table-row-hover">
                          {/* nombre */}
                          <CTableDataCell style={{width: '30%'}}>{call.clientName || 'No proporcionó nombre'}</CTableDataCell>

                          {/* estado */}
                          <CTableDataCell style={{width: '12%'}}>{call.leadStatus.statusKey || 'Estado desconocido'}</CTableDataCell>

                          {/* fecha y hora */}
                          <CTableDataCell style={{width: '20%'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <div className='text-nowrap'>
                                  <CIcon icon={cilCalendar} className="me-2 text-muted"/>
                                  {formattedTime.date}
                                </div>
                                <div className='text-nowrap fw-bold'>
                                  <CIcon icon={cilClock} className="me-2 text-muted"/>
                                  {formattedTime.time}
                                </div>
                            </div>
                          </CTableDataCell>
                          
                          {/* puntaje */}
                          <CTableDataCell style={{width: '12%'}}>
                            {typeof call.sentimentScore !== 'number' ? (
                              <CBadge color={sentiment.badgeColor}>N/A</CBadge>
                            ) : (
                              <CBadge color={sentiment.badgeColor} style={{ fontSize: '14px', padding: '6px 10px' }}>
                                {call.sentimentScore}
                              </CBadge>
                            )}
                          </CTableDataCell>
                          
                          {/* prioridad */}
                          <CTableDataCell style={{width: '12%'}}>
                            {sentiment.text === 'N/A' ? (
                              <span>N/A</span>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: sentiment.color, fontWeight: 'bold', gap: '4px' }}>
                                <span style={{ fontSize: '24px' }}>{sentiment.emoji}</span>
                                <CBadge textBgColor='light'>
                                  <p style={{ margin: 0, fontSize: '12px' }}>{sentiment.text}</p>
                                </CBadge>
                              </div>
                            )}
                          </CTableDataCell>
                          
                          {/* eye-icon */}
                          <CTableDataCell style={{width: '13%'}}>
                            <FaRegEye style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => handleClick(call.id)}/>
                          </CTableDataCell>
                        </CTableRow>
                      )
                    })}
                </CTableBody>
              </CTable>

              {filteredCalls.length === 0 && !isLoading && (
                <div className="text-center p-4">No se encontraron llamadas con ese nombre.</div>
              )}
              </>
            )}

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <CPagination aria-label="Navegación" style={{ cursor: 'pointer' }}>
                  <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Anterior
                  </CPaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <CPaginationItem key={page} active={currentPage === page} onClick={() => setCurrentPage(page)}>
                      {page}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Siguiente
                  </CPaginationItem>
                </CPagination>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CallListPage;