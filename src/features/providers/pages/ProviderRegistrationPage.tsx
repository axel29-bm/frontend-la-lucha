import React from 'react';
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { ProviderRegistrationForm } from '../components/organisms/ProviderRegistrationForm';

export const ProviderRegistrationPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="py-3">
            <CCard className="lucha-page-card">
                <CCardHeader className="lucha-page-header d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="mb-0 fw-bold">Registro de Proveedor</h4>
                        <small className="text-white-50">Ingresa los datos del proveedor y sus cuentas bancarias</small>
                    </div>
                    <CButton color="light" size="sm" onClick={() => navigate('/providers')}>
                        <CIcon icon={cilArrowLeft} className="me-1" /> Volver
                    </CButton>
                </CCardHeader>
                <CCardBody>
                    <ProviderRegistrationForm />
                </CCardBody>
            </CCard>
        </div>
    );
};