import React from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import type { PaginationProps } from '../../types/PaginationTypes'
import TotalCollectedCard from '../molecules/TotalCollectedCard'
import PaginationRangeLabel from '../molecules/PaginationRangeLabel'
import PaginationControls from '../molecules/PaginationControls'

/**
 * Componente de paginación inteligente y responsiva.
 * - Muestra botones y rango de resultados.
 * - Se adapta automáticamente al modo móvil (simplificado).
 * - Calcula el total recaudado y lo muestra debajo.
 *
 * @param page Página actual
 * @param pageCount Número total de páginas
 * @param setPage Función para cambiar de página
 * @param filteredCount Total de registros encontrados
 * @param pageSize Cantidad de registros por página
 * @param totalCollected Total acumulado monetario
 * @param currency Moneda (por defecto: 'Bs.')
 */
const SmartPagination: React.FC<PaginationProps> = ({ page, pageCount, setPage, filteredCount, pageSize, totalCollected = 0, currency = "Bs." }) => {
    const isMobile = useIsMobile()
    const from = filteredCount === 0 ? 0 : (page - 1) * pageSize + 1
    const to = Math.min(page * pageSize, filteredCount)

    if (pageCount <= 0) return null

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-2 mb-2">
                <PaginationRangeLabel
                    from={from}
                    to={to}
                    total={filteredCount}
                    className="mb-2 mb-md-0"
                />
                <div className="small fw-bold">
                    <PaginationControls
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}
                        isMobile={isMobile}
                    />
                </div>
            </div>

            {totalCollected > 0 && (
                <TotalCollectedCard total={totalCollected} currency={currency} borderColor="primary" />
            )}
        </>
    )
}

export default SmartPagination
