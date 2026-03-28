import React, { useState } from 'react';
import {
    CNav, CNavItem, CNavLink, CTabContent, CTabPane,
    CForm, CRow, CCol, CFormInput, CFormSelect,
    CButton, CAlert,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useProviderRegistration } from '../../hooks/useProviderRegistration';
import type { CreateProviderPayload } from '../../types/providerTypes';

export const ProviderRegistrationForm: React.FC = () => {
    const { banks, loading, error, handleRegister } = useProviderRegistration();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const [formData, setFormData] = useState<CreateProviderPayload>({
        providerCode: '', legalName: '', commercialName: '', taxId: '',
        masterEmail: '', masterPhone: '', fiscalAddress: '',
        department: '', province: '', district: '',
        penBankId: 0, penAccountNumber: '', penCci: '',
        usdBankId: 0, usdAccountNumber: '', usdCci: ''
    });

    const set = (field: keyof CreateProviderPayload, val: string | number) =>
        setFormData(prev => ({ ...prev, [field]: val }));

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleRegister(formData);
        if (success) navigate('/providers');
    };

    return (
        <CForm onSubmit={onSubmit}>
            {error && <CAlert color="danger" className="mb-3">{error}</CAlert>}

            <CNav variant="tabs" className="mb-3">
                <CNavItem>
                    <CNavLink active={activeTab === 0} onClick={() => setActiveTab(0)} style={{ cursor: 'pointer' }}>
                        1. Datos Generales
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)} style={{ cursor: 'pointer' }}>
                        2. Cuentas Bancarias
                    </CNavLink>
                </CNavItem>
            </CNav>

            <CTabContent>
                {/* TAB 1: DATOS GENERALES */}
                <CTabPane visible={activeTab === 0}>
                    <CRow className="g-3 mb-3">
                        <CCol md={6}>
                            <CFormInput label="Código" required value={formData.providerCode}
                                onChange={(e) => set('providerCode', e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput label="RUC" required maxLength={11} value={formData.taxId}
                                onChange={(e) => set('taxId', e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput label="Razón Social" required value={formData.legalName}
                                onChange={(e) => set('legalName', e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput label="Nombre Comercial" value={formData.commercialName}
                                onChange={(e) => set('commercialName', e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput label="Email" type="email" required value={formData.masterEmail}
                                onChange={(e) => set('masterEmail', e.target.value)} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput label="Teléfono" value={formData.masterPhone}
                                onChange={(e) => set('masterPhone', e.target.value)} />
                        </CCol>
                    </CRow>

                    <h6 className="fw-bold mb-2 mt-3">Dirección Fiscal</h6>
                    <CRow className="g-3 mb-3">
                        <CCol xs={12}>
                            <CFormInput label="Dirección completa" required value={formData.fiscalAddress}
                                onChange={(e) => set('fiscalAddress', e.target.value)} />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput label="Departamento" required value={formData.department}
                                onChange={(e) => set('department', e.target.value)} />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput label="Provincia" required value={formData.province}
                                onChange={(e) => set('province', e.target.value)} />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput label="Distrito" required value={formData.district}
                                onChange={(e) => set('district', e.target.value)} />
                        </CCol>
                    </CRow>

                    <div className="d-flex justify-content-end">
                        <CButton color="dark" onClick={() => setActiveTab(1)}>
                            Siguiente: Cuentas
                        </CButton>
                    </div>
                </CTabPane>

                {/* TAB 2: CUENTAS BANCARIAS */}
                <CTabPane visible={activeTab === 1}>
                    {/* SOLES */}
                    <div className="p-3 mb-3 rounded" style={{ background: 'rgba(13,110,253,.06)', border: '1px solid rgba(13,110,253,.15)' }}>
                        <h6 className="fw-bold mb-3" style={{ color: '#084298' }}>Cuenta SOLES (PEN)</h6>
                        <CRow className="g-3">
                            <CCol md={4}>
                                <CFormSelect label="Banco" required
                                    value={formData.penBankId}
                                    onChange={(e) => set('penBankId', Number(e.target.value))}>
                                    <option value={0}>Seleccione un banco</option>
                                    {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="Nro Cuenta" required value={formData.penAccountNumber}
                                    onChange={(e) => set('penAccountNumber', e.target.value)} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="CCI" required value={formData.penCci}
                                    onChange={(e) => set('penCci', e.target.value)} />
                            </CCol>
                        </CRow>
                    </div>

                    {/* DÓLARES */}
                    <div className="p-3 mb-3 rounded" style={{ background: 'rgba(25,135,84,.06)', border: '1px solid rgba(25,135,84,.15)' }}>
                        <h6 className="fw-bold mb-3" style={{ color: '#0f5132' }}>Cuenta DÓLARES (USD)</h6>
                        <CRow className="g-3">
                            <CCol md={4}>
                                <CFormSelect label="Banco" required
                                    value={formData.usdBankId}
                                    onChange={(e) => set('usdBankId', Number(e.target.value))}>
                                    <option value={0}>Seleccione un banco</option>
                                    {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </CFormSelect>
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="Nro Cuenta" required value={formData.usdAccountNumber}
                                    onChange={(e) => set('usdAccountNumber', e.target.value)} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="CCI" required value={formData.usdCci}
                                    onChange={(e) => set('usdCci', e.target.value)} />
                            </CCol>
                        </CRow>
                    </div>

                    <div className="d-flex justify-content-between">
                        <CButton color="secondary" variant="ghost" onClick={() => setActiveTab(0)}>
                            Volver a Generales
                        </CButton>
                        <CButton type="submit" className="lucha-btn-submit" disabled={loading}>
                            {loading ? 'Procesando...' : 'Registrar proveedor'}
                        </CButton>
                    </div>
                </CTabPane>
            </CTabContent>
        </CForm>
    );
};