import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDollar } from '@coreui/icons'
import type { TotalCollectedProps } from '../../types/TotalCollectedTypes'

const TotalCollectedCard: React.FC<TotalCollectedProps> = ({
  total,
  currency = 'Bs.',
  className = '',
  borderColor = 'success',
}) => {
  if (total <= 0) return null

  return (
    <CCard className={`mt-3 border-${borderColor} ${className}`}>
      <CCardBody className="py-2 px-3">
        <CRow className="align-items-center">
          <CCol xs="auto">
            <CIcon icon={cilDollar} size="xl" className="text-primary" />
          </CCol>
          <CCol>
            <div className="text-muted small">Total recaudado</div>
            <div className="fs-5 fw-bold">
              {total.toLocaleString('es-BO', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              {currency}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default TotalCollectedCard
