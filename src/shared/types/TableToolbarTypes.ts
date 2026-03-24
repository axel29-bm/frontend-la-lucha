/**
 * Props utilizadas por el componente TableToolbar, encargado de la búsqueda y cantidad por página.
 */
export interface TableToolbarProps {
    /** Cantidad de registros mostrados por página */
    pageSize: number

    /** Función que actualiza la cantidad de registros por página */
    setPageSize: (n: number) => void

    /** Texto actual del buscador */
    search: string

    /** Función que actualiza el texto del buscador */
    setSearch: (val: string) => void

    /** (Opcional) Función para resetear la página al cambiar filtros */
    setPage?: (n: number) => void 

    /** (Opcional) Lista de opciones permitidas para cantidad de registros por página */
    pageSizeOptions?: number[]

    /** (Opcional) Texto del placeholder del input de búsqueda */
    searchPlaceholder?: string
}