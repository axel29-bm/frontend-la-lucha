import React, { useMemo } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronLeft, cilChevronRight } from '@coreui/icons'
import type { PaginationControlsProps } from '../../types/PaginationControlTypes'

/**
 * Controles de paginación (móvil / desktop).
 * - Móvil: «x / y» centrado.
 * - Desktop: números + “…” dinámico.
 */
const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  pageCount,
  setPage,
  isMobile,
}) => {
  /** Crea el arreglo [1 … 4 5 6 … 10] solo para desktop */
  const items = useMemo<(number | 'dots')[]>(() => {
    if (isMobile) return []
    const range = 2
    const arr: (number | 'dots')[] = []

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= page - range && i <= page + range)) {
        arr.push(i)
      } else if (
        (i === page - range - 1 && i > 1) ||
        (i === page + range + 1 && i < pageCount)
      ) {
        arr.push('dots')
      }
    }
    return arr.filter((v, idx, a) => v !== 'dots' || a[idx - 1] !== 'dots')
  }, [page, pageCount, isMobile])

  if (pageCount <= 1) return null

  return (
    <div className="small fw-bold">
      <CPagination align={isMobile ? 'center' : 'end'}>
        {/* Anterior */}
        <CPaginationItem
          style={{ cursor: 'pointer' }}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <CIcon icon={cilChevronLeft} title='Anterior'/>
        </CPaginationItem>

        {/* Cuerpo */}
        {isMobile ? (
          <CPaginationItem disabled>
            {page} / {pageCount}
          </CPaginationItem>
        ) : (
          items.map((it, i) =>
            it === 'dots' ? (
              <CPaginationItem key={`dots-${i}`} disabled>
                …
              </CPaginationItem>
            ) : (
              <CPaginationItem
                key={it}
                active={page === it}
                style={{ cursor: 'pointer' }}
                onClick={() => setPage(it as number)}
              >
                {it}
              </CPaginationItem>
            )
          )
        )}

        {/* Siguiente */}
        <CPaginationItem
          style={{ cursor: 'pointer' }}
          disabled={page === pageCount}
          onClick={() => setPage(page + 1)}
        >
          <CIcon icon={cilChevronRight} title='Siguiente'/>
        </CPaginationItem>
      </CPagination>
    </div>
  )
}

export default PaginationControls
