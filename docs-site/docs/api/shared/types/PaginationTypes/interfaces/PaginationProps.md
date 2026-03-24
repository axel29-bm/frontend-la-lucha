# Interface: PaginationProps

Defined in: [src/shared/types/PaginationTypes.ts:4](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-4)

Props necesarias para controlar la paginación en un componente como SmartPagination.

## Properties

### currency?

> `optional` **currency**: `string`

Defined in: [src/shared/types/PaginationTypes.ts:24](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-24)

Moneda en la que se expresa el monto total (opcional, por defecto: 'Bs.')

***

### filteredCount

> **filteredCount**: `number`

Defined in: [src/shared/types/PaginationTypes.ts:15](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-15)

Cantidad total de registros encontrados (filtrados)

***

### page

> **page**: `number`

Defined in: [src/shared/types/PaginationTypes.ts:6](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-6)

Página actual

***

### pageCount

> **pageCount**: `number`

Defined in: [src/shared/types/PaginationTypes.ts:9](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-9)

Total de páginas disponibles

***

### pageSize

> **pageSize**: `number`

Defined in: [src/shared/types/PaginationTypes.ts:18](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-18)

Cantidad de registros por página

***

### setPage()

> **setPage**: (`page`) => `void`

Defined in: [src/shared/types/PaginationTypes.ts:12](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-12)

Función que cambia la página activa

#### Parameters

##### page

`number`

#### Returns

`void`

***

### totalCollected?

> `optional` **totalCollected**: `number`

Defined in: [src/shared/types/PaginationTypes.ts:21](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/PaginationTypes.ts#lines-21)

Total recaudado o monto acumulado a mostrar (opcional)
