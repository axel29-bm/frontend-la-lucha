# Interface: TableToolbarProps

Defined in: [src/shared/types/TableToolbarTypes.ts:4](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-4)

Props utilizadas por el componente TableToolbar, encargado de la búsqueda y cantidad por página.

## Properties

### pageSize

> **pageSize**: `number`

Defined in: [src/shared/types/TableToolbarTypes.ts:6](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-6)

Cantidad de registros mostrados por página

***

### pageSizeOptions?

> `optional` **pageSizeOptions**: `number`[]

Defined in: [src/shared/types/TableToolbarTypes.ts:21](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-21)

(Opcional) Lista de opciones permitidas para cantidad de registros por página

***

### search

> **search**: `string`

Defined in: [src/shared/types/TableToolbarTypes.ts:12](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-12)

Texto actual del buscador

***

### searchPlaceholder?

> `optional` **searchPlaceholder**: `string`

Defined in: [src/shared/types/TableToolbarTypes.ts:24](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-24)

(Opcional) Texto del placeholder del input de búsqueda

***

### setPage()?

> `optional` **setPage**: (`n`) => `void`

Defined in: [src/shared/types/TableToolbarTypes.ts:18](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-18)

(Opcional) Función para resetear la página al cambiar filtros

#### Parameters

##### n

`number`

#### Returns

`void`

***

### setPageSize()

> **setPageSize**: (`n`) => `void`

Defined in: [src/shared/types/TableToolbarTypes.ts:9](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-9)

Función que actualiza la cantidad de registros por página

#### Parameters

##### n

`number`

#### Returns

`void`

***

### setSearch()

> **setSearch**: (`val`) => `void`

Defined in: [src/shared/types/TableToolbarTypes.ts:15](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/types/TableToolbarTypes.ts#lines-15)

Función que actualiza el texto del buscador

#### Parameters

##### val

`string`

#### Returns

`void`
