import React, { useEffect, useState } from 'react';
import { useCampaign } from '../hooks/useCampaign';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody,
  CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CSpinner, CAlert,
  CBadge,
  CFormInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBullhorn, cilPlus } from '@coreui/icons';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc';
import './CampaignListPage.css';

const getCampaignStatusText = (status: number): 'Activo' | 'Inactivo' | 'N/A' => {
  switch (status) {
    case 1:
      return 'Activo';
    case 2:
      return 'Inactivo';
    default:
      return 'N/A';
  }
};

const getCampaignTypeText = (type: number): 'Entrante' | 'Saliente' | 'N/A' => {
  switch (type) {
    case 1:
      return 'Entrante';
    case 2:
      return 'Saliente';
    default:
      return 'N/A';
  }
};

const getCampaignStatusBadge = (status: 'Activo' | 'Inactivo' | 'N/A'): 'success' | 'warning' | 'secondary' => {
  switch (status) {
    case 'Activo':
      return 'success';
    case 'Inactivo':
      return 'warning';
    default:
      return 'secondary';
  }
};

const CampaignListPage: React.FC = () => {
  const { campaigns, isLoading, error, fetchCampaigns } = useCampaign();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/campaign/${id}`);
  };

  const filteredCampaigns = (campaigns || []).filter(campaign =>
    (campaign.campaignName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);

  const currentCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <CRow style={{ justifyContent: 'center', marginTop: '10px' }}>
      <CCol style={{ maxWidth: '77%' }}>
        <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between align-items-center">
              <div>
                <CIcon icon={cilBullhorn} className="me-2" />
                <strong>Gestión de campañas</strong>
              </div>
              <CButton 
                className="btn-gradient-primary"
                onClick={() => navigate('/campaign/nuevo')}
              >
                <CIcon icon={cilPlus} className="me-2" />
                Crear campaña
              </CButton>
              {/* 
              <CButton className="custom-button" onClick={() => navigate('/campaign/nuevo')}>
                <CIcon icon={cilPlus} className="me-2" />
                Crear campaña
              </CButton>
              */}
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3 align-items-end">
                <CCol md={8}>
                    <CFormInput
                    type="text"
                    placeholder="Buscar por nombre de campaña..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </CCol>
                <CCol md={4}>
                    <CButton color="primary" onClick={fetchCampaigns} disabled={isLoading} className="w-100">
                        {isLoading ? <CSpinner size="sm" /> : 'Consultar campañas'}
                    </CButton>
                </CCol>
            </CRow>

            {isLoading && !campaigns && (
              <div className="text-center p-4">
                <CSpinner />
                <p className="mt-2">Cargando campañas...</p>
              </div>
            )}

            {error && <CAlert color="danger">{error}</CAlert>}

            {!isLoading && campaigns && (
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead>
                  <CTableRow className='text-center'>
                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                    <CTableHeaderCell>Estado</CTableHeaderCell>
                    <CTableHeaderCell>Tipo</CTableHeaderCell>
                    <CTableHeaderCell>Acciones</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-center'>
                  {currentCampaigns.map((campaign) => {
                    const statusText = getCampaignStatusText(campaign.status);
                    const typeText = getCampaignTypeText(campaign.type);

                    return (
                      <CTableRow key={campaign.id}>
                        {/* Nombre */}
                        <CTableDataCell>
                          <div>{campaign.campaignName}</div>
                        </CTableDataCell>
                        
                        {/* Estado */}
                        <CTableDataCell>
                          <CBadge color={getCampaignStatusBadge(statusText)} style={{fontSize: '14px'}}>
                            {statusText}
                          </CBadge>
                        </CTableDataCell>

                        {/* Tipo */}
                        <CTableDataCell>
                          {typeText === 'N/A' ? (
                              <span>N/A</span>
                          )  :  (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', gap: '4px' }}>
                                  <span style={{ fontSize: '24px' }}>
                                    {typeText === 'Entrante' && <VscCallIncoming title="Entrante" />}
                                    {typeText === 'Saliente' && <VscCallOutgoing title="Saliente" />}
                                  </span>
                                  <CBadge textBgColor='light' style={{ marginTop: '4px'}}>
                                      <p style={{ margin: 0, fontSize: '13px' }}>{typeText}</p>
                                  </CBadge>
                              </div>
                          )}
                        </CTableDataCell>
                        
                        {/* Acciones */}
                        <CTableDataCell>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <FaEdit 
                              style={{ fontSize: '18px', cursor: 'pointer',  }}
                              title="Editar"
                              onClick={() => handleClick(campaign.id)}
                            />
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            )}
            
            {!isLoading && campaigns && filteredCampaigns.length === 0 && (
               <div className="text-center p-4">No se encontraron campañas con ese criterio.</div>
            )}
             {!isLoading && !error && campaigns?.length === 0 && (
               <div className="text-center p-4">No hay campañas para mostrar.</div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default CampaignListPage;