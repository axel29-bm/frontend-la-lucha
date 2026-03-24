import React from 'react'
import type { PaginationRangeProps } from '../../types/PaginationRangeTypes'

/**
 * Muestra el texto: “Mostrando registros del X al Y de un total de Z registros”
 */
const PaginationRangeLabel: React.FC<PaginationRangeProps> = ({ from, to, total, className = '' }) => (
  <div className={`small text-body-secondary ${className}`}>
    Mostrando registros del <b>{from}</b>
    &nbsp;al <b>{to}</b>
    &nbsp;de un total de <b>{total}</b> registros
  </div>
)

export default PaginationRangeLabel
