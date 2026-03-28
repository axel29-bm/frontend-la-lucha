import React from 'react';
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHead,
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
    CSpinner, CBadge,
} from '@coreui/react';
import { useCurrencies } from '../hooks/useCurrencies';

const CurrenciesPage: React.FC = () => {
    const { currencies, loading } = useCurrencies();

    return (
        <div className="py-3">
            <CCard className="lucha-page-card">
                <CCardHeader className="lucha-page-header">
                    <div>
                        <h4 className="mb-0 fw-bold">Monedas</h4>
                        <small className="text-white-50">Listado de monedas registradas</small>
                    </div>
                </CCardHeader>
                <CCardBody className="p-0">
                    {loading ? (
                        <div className="text-center py-5">
                            <CSpinner color="danger" />
                        </div>
                    ) : currencies.length === 0 ? (
                        <div className="text-center py-5 text-body-secondary">
                            No hay monedas registradas.
                        </div>
                    ) : (
                        <CTable hover responsive className="mb-0 lucha-table">
                            <CTableHead className="lucha-thead">
                                <CTableRow>
                                    <CTableHeaderCell>Código</CTableHeaderCell>
                                    <CTableHeaderCell>Nombre</CTableHeaderCell>
                                    <CTableHeaderCell>Símbolo</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {currencies.map((c) => (
                                    <CTableRow key={c.currencyCode}>
                                        <CTableDataCell className="fw-semibold" style={{ color: 'var(--lucha-red)' }}>
                                            {c.currencyCode}
                                        </CTableDataCell>
                                        <CTableDataCell>{c.currencyName}</CTableDataCell>
                                        <CTableDataCell className="fw-bold">{c.symbol}</CTableDataCell>
                                        <CTableDataCell className="text-center">
                                            <CBadge color={c.isActive ? 'success' : 'danger'} shape="rounded-pill">
                                                {c.isActive ? 'Activo' : 'Inactivo'}
                                            </CBadge>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    )}
                </CCardBody>
            </CCard>
        </div>
    );
};

export default CurrenciesPage;
