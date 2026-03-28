import React, { useState } from 'react';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHead,
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CSpinner, CBadge, CButton, CFormSwitch,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CFormInput, CForm,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPen, cilPlus } from '@coreui/icons';
import { useBanks } from '../hooks/useBanks';
import type { Bank, CreateBankPayload, UpdateBankPayload } from '../types/bankTypes';

const emptyForm = { bankCode: '', bankName: '', swiftCode: '' };

const BanksPage: React.FC = () => {
    const { banks, loading, handleToggle, handleCreate, handleUpdate } = useBanks();

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Bank | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const openCreate = () => {
        setEditing(null);
        setForm(emptyForm);
        setModalOpen(true);
    };

    const openEdit = (bank: Bank) => {
        setEditing(bank);
        setForm({ bankCode: bank.bankCode, bankName: bank.bankName, swiftCode: bank.swiftCode || '' });
        setModalOpen(true);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing) {
                await handleUpdate(editing.bankId, form as UpdateBankPayload);
            } else {
                await handleCreate(form as CreateBankPayload);
            }
            setModalOpen(false);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="py-3">
            <CCard className="lucha-page-card">
                <CCardHeader className="lucha-page-header d-flex justify-content-between align-items-center">
                    <div>
                        <h4 className="mb-0 fw-bold">Bancos</h4>
                        <small className="text-white-50">Gestiona los bancos permitidos para pagos a proveedores</small>
                    </div>
                    <CButton color="light" size="sm" onClick={openCreate}>
                        <CIcon icon={cilPlus} className="me-1" /> Agregar banco
                    </CButton>
                </CCardHeader>
                <CCardBody className="p-0">
                    {loading ? (
                        <div className="text-center py-5"><CSpinner color="danger" /></div>
                    ) : banks.length === 0 ? (
                        <div className="text-center py-5 text-body-secondary">No hay bancos registrados.</div>
                    ) : (
                        <CTable hover responsive className="mb-0 lucha-table">
                            <CTableHead className="lucha-thead">
                                <CTableRow>
                                    <CTableHeaderCell>Código</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre del banco</CTableHeaderCell>
                                    <CTableHeaderCell>SWIFT</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {banks.map((bank) => (
                                    <CTableRow key={bank.bankId}>
                                        <CTableDataCell className="fw-semibold" style={{ color: 'var(--lucha-red)' }}>
                                            {bank.bankCode}
                                        </CTableDataCell>
                                        <CTableDataCell>{bank.bankName}</CTableDataCell>
                                        <CTableDataCell className="text-body-secondary">{bank.swiftCode || '—'}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CFormSwitch
                                                checked={bank.isActive}
                                                onChange={() => handleToggle(bank.bankId, bank.isActive)}
                                                label={
                                                    <CBadge color={bank.isActive ? 'success' : 'danger'} shape="rounded-pill">
                                                        {bank.isActive ? 'Activo' : 'Inactivo'}
                                                    </CBadge>
                                                }
                                                className="d-inline-flex align-items-center gap-2"
                                            />
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CButton color="warning" variant="ghost" size="sm" onClick={() => openEdit(bank)} title="Editar">
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

            {/* Modal crear / editar */}
            <CModal visible={modalOpen} onClose={() => setModalOpen(false)} alignment="center">
                <CModalHeader className="lucha-modal-header">
                    <CModalTitle className="lucha-modal-title">
                        {editing ? 'Editar banco' : 'Nuevo banco'}
                    </CModalTitle>
                </CModalHeader>
                <CForm onSubmit={onSubmit}>
                    <CModalBody>
                        <CFormInput
                            label="Código" className="mb-3" required
                            value={form.bankCode}
                            onChange={(e) => setForm({ ...form, bankCode: e.target.value })}
                        />
                        <CFormInput
                            label="Nombre del banco" className="mb-3" required
                            value={form.bankName}
                            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
                        />
                        <CFormInput
                            label="Código SWIFT (opcional)"
                            value={form.swiftCode}
                            onChange={(e) => setForm({ ...form, swiftCode: e.target.value })}
                        />
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

export default BanksPage;