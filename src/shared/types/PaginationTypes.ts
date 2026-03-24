/**
 * Props necesarias para controlar la paginación en un componente como SmartPagination.
 */
export interface PaginationProps {
    /** Página actual */
    page: number

    /** Total de páginas disponibles */
    pageCount: number

    /** Función que cambia la página activa */
    setPage: (page: number) => void

    /** Cantidad total de registros encontrados (filtrados) */
    filteredCount: number

    /** Cantidad de registros por página */
    pageSize: number

    /** Total recaudado o monto acumulado a mostrar (opcional) */
    totalCollected?: number

    /** Moneda en la que se expresa el monto total (opcional, por defecto: 'Bs.') */
    currency?: string
}