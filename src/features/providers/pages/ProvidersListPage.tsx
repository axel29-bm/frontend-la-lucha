import React, { useState } from 'react';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHead,
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CSpinner, CBadge, CButton, CFormSwitch,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CFormInput, CForm, CRow, CCol,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { useProviders } from '../hooks/useProviders';
import type { ProviderResponse, UpdateProviderPayload } from '../types/providerTypes';

const ProvidersListPage: React.FC = () => {
    const { providers, loading, handleToggle, handleUpdate } = useProviders();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<ProviderResponse | null>(null);
    const [form, setForm] = useState<UpdateProviderPayload>({
        providerCode: '', legalName: '', commercialName: '', taxId: '',
        masterEmail: '', masterPhone: '', fiscalAddress: '',
        department: '', province: '', district: '',
    });
    const [saving, setSaving] = useState(false);

    const openEdit = (p: ProviderResponse) => {
        setEditing(p);
        setForm({
            providerCode: p.providerCode || '',
            legalName: p.legalName,
            commercialName: p.commercialName || '',
            taxId: p.taxId || '',
            masterEmail: p.masterEmail || '',
            masterPhone: p.masterPhone || '',
            fiscalAddress: p.fiscalAddress || '',
            department: p.department || '',
            province: p.province || '',
            district: p.district || '',
        });
        setModalOpen(true);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        setSaving(true);
        try {
            await handleUpdate(editing.providerId, form);
            setModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    const set = (field: keyof UpdateProviderPayload, val: string) =>
        setForm(prev => ({ ...prev, [field]: val }));

    return (
        <div className="py-3">
            <CCard className="lucha-page-card">
                <CCardHeader className="lucha-page-header d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="mb-0 fw-bold">Proveedores</h4>
                        <small className="text-white-50">Gestión de proveedores y sus cuentas bancarias</small>
                    </div>
                    <CButton color="light" size="sm" onClick={() => navigate('/providers/new')}>
                        <CIcon icon={cilPlus} className="me-1" /> Nuevo proveedor
                    </CButton>
                </CCardHeader>
                <CCardBody className="p-0">
                    {loading ? (
                        <div className="text-center py-5"><CSpinner color="danger" /></div>
                    ) : providers.length === 0 ? (
                        <div className="text-center py-5 text-body-secondary">No hay proveedores registrados.</div>
                    ) : (
                        <CTable hover responsive className="mb-0 lucha-table">
                            <CTableHead className="lucha-thead">
                                <CTableRow>
                                    <CTableHeaderCell>Código</CTableHeaderCell>
                                    <CTableHeaderCell>Razón Social</CTableHeaderCell>
                                    <CTableHeaderCell>RUC</CTableHeaderCell>
                                    <CTableHeaderCell>Email</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Cuentas</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {providers.map((p) => (
                                    <CTableRow key={p.providerId}>
                                        <CTableDataCell className="fw-semibold" style={{ color: 'var(--lucha-red)' }}>
                                            {p.providerCode || '—'}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            <div className="fw-semibold">{p.legalName}</div>
                                            {p.commercialName && (
                                                <small className="text-body-secondary">{p.commercialName}</small>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell>{p.taxId || '—'}</CTableDataCell>
                                        <CTableDataCell className="text-body-secondary">{p.masterEmail || '—'}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            {p.bankAccounts?.length > 0 ? (
                                                <div className="d-flex flex-wrap gap-1 justify-content-center">
                                                    {p.bankAccounts.map((acc) => (
                                                        <CBadge
                                                            key={acc.providerBankAccountId}
                                                            color={acc.currencyCode === 'PEN' ? 'info' : 'success'}
                                                            shape="rounded-pill"
                                                            title={`${acc.bankName || 'Banco'} - ${acc.accountNumber || ''}`}
                                                        >
                                                            {acc.currencyCode} {acc.isDefault && '★'}
                                                        </CBadge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-body-secondary">—</span>
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch
                                                checked={p.isActive}
                                                onChange={() => handleToggle({ providerId: p.providerId, isActive: !p.isActive })}
                                                label={
                                                    <CBadge color={p.isActive ? 'success' : 'danger'} shape="rounded-pill">
                                                        {p.isActive ? 'Activo' : 'Inactivo'}
                                                    </CBadge>
                                                }
                                                className="d-inline-flex align-items-center gap-2"
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton color="warning" variant="ghost" size="sm" onClick={() => openEdit(p)} title="Editar">
                                                <CIcon icon={cilPen} />
                                            </CButton>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    )}
                </CCardBody>
            </CCard>

            {/* Modal editar proveedor */}
            <CModal visible={modalOpen} onClose={() => setModalOpen(false)} size="lg" alignment="center">
                <CModalHeader className="lucha-modal-header">
                    <CModalTitle className="lucha-modal-title">Editar proveedor</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={onSubmit}>
                    <CModalBody>
                        <CRow className="g-3">
                            <CCol md={6}>
                                <CFormInput label="Código" required value={form.providerCode}
                                    onChange={(e) => set('providerCode', e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput label="RUC" required maxLength={11} value={form.taxId}
                                    onChange={(e) => set('taxId', e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput label="Razón Social" required value={form.legalName}
                                    onChange={(e) => set('legalName', e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput label="Nombre Comercial" value={form.commercialName}
                                    onChange={(e) => set('commercialName', e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput label="Email" type="email" value={form.masterEmail}
                                    onChange={(e) => set('masterEmail', e.target.value)} />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput label="Teléfono" value={form.masterPhone}
                                    onChange={(e) => set('masterPhone', e.target.value)} />
                            </CCol>
                            <CCol xs={12}>
                                <CFormInput label="Dirección Fiscal" value={form.fiscalAddress}
                                    onChange={(e) => set('fiscalAddress', e.target.value)} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="Departamento" value={form.department}
                                    onChange={(e) => set('department', e.target.value)} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="Provincia" value={form.province}
                                    onChange={(e) => set('province', e.target.value)} />
                            </CCol>
                            <CCol md={4}>
                                <CFormInput label="Distrito" value={form.district}
                                    onChange={(e) => set('district', e.target.value)} />
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter className="lucha-modal-footer">
                        <CButton color="secondary" variant="ghost" onClick={() => setModalOpen(false)}>
                            Cancelar
                        </CButton>
                        <CButton type="submit" className="lucha-btn-submit" disabled={saving}>
                            {saving ? 'Guardando...' : 'Guardar'}
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </div>
    );
};

export default ProvidersListPage;
