import React from 'react';
import { useCallUp } from '../hooks/useCallUp';
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CForm,
  CFormInput, CSpinner, CAlert,
  CInputGroup,
  CInputGroupText
} from '@coreui/react';
import { VscCallOutgoing } from "react-icons/vsc";
import { PiIdentificationCardLight } from "react-icons/pi";
import { IoIosCall } from "react-icons/io";
import { GrProjects } from "react-icons/gr";
import { MdOutlineCampaign } from "react-icons/md";


const OutboundCallPage: React.FC = () => {
  const { formData, isLoading, error, success, handleInputChange, handleSubmit } = useCallUp();

  return (
    <CRow className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <CCol md={8} lg={6} xl={5}>
        <CCard className="mx-4">
          <CCardHeader className="p-4">
            <div className="d-flex align-items-center">
              <VscCallOutgoing style={{marginRight: '15px', fontSize: '30px'}}/>
              <div className='ms-2'>
                <h2 className="mb-0">Iniciar llamada saliente</h2>
                <p className="text-body-secondary mb-0">Rellena los datos para la llamada.</p>
              </div>
            </div>
          </CCardHeader>
          {/* <CCardHeader style={{paddingTop: '12px', paddingBottom: '12px'}}>
            <VscCallOutgoing style={{marginRight: '15px'}}/>
            <strong>Iniciar llamada saliente</strong>
          </CCardHeader> */}
          <CCardBody className="p-4">
            <CForm onSubmit={handleSubmit}>
              {/* mensajes error/exito */}
              {success && <CAlert color="success">{success}</CAlert>}
              {error && <CAlert color="danger">{error}</CAlert>}

              {/* nombres */}
              <div className="mb-4">
                <CInputGroup className='mb-4'>
                  <CInputGroupText><PiIdentificationCardLight /></CInputGroupText>
                    <CFormInput
                      type="text"
                      id='name'
                      name='name'
                      placeholder="Nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                </CInputGroup>
              </div>

              {/* telefono */}
              <div className="mb-4">
                <CInputGroup className='mb-4'>
                  <CInputGroupText><IoIosCall /></CInputGroupText>
                    <CFormInput
                      type="tel"
                      id='to'
                      name="to"
                      placeholder="Número de teléfono"
                      value={formData.to}
                      onChange={handleInputChange}
                      required
                    />
                </CInputGroup>
              </div>

              {/* proyecto */}
              <div className="mb-4">
                <CInputGroup className='mb-4'>
                  <CInputGroupText><GrProjects /></CInputGroupText>
                    <CFormInput
                      type="text"
                      id='project'
                      name="project"
                      placeholder="Proyecto"
                      value={formData.project}
                      onChange={handleInputChange}
                      required
                    />
                </CInputGroup>
              </div>

              {/* campaña */}
              <div className="mb-4">
                <CInputGroup className='mb-4'>
                  <CInputGroupText><MdOutlineCampaign /></CInputGroupText>
                    <CFormInput
                      type="text"
                      id='campaignId'
                      name="campaignId"
                      placeholder="Campaña"
                      value={formData.campaignId}
                      onChange={handleInputChange}
                      required
                    />
                </CInputGroup>
              </div>

              {/* botton*/}
              <div className="d-grid">
                <CButton type="submit" color="primary" disabled={isLoading} style={{ height: '54px' }}>
                  {isLoading ? <CSpinner size="sm" /> : 'Llamar'}
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default OutboundCallPage;