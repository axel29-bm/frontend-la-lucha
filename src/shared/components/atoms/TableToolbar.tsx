import React from 'react'
import { CRow, CCol, CFormSelect, CFormInput } from '@coreui/react'
import type { TableToolbarProps } from '../../types/TableToolbarTypes';

/**
 * Barra de herramientas superior para tablas.
 * - Incluye selector de cantidad de registros por página.
 * - Incluye buscador por texto.
 *
 * @param pageSize Cantidad de registros actuales por página
 * @param setPageSize Setter para actualizar `pageSize`
 * @param search Valor actual del campo de búsqueda
 * @param setSearch Setter del campo de búsqueda
 * @param setPage Setter de la página actual (reinicia a 1 al cambiar filtros)
 * @param pageSizeOptions Lista de opciones permitidas para paginación
 * @param searchPlaceholder Texto personalizado para el input de búsqueda
 */

const TableToolbar: React.FC<TableToolbarProps> = ({
    pageSize,
    setPageSize,
    search,
    setSearch,
    setPage,
    pageSizeOptions = [],
    searchPlaceholder = 'Buscar...',
}) => (
    <CRow className="mb-3 justify-content-between align-items-center">
        <CCol xs={12} md={6} className="d-flex align-items-center mb-2 mb-md-0">
            <span className="me-2">Mostrar</span>
            <CFormSelect
                size="sm"
                style={{ width: 80 }}
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                    if (setPage) setPage(1);
                }}
            >
                {pageSizeOptions.map(num => (
                    <option key={num} value={num}>{num}</option>
                ))}
            </CFormSelect>
            <span className="ms-2">registros</span>
        </CCol>
        <CCol xs={12} md={3}>
            <CFormInput
                type="search"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => {
                    setSearch(e.target.value);
                    if (setPage) setPage(1);
                }}
            />
        </CCol>
    </CRow>
)

export default TableToolbar
