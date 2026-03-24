# Function: usePermissions()

> **usePermissions**(): `object`

Defined in: [src/shared/hooks/usePermissions.ts:18](https://bitbucket.org/devticketeg/multipago-reporte-2025/src/8b856e62a15b8057c67006e5179ef29fbfb5872d/src/shared/hooks/usePermissions.ts#lines-18)

Hook para verificación de permisos de usuario autenticado.
- Obtiene el usuario desde el estado global.
- Proporciona la función `hasPermission` para consultar permisos específicos.

## Returns

Objeto con `hasPermission()` y el arreglo de `permissions` completo.

### hasPermission()

> **hasPermission**: (`module`, `controller`, `method?`) => `boolean`

Evalúa si el usuario tiene el permiso especificado.

#### Parameters

##### module

`string`

Módulo a verificar

##### controller

`string`

Controlador dentro del módulo

##### method?

`string`

Método opcional (si se omite, solo evalúa módulo + controlador)

#### Returns

`boolean`

`true` si el permiso existe

### permissions

> **permissions**: `object`[]
